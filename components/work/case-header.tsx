import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { LocalizedCase } from "@/content/case-data";

type CaseHeaderProps = {
  project: LocalizedCase;
  locale: Locale;
  dictionary: Dictionary;
};

export function CaseHeader({
  project,
  locale,
  dictionary,
}: CaseHeaderProps) {
  return (
    <header className="case-header">
      <Link href={`/${locale}#work`} className="case-header__back">
        <ArrowLeft aria-hidden="true" size={16} />
        {dictionary.casePage.back}
      </Link>
      <div className="case-header__index">
        <span>{String(project.order).padStart(2, "0")}</span>
        <span>{project.eyebrow}</span>
      </div>
      <h1>{project.title}</h1>
      <p className="case-header__summary">{project.summary}</p>
      <div className="case-header__meta">
        <div>
          <span>{dictionary.casePage.role}</span>
          <p>{project.role}</p>
        </div>
        <div>
          <span>{dictionary.casePage.type}</span>
          <p>{project.type}</p>
        </div>
        {project.year ? (
          <div>
            <span>{dictionary.casePage.period}</span>
            <p>{project.year}</p>
          </div>
        ) : null}
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            {dictionary.casePage.live}
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        ) : null}
      </div>
      <ul
        className="case-header__tags"
        aria-label={dictionary.casePage.tagsLabel}
      >
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="case-header__metrics">
        {project.metrics.map((metric) => (
          <div key={`${metric.value}-${metric.label}`}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </header>
  );
}
