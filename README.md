# scythe0x portfolio

A personal portfolio with selected frontend and design work, case studies, and contact links. Available in English and Russian.

[view portfolio](https://scalar-website-eight.vercel.app) · [development guide](docs/development.md)

## features

- Bilingual pages and case studies, with a language switcher that preserves the current project.
- MDX articles with reusable components for figures, videos, callouts, and process steps.
- A procedural canvas background and interface animations with reduced-motion support.
- Localized metadata, a sitemap, and structured profile data.

## stack

Next.js App Router · React · TypeScript · Tailwind CSS · MDX · Motion · Zod

## run locally

Requires Node.js 22.13 or later and npm. No environment variables or external services are required for local development.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). English is available at `/en`, Russian at `/ru`.

## project structure

| path                      | purpose                                       |
| ------------------------- | --------------------------------------------- |
| `app/`                    | routes, layouts, metadata, and global styles  |
| `components/`             | page sections, UI, motion, and MDX components |
| `config/site-config.ts`   | identity, contact links, and feature flags    |
| `content/dictionaries.ts` | interface copy in both languages              |
| `content/case-data.ts`    | case metadata and ordering                    |
| `content/cases/{en,ru}/`  | case study articles                           |
| `public/media/cases/`     | case study media                              |

## checks

```bash
npm run lint
npm run typecheck
npm test
```

`npm test` builds the site and checks the rendered HTML. For a production build alone, run `npm run build`.

The [development guide](docs/development.md) covers adding cases, MDX components, media, localization, and deployment.
