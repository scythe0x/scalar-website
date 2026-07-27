"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ZoomableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  unoptimized?: boolean;
};

export function ZoomableImage({
  src,
  alt,
  width,
  height,
  sizes,
  unoptimized,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="zoomable-image"
        onClick={() => setOpen(true)}
        aria-label={`View full-size image: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized={unoptimized}
          sizes={sizes}
          draggable={false}
          onClick={() => setOpen(true)}
        />
        <span className="zoomable-image__hint" aria-hidden="true">
          <Maximize2 size={16} />
        </span>
      </button>

      {open
        ? createPortal(
            <div
              className="image-lightbox"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setOpen(false);
              }}
            >
              <div
                className="image-lightbox__dialog"
                role="dialog"
                aria-modal="true"
                aria-label={alt}
              >
                <button
                  type="button"
                  className="image-lightbox__close"
                  onClick={() => setOpen(false)}
                  aria-label="Close image"
                  autoFocus
                >
                  <X size={21} />
                </button>
                <div className="image-lightbox__stage">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    unoptimized={unoptimized}
                    sizes="100vw"
                  />
                </div>
                <p className="image-lightbox__caption">{alt}</p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
