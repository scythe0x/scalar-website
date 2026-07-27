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
        <Reveal direction="left" distance={18}>
          <span className="work-group__label">{dictionary.work.primary}</span>
        </Reveal>
        {primary.map((project, index) => (
          <Reveal
            key={project.slug}
            delay={index * 0.06}
            direction="left"
            distance={34}
            amount={0.12}
          >
            <ProjectRow
              project={project}
              locale={locale}
              dictionary={dictionary}
            />
          </Reveal>
        ))}
      </div>

      <div className="work-group work-group--supporting">
        <Reveal direction="left" distance={18}>
          <span className="work-group__label">{dictionary.work.supporting}</span>
        </Reveal>
        {supporting.map((project, index) => (
          <Reveal
            key={project.slug}
            delay={index * 0.05}
            direction="left"
            distance={28}
            amount={0.12}
          >
            <ProjectRow
              project={project}
              locale={locale}
              dictionary={dictionary}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
