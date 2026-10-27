# scythe0x portfolio

Bilingual portfolio for scythe0x. The site is built around a noir editorial system, a generative ASCII hero, and maintainable MDX case studies.

## Stack

- Next.js App Router with TypeScript
- React
- Tailwind CSS
- shadcn-style composable UI primitives with Radix Slot and CVA
- MDX with GFM tables and heading slugs
- Motion for restrained interface animation
- Zod for case metadata validation
- Vercel Analytics and Speed Insights

## Development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm run build
npm test
```

No environment variables are required. Public identity, links, and feature flags belong in `config/site-config.ts`; `.env` should only be introduced for future private credentials.

## Content architecture

Homepage copy lives in:

```text
content/dictionaries.ts
```

Case metadata and homepage ordering live in:

```text
content/case-data.ts
```

Case articles live in:

```text
content/cases/en/
content/cases/ru/
```

Each case uses the same stable Latin slug in both languages. Optional metadata is hidden when absent, so unknown dates or URLs should be omitted rather than replaced with placeholder text.

Reusable UI primitives live in `components/ui/`. New primitives should follow the same shadcn pattern: typed props, composable variants, `data-slot` hooks, and centralized class merging through `cn()`.

## Adding a case

1. Add the project metadata to `content/case-data.ts`.
2. Add English and Russian MDX files with the same slug.
3. Register both imports in `content/case-content.ts`.
4. Add media under `public/media/cases/<slug>/`.
5. Run typecheck, build, and tests.

Use factual language. Do not add metrics, technologies, clients, or responsibilities unless they can be verified.

## MDX components

The following components are globally available in every case article:

```mdx
<MetricGrid>
  <Metric value="1M+">users</Metric>
</MetricGrid>

<Callout label="Product principle">Important editorial statement.</Callout>

<CaseVisual label="System map" tone="blue">
  {`INPUT → PROCESS → OUTPUT`}
</CaseVisual>

<ProcessSteps>### 01 — First step Step explanation.</ProcessSteps>

<Figure
  src="/media/cases/example/screen.webp"
  alt="Accessible description"
  caption="Optional caption"
/>

<MediaSplit side="right">
  <div>Text or another MDX block</div>
  <Figure src="/media/cases/example/screen.webp" alt="Description" />
</MediaSplit>

<Video
  src="/media/cases/example/demo.webm"
  poster="/media/cases/example/poster.webp"
  label="Product flow demonstration"
/>
```

Standard headings, paragraphs, lists, links, blockquotes, code, and responsive GFM tables are supported.

## Media recommendations

- Use AVIF or WebP for still images.
- Use WebM or MP4 instead of GIF for long or large animations.
- Provide a poster for every video.
- Keep truthful product screenshots; do not replace them with fabricated UI.
- Write meaningful alt text for informative images. Decorative media should use an empty alt value.

## Social links

Telegram, Telegram blog, GitHub, email, and future LinkedIn/X entries are configured in `config/site-config.ts`.

Empty LinkedIn and X values are intentionally not rendered. Add the real public URL when available.

## Localization

English is the default locale at `/en`; Russian is available at `/ru`. The switcher preserves the current case route.

When changing content:

- update both locale entries in `content/dictionaries.ts`;
- keep both MDX files aligned in meaning;
- translate metadata, accessible labels, and error states—not only visible paragraphs.

## Accessibility and performance

- Server components are used by default.
- Client components are limited to the menu, language switcher, reveal motion, and ASCII canvas.
- The canvas reduces density on mobile and stops when the tab is hidden.
- Reduced-motion preferences disable movement.
- All essential project information remains available without hover.
- The heavy visual layer is not required for content or navigation.

## Deployment

The project uses the standard Next.js build and can be connected to Vercel without a custom adapter.

Vercel Analytics begins reporting automatically after a Vercel deployment. Case routes provide individual page-view separation without a custom backend.
