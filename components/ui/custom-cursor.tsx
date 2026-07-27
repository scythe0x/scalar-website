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

    const leave = (event: MouseEvent) => {
      if (!event.relatedTarget) cursor.dataset.visible = "false";
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", updateState, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    document.addEventListener("mouseout", leave);
    window.addEventListener("blur", release);

    return () => {
      cancelAnimationFrame(animationFrame);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", updateState);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.removeEventListener("mouseout", leave);
      window.removeEventListener("blur", release);
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
