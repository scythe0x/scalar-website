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
  const number = String(project.order).padStart(2, "0");

  return (
    <article className="project-row" data-featured={project.featured}>
      <Link
        href={`/${locale}/work/${project.slug}`}
        className="project-row__link"
        aria-label={`${dictionary.work.openCase}: ${project.title}`}
      >
        <div className="project-row__number" aria-hidden="true">
          {number}
        </div>
        <div className="project-row__title">
          <span className="project-row__eyebrow">{localized.eyebrow}</span>
          <h3>{project.title}</h3>
        </div>
        <p className="project-row__summary">{localized.summary}</p>
        <div className="project-row__metric">
          <strong>{localized.metrics[0]?.value}</strong>
          <span>{localized.metrics[0]?.label}</span>
        </div>
        <div className="project-row__action">
          <span>{dictionary.work.openCase}</span>
          <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.4} />
        </div>
        <div className="project-row__visual" aria-hidden="true">
          <span className="project-row__visual-index">{number}</span>
          <span className="project-row__visual-title">{project.title}</span>
          <div className="project-row__ascii">{localized.visual}</div>
        </div>
      </Link>
    </article>
  );
}
