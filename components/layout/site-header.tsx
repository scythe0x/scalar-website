"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";

type SiteHeaderProps = {
  locale: Locale;
  navigation: Dictionary["navigation"];
  availability: string;
};

export function SiteHeader({
  locale,
  navigation,
  availability,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const home = `/${locale}`;
  const links = [
    { href: `${home}#work`, label: navigation.work },
    { href: `${home}#about`, label: navigation.about },
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
          <span aria-hidden="true">S/</span>
          <span>SCALAR</span>
        </Link>

        <div className="availability site-header__availability">
          <span className="availability__signal" aria-hidden="true" />
          <span>{availability}</span>
        </div>

        <nav
          className="site-header__nav"
          aria-label={navigation.primaryLabel}
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
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
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {link.label}
          </Link>
        ))}
        <div className="mobile-navigation__footer">
          <div className="availability">
            <span className="availability__signal" aria-hidden="true" />
            <span>{availability}</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
