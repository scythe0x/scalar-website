import Image from "next/image";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MetricGrid({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="mdx-metric-grid">{children}</div>;
}

export function Metric({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  return (
    <div className="mdx-metric">
      <strong>{value}</strong>
      <span>{children}</span>
    </div>
  );
}

export function Callout({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <aside className="mdx-callout">
      {label ? <span>{label}</span> : null}
      <div>{children}</div>
    </aside>
  );
}

export function ProcessSteps({ children }: { children: ReactNode }) {
  return <div className="mdx-process">{children}</div>;
}

export function CaseVisual({
  label,
  children,
  tone = "neutral",
}: {
  label: string;
  children: ReactNode;
  tone?: "neutral" | "blue";
}) {
  return (
    <figure className="case-visual" data-tone={tone}>
      <figcaption>{label}</figcaption>
      <pre>{children}</pre>
    </figure>
  );
}

export function Figure({
  src,
  alt,
  caption,
  width = 1600,
  height = 1000,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <figure className={cn("mdx-figure", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 80vw"
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function MediaSplit({
  children,
  side = "right",
}: {
  children: ReactNode;
  side?: "left" | "right";
}) {
  return (
    <div className="mdx-media-split" data-side={side}>
      {children}
    </div>
  );
}

export function Video({
  src,
  poster,
  label,
}: {
  src: string;
  poster?: string;
  label: string;
}) {
  return (
    <figure className="mdx-video">
      <video controls playsInline preload="metadata" poster={poster}>
        <source src={src} />
        {label}
      </video>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul {...props} />,
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a {...props} target="_blank" rel="noreferrer" />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mdx-table-wrap">
      <table {...props} />
    </div>
  ),
  MetricGrid,
  Metric,
  Callout,
  ProcessSteps,
  CaseVisual,
  Figure,
  MediaSplit,
  Video,
};
