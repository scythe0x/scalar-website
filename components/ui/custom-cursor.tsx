"use client";

import { useEffect, useRef } from "react";

type CursorState = "idle" | "active" | "zoom";

function getCursorState(target: EventTarget | null): CursorState {
  if (!(target instanceof Element)) return "idle";
  if (target.closest(".zoomable-image")) return "zoom";
  if (
    target.closest(
      "a, button, input, textarea, select, summary, [role='button'], [tabindex]:not([tabindex='-1'])",
    )
  ) {
    return "active";
  }
  return "idle";
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const cursor = cursorRef.current;
    if (!finePointer.matches || !cursor) return;

    document.documentElement.classList.add("has-custom-cursor");

    let pointerX = -100;
    let pointerY = -100;
    let animationFrame = 0;
    let currentState: CursorState = "idle";

    const paint = () => {
      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      animationFrame = 0;
    };

    const move = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (cursor.dataset.visible !== "true") {
        cursor.dataset.visible = "true";
        const initialState = getCursorState(event.target);
        currentState = initialState;
        cursor.dataset.state = initialState;
      }

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(paint);
      }
    };

    const updateState = (event: PointerEvent) => {
      const nextState = getCursorState(event.target);
      if (nextState === currentState) return;
      currentState = nextState;
      cursor.dataset.state = nextState;
    };

    const press = () => {
      cursor.dataset.pressed = "true";
    };

    const release = () => {
      cursor.dataset.pressed = "false";
    };

    const hide = () => {
      cursor.dataset.visible = "false";
      cursor.dataset.pressed = "false";
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const leave = (event: MouseEvent) => {
      if (!event.relatedTarget) hide();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") hide();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", updateState, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", hide, { passive: true });
    document.addEventListener("mouseout", leave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", hide);

    return () => {
      cancelAnimationFrame(animationFrame);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", updateState);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", hide);
      document.removeEventListener("mouseout", leave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="site-cursor"
      data-state="idle"
      data-visible="false"
      data-pressed="false"
      aria-hidden="true"
    >
      <span className="site-cursor__shape" />
    </div>
  );
}
