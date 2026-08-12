"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { motionConfig } from "@/config/site-config";
import { useReadingZone } from "@/components/motion/use-reading-zone";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  distance?: number;
  amount?: number;
  once?: boolean;
  variant?: "fade" | "heading" | "row" | "panel" | "cell" | "tile";
  viewportPosition?: number;
};

const directionOffset = {
  up: (distance: number) => ({ y: distance }),
  left: (distance: number) => ({ x: -distance }),
  right: (distance: number) => ({ x: distance }),
  none: () => ({}),
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 28,
  amount = 0.16,
  once = true,
  variant = "fade",
  viewportPosition = 0.825,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useReadingZone(ref, {
    amount,
    disabled: Boolean(reduceMotion),
    once,
    viewportPosition,
  });
  const directionalOffset = directionOffset[direction](distance);
  const initialByVariant = {
    fade: {
      opacity: 0,
      filter: "blur(6px)",
      ...directionalOffset,
    },
    heading: {
      opacity: 0,
      y: 28,
      filter: "blur(12px)",
    },
    row: {
      opacity: 0,
      clipPath: "inset(0 100% 0 0)",
    },
    panel: {
      opacity: 0,
      y: 14,
      clipPath: "inset(0 0 12% 0)",
    },
    cell: {
      opacity: 0,
      scale: 0.975,
      clipPath: "inset(0 8% 8% 0)",
    },
    tile: {
      opacity: 0,
      clipPath:
        direction === "right" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
    },
  };
  const hidden = initialByVariant[variant];
  const hiddenX = "x" in hidden && typeof hidden.x === "number" ? hidden.x : 0;
  const hiddenY = "y" in hidden && typeof hidden.y === "number" ? hidden.y : 0;
  const hiddenScale =
    "scale" in hidden && typeof hidden.scale === "number" ? hidden.scale : 1;
  const hiddenFilter =
    "filter" in hidden && typeof hidden.filter === "string"
      ? hidden.filter
      : "blur(0px)";
  const clipsContent =
    "clipPath" in hidden && typeof hidden.clipPath === "string";
  const clipPath = clipsContent
    ? { clipPath: hidden.clipPath as string }
    : {};

  return (
    <motion.div
      ref={ref}
      className={className}
      // SSR stays visible as a safe fallback; hydrated content is hidden until
      // it reaches the reading zone around the center of the viewport.
      initial={false}
      animate={
        reduceMotion || isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              ...(clipsContent
                ? { clipPath: "inset(0 0 0 0)" }
                : {}),
            }
          : {
              opacity: hidden.opacity,
              x: hiddenX,
              y: hiddenY,
              scale: hiddenScale,
              filter: hiddenFilter,
              ...clipPath,
            }
      }
      transition={{
        duration:
          variant === "heading" || variant === "row"
            ? 0.72
            : motionConfig.duration.slow,
        delay,
        ease: motionConfig.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
