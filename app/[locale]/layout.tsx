import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Manufacturing_Consent } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/layout/site-header";
import { FilmGrain } from "@/components/background/film-grain";
import { ScrollSceneBackground } from "@/components/background/scroll-scene-background";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { siteConfig } from "@/config/site-config";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getRequestOrigin } from "@/lib/request-url";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const manufacturingConsent = Manufacturing_Consent({
  variable: "--font-manufacturing-consent",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);
  const origin = await getRequestOrigin();

  return {
    metadataBase: new URL(origin),
    title: {
      default: dictionary.meta.title,
      template: `%s — scythe0x`,
    },
    description: dictionary.meta.description,
    keywords: [
      "scythe0x",
      "Product Engineer",
      "Full-stack Engineer",
      "Frontend Engineer",
      "Next.js",
      "UX",
    ],
    authors: [{ name: "scythe0x", url: origin }],
    creator: "scythe0x",
    alternates: {
      canonical: `/${rawLocale}`,
      languages: { en: "/en", ru: "/ru" },
    },
    openGraph: {
      type: "website",
      siteName: "scythe0x",
      locale: rawLocale === "en" ? "en_US" : "ru_RU",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: [
        {
          url: "/scythe-logo.svg",
          width: 1254,
          height: 1254,
          alt: "scythe0x — Product Engineer portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: ["/scythe-logo.svg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manufacturingConsent.variable} antialiased`}
      >
        <ScrollSceneBackground />
        <FilmGrain />
        {siteConfig.features.customCursor ? <CustomCursor /> : null}
        <ScrollProgress />
        <a className="skip-link" href="#main-content">
          {dictionary.navigation.skip}
        </a>
        <SiteHeader
          locale={locale}
          navigation={dictionary.navigation}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
