import type { Locale } from "@/lib/i18n";

const dictionaries = {
  en: {
    meta: {
      title: "SCALAR — Sergey Shabalin",
      description:
        "Product engineering for ideas ready to scale. Frontend, UX, AI products, automation, and technical leadership.",
    },
    navigation: {
      work: "Work",
      about: "About",
      capabilities: "Capabilities",
      contact: "Contact",
      skip: "Skip to content",
      menu: "Menu",
      close: "Close",
      homeLabel: "SCALAR home",
      primaryLabel: "Primary navigation",
      mobileLabel: "Mobile navigation",
    },
    hero: {
      title: "SCALAR",
      person: "Sergey Shabalin",
      role: "Product Engineer / Creative Developer",
      statement: "I build and lead digital products — from interface to launch.",
      primaryAction: "View selected work",
      secondaryAction: "Start a conversation",
    },
    work: {
      number: "01",
      label: "Selected work",
      title: "Products built beyond the ticket.",
      description:
        "A selection of product, engineering, and design systems. Each case explains the decisions behind the result.",
      openCase: "Read case",
      liveProject: "Live project",
      role: "Role",
      outcome: "Outcome",
      primary: "Selected",
      supporting: "Additional",
    },
    about: {
      number: "02",
      label: "Profile",
      title: "I work on the product, not just the interface.",
      paragraphs: [
        {
          lead: "I'm Sergey Shabalin. ",
          body: "A Product Engineer and Creative Developer from Russia, designing and building digital products since 2017.",
        },
        {
          lead: "Frontend is my deepest discipline. ",
          body: "I connect it with product logic, UX, analytics, AI workflows, automation, delivery, and the people around the product.",
        },
        {
          lead: "I take ownership beyond the ticket. ",
          body: "I want to understand why a feature exists, how people use it, where the product loses momentum, and what can move it forward.",
        },
      ],
      scalar:
        "SCALAR is my independent product engineering practice — and, eventually, a studio.",
      scalarLabel: "SCALAR / INDEPENDENT PRACTICE",
      sinceLabel: "Building since",
      scaleValue: "1M+",
      scaleLabel: "Users on a shipped product",
      launchLabel: "Fastest complex MVP",
      launchValue: "1 week",
    },
    capabilities: {
      number: "03",
      label: "Capabilities",
      title: "An M-shaped profile for product work.",
      description:
        "Deepest in frontend, broad enough to connect engineering, product decisions, AI workflows, and delivery.",
      items: [
        {
          number: "01",
          title: "Frontend engineering",
          text: "React, Next.js, TypeScript, complex interfaces, performance, migrations, and maintainable component systems.",
        },
        {
          number: "02",
          title: "Product & UX",
          text: "User flows, information architecture, funnel analytics, prototyping, interface simplification, and practical UI.",
        },
        {
          number: "03",
          title: "AI products & automation",
          text: "Prompt engineering, model workflows, integrations, Telegram bots, business automation, and the backend required to ship them.",
        },
        {
          number: "04",
          title: "Technical leadership",
          text: "MVP scoping, prioritization, developer and designer coordination, reviews, mentoring, hiring, and delivery processes.",
        },
      ],
    },
    experience: {
      number: "04",
      label: "Evidence",
      title: "Product work with ownership beyond frontend.",
      company: "Where Is Everybody Inc.",
      role: "Frontend Engineer",
      period: "Oct 2023 — Jan 2026",
      descriptionLead: "Begemot AI, BOBR AI, InHelp, and other MVPs. ",
      description:
        "I shipped product interfaces, stabilized legacy code, built analytics, and led a small cross-functional team.",
      facts: [
        "Delivered a complete Figma-to-production redesign",
        "Custom document editor and complex product flows",
        "JavaScript-to-TypeScript migration",
        "Analytics instrumentation and Metabase funnels",
        "CI/CD with GitHub Actions and Docker",
        "Technical interviews, onboarding, and mentoring",
      ],
      educationLabel: "Education",
      educationDegree: "BSc, Information Systems and Technology",
      educationInstitution: "Surgut State University",
      educationPeriod: "Expected Jun 2027",
    },
    contact: {
      number: "05",
      label: "Contact",
      title: "Have a product that needs stronger technical direction?",
      description:
        "I'm open to freelance projects, startup work, employment, collaboration, and remote work.",
      telegram: "Message on Telegram",
      email: "Send an email",
      community: "SCALAR community",
      github: "GitHub",
    },
    footer: {
      statement: "Design. Build. Understand. Scale.",
      credit: "Designed and built by Sergey Shabalin",
      location: "Russia / Remote",
      endLabel: "06 / END",
      since: "Product engineering since 2017",
    },
    casePage: {
      back: "All work",
      role: "Role",
      type: "Type",
      scope: "Scope",
      period: "Period",
      tagsLabel: "Technology and scope",
      live: "Visit live product",
      contributionNote:
        "The product may have evolved after my involvement. This case describes my contribution during the stated period.",
      next: "Next case",
      contact: "Discuss a product",
    },
    notFound: {
      label: "404 / OUT OF RANGE",
      title: "This coordinate does not exist.",
      action: "Return to SCALAR",
    },
  },
  ru: {
    meta: {
      title: "SCALAR — Сергей Шабалин",
      description:
        "Разрабатываю цифровые продукты: frontend, UX, AI, автоматизация и техническое лидерство.",
    },
    navigation: {
      work: "Кейсы",
      about: "Обо мне",
      capabilities: "Компетенции",
      contact: "Контакты",
      skip: "Перейти к содержанию",
      menu: "Меню",
      close: "Закрыть",
      homeLabel: "На главную SCALAR",
      primaryLabel: "Основная навигация",
      mobileLabel: "Мобильная навигация",
    },
    hero: {
      title: "SCALAR",
      person: "Сергей Шабалин",
      role: "Product Engineer / Creative Developer",
      statement: "Разрабатываю цифровые продукты и веду их к запуску — от интерфейса до технической реализации.",
      primaryAction: "Смотреть кейсы",
      secondaryAction: "Обсудить проект",
    },
    work: {
      number: "01",
      label: "Избранные кейсы",
      title: "Не просто закрываю задачи — развиваю продукт.",
      description:
        "Здесь — продуктовая разработка, инженерные решения и визуальные системы. В каждом кейсе рассказываю, как принимал решения и к чему они привели.",
      openCase: "Читать кейс",
      liveProject: "Открыть продукт",
      role: "Роль",
      outcome: "Результат",
      primary: "Основные кейсы",
      supporting: "Другие проекты",
    },
    about: {
      number: "02",
      label: "Профиль",
      title: "Работаю над продуктом целиком, а не только над интерфейсом.",
      paragraphs: [
        {
          lead: "Я Сергей Шабалин. ",
          body: "С 2017 года проектирую и разрабатываю цифровые продукты. Работаю на стыке инженерии, дизайна и продуктовых решений.",
        },
        {
          lead: "Моя основная экспертиза — frontend. ",
          body: "Но я не отделяю его от продуктовой логики, UX, аналитики, AI, автоматизации и процессов команды.",
        },
        {
          lead: "Для меня важен результат, а не закрытая задача. ",
          body: "Я разбираюсь, зачем нужна функция, как ей пользуются люди, где продукт теряет потенциал и что действительно поможет ему двигаться дальше.",
        },
      ],
      scalar:
        "SCALAR — имя моей независимой практики. Со временем я хочу вырастить её в студию.",
      scalarLabel: "SCALAR / НЕЗАВИСИМАЯ ПРАКТИКА",
      sinceLabel: "Занимаюсь разработкой с",
      scaleValue: "1 млн+",
      scaleLabel: "Пользователей в запущенном продукте",
      launchLabel: "От идеи до MVP",
      launchValue: "1 неделя",
    },
    capabilities: {
      number: "03",
      label: "Компетенции",
      title: "M-shaped-профиль: глубина в frontend, широта в продукте.",
      description:
        "Могу глубоко погрузиться в интерфейс и при этом держать в поле зрения UX, AI, автоматизацию и выпуск продукта.",
      items: [
        {
          number: "01",
          title: "Frontend-разработка",
          text: "React, Next.js, TypeScript, сложные производительные интерфейсы, миграции и компонентные системы, которые удобно развивать.",
        },
        {
          number: "02",
          title: "Продукт и UX",
          text: "Проектирование сценариев, информационная архитектура, аналитика воронок, прототипы и упрощение сложных интерфейсов.",
        },
        {
          number: "03",
          title: "AI-продукты и автоматизация",
          text: "Промпт-инжиниринг, цепочки работы моделей, интеграции, Telegram-боты и автоматизация бизнес-процессов — включая backend, необходимый для запуска.",
        },
        {
          number: "04",
          title: "Техническое лидерство",
          text: "Состав и приоритеты MVP, координация разработки и дизайна, ревью, менторство, найм и организация выпуска.",
        },
      ],
    },
    experience: {
      number: "04",
      label: "Опыт",
      title: "Моя ответственность не заканчивается на frontend.",
      company: "Where Is Everybody Inc.",
      role: "Frontend Engineer",
      period: "окт. 2023 — янв. 2026",
      descriptionLead: "Begemot AI, BOBR AI, InHelp и другие MVP. ",
      description:
        "Разрабатывал интерфейсы, приводил в порядок legacy-код, настраивал аналитику и руководил небольшой командой разработки и дизайна.",
      facts: [
        "Полный редизайн: от макетов в Figma до production",
        "Редактор документов и сложные пользовательские сценарии",
        "Миграция проекта с JavaScript на TypeScript",
        "Продуктовая аналитика и воронки в Metabase",
        "CI/CD: GitHub Actions и Docker",
        "Технические интервью, онбординг и менторство",
      ],
      educationLabel: "Образование",
      educationDegree: "Бакалавриат по направлению «Информационные системы и технологии»",
      educationInstitution: "Сургутский государственный университет",
      educationPeriod: "Выпуск в июне 2027",
    },
    contact: {
      number: "05",
      label: "Контакты",
      title: "Нужен разработчик, который думает о продукте?",
      description:
        "Открыт к фриланс-проектам, работе со стартапами и предложениям о найме. Работаю удалённо.",
      telegram: "Написать в Telegram",
      email: "Написать на почту",
      community: "Сообщество SCALAR",
      github: "GitHub",
    },
    footer: {
      statement: "Понять. Спроектировать. Создать. Масштабировать.",
      credit: "Дизайн и разработка: Сергей Шабалин",
      location: "Россия / Удалённо",
      endLabel: "06 / ФИНАЛ",
      since: "Продуктовая разработка с 2017 года",
    },
    casePage: {
      back: "Все кейсы",
      role: "Роль",
      type: "Тип",
      scope: "Задачи",
      period: "Период",
      tagsLabel: "Технологии и область работы",
      live: "Открыть продукт",
      contributionNote:
        "После моего участия продукт мог измениться. Здесь описан мой вклад за указанный период.",
      next: "Следующий кейс",
      contact: "Обсудить задачу",
    },
    notFound: {
      label: "404 / ВНЕ ДИАПАЗОНА",
      title: "Такая координата не существует.",
      action: "Вернуться к SCALAR",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
