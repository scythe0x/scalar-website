"use client";

import { useEffect, useRef } from "react";

const CHARACTERS = ".:+*/\\<>[]01";
const BLUE = "92, 126, 255";

type NodePoint = {
  branch: number;
  offset: number;
  speed: number;
  character: string;
};

function createPoints(count: number): NodePoint[] {
  return Array.from({ length: count }, (_, index) => ({
    branch: index % 9,
    offset: ((index * 47) % count) / count,
    speed: 0.6 + ((index * 13) % 10) / 22,
    character: CHARACTERS[(index * 7) % CHARACTERS.length],
  }));
}

export function AsciiField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const compact = window.matchMedia("(max-width: 720px)").matches;
    const points = createPoints(compact ? 84 : 180);
    const pointer = { x: 0, y: 0 };
    let frame = 0;
    let animationFrame = 0;
    let visible = true;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const handlePointer = (event: PointerEvent) => {
      pointer.x = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      pointer.y = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
    };

    const handleVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible && !reducedMotion) animationFrame = requestAnimationFrame(draw);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const centerX = width * (compact ? 0.58 : 0.66) + pointer.x * 16;
      const centerY = height * 0.49 + pointer.y * 12;
      const time = reducedMotion ? 40 : frame * 0.006;

      const glow = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.min(width, height) * 0.52,
      );
      glow.addColorStop(0, `rgba(${BLUE}, 0.16)`);
      glow.addColorStop(0.34, `rgba(${BLUE}, 0.055)`);
      glow.addColorStop(1, `rgba(${BLUE}, 0)`);
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = `${compact ? 9 : 11}px var(--font-geist-mono), monospace`;

      for (const point of points) {
        const progress = (point.offset + time * point.speed) % 1;
        const branchAngle =
          -1.2 + point.branch * 0.29 + Math.sin(time * 0.7 + point.branch) * 0.04;
        const distance =
          Math.pow(progress, 0.78) * Math.max(width, height) * (compact ? 0.72 : 0.78);
        const bend = Math.sin(progress * Math.PI) * (point.branch - 4) * 10;
        const x =
          centerX +
          Math.cos(branchAngle) * distance +
          Math.sin(branchAngle) * bend;
        const y =
          centerY +
          Math.sin(branchAngle) * distance -
          Math.cos(branchAngle) * bend;
        const edgeFade = Math.sin(progress * Math.PI);
        const accent = point.branch === 3 || point.branch === 5;
        const alpha = Math.max(0, edgeFade) * (accent ? 0.62 : 0.24);

        context.fillStyle = accent
          ? `rgba(${BLUE}, ${alpha})`
          : `rgba(224, 228, 235, ${alpha})`;
        context.fillText(point.character, x, y);
      }

      context.strokeStyle = `rgba(${BLUE}, 0.13)`;
      context.lineWidth = 1;
      for (let branch = 0; branch < 9; branch += 2) {
        const angle = -1.2 + branch * 0.29;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(
          centerX + Math.cos(angle) * width * 0.48,
          centerY + Math.sin(angle) * width * 0.48,
        );
        context.stroke();
      }

      frame += 1;
      if (!reducedMotion && visible) animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="ascii-field" aria-hidden="true" />;
}
