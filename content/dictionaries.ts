import type { Locale } from "@/lib/i18n";

const dictionaries = {
	en: {
		meta: {
			title: "scythe0x — Product Engineer",
			description:
				"Product Engineer with deep frontend expertise. I take features from product idea and UX through implementation, analytics, and production release.",
		},
		navigation: {
			work: "work",
			about: "About",
			capabilities: "skills",
			contact: "contact",
			skip: "Skip to content",
			menu: "Menu",
			close: "Close",
			homeLabel: "scythe0x home",
			primaryLabel: "Primary navigation",
			mobileLabel: "Mobile navigation",
		},
			hero: {
			title: "scythe0x",
			person: "scythe0x",
			role: "Product Engineer with deep frontend expertise. I take features from product idea and UX through full-stack implementation, analytics, and production release.",
			facts: [
				{ value: "4M+", label: "Users served by Begemot.ai" },
				{
					value: "$3.4M+",
					label: "Begemot.ai FY2025 revenue",
				},
				{ value: "4 engineers", label: "Team delivery coordinated" },
			],
			primaryAction: "View selected work",
			secondaryAction: "Start a conversation",
			contactsLabel: "Contacts",
			channelLabel: "Telegram channel",
		},
		work: {
			number: "01",
			label: "Selected work",
			title: "work",
			description:
				"Selected products, with my ownership, engineering decisions, and shipped results made explicit.",
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
			title: "profile",
			paragraphs: [
				{
					lead: "I'm a Product Engineer with deep frontend expertise. ",
					body: "I work across the delivery loop: product framing, UX, frontend, backend integrations, analytics, and release.",
				},
				{
					lead: "I start with the problem, not the ticket. ",
					body: "I clarify the user need, reduce scope to a coherent feature, and choose the simplest implementation that can ship and be measured.",
				},
				{
					lead: "I build for production, not for the demo. ",
					body: "That means performance, edge cases, observability, maintainable code, and responsibility for what happens after release.",
				},
			],
			practice:
				"I build customer-facing products from idea to production and improve the systems behind them.",
			practiceLabel: "SCYTHE0X / PERSONAL PRACTICE",
			sinceValue: "2×",
			sinceLabel: "Faster LCP in production",
			scaleValue: "Editor.js",
			scaleLabel: "Document editor built from scratch",
			launchLabel: "Interns mentored",
			launchValue: "5",
		},
		capabilities: {
			number: "03",
			label: "Skills",
			title: "skills",
			description:
				"I combine product judgment with hands-on engineering and stay accountable through release.",
			items: [
				{
					number: "01",
					title: "Product engineering",
					text: "Problem framing, requirements, UX, implementation, analytics, and rollout. I turn ambiguous ideas into scoped features and own them through production.",
				},
				{
					number: "02",
					title: "Frontend engineering",
					text: "TypeScript, React, Next.js, Vue, and Nuxt. Complex product UI, design systems, performance, accessibility, and maintainable architecture.",
				},
				{
					number: "03",
					title: "Full-stack & data",
					text: "tRPC, NestJS, SQL, Zod, APIs, and Docker. Backend integrations, product instrumentation, Metabase funnels, and production diagnostics.",
				},
				{
					number: "04",
					title: "Delivery & leadership",
					text: "Coordinated delivery for four engineers, decomposed and prioritized work, clarified requirements, reviewed releases, interviewed developers, and mentored five interns.",
				},
			],
		},
		experience: {
			number: "04",
			label: "Evidence",
			title: "experience",
			company: "DOTSOLUTION LLC",
			role: "Frontend Engineer",
			period: "Mar 2024 — Jan 2026",
			descriptionLead: "Begemot AI, BOBR AI, InHelp, and other MVPs. ",
			description:
				"Built customer-facing features for Begemot AI and BOBR AI and operational tools for a university CRM. Worked from requirements and UX through implementation, analytics, release, and production support.",
			facts: [
				"Cut Begemot.ai LCP in half to approximately 2 seconds",
				"Shipped a full product redesign and a reusable component design system",
				"Built an Editor.js document editor from scratch with a Word-like workflow",
				"Migrated the legacy JavaScript codebase to TypeScript while supporting production",
				"Instrumented the product funnel and built key-metric dashboards in Metabase",
				"Coordinated delivery for a four-engineer team and resolved production-critical issues",
			],
			educationLabel: "Education",
			educationDegree: "BSc, Information Systems and Technology",
			educationInstitution: "Surgut State University",
			educationPeriod: "Graduation year: 2026",
		},
		contact: {
			number: "05",
			label: "Contact",
			title: "contact",
			description:
				"Open to products at different stages, from early launch to growth. I can contribute as a hands-on engineer or lead the technical delivery of a feature or product area.",
			telegram: "Message on Telegram",
			email: "Send an email",
			blog: "Telegram blog & cases",
			github: "GitHub",
		},
		footer: {
			statement: "From product problem to production.",
			credit: "Designed and built by scythe0x",
			location: "Russia / Remote",
			endLabel: "06 / END",
			since: "Professional frontend since March 2024",
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
			title: "404",
			action: "Return to scythe0x",
		},
	},
	ru: {
		meta: {
			title: "scythe0x — Product Engineer",
			description:
				"Product Engineer с сильной экспертизой во фронтенд-разработке. Веду фичи от продуктовой идеи до реализации, аналитики и запуска.",
		},
		navigation: {
			work: "work",
			about: "Обо мне",
			capabilities: "skills",
			contact: "contact",
			skip: "Перейти к содержанию",
			menu: "Меню",
			close: "Закрыть",
			homeLabel: "На главную scythe0x",
			primaryLabel: "Основная навигация",
			mobileLabel: "Мобильная навигация",
		},
		hero: {
			title: "scythe0x",
			person: "scythe0x",
			role: "Product Engineer с сильной экспертизой во фронтенд-разработке. Веду фичи от идеи и проектирования интерфейса до реализации по всему стеку, аналитики и запуска.",
			facts: [
				{ value: "4 млн+", label: "Пользователей Begemot.ai" },
				{
					value: "$3,4 млн+",
					label: "Выручка Begemot.ai за 2025 год",
				},
				{ value: "4 разработчика", label: "Координировал работу команды" },
			],
			primaryAction: "Смотреть кейсы",
			secondaryAction: "Обсудить проект",
			contactsLabel: "Контакты",
			channelLabel: "Telegram-канал",
		},
		work: {
			number: "01",
			label: "Избранные кейсы",
			title: "work",
			description:
				"Избранные продукты: моя зона ответственности, инженерные решения и результат, дошедший до пользователей.",
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
			title: "profile",
			paragraphs: [
				{
					lead: "Моя основная экспертиза — фронтенд-разработка. ",
					body: "При этом я не ограничиваюсь интерфейсом: участвую в постановке задачи, проектирую сценарии, работаю с бэкендом и аналитикой, выпускаю фичу и поддерживаю её после запуска.",
				},
				{
					lead: "Сначала разбираюсь в задаче. ",
					body: "Выясняю, какую проблему решаем, определяю границы фичи и выбираю решение, которое можно быстро выпустить и проверить по данным.",
				},
				{
					lead: "Довожу фичи до пользователей. ",
					body: "Учитываю производительность, нестандартные сценарии, диагностику ошибок и дальнейшую поддержку — не заканчиваю работу на готовом интерфейсе.",
				},
			],
			practice:
				"Разрабатываю пользовательские продукты от идеи до запуска и улучшаю их на основе данных.",
			practiceLabel: "SCYTHE0X / ЛИЧНАЯ ПРАКТИКА",
			sinceValue: "в 2 раза",
			sinceLabel: "Сократил LCP Begemot.ai",
			scaleValue: "Editor.js",
			scaleLabel: "Разработал редактор документов с нуля",
			launchLabel: "Курировал и менторил",
			launchValue: "5 стажёров",
		},
		capabilities: {
			number: "03",
			label: "Навыки",
			title: "skills",
			description:
				"Могу самостоятельно пройти весь путь от постановки задачи до запуска и оценки результата.",
			items: [
				{
					number: "01",
					title: "Работа над продуктом",
					text: "Постановка задачи, требования, пользовательские сценарии, реализация, аналитика и запуск. Превращаю сырую идею в понятную фичу и довожу её до пользователей.",
				},
				{
					number: "02",
					title: "Фронтенд-разработка",
					text: "TypeScript, React, Next.js, Vue и Nuxt. Сложные интерфейсы, дизайн-системы, производительность, доступность и поддерживаемая архитектура.",
				},
				{
					number: "03",
					title: "Бэкенд и данные",
					text: "tRPC, NestJS, SQL, Zod, API и Docker. Интеграции, продуктовые события, воронки в Metabase и диагностика проблем в рабочей среде.",
				},
				{
					number: "04",
					title: "Координация разработки",
					text: "Координировал работу четырёх разработчиков, декомпозировал и приоритизировал задачи, уточнял требования, контролировал релизы, проводил собеседования и менторил пять стажёров.",
				},
			],
		},
		experience: {
			number: "04",
			label: "Опыт",
			title: "experience",
			company: "ООО «ДОТСОЛЮШН»",
			role: "Фронтенд-разработчик",
			period: "март 2024 — январь 2026",
			descriptionLead: "Begemot AI, BOBR AI, InHelp и другие MVP. ",
			description:
				"Разрабатывал пользовательские фичи для Begemot AI и BOBR AI, а также внутренние инструменты для университетской CRM. Участвовал в постановке задач и проектировании интерфейсов, отвечал за реализацию, аналитику, выпуск и дальнейшую поддержку.",
			facts: [
				"Сократил LCP Begemot.ai вдвое — примерно до 2 секунд",
				"Выпустил полный редизайн продукта и переиспользуемую дизайн-систему",
				"С нуля разработал редактор документов на Editor.js со сценариями, близкими к Word",
				"Перевёл унаследованный код с JavaScript на TypeScript без остановки разработки и поддержки продукта",
				"Настроил продуктовую воронку и дашборды ключевых метрик в Metabase",
				"Координировал работу команды из четырёх разработчиков и устранял критические ошибки в рабочей среде",
			],
			educationLabel: "Образование",
			educationDegree:
				"Бакалавриат по направлению «Информационные системы и технологии»",
			educationInstitution: "Сургутский государственный университет",
			educationPeriod: "Год выпуска: 2026",
		},
		contact: {
			number: "05",
			label: "Контакты",
			title: "contact",
			description:
				"Интересны продукты на разных стадиях — от раннего запуска до масштабирования. Могу подключиться как разработчик или взять на себя техническое лидерство и выпуск отдельной фичи или направления.",
			telegram: "Написать в Telegram",
			email: "Написать на почту",
			blog: "Telegram-блог и кейсы",
			github: "GitHub",
		},
		footer: {
			statement: "От продуктовой задачи до запуска.",
			credit: "Дизайн и разработка: scythe0x",
			location: "Россия / Удалённо",
			endLabel: "06 / ФИНАЛ",
			since: "В коммерческой разработке с марта 2024 года",
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
			title: "404",
			action: "Вернуться к scythe0x",
		},
	},
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
	return dictionaries[locale];
}
