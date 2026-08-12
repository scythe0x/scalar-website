import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("section-heading", className)}>
      <div className="section-heading__body">
        <h2 className="gothic-bloom">{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  );
}
