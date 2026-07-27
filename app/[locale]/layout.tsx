import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
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
      template: `%s — SCALAR`,
    },
    description: dictionary.meta.description,
    keywords: [
      "Sergey Shabalin",
      "SCALAR",
      "Product Engineer",
      "Creative Developer",
      "Frontend Engineer",
      "Next.js",
      "UX",
    ],
    authors: [{ name: "Sergey Shabalin", url: origin }],
    creator: "Sergey Shabalin",
    alternates: {
      canonical: `/${rawLocale}`,
      languages: { en: "/en", ru: "/ru" },
    },
    openGraph: {
      type: "website",
      siteName: "SCALAR",
      locale: rawLocale === "en" ? "en_US" : "ru_RU",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "SCALAR — Product engineering by Sergey Shabalin",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: ["/og.png"],
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
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a className="skip-link" href="#main-content">
          {dictionary.navigation.skip}
        </a>
        <SiteHeader
          locale={locale}
          navigation={dictionary.navigation}
          availability={dictionary.availability}
        />
        {children}
        <SiteFooter locale={locale} dictionary={dictionary} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
