import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ZoomableImage } from "@/components/mdx/zoomable-image";

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

export function Figure({
  src,
  alt,
  caption,
  width = 1600,
  height = 1000,
  size = "wide",
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  size?: "reading" | "wide" | "full";
  className?: string;
}) {
  return (
    <figure className={cn("mdx-figure", className)} data-size={size}>
      <ZoomableImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized={src.toLowerCase().endsWith(".gif")}
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
  Callout,
  ProcessSteps,
  Figure,
  MediaSplit,
  Video,
};
