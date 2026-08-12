"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";

type SiteHeaderProps = {
  locale: Locale;
  navigation: Dictionary["navigation"];
};

export function SiteHeader({
  locale,
  navigation,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const home = `/${locale}`;
  const links = [
    { href: `${home}#work`, label: navigation.work },
    { href: `${home}#capabilities`, label: navigation.capabilities },
    { href: `${home}#contact`, label: navigation.contact },
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          href={home}
          className="wordmark"
          aria-label={navigation.homeLabel}
        >
          <span className="wordmark__icon" aria-hidden="true">
            <Image
              src="/scythe-logo.svg"
              alt=""
              width={32}
              height={32}
              priority
              unoptimized
            />
          </span>
        </Link>

        <nav
          className="site-header__nav"
          aria-label={navigation.primaryLabel}
        >
          {links.map((link) => (
            <Link className="gothic-bloom" key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher locale={locale} />

        <button
          type="button"
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? navigation.close : navigation.menu}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className="mobile-navigation"
        data-open={open}
        aria-label={navigation.mobileLabel}
      >
        {links.map((link) => (
          <Link
            className="gothic-bloom"
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
