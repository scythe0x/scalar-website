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
  role: localizedTextSchema,
  type: localizedTextSchema,
  year: z.string().optional(),
  liveUrl: z.url().optional(),
  metrics: z.array(
    z.object({
      value: z.string(),
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
    eyebrow: { en: "AI product / EdTech", ru: "AI-продукт / EdTech" },
    summary: {
      en: "Editing, redesign, and analytics for a multi-stage AI document product used by more than one million people.",
      ru: "Редактор, редизайн и аналитика многоэтапного AI-продукта для документов с аудиторией более миллиона пользователей.",
    },
    visual: {
      en: "TEXT → BLOCK\n  ↘ EDIT\nDATA → FLOW",
      ru: "ТЕКСТ → БЛОК\n  ↘ ПРАВКА\nДАННЫЕ → ПУТЬ",
    },
    role: {
      en: "Frontend Engineer / Product contributor",
      ru: "Frontend Engineer / Участие в продукте",
    },
    type: {
      en: "AI document platform",
      ru: "AI-платформа для документов",
    },
    year: "2023—2026",
    liveUrl: "https://begemot.ai/",
    metrics: [
      {
        value: "1M+",
        label: { en: "product users", ru: "пользователей продукта" },
      },
      {
        value: "Editor.js",
        label: { en: "custom editing layer", ru: "кастомный редактор" },
      },
    ],
    tags: ["React", "TypeScript", "Editor.js", "Metabase"],
  },
  {
    slug: "bobr-ai",
    order: 2,
    featured: true,
    title: "BOBR AI",
    eyebrow: { en: "AI product / Presentations", ru: "AI-продукт / Презентации" },
    summary: {
      en: "Leading frontend, product delivery, and a small cross-functional team for a complex AI presentation generator.",
      ru: "Frontend, выпуск продукта и лидерство небольшой кросс-функциональной команды сложного AI-генератора презентаций.",
    },
    visual: {
      en: "[ ][ ][ ]\n  ↘ BUILD\n[ ][ ][ ]",
      ru: "[ ][ ][ ]\n  ↘ СБОРКА\n[ ][ ][ ]",
    },
    role: {
      en: "Lead Developer / Product Engineer",
      ru: "Lead Developer / Product Engineer",
    },
    type: {
      en: "AI presentation generator",
      ru: "AI-генератор презентаций",
    },
    liveUrl: "https://bobr.ai/",
    metrics: [
      {
        value: "1 week",
        label: { en: "to MVP", ru: "до MVP" },
      },
      {
        value: "2 months",
        label: { en: "to market release", ru: "до выхода на рынок" },
      },
    ],
    tags: ["React", "AI", "Prompt engineering", "Leadership"],
    evolvedAfterInvolvement: true,
  },
  {
    slug: "inhelp",
    order: 3,
    featured: true,
    title: "InHelp",
    eyebrow: {
      en: "Operations / Support workspace",
      ru: "Операции / Рабочее пространство поддержки",
    },
    summary: {
      en: "A role-based workspace that joins chats, tasks, telephony, scheduling, performance, and payouts.",
      ru: "Ролевое рабочее пространство, объединяющее чаты, задачи, телефонию, расписание, метрики и выплаты.",
    },
    visual: {
      en: "CHAT ─ TASK\n  │  SHIFT\nCALL ─ DATA",
      ru: "ЧАТ ─ ЗАДАЧА\n  │  СМЕНА\nЗВОНОК ─ ДАННЫЕ",
    },
    role: {
      en: "Frontend Engineer",
      ru: "Frontend Engineer",
    },
    type: {
      en: "Internal operations platform",
      ru: "Внутренняя операционная платформа",
    },
    metrics: [
      {
        value: "One",
        label: {
          en: "unified operational workspace",
          ru: "единое рабочее пространство",
        },
      },
    ],
    tags: ["React", "Scheduling", "Telephony", "CRM"],
  },
  {
    slug: "pepper-cat",
    order: 4,
    featured: false,
    title: "PEPPER CAT",
    eyebrow: {
      en: "Visual systems / Music",
      ru: "Визуальные системы / Музыка",
    },
    summary: {
      en: "A repeatable cover, motion, and export pipeline for a high-frequency music label.",
      ru: "Повторяемый конвейер обложек, motion-дизайна и экспорта для музыкального лейбла с частыми релизами.",
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
    metrics: [
      {
        value: "30+",
        label: { en: "releases delivered", ru: "выпущенных релизов" },
      },
      {
        value: "<2h",
        label: { en: "full package turnaround", ru: "на полный медиапакет" },
      },
    ],
    tags: ["Art direction", "Motion", "Automation"],
  },
  {
    slug: "burmistrov",
    order: 5,
    featured: false,
    title: "Burmistrov",
    eyebrow: {
      en: "Rapid delivery / Personal site",
      ru: "Быстрый выпуск / Личный сайт",
    },
    summary: {
      en: "A focused personal destination for a business consultant, scoped and shipped in one day.",
      ru: "Сфокусированный личный сайт бизнес-консультанта, согласованный и выпущенный за один день.",
    },
    visual: {
      en: "BRIEF → LIVE\n  [ 24H ]",
      ru: "ЗАДАЧА → LIVE\n  [ 24Ч ]",
    },
    role: {
      en: "Designer / Developer",
      ru: "Дизайнер / Разработчик",
    },
    type: {
      en: "Personal landing page",
      ru: "Персональный лендинг",
    },
    liveUrl: "https://burmistrov.link/",
    metrics: [
      {
        value: "1 day",
        label: { en: "from scope to launch", ru: "от задачи до запуска" },
      },
    ],
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
      value: metric.value,
      label: metric.label[locale],
    })),
  };
}

export type LocalizedCase = ReturnType<typeof localizeCase>;
