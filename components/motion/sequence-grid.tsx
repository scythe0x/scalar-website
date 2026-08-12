"use client";

import {
  Children,
  useRef,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { motionConfig } from "@/config/site-config";
import { useReadingZone } from "@/components/motion/use-reading-zone";

type RevealDirection = "left" | "right" | "down";

type SequenceGridProps = {
  children: ReactNode;
  className: string;
  directions: RevealDirection[];
  order: number[];
  itemClassNames?: Array<string | undefined>;
  variant?: "directional" | "panel";
};

const hiddenClipPath: Record<RevealDirection, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  down: "inset(0 0 100% 0)",
};

export function SequenceGrid({
  children,
  className,
  directions,
  order,
  itemClassNames = [],
  variant = "directional",
}: SequenceGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useReadingZone(ref, {
    amount: 0.08,
    disabled: Boolean(reduceMotion),
  });

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => {
        const direction = directions[index] ?? "left";
        const step = order.indexOf(index);
        const hidden =
          variant === "panel"
            ? {
                opacity: 0,
                y: 14,
                clipPath: "inset(0 0 12% 0)",
              }
            : {
                opacity: 0,
                y: 0,
                clipPath: hiddenClipPath[direction],
              };

        return (
          <motion.div
            className={itemClassNames[index]}
            data-sequence-item=""
            initial={false}
            animate={
              reduceMotion || isInView
                ? { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }
                : hidden
            }
            transition={{
              duration:
                variant === "panel" ? motionConfig.duration.slow : 0.72,
              delay: Math.max(0, step) * 0.14,
              ease: motionConfig.ease,
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}
