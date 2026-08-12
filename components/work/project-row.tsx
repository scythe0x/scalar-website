import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import type { CaseStudy } from "@/content/case-data";
import type { Locale } from "@/lib/i18n";
import { localizeCase } from "@/content/case-data";

type ProjectRowProps = {
  project: CaseStudy;
  locale: Locale;
  dictionary: Dictionary;
};

export function ProjectRow({
  project,
  locale,
  dictionary,
}: ProjectRowProps) {
  const localized = localizeCase(project, locale);
  const href = `/${locale}/work/${project.slug}`;

  return (
    <article className="project-row" data-featured={project.featured}>
      <Link
        href={href}
        className="project-row__link"
        aria-label={`${dictionary.work.openCase}: ${project.title}`}
      >
        <div className="project-row__identity">
          <h3>{project.title}</h3>
          <p className="project-row__type">{localized.type}</p>
          <ul className="project-row__tags" aria-label={dictionary.casePage.tagsLabel}>
            {project.tags.slice(0, 4).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="project-row__contribution">
          <p className="project-row__role">{localized.role}</p>
          <p className="project-row__summary">{localized.summary}</p>
        </div>
        <span className="project-row__action" aria-hidden="true">
          <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.4} />
        </span>
      </Link>
    </article>
  );
}
