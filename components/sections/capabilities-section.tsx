import type { Dictionary } from "@/content/dictionaries";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type CapabilitiesSectionProps = {
  dictionary: Dictionary;
};

export function CapabilitiesSection({
  dictionary,
}: CapabilitiesSectionProps) {
  return (
    <section
      id="capabilities"
      className="section capabilities-section"
      data-background-scene="capabilities"
    >
      <Reveal>
        <SectionHeading
          number={dictionary.capabilities.number}
          label={dictionary.capabilities.label}
          title={dictionary.capabilities.title}
          description={dictionary.capabilities.description}
        />
      </Reveal>
      <div className="capabilities-list">
        {dictionary.capabilities.items.map((item, index) => (
          <Reveal key={item.number} delay={index * 0.05}>
            <article className="capability">
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
