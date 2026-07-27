import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  number: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  number,
  label,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("section-heading", className)}>
      <div className="section-heading__meta">
        <span aria-hidden="true">{number}</span>
        <span>{label}</span>
      </div>
      <div className="section-heading__body">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  );
}
