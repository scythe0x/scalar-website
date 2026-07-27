import type { MetadataRoute } from "next";
import { caseSlugs } from "@/content/case-data";
import { locales } from "@/lib/i18n";
import { getRequestOrigin } from "@/lib/request-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = await getRequestOrigin();
  const homePages = locales.map((locale) => ({
    url: `${origin}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: {
        en: `${origin}/en`,
        ru: `${origin}/ru`,
      },
    },
  }));

  const casePages = locales.flatMap((locale) =>
    caseSlugs.map((slug) => ({
      url: `${origin}/${locale}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${origin}/en/work/${slug}`,
          ru: `${origin}/ru/work/${slug}`,
        },
      },
    })),
  );

  return [...homePages, ...casePages];
}
