import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(pathname) {
  return readFile(new URL(pathname, root), "utf8");
}

test("uses a standard Next.js toolchain without managed hosting", async () => {
  const packageJson = JSON.parse(await source("package.json"));

  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.scripts.start, "next start");
  assert.equal(packageJson.dependencies.vinext, undefined);
  assert.equal(packageJson.devDependencies?.vinext, undefined);
  assert.equal(packageJson.devDependencies?.wrangler, undefined);
  assert.equal(packageJson.devDependencies?.["@cloudflare/vite-plugin"], undefined);
  await assert.rejects(access(new URL(".openai/hosting.json", root)));
  await assert.rejects(access(new URL("vite.config.ts", root)));
});

test("contains complete English and Russian portfolio content", async () => {
  const [dictionary, cases] = await Promise.all([
    source("content/dictionaries.ts"),
    source("content/case-data.ts"),
  ]);

  assert.match(dictionary, /Product Engineer/);
  assert.match(dictionary, /full-stack implementation/);
  assert.match(dictionary, /март 2024 — январь 2026/);
  assert.match(dictionary, /ООО «ДОТСОЛЮШН»/);
  assert.match(cases, /Begemot AI/);
  assert.match(cases, /BOBR AI/);
  assert.match(cases, /InHelp/);
  assert.doesNotMatch(cases, /1 млн\+|1M\+/);
});

test("contains localized MDX case studies", async () => {
  const [english, russian] = await Promise.all([
    source("content/cases/en/bobr-ai.mdx"),
    source("content/cases/ru/begemot-ai.mdx"),
  ]);

  assert.match(english, /The real problem behind AI presentations/);
  assert.doesNotMatch(english, /one week/i);
  assert.match(russian, /Сгенерированному документу нужен настоящий редактор/);
  assert.doesNotMatch(russian, /1 млн\+/);
});

test("contains no starter preview code", async () => {
  const [packageJson, rootPage] = await Promise.all([
    source("package.json"),
    source("app/(root)/page.tsx"),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(rootPage, /codex-preview|SkeletonPreview/);
  await assert.rejects(
    access(new URL("app/_sites-preview/SkeletonPreview.tsx", root)),
  );
  await assert.rejects(access(new URL("app/_sites-preview/preview.css", root)));
});

test("contains no previous public identity", async () => {
  const sources = await Promise.all([
    source("content/dictionaries.ts"),
    source("config/site-config.ts"),
    source("components/layout/site-header.tsx"),
    source("app/[locale]/layout.tsx"),
    source("README.md"),
  ]);

  const combined = sources.join("\n");
  assert.doesNotMatch(
    combined,
    /SCALAR|Sergey|Сергей|Shabalin|Шабалин|zerocommits|scalarops|unvalidating|whoiscyberial/,
  );
  assert.match(combined, /scythe0x/);
});

test("uses restrained gothic display typography", async () => {
  const [layout, dictionary, styles] = await Promise.all([
    source("app/[locale]/layout.tsx"),
    source("content/dictionaries.ts"),
    source("app/globals.css"),
  ]);

  assert.match(layout, /Manufacturing_Consent/);
  assert.match(styles, /--font-manufacturing-consent/);
  assert.match(styles, /\.gothic-bloom/);
  assert.match(styles, /text-shadow:/);
  for (const title of ["work", "profile", "skills", "experience", "contact"]) {
    assert.match(dictionary, new RegExp(`title: "${title}"`));
  }
});

test("renders an animated ASCII scythe and preserves the legacy field", async () => {
  const background = await source(
    "components/background/scroll-scene-background.tsx",
  );

  assert.match(background, /logo\.src = "\/scythe-logo\.svg"/);
  assert.match(background, /context\.fillText\(GLYPHS\[glyphIndex\]/);
  assert.match(background, /SCYTHE_SCROLL_KEYFRAMES/);
  assert.match(background, /PARTICLE_GLYPHS/);
  assert.match(background, /cubicBezierEaseInOut/);
  assert.match(background, /cameraDriftY/);
  assert.match(background, /Previous procedural ASCII field, preserved/);
  assert.match(background, /<LegacyScrollSceneBackground \/>/);
});
