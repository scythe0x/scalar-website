import type { Dictionary } from "@/content/dictionaries";
import { caseStudies } from "@/content/case-data";
import type { Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ProjectRow } from "@/components/work/project-row";

type WorkSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function WorkSection({ locale, dictionary }: WorkSectionProps) {
  const primary = caseStudies.filter((project) => project.featured);
  const supporting = caseStudies.filter((project) => !project.featured);

  return (
    <section
      id="work"
      className="section work-section"
      data-background-scene="work"
    >
      <Reveal>
        <SectionHeading
          number={dictionary.work.number}
          label={dictionary.work.label}
          title={dictionary.work.title}
          description={dictionary.work.description}
        />
      </Reveal>

      <div className="work-group">
        <span className="work-group__label">{dictionary.work.primary}</span>
        {primary.map((project) => (
          <ProjectRow
            key={project.slug}
            project={project}
            locale={locale}
            dictionary={dictionary}
          />
        ))}
      </div>

      <div className="work-group work-group--supporting">
        <span className="work-group__label">{dictionary.work.supporting}</span>
        {supporting.map((project) => (
          <ProjectRow
            key={project.slug}
            project={project}
            locale={locale}
            dictionary={dictionary}
          />
        ))}
      </div>
    </section>
  );
}
