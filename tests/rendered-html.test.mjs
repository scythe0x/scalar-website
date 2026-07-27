import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("redirects the root route to English", async () => {
  const response = await render("/");
  assert.equal(response.status, 307);
  assert.equal(new URL(response.headers.get("location")).pathname, "/en");
});

test("server-renders complete English and Russian homepages", async () => {
  const [englishResponse, russianResponse] = await Promise.all([
    render("/en"),
    render("/ru"),
  ]);

  assert.equal(englishResponse.status, 200);
  assert.equal(russianResponse.status, 200);

  const [english, russian] = await Promise.all([
    englishResponse.text(),
    russianResponse.text(),
  ]);

  assert.match(english, /<html lang="en"/);
  assert.match(english, /Product engineering for ideas ready to scale/);
  assert.match(english, /Begemot AI/);
  assert.match(english, /BOBR AI/);
  assert.match(english, /InHelp/);
  assert.match(english, /id="main-content"/);
  assert.match(english, /Skip to content/);

  assert.match(russian, /<html lang="ru"/);
  assert.match(
    russian,
    /Продуктовая разработка для идей, готовых к масштабированию/,
  );
  assert.match(russian, /Открыт к предложениям/);
  assert.match(russian, /Сообщество SCALAR/);
  assert.match(russian, /1 неделя/);
  assert.match(russian, /Продуктовая разработка с 2017 года/);
});

test("server-renders localized MDX case studies", async () => {
  const [englishResponse, russianResponse] = await Promise.all([
    render("/en/work/bobr-ai"),
    render("/ru/work/begemot-ai"),
  ]);

  assert.equal(englishResponse.status, 200);
  assert.equal(russianResponse.status, 200);

  const [english, russian] = await Promise.all([
    englishResponse.text(),
    russianResponse.text(),
  ]);

  assert.match(english, /The real problem behind AI presentations/);
  assert.match(english, /one week/i);
  assert.match(russian, /Сгенерированному документу нужен настоящий редактор/);
  assert.match(russian, /1M\+/);
  assert.match(russian, /Период/);
});

test("contains no starter preview code or metadata", async () => {
  const [packageJson, rootPage] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/(root)/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(rootPage, /codex-preview|SkeletonPreview/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../app/_sites-preview/preview.css", import.meta.url)));
});
