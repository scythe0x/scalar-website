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

  assert.match(dictionary, /Products built beyond the ticket/);
  assert.match(dictionary, /Не просто закрываю задачи — развиваю продукт/);
  assert.match(dictionary, /Нужен разработчик, который думает о продукте/);
  assert.match(cases, /Begemot AI/);
  assert.match(cases, /BOBR AI/);
  assert.match(cases, /InHelp/);
  assert.match(cases, /1 млн\+/);
});

test("contains localized MDX case studies", async () => {
  const [english, russian] = await Promise.all([
    source("content/cases/en/bobr-ai.mdx"),
    source("content/cases/ru/begemot-ai.mdx"),
  ]);

  assert.match(english, /The real problem behind AI presentations/);
  assert.match(english, /one week/i);
  assert.match(russian, /Сгенерированному документу нужен настоящий редактор/);
  assert.match(russian, /1 млн\+/);
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
