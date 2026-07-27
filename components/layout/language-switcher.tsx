"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const targetLocale = otherLocale(locale);
  const targetPath = pathname.replace(/^\/(en|ru)(?=\/|$)/, `/${targetLocale}`);

  return (
    <Link
      href={targetPath}
      className="language-switcher"
      hrefLang={targetLocale}
      aria-label={locale === "en" ? "Переключить на русский" : "Switch to English"}
    >
      <span className="language-switcher__active">{locale.toUpperCase()}</span>
      <span aria-hidden="true">/</span>
      <span>{targetLocale.toUpperCase()}</span>
    </Link>
  );
}
