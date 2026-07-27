import Link from "next/link";
import Image from "next/image";
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
        <div className="project-row__metrics">
          {localized.metrics.slice(0, 2).map((metric) => (
            <div className="project-row__metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
        <div className="project-row__action">
          <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.4} />
        </div>
        {project.previewImage && project.previewAlt ? (
          <div className="project-row__preview">
            <Image
              src={project.previewImage}
              alt={project.previewAlt[locale]}
              fill
              sizes="(max-width: 760px) 90vw, 36vw"
            />
          </div>
        ) : null}
      </Link>
    </article>
  );
}
