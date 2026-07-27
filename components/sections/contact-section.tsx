import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { siteConfig } from "@/config/site-config";
import { Reveal } from "@/components/motion/reveal";
import { CopyEmailButton } from "./copy-email-button";

type ContactSectionProps = {
  dictionary: Dictionary;
};

export function ContactSection({ dictionary }: ContactSectionProps) {
  const links = [
    {
      label: dictionary.contact.telegram,
      value: "@zerocommits",
      href: siteConfig.socialLinks.telegram,
    },
    {
      label: dictionary.contact.email,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      label: dictionary.contact.community,
      value: "t.me/scalarops",
      href: siteConfig.socialLinks.community,
    },
    {
      label: dictionary.contact.github,
      value: "whoiscyberial",
      href: siteConfig.socialLinks.github,
    },
  ];

  return (
    <section id="contact" className="section contact-section">
      <Reveal>
        <div className="contact-section__heading">
          <div className="section-heading__meta">
            <span aria-hidden="true">{dictionary.contact.number}</span>
            <span>{dictionary.contact.label}</span>
          </div>
          <h2>{dictionary.contact.title}</h2>
          <p>{dictionary.contact.description}</p>
        </div>
      </Reveal>
      <div className="contact-list">
        {links.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span>{link.label}</span>
            <strong>{link.value}</strong>
            <ArrowUpRight aria-hidden="true" size={22} strokeWidth={1.4} />
          </a>
        ))}
      </div>
      <CopyEmailButton
        email={siteConfig.email}
        label={dictionary.contact.copy}
        copiedLabel={dictionary.contact.copied}
      />
    </section>
  );
}
