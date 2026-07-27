import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/config/site-config";
import { AsciiField } from "@/components/motion/ascii-field";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function HeroSection({ locale, dictionary }: HeroSectionProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <AsciiField />
      <div className="grain" aria-hidden="true" />
      <div className="hero__coordinates" aria-hidden="true">
        <span>SC/01</span>
        <span>61.25°N / {dictionary.hero.systemStatus}</span>
        <span>∞</span>
      </div>

      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="availability">
            <span className="availability__signal" aria-hidden="true" />
            {dictionary.availability}
          </span>
          <span>{dictionary.hero.eyebrow}</span>
        </div>

        <div className="hero__title-wrap">
          <h1 id="hero-title">{dictionary.hero.title}</h1>
          <span className="hero__scalar-mark" aria-hidden="true">
            [ 01→∞ ]
          </span>
        </div>

        <div className="hero__information">
          <div>
            <p className="hero__person">{dictionary.hero.person}</p>
            <p className="hero__role">{dictionary.hero.role}</p>
          </div>
          <div className="hero__pitch">
            <p className="hero__statement">{dictionary.hero.statement}</p>
            <p>{dictionary.hero.description}</p>
          </div>
        </div>

        <div className="hero__actions">
          <Button asChild variant="primary">
            <Link href={`/${locale}#work`}>
              {dictionary.hero.primaryAction}
              <ArrowDown aria-hidden="true" size={17} />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link
              href={siteConfig.socialLinks.telegram}
              target="_blank"
              rel="noreferrer"
            >
              {dictionary.hero.secondaryAction}
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </Button>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>{dictionary.hero.scroll}</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
