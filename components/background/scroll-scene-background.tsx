"use client";

import { useEffect, useRef } from "react";

const SCENES = [
  "hero",
  "work",
  "about",
  "capabilities",
  "experience",
  "contact",
  "footer",
] as const;

const GLYPHS = "·:;+*#%@";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function hash(x: number, y: number, seed: number) {
  return (
    Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123
  ) % 1;
}

function line(
  x: number,
  y: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  width: number,
) {
  const pax = x - ax;
  const pay = y - ay;
  const bax = bx - ax;
  const bay = by - ay;
  const h = clamp((pax * bax + pay * bay) / (bax * bax + bay * bay));
  const dx = pax - bax * h;
  const dy = pay - bay * h;
  return 1 - smoothstep(width * 0.4, width, Math.hypot(dx, dy));
}

function ring(x: number, y: number, radius: number, width: number) {
  return 1 - smoothstep(width * 0.25, width, Math.abs(Math.hypot(x, y) - radius));
}

function boxFrame(
  x: number,
  y: number,
  halfWidth: number,
  halfHeight: number,
  thickness: number,
) {
  const distance = Math.max(Math.abs(x) - halfWidth, Math.abs(y) - halfHeight);
  return 1 - smoothstep(thickness * 0.15, thickness, Math.abs(distance));
}

function heroField(x: number, y: number) {
  const px = x - 0.43;
  const py = y + 0.02;
  const radius = Math.hypot(px, py);
  const angle = Math.atan2(py, px);
  const blades =
    (0.5 + 0.5 * Math.cos(angle * 7 - radius * 15)) *
    (1 - smoothstep(0.18, 0.88, radius));
  const core = ring(px, py, 0.17, 0.045) + ring(px, py, 0.31, 0.04);
  const cut = smoothstep(0.02, 0.12, Math.abs(Math.sin(angle * 3.5)));
  const horizon = line(x, y, -1.15, 0.46, 0.72, -0.34, 0.026);
  const counter = line(x, y, -0.82, -0.48, 0.94, 0.44, 0.015);
  return clamp(Math.max(blades * cut * 0.86, core, horizon * 0.74, counter * 0.38));
}

function workField(x: number, y: number) {
  const leftX = x + 0.42;
  const leftY = y + 0.03;
  const radius = Math.hypot(leftX, leftY);
  const angle = Math.atan2(leftY, leftX);
  const vortexMask = 1 - smoothstep(0.12, 0.78, radius);
  const vortex =
    Math.pow(0.5 + 0.5 * Math.cos(angle * 6 + radius * 30), 2.2) *
    vortexMask;
  const wake =
    line(x, y, -1.08, 0.48, -0.28, -0.08, 0.025) +
    line(x, y, -1.05, 0.32, -0.25, -0.05, 0.016) +
    line(x, y, -1.0, 0.16, -0.23, -0.02, 0.012);

  const rightX = x - 0.5;
  const rightY = y + 0.02;
  const foldMask =
    (1 - smoothstep(0.35, 0.72, Math.hypot(rightX * 0.8, rightY))) *
    smoothstep(-0.1, 0.16, rightX + 0.55);
  const folds =
    Math.pow(
      0.5 +
        0.5 *
          Math.cos(
            rightX * 23 +
              Math.sin(rightY * 8) * 4 +
              Math.sign(rightY) * rightY * rightY * 17,
          ),
      3,
    ) * foldMask;
  const spine =
    line(x, y, 0.08, -0.58, 0.94, 0.44, 0.022) +
    line(x, y, 0.18, -0.5, 0.9, 0.56, 0.012);

  return clamp(Math.max(vortex, wake * 0.76, folds * 0.9, spine * 0.7));
}

function aboutField(x: number, y: number) {
  const ridge =
    line(x, y, -1.08, 0.43, -0.5, -0.38, 0.032) +
    line(x, y, -0.5, -0.38, -0.03, 0.16, 0.032) +
    line(x, y, -0.03, 0.16, 0.34, -0.4, 0.032) +
    line(x, y, 0.34, -0.4, 1.06, 0.35, 0.032);
  const echoes =
    line(x, y + 0.11, -1.08, 0.43, -0.5, -0.38, 0.017) +
    line(x, y + 0.11, -0.5, -0.38, -0.03, 0.16, 0.017) +
    line(x, y + 0.11, -0.03, 0.16, 0.34, -0.4, 0.017) +
    line(x, y + 0.11, 0.34, -0.4, 1.06, 0.35, 0.017);
  const nodes =
    ring(x + 0.5, y + 0.38, 0.08, 0.025) +
    ring(x - 0.34, y + 0.4, 0.08, 0.025);
  return clamp(Math.max(ridge, echoes * 0.62, nodes));
}

function capabilitiesField(x: number, y: number) {
  let modules = 0;
  for (let row = -1; row <= 1; row += 1) {
    for (let column = -1; column <= 1; column += 1) {
      if (Math.abs(row) + Math.abs(column) === 2) continue;
      modules = Math.max(
        modules,
        boxFrame(x - column * 0.36, y - row * 0.27, 0.2, 0.14, 0.025),
      );
    }
  }
  const diagonal =
    line(x, y, -0.92, 0.6, 0.92, -0.6, 0.022) +
    line(x, y, -0.92, -0.6, 0.92, 0.6, 0.014);
  const core = ring(x, y, 0.12, 0.035);
  return clamp(Math.max(modules * 0.84, diagonal * 0.7, core));
}

