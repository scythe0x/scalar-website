import type { Dictionary } from "@/content/dictionaries";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type AboutSectionProps = {
  dictionary: Dictionary;
};

export function AboutSection({ dictionary }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="section about-section"
      data-background-scene="about"
    >
      <Reveal>
        <SectionHeading
          number={dictionary.about.number}
          label={dictionary.about.label}
          title={dictionary.about.title}
        />
      </Reveal>
      <div className="about-section__grid">
        <Reveal className="about-section__manifesto">
          <span>{dictionary.about.scalarLabel}</span>
          <p>{dictionary.about.scalar}</p>
        </Reveal>
        <div className="about-section__copy">
          {dictionary.about.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph.lead} delay={index * 0.06}>
              <p>
                <strong>{paragraph.lead}</strong>
                {paragraph.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="proof-strip" aria-label="Selected professional facts">
        <div>
          <strong>2017</strong>
          <span>{dictionary.about.sinceLabel}</span>
        </div>
        <div>
          <strong>{dictionary.about.scaleValue}</strong>
          <span>{dictionary.about.scaleLabel}</span>
        </div>
        <div>
          <strong>{dictionary.about.launchValue}</strong>
          <span>{dictionary.about.launchLabel}</span>
        </div>
      </div>
    </section>
  );
}
