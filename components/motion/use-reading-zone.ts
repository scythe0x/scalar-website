"use client";

import { useEffect, useState, type RefObject } from "react";

type ReadingZoneOptions = {
  amount?: number;
  disabled?: boolean;
  once?: boolean;
  viewportPosition?: number;
};

export function useReadingZone(
  ref: RefObject<HTMLElement | null>,
  {
    amount = 0,
    disabled = false,
    once = true,
    viewportPosition = 0.825,
  }: ReadingZoneOptions = {},
) {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (disabled || (once && hasEntered)) return;

    let frame = 0;
    const checkPosition = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const readingLine = window.innerHeight * viewportPosition;
      const contentOffset = Math.min(rect.height * amount, 48);
      const remainingScroll = Math.max(
        0,
        document.documentElement.scrollHeight -
          (window.scrollY + window.innerHeight),
      );
      const minimumReachableTop = rect.top - remainingScroll;
      const endOfPageAllowance = Math.min(96, window.innerHeight * 0.12);
      const reachableReadingLine = Math.max(
        readingLine,
        minimumReachableTop + endOfPageAllowance,
      );
      const isPastReadingLine =
        rect.top + contentOffset <= reachableReadingLine;

      setHasEntered(isPastReadingLine);
    };
    const scheduleCheck = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(checkPosition);
    };

    checkPosition();
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
    };
  }, [amount, disabled, hasEntered, once, ref, viewportPosition]);

  return disabled || hasEntered;
}
