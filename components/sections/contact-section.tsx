import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { siteConfig } from "@/config/site-config";
import { Reveal } from "@/components/motion/reveal";
import { SequenceGrid } from "@/components/motion/sequence-grid";

type ContactSectionProps = {
  dictionary: Dictionary;
};

export function ContactSection({ dictionary }: ContactSectionProps) {
  const links = [
    {
      label: dictionary.contact.telegram,
      value: "@scythe0xwork",
      href: siteConfig.socialLinks.telegram,
    },
    {
      label: dictionary.contact.email,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      label: dictionary.contact.blog,
      value: "@scythe0xblog",
      href: siteConfig.socialLinks.blog,
    },
    {
      label: dictionary.contact.github,
      value: "scythe0x",
      href: siteConfig.socialLinks.github,
    },
  ];

  return (
    <section
      id="contact"
      className="section contact-section"
      data-background-scene="contact"
    >
      <Reveal variant="heading" amount={0.3}>
        <div className="contact-section__heading">
          <h2 className="gothic-bloom">{dictionary.contact.title}</h2>
          <p>{dictionary.contact.description}</p>
        </div>
      </Reveal>
      <SequenceGrid
        className="contact-grid"
        directions={["down", "down", "down", "down"]}
        order={[0, 1, 2, 3]}
        variant="panel"
        itemClassNames={["contact-grid__primary"]}
      >
        {links.map((link) => (
          <a
            key={link.href}
            data-primary={link.href === links[0].href}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <span className="contact-grid__label">{link.label}</span>
            <strong>{link.value}</strong>
            <ArrowUpRight aria-hidden="true" size={24} strokeWidth={1.3} />
          </a>
        ))}
      </SequenceGrid>
    </section>
  );
}
