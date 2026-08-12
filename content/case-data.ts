import { z } from "zod";
import type { Locale } from "@/lib/i18n";

const localizedTextSchema = z.object({
  en: z.string(),
  ru: z.string(),
});

const caseSchema = z.object({
  slug: z.string(),
  order: z.number(),
  featured: z.boolean(),
  title: z.string(),
  eyebrow: localizedTextSchema,
  summary: localizedTextSchema,
  visual: localizedTextSchema,
  previewImage: z.string().optional(),
  previewAlt: localizedTextSchema.optional(),
  role: localizedTextSchema,
  type: localizedTextSchema,
  year: z.string().optional(),
  liveUrl: z.url().optional(),
  metrics: z.array(
    z.object({
      value: localizedTextSchema,
      label: localizedTextSchema,
    }),
  ),
  tags: z.array(z.string()),
  evolvedAfterInvolvement: z.boolean().optional(),
});

const rawCases = [
  {
    slug: "begemot-ai",
    order: 1,
    featured: true,
    title: "Begemot AI",
    eyebrow: { en: "AI service for education", ru: "ИИ-сервис для образования" },
    summary: {
      en: "Owned major frontend improvements for an AI product at 4M+ user scale: cut LCP in half, shipped a full redesign, built a document editor, and instrumented the product funnel.",
      ru: "Отвечал за ключевые улучшения фронтенда ИИ-продукта с аудиторией 4 млн+: вдвое сократил LCP, выпустил полный редизайн, редактор документов и продуктовую аналитику.",
    },
    visual: {
      en: "TEXT → BLOCK\n  ↘ EDIT\nDATA → FLOW",
      ru: "ТЕКСТ → БЛОК\n  ↘ ПРАВКА\nДАННЫЕ → ПУТЬ",
    },
    role: {
      en: "Frontend Engineer",
      ru: "Фронтенд-разработчик",
    },
    type: {
      en: "AI document platform",
      ru: "ИИ-сервис для учебных работ",
    },
    year: "2024—2026",
    liveUrl: "https://begemot.ai/",
    metrics: [],
    tags: ["React", "TypeScript", "Editor.js", "Metabase"],
  },
  {
    slug: "bobr-ai",
    order: 2,
    featured: true,
    title: "BOBR AI",
    eyebrow: { en: "AI presentation generator", ru: "ИИ-генератор презентаций" },
    summary: {
      en: "Owned frontend delivery for an AI presentation generator, connecting generation, editing, review, and export into one product flow while coordinating team priorities.",
      ru: "Отвечал за фронтенд ИИ-генератора презентаций: объединил генерацию, редактирование, проверку и экспорт в цельный сценарий и координировал приоритеты команды.",
    },
    visual: {
      en: "[ ][ ][ ]\n  ↘ BUILD\n[ ][ ][ ]",
      ru: "[ ][ ][ ]\n  ↘ СБОРКА\n[ ][ ][ ]",
    },
    role: {
      en: "Frontend Engineer · Team coordinator",
      ru: "Фронтенд-разработчик · координатор команды",
    },
    type: {
      en: "AI presentation generator",
      ru: "ИИ-генератор презентаций",
    },
    liveUrl: "https://bobr.ai/",
    metrics: [],
    tags: ["React", "TypeScript", "Figma", "Team coordination"],
    evolvedAfterInvolvement: true,
  },
  {
    slug: "inhelp",
    order: 3,
    featured: true,
    title: "InHelp",
    eyebrow: {
      en: "Internal support workspace",
      ru: "Рабочее пространство поддержки",
    },
    summary: {
      en: "Built core CRM modules for staff operations, including a real-time shared calendar delivered in two weeks, internal messaging, telephony, roles, and application workflows.",
      ru: "Разработал ключевые модули CRM: общий календарь с обновлениями в реальном времени за две недели, внутренний мессенджер, телефонию, роли и обработку заявлений.",
    },
    visual: {
      en: "CHAT ─ TASK\n  │  SHIFT\nCALL ─ DATA",
      ru: "ЧАТ ─ ЗАДАЧА\n  │  СМЕНА\nЗВОНОК ─ ДАННЫЕ",
    },
    role: {
      en: "Frontend Engineer",
      ru: "Фронтенд-разработчик",
    },
    type: {
      en: "Internal operations platform",
      ru: "Внутренняя операционная платформа",
    },
    metrics: [],
    tags: ["React", "Scheduling", "Telephony", "CRM"],
  },
  {
    slug: "pepper-cat",
    order: 4,
    featured: false,
    title: "PEPPER CAT",
    eyebrow: {
      en: "Music label production system",
      ru: "Продакшен-система музыкального лейбла",
    },
    summary: {
      en: "Designed a repeatable cover, motion, and export workflow for a music label.",
      ru: "Спроектировал повторяемую систему обложек, анимации и экспорта для музыкального лейбла.",
    },
    visual: {
      en: "ART → MOTION\n  ↘ EXPORT",
      ru: "АРТ → MOTION\n  ↘ ЭКСПОРТ",
    },
    role: {
      en: "Visual systems designer",
      ru: "Дизайнер визуальной системы",
    },
    type: {
      en: "Design production system",
      ru: "Система дизайн-производства",
    },
    metrics: [],
    tags: ["Art direction", "Motion", "Automation"],
  },
  {
    slug: "burmistrov",
    order: 5,
    featured: false,
    title: "Burmistrov",
    eyebrow: {
      en: "Personal site for a consultant",
      ru: "Личный сайт бизнес-консультанта",
    },
    summary: {
      en: "Designed, developed, and launched a focused personal site for a business consultant.",
      ru: "Спроектировал, разработал и запустил личный сайт бизнес-консультанта.",
    },
    visual: {
      en: "BRIEF → LIVE\n  [ 24H ]",
      ru: "ЗАДАЧА → LIVE\n  [ 24Ч ]",
    },
    role: {
      en: "Designer and developer",
      ru: "Дизайнер и разработчик",
    },
    type: {
      en: "Personal landing page",
      ru: "Персональный лендинг",
    },
    liveUrl: "https://burmistrov.link/",
    metrics: [],
    tags: ["Rapid delivery", "Web design", "Frontend"],
  },
] satisfies z.input<typeof caseSchema>[];

export const caseStudies = z.array(caseSchema).parse(rawCases);
export type CaseStudy = (typeof caseStudies)[number];

export const caseSlugs = caseStudies.map((project) => project.slug);

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((project) => project.slug === slug);
}

export function localizeCase(project: CaseStudy, locale: Locale) {
  return {
    ...project,
    eyebrow: project.eyebrow[locale],
    summary: project.summary[locale],
    visual: project.visual[locale],
    role: project.role[locale],
    type: project.type[locale],
    metrics: project.metrics.map((metric) => ({
      value: metric.value[locale],
      label: metric.label[locale],
    })),
  };
}

export type LocalizedCase = ReturnType<typeof localizeCase>;
