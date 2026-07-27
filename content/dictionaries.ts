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
    availability: "Open to opportunities",
    hero: {
      eyebrow: "Independent product engineering practice",
      title: "SCALAR",
      person: "Sergey Shabalin",
      role: "Product Engineer / Creative Developer",
      statement: "Product engineering for ideas ready to scale.",
      description:
        "I design, build, and improve digital products across frontend, UX, AI systems, automation, and technical leadership.",
      primaryAction: "View selected work",
      secondaryAction: "Start a conversation",
      scroll: "Explore",
      systemStatus: "SYSTEM ONLINE",
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
        "I'm Sergey Shabalin, a Product Engineer and Creative Developer from Russia. I have been designing and building digital products since 2017.",
        "Frontend is my strongest discipline, but I rarely treat it as an isolated layer. I work with product logic, UX, analytics, AI workflows, automation, delivery, and the people around the product. This includes commercial experience shipping AI-powered products.",
        "I do not want to be a developer who only completes assigned tickets. I want to understand why a feature exists, how people use it, where the product loses momentum, and what can move it forward.",
      ],
      scalar:
        "SCALAR is my independent product engineering practice—and, eventually, a studio.",
      sinceLabel: "Building since",
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
          title: "AI, full-stack & automation",
          text: "AI-powered products, prompt engineering, integrations, business automation, Telegram bots, and full-stack delivery.",
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
      title: "Shipping, leading, and improving the system around the work.",
      company: "Where Is Everybody Inc.",
      role: "Frontend Engineer",
      period: "Oct 2023 — Jan 2026",
      description:
        "Worked across Begemot AI, BOBR AI, InHelp, and other MVPs—shipping product UI, stabilizing legacy code, building analytics, and leading a small cross-functional team.",
      facts: [
        "Complete Figma-to-production redesign delivery",
        "Custom document editor and complex product flows",
        "JavaScript-to-TypeScript migration",
        "Analytics instrumentation and Metabase funnels",
        "CI/CD with GitHub Actions and Docker",
        "Technical interviews, onboarding, and mentoring",
      ],
      educationLabel: "Education",
      education:
        "BSc, Information Systems and Technology — Surgut State University, expected Jun 2027",
    },
    contact: {
      number: "05",
      label: "Contact",
      title: "Have a product that needs stronger technical direction?",
      description:
        "I'm open to freelance projects, startup work, employment, collaboration, remote work, and relocation.",
      telegram: "Message on Telegram",
      email: "Send an email",
      copy: "Copy email",
      copied: "Email copied",
      community: "SCALAR community",
      github: "GitHub",
    },
    footer: {
      statement: "Design. Build. Understand. Scale.",
      credit: "Designed and built by Sergey Shabalin",
      location: "Russia / Remote / Open to relocation",
      backToTop: "Back to top",
      endLabel: "06 / END",
      systemField: "SCALAR / SYSTEM / SCALE",
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
        "Продуктовая разработка для идей, готовых к масштабированию. Frontend, UX, AI-продукты, автоматизация и техническое лидерство.",
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
    availability: "Открыт к предложениям",
    hero: {
      eyebrow: "Независимая продуктовая практика",
      title: "SCALAR",
      person: "Сергей Шабалин",
      role: "Product Engineer / Creative Developer",
      statement: "Продуктовая разработка для идей, готовых к масштабированию.",
      description:
        "Проектирую, разрабатываю и улучшаю цифровые продукты на пересечении frontend, UX, AI-систем, автоматизации и технического лидерства.",
      primaryAction: "Смотреть кейсы",
      secondaryAction: "Обсудить проект",
      scroll: "Дальше",
      systemStatus: "СИСТЕМА АКТИВНА",
    },
    work: {
      number: "01",
      label: "Избранные проекты",
      title: "Продукты за пределами поставленной задачи.",
      description:
        "Продуктовые, инженерные и дизайн-системы. В каждом кейсе — решения и процесс, стоящие за результатом.",
      openCase: "Читать кейс",
      liveProject: "Открыть продукт",
      role: "Роль",
      outcome: "Результат",
      primary: "Основные",
      supporting: "Дополнительные",
    },
    about: {
      number: "02",
      label: "Профиль",
      title: "Я работаю над продуктом, а не только над интерфейсом.",
      paragraphs: [
        "Я Сергей Шабалин, Product Engineer и Creative Developer из России. С 2017 года я занимаюсь разработкой и дизайном цифровых продуктов.",
        "Моя самая сильная область — frontend-разработка, но я редко воспринимаю её как изолированный слой. Я работаю с продуктовой логикой, UX, аналитикой, AI-сценариями, автоматизацией, выпуском и людьми вокруг продукта. У меня есть коммерческий опыт разработки AI-продуктов.",
        "Я не хочу быть разработчиком, который только закрывает поставленные задачи. Мне важно понимать, зачем существует функция, как ей пользуются люди, где продукт теряет потенциал и что поможет ему двигаться дальше.",
      ],
      scalar:
        "SCALAR — моя независимая продуктовая практика, которая со временем может вырасти в студию.",
      sinceLabel: "В разработке с",
      scaleLabel: "Пользователей у запущенного продукта",
      launchLabel: "Самый быстрый сложный MVP",
      launchValue: "1 неделя",
    },
    capabilities: {
      number: "03",
      label: "Компетенции",
      title: "M-shaped профиль для продуктовой работы.",
      description:
        "Глубокая frontend-экспертиза и достаточно широкий профиль, чтобы соединять инженерию, продуктовые решения, AI и выпуск.",
      items: [
        {
          number: "01",
          title: "Frontend-разработка",
          text: "React, Next.js, TypeScript, сложные интерфейсы, производительность, миграции и поддерживаемые компонентные системы.",
        },
        {
          number: "02",
          title: "Продукт и UX",
          text: "Пользовательские сценарии, информационная архитектура, аналитика воронок, прототипирование и упрощение интерфейсов.",
        },
        {
          number: "03",
          title: "AI, full-stack и автоматизация",
          text: "AI-продукты, prompt engineering, интеграции, автоматизация бизнеса, Telegram-боты и full-stack разработка.",
        },
        {
          number: "04",
          title: "Техническое лидерство",
          text: "Декомпозиция MVP, приоритизация, координация разработки и дизайна, ревью, менторство, найм и процессы выпуска.",
        },
      ],
    },
    experience: {
      number: "04",
      label: "Опыт",
      title: "Разрабатываю, лидирую и улучшаю систему вокруг работы.",
      company: "Where Is Everybody Inc.",
      role: "Frontend Engineer",
      period: "окт. 2023 — янв. 2026",
      description:
        "Работал над Begemot AI, BOBR AI, InHelp и другими MVP: выпускал продуктовые интерфейсы, стабилизировал legacy-код, внедрял аналитику и лидировал небольшую кросс-функциональную команду.",
      facts: [
        "Полный редизайн от Figma до production",
        "Кастомный редактор документов и сложные сценарии",
        "Миграция с JavaScript на TypeScript",
        "Клиентская аналитика и воронки в Metabase",
        "CI/CD на GitHub Actions и Docker",
        "Технические интервью, онбординг и менторство",
      ],
      educationLabel: "Образование",
      education:
        "Бакалавриат, Информационные системы и технологии — Сургутский государственный университет, выпуск в июне 2027",
    },
    contact: {
      number: "05",
      label: "Контакты",
      title: "Продукту нужно более сильное техническое направление?",
      description:
        "Открыт к фриланс-проектам, стартапам, работе в компании, сотрудничеству, удалённой работе и релокации.",
      telegram: "Написать в Telegram",
      email: "Отправить письмо",
      copy: "Скопировать email",
      copied: "Email скопирован",
      community: "Сообщество SCALAR",
      github: "GitHub",
    },
    footer: {
      statement: "Понять. Спроектировать. Создать. Масштабировать.",
      credit: "Дизайн и разработка — Сергей Шабалин",
      location: "Россия / Удалённо / Готов к релокации",
      backToTop: "Наверх",
      endLabel: "06 / ФИНАЛ",
      systemField: "SCALAR / СИСТЕМА / МАСШТАБ",
      since: "Продуктовая разработка с 2017 года",
    },
    casePage: {
      back: "Все кейсы",
      role: "Роль",
      type: "Тип",
      scope: "Задачи",
      period: "Период",
      tagsLabel: "Технологии и задачи",
      live: "Открыть продукт",
      contributionNote:
        "Продукт мог измениться после моего участия. В кейсе описан мой вклад в указанный период.",
      next: "Следующий кейс",
      contact: "Обсудить продукт",
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
