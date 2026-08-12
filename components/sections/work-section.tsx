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
  return (
    <section
      id="work"
      className="section work-section"
      data-background-scene="work"
    >
      <Reveal variant="heading" amount={0.3}>
        <SectionHeading
          title={dictionary.work.title}
          description={dictionary.work.description}
        />
      </Reveal>

      <div className="work-group">
        {caseStudies.map((project, index) => (
          <Reveal
            key={project.slug}
            delay={index * 0.14}
            variant="panel"
            amount={0.08}
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
