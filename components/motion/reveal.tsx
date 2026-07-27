"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { motionConfig } from "@/config/site-config";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  distance?: number;
  amount?: number;
  once?: boolean;
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
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              filter: "blur(8px)",
              ...directionOffset[direction](distance),
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once, amount }}
      transition={{
        duration: motionConfig.duration.slow,
        delay,
        ease: motionConfig.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
