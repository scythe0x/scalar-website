import type { Dictionary } from "@/content/dictionaries";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type ExperienceSectionProps = {
  dictionary: Dictionary;
};

export function ExperienceSection({ dictionary }: ExperienceSectionProps) {
  return (
    <section
      className="section experience-section"
      data-background-scene="experience"
    >
      <Reveal variant="heading" amount={0.3}>
        <SectionHeading
          title={dictionary.experience.title}
        />
      </Reveal>
      <Reveal className="experience-card" variant="panel" amount={0.12}>
        <div>
          <div className="experience-card__heading">
            <div>
              <h3>{dictionary.experience.company}</h3>
              <p>{dictionary.experience.role}</p>
            </div>
            <span>{dictionary.experience.period}</span>
          </div>
          <p className="experience-card__description">
            {dictionary.experience.description}
          </p>
          <ul>
            {dictionary.experience.facts.map((fact) => (
              <li key={fact}>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal variant="row" amount={0.3}>
        <div className="education-card">
          <div>
            <span>{dictionary.experience.educationLabel}</span>
            <strong>{dictionary.experience.educationDegree}</strong>
          </div>
          <div>
            <p>{dictionary.experience.educationInstitution}</p>
            <span>{dictionary.experience.educationPeriod}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