function experienceField(x: number, y: number) {
  let tower = 0;
  for (let index = 0; index < 8; index += 1) {
    const width = 0.14 + index * 0.065;
    tower = Math.max(
      tower,
      line(
        x,
        y,
        -width,
        0.62 - index * 0.13,
        width,
        0.62 - index * 0.13,
        0.027,
      ),
    );
  }
  const rails =
    line(x, y, -0.62, 0.48, -0.08, -0.58, 0.025) +
    line(x, y, 0.62, 0.48, 0.08, -0.58, 0.025);
  const signal =
    ring(x, y + 0.62, 0.13, 0.027) + ring(x, y + 0.62, 0.24, 0.02);
  return clamp(Math.max(tower, rails * 0.8, signal * 0.8));
}

function contactField(x: number, y: number) {
  const px = x + 0.05;
  const py = y;
  const radius = Math.hypot(px, py);
  const angle = Math.atan2(py, px);
  const aperture =
    (0.45 + 0.55 * Math.cos(angle * 12)) *
    (1 - smoothstep(0.1, 0.8, radius));
  const transmissions =
    ring(px, py, 0.26, 0.025) +
    ring(px, py, 0.46, 0.022) +
    ring(px, py, 0.68, 0.018);
  const beam = line(x, y, -1.1, 0.02, 1.1, -0.02, 0.02);
  return clamp(Math.max(aperture * 0.85, transmissions * 0.75, beam * 0.6));
}

function footerField(x: number, y: number) {
  const left = ring(x + 0.3, y, 0.3, 0.045);
  const right = ring(x - 0.3, y, 0.3, 0.045);
  const slashA = line(x, y, -0.92, 0.48, 0.92, -0.48, 0.018);
  const slashB = line(x, y, -0.92, -0.48, 0.92, 0.48, 0.018);
  return clamp(Math.max(left, right, slashA * 0.5, slashB * 0.5));
}

const FIELD_FUNCTIONS = [
  heroField,
  workField,
  aboutField,
  capabilitiesField,
  experienceField,
  contactField,
  footerField,
];

export function ScrollSceneBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let targetScene = 0;
    let renderedScene = 0;
    let scrollOffset = 0;
    let frame = 0;
    let lastPaint = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio, 1.35);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      updateScene();
    };

    const updateScene = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-background-scene]"),
      );
      if (!elements.length) return;

      const viewportCenter = window.scrollY + window.innerHeight * 0.52;
      const centers = elements.map(
        (element) =>
          element.getBoundingClientRect().top +
          window.scrollY +
          element.offsetHeight * 0.5,
      );

      let next = 0;
      for (let index = 0; index < centers.length - 1; index += 1) {
        if (viewportCenter >= centers[index]) {
          const span = Math.max(centers[index + 1] - centers[index], 1);
          next = index + clamp((viewportCenter - centers[index]) / span);
        }
      }
      if (viewportCenter >= centers[centers.length - 1]) {
        next = centers.length - 1;
      }

      targetScene = clamp(next, 0, SCENES.length - 1);
      scrollOffset =
        ((window.scrollY / Math.max(document.body.scrollHeight, 1)) % 1) * 0.12;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };

    const drawScene = (sceneIndex: number, alpha: number, time: number) => {
      if (alpha <= 0.005) return;
      const compact = width < 700;
      const cell = compact ? 12 : Math.max(9, Math.min(12, width / 145));
      const columns = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      const aspect = width / Math.max(height, 1);
      const field = FIELD_FUNCTIONS[sceneIndex];

      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = `${Math.round(cell * 0.88)}px var(--font-geist-mono), monospace`;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const baseX = ((column + 0.5) / columns) * 2 - 1;
          const baseY =
            (((row + 0.5) / rows) * 2 - 1 + scrollOffset) / Math.max(aspect, 1);
          const phase = reducedMotion ? 0 : time * 0.00016;
          const rotation = Math.sin(phase + sceneIndex * 0.8) * 0.018;
          const breathing = 1 + Math.sin(phase * 1.7 + sceneIndex) * 0.012;
          const cos = Math.cos(rotation);
          const sin = Math.sin(rotation);
          const nx =
            (baseX * cos - baseY * sin) * breathing +
            Math.sin(baseY * 6 + phase * 2.2) * 0.008;
          const ny =
            (baseX * sin + baseY * cos) * breathing +
            Math.cos(baseX * 5 - phase * 1.6) * 0.007;
          const strength = field(nx, ny);
          const noise = Math.abs(hash(column, row, sceneIndex));
          const threshold = 0.13 + noise * 0.19;
          if (strength < threshold) continue;

          const normalized = clamp((strength - threshold) / (1 - threshold));
          const glyphIndex = Math.min(
            GLYPHS.length - 1,
            Math.floor(normalized * GLYPHS.length),
          );
          const highlight =
            normalized > 0.7 &&
            Math.abs(hash(column + 7, row - 3, sceneIndex + 9)) > 0.86;
          context.fillStyle = highlight
            ? `rgba(245, 247, 250, ${alpha * (0.38 + normalized * 0.48)})`
            : `rgba(218, 223, 229, ${alpha * (0.035 + normalized * 0.5)})`;
          context.fillText(
            GLYPHS[glyphIndex],
            column * cell + cell * 0.5,
            row * cell + cell * 0.5,
          );
        }
      }
    };

    const draw = (time = 0) => {
      if (!reducedMotion && time - lastPaint < 38) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastPaint = time;
      renderedScene = reducedMotion
        ? targetScene
        : renderedScene + (targetScene - renderedScene) * 0.12;
      context.clearRect(0, 0, width, height);
      const lower = Math.floor(renderedScene);
      const upper = Math.min(SCENES.length - 1, lower + 1);
      const mix = renderedScene - lower;

      drawScene(lower, 1 - smoothstep(0, 1, mix), time);
      if (upper !== lower) drawScene(upper, smoothstep(0, 1, mix), time);

      if (!reducedMotion) {
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScene, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScene);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="scroll-scene-background"
      aria-hidden="true"
    />
  );
}
