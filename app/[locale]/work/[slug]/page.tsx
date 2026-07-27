import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { CaseHeader } from "@/components/work/case-header";
import { caseContentLoaders } from "@/content/case-content";
import {
  caseSlugs,
  caseStudies,
  getCaseBySlug,
  localizeCase,
} from "@/content/case-data";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import { siteConfig } from "@/config/site-config";
import { getRequestOrigin } from "@/lib/request-url";

type CasePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    caseSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getCaseBySlug(slug);
  if (!project) return {};
  const localized = localizeCase(project, locale);
  const origin = await getRequestOrigin();

  return {
    title: project.title,
    description: localized.summary,
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: {
        en: `/en/work/${slug}`,
        ru: `/ru/work/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: `${project.title} — SCALAR`,
      description: localized.summary,
      url: `${origin}/${locale}/work/${slug}`,
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getCaseBySlug(slug);
  const loadContent = caseContentLoaders[locale][slug];
  if (!project || !loadContent) notFound();

  const localized = localizeCase(project, locale);
  const dictionary = getDictionary(locale);
  const { default: Content } = await loadContent();
  const origin = await getRequestOrigin();
  const nextProject =
    caseStudies[(caseStudies.findIndex((item) => item.slug === slug) + 1) % caseStudies.length];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: localized.summary,
    author: {
      "@type": "Person",
      name: siteConfig.person,
    },
    url: `${origin}/${locale}/work/${slug}`,
  };

  return (
    <main id="main-content" className="case-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CaseHeader
        project={localized}
        locale={locale}
        dictionary={dictionary}
      />
      {project.evolvedAfterInvolvement ? (
        <p className="case-page__note">{dictionary.casePage.contributionNote}</p>
      ) : null}
      <article className="case-article">
        <Content />
      </article>
      <nav className="next-case" aria-label={dictionary.casePage.next}>
        <span>{dictionary.casePage.next}</span>
        <Link href={`/${locale}/work/${nextProject.slug}`}>
          {nextProject.title}
          <ArrowRight aria-hidden="true" />
        </Link>
      </nav>
    </main>
  );
}
