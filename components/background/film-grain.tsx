"use client";

import { useEffect, useRef } from "react";

const GRAIN_WIDTH = 224;
const GRAIN_HEIGHT = 126;

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const image = context.createImageData(GRAIN_WIDTH, GRAIN_HEIGHT);
    let animationFrame = 0;
    let lastFrame = 0;

    const paint = (time: number) => {
      if (reducedMotion || time - lastFrame > 84) {
        const data = image.data;
        for (let index = 0; index < data.length; index += 8) {
          const deviation = Math.floor(Math.random() * 86) - 43;
          const light = 128 + deviation;
          const dark = 128 - deviation;
          data[index] = light;
          data[index + 1] = light;
          data[index + 2] = light;
          data[index + 3] = 92;
          data[index + 4] = dark;
          data[index + 5] = dark;
          data[index + 6] = dark;
          data[index + 7] = 92;
        }
        context.putImageData(image, 0, 0);
        lastFrame = time;
      }

      if (!reducedMotion) animationFrame = requestAnimationFrame(paint);
    };

    paint(0);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="film-grain"
      width={GRAIN_WIDTH}
      height={GRAIN_HEIGHT}
      aria-hidden="true"
    />
  );
}
