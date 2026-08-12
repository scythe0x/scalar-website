import type { Dictionary } from "@/content/dictionaries";
import { Reveal } from "@/components/motion/reveal";
import { SequenceGrid } from "@/components/motion/sequence-grid";
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
      <Reveal variant="heading" amount={0.3}>
        <SectionHeading
          title={dictionary.capabilities.title}
          description={dictionary.capabilities.description}
        />
      </Reveal>
      <SequenceGrid
        className="capabilities-list"
        directions={["down", "down", "down", "down"]}
        order={[0, 1, 2, 3]}
        variant="panel"
      >
        {dictionary.capabilities.items.map((item) => (
          <article key={item.title} className="capability">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </SequenceGrid>
    </section>
  );
}
