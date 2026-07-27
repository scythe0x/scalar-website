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
      <Reveal>
        <SectionHeading
          number={dictionary.experience.number}
          label={dictionary.experience.label}
          title={dictionary.experience.title}
        />
      </Reveal>
      <div className="experience-card">
        <div className="experience-card__heading">
          <div>
            <h3>{dictionary.experience.company}</h3>
            <p>{dictionary.experience.role}</p>
          </div>
          <span>{dictionary.experience.period}</span>
        </div>
        <p className="experience-card__description">
          <strong>{dictionary.experience.descriptionLead}</strong>
          {dictionary.experience.description}
        </p>
        <ul>
          {dictionary.experience.facts.map((fact, index) => (
            <li key={fact}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {fact}
            </li>
          ))}
        </ul>
      </div>
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
    </section>
  );
}
