import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/config/site-config";
import { LanguageSwitcher } from "./language-switcher";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__field" aria-hidden="true">
        <span>+ + + +</span>
        <span>{dictionary.footer.systemField}</span>
        <span>[ 01 → ∞ ]</span>
      </div>
      <div className="site-footer__statement">
        <span className="section-label">{dictionary.footer.endLabel}</span>
        <p>{dictionary.footer.statement}</p>
      </div>
      <div className="site-footer__grid">
        <div>
          <Link href={`/${locale}`} className="wordmark wordmark--footer">
            S/SCALAR
          </Link>
          <p>{dictionary.footer.credit}</p>
        </div>
        <div>
          <span className="footer-label">{dictionary.navigation.contact}</span>
          <Link href={siteConfig.socialLinks.telegram} target="_blank">
            Telegram
          </Link>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
        <div>
          <span className="footer-label">{dictionary.footer.location}</span>
          <LanguageSwitcher locale={locale} />
          <a href="#top">{dictionary.footer.backToTop} ↑</a>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()}</span>
        <span>{dictionary.footer.since}</span>
      </div>
    </footer>
  );
}
