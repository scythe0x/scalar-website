"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "·:;+*#%@";
const PARTICLE_GLYPHS = "··:++*";
const BASE_LAYER_BRIGHTNESS = 0.52;
const CURSOR_ACCENT_CHANCE = 0.42;
const CURSOR_ACCENT_RADIUS = 116;

type FieldSample = {
  strength: number;
  accent: number;
  motion: number;
};

type ArtTransform = {
  centerX: number;
  centerY: number;
  scale: number;
  rotation: number;
  shear: number;
  depth: number;
};

type ScytheTransform = {
  centerX: number;
  centerY: number;
  scale: number;
  rotation: number;
  shear: number;
  depth: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function cubicBezierEaseInOut(progress: number) {
  const t = clamp(progress);
  const inverse = 1 - t;

  // The Y component of cubic-bezier(0.45, 0, 0.55, 1).
  return 3 * inverse * t * t + t * t * t;
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

function point(x: number, y: number, px: number, py: number, radius: number) {
  return 1 - smoothstep(radius * 0.3, radius, Math.hypot(x - px, y - py));
}

function outwardPulse(
  x: number,
  y: number,
  angle: number,
  time: number,
  offset: number,
) {
  const directionX = Math.cos(angle);
  const directionY = Math.sin(angle);
  const along = x * directionX + y * directionY;
  const across = Math.abs(-x * directionY + y * directionX);
  const pulsePosition = 0.12 + ((time * 0.12 + offset) % 1) * 0.88;
  const rail = 1 - smoothstep(0.012, 0.033, across);
  const head = 1 - smoothstep(0.025, 0.085, Math.abs(along - pulsePosition));
  const tail =
    smoothstep(pulsePosition - 0.2, pulsePosition - 0.04, along) *
    (1 - smoothstep(pulsePosition - 0.04, pulsePosition, along));
  const bounds =
    smoothstep(0.05, 0.14, along) * (1 - smoothstep(0.94, 1.08, along));

  return {
    rail: rail * bounds,
    pulse: rail * Math.max(head, tail * 0.58) * bounds,
  };
}

function heroField(
  x: number,
  y: number,
  time: number,
  reducedMotion: boolean,
): FieldSample {
  const animatedTime = reducedMotion ? 0 : time * 0.001;
  const py = y + 0.02;
  const radius = Math.hypot(x, py);
  const angle = Math.atan2(py, x);
  const bladeRotation = animatedTime * 0.16;
  const blades =
    (0.5 +
      0.5 * Math.cos(angle * 7 - radius * 15 - bladeRotation)) *
    (1 - smoothstep(0.18, 0.88, radius));
  const cut = smoothstep(
    0.02,
    0.12,
    Math.abs(Math.sin((angle - bladeRotation * 0.22) * 3.5)),
  );

  const innerRing = ring(x, py, 0.17, 0.045);
  const outerRing = ring(x, py, 0.31, 0.04);
  const innerSegments =
    0.18 +
    Math.pow(
      0.5 + 0.5 * Math.cos(angle * 8 - animatedTime * 0.92),
      2.4,
    ) *
      0.82;
  const outerSegments =
    0.16 +
    Math.pow(
      0.5 + 0.5 * Math.cos(angle * 11 + animatedTime * 0.64),
      2.2,
    ) *
      0.84;
  const rotatingRings = Math.max(
    innerRing * innerSegments,
    outerRing * outerSegments,
  );
  const fullRings = Math.max(innerRing * 0.72, outerRing * 0.68);

  const innerNodeAngle = animatedTime * 0.92;
  const outerNodeAngle = -animatedTime * 0.64 + 1.35;
  const orbitalNodes = Math.max(
    point(
      x,
      py,
      Math.cos(innerNodeAngle) * 0.17,
      Math.sin(innerNodeAngle) * 0.17,
      0.045,
    ),
    point(
      x,
      py,
      Math.cos(outerNodeAngle) * 0.31,
      Math.sin(outerNodeAngle) * 0.31,
      0.04,
    ),
  );

  const horizon = line(x, y, -1.15, 0.46, 0.72, -0.34, 0.026);
  const counter = line(x, y, -0.82, -0.48, 0.94, 0.44, 0.015);
  const rayAngles = [-0.43, 0.43, 2.7, 3.57, 1.18, -1.96];
  let rails = 0;
  let pulses = 0;

  for (let index = 0; index < rayAngles.length; index += 1) {
    const ray = outwardPulse(
      x,
      py,
      rayAngles[index],
      animatedTime,
      index / rayAngles.length,
    );
    rails = Math.max(rails, ray.rail);
    pulses = Math.max(pulses, ray.pulse);
  }

  const coreSpark = point(x, py, 0, 0, 0.065);
  const accent = Math.max(innerRing, outerRing, coreSpark);
  const motion = Math.max(rotatingRings, orbitalNodes, pulses);

  return {
    strength: clamp(
      Math.max(
        blades * cut * 0.84,
        fullRings,
        horizon * 0.7,
        counter * 0.38,
        rails * 0.24,
        coreSpark * 0.82,
      ),
    ),
    accent: clamp(accent),
    motion: clamp(motion),
  };
}

function getArtTransform(
  progress: number,
  reducedMotion: boolean,
): ArtTransform {
  const intro = smoothstep(0, 0.17, progress);
  const travel = smoothstep(0.12, 1, progress);
  const scrollWave = reducedMotion ? 0 : Math.sin(travel * Math.PI * 2.4);
  const scrollWaveSlow = reducedMotion
    ? 0
    : Math.sin(travel * Math.PI * 1.35);

  return {
    centerX: lerp(0.43, 0, intro) + scrollWaveSlow * 0.075 * intro,
    centerY:
      lerp(0.02, -0.025, intro) +
      Math.sin(travel * Math.PI * 2) * 0.055 * intro,
    scale:
      lerp(1, reducedMotion ? 1.14 : 1.4, intro) +
      scrollWave * 0.09 * intro,
    rotation: reducedMotion
      ? 0
      : -0.075 * intro + travel * 0.24 + scrollWaveSlow * 0.035,
    shear: reducedMotion ? 0 : scrollWave * 0.1 * intro,
    depth: reducedMotion ? 0 : scrollWaveSlow * 0.16 * intro,
  };
}

const SCYTHE_SCROLL_KEYFRAMES: Array<
  ScytheTransform & { progress: number }
> = [
  {
    progress: 0,
    centerX: 0.255,
    centerY: 0.56,
    scale: 0.98,
    rotation: -9,
    shear: -0.018,
    depth: 0.02,
  },
  {
    progress: 0.25,
    centerX: 0.255,
    centerY: 0.56,
    scale: 0.995,
    rotation: -8.2,
    shear: -0.008,
    depth: 0.012,
  },
  {
    progress: 0.5,
    centerX: 0.255,
    centerY: 0.56,
    scale: 1.012,
    rotation: -7.1,
    shear: 0.004,
    depth: 0.004,
  },
  {
    progress: 0.75,
    centerX: 0.255,
    centerY: 0.56,
    scale: 1.004,
    rotation: -6.2,
    shear: 0.012,
    depth: -0.004,
  },
  {
    progress: 1,
    centerX: 0.255,
    centerY: 0.56,
    scale: 0.99,
    rotation: -5.4,
    shear: 0.018,
    depth: -0.01,
  },
];

function getScytheTransform(progress: number): ScytheTransform {
  const nextIndex = SCYTHE_SCROLL_KEYFRAMES.findIndex(
    (keyframe) => keyframe.progress >= progress,
  );
  if (nextIndex <= 0) return SCYTHE_SCROLL_KEYFRAMES[0];

  const to = SCYTHE_SCROLL_KEYFRAMES[nextIndex];
  const from = SCYTHE_SCROLL_KEYFRAMES[nextIndex - 1];
  const phase = smoothstep(
    0,
    1,
    (progress - from.progress) / (to.progress - from.progress),
  );

  return {
    centerX: lerp(from.centerX, to.centerX, phase),
    centerY: lerp(from.centerY, to.centerY, phase),
    scale: lerp(from.scale, to.scale, phase),
    rotation: lerp(from.rotation, to.rotation, phase),
    shear: lerp(from.shear, to.shear, phase),
    depth: lerp(from.depth, to.depth, phase),
  };
}

export function LegacyScrollSceneBackground() {
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
    let scrollProgress = 0;
    let frame = 0;
    let lastPaint = 0;
    let pointerX = -CURSOR_ACCENT_RADIUS;
    let pointerY = -CURSOR_ACCENT_RADIUS;
    let pointerVisible = false;

    const updateScrollState = () => {
      const scrollRange = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      scrollProgress = clamp(window.scrollY / scrollRange);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio, 1.35);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      updateScrollState();
    };

    const drawArt = (time: number) => {
      const compact = width < 700;
      const cell = compact ? 12 : Math.max(9, Math.min(12, width / 145));
      const columns = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      const aspect = width / Math.max(height, 1);
      const transform = getArtTransform(scrollProgress, reducedMotion);
      const cos = Math.cos(transform.rotation);
      const sin = Math.sin(transform.rotation);

      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = `${Math.round(cell * 0.88)}px var(--font-geist-mono), monospace`;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const baseX = ((column + 0.5) / columns) * 2 - 1;
          const baseY =
            (((row + 0.5) / rows) * 2 - 1) / Math.max(aspect, 1);
          const translatedX = baseX - transform.centerX;
          const translatedY = baseY - transform.centerY;
          const rotatedX = translatedX * cos + translatedY * sin;
          const rotatedY = -translatedX * sin + translatedY * cos;
          const perspective = Math.max(
            0.72,
            1 + rotatedY * transform.depth,
          );
          const nx =
            (rotatedX / perspective - transform.shear * rotatedY) /
            transform.scale;
          const ny = rotatedY / transform.scale;
          const sample = heroField(
            nx,
            ny,
            time,
            reducedMotion,
          );
          const motionPhase = reducedMotion ? 0 : time * 0.00034;
          const motionFrame = Math.floor(motionPhase);
          const motionMix = smoothstep(
            0,
            1,
            motionPhase - motionFrame,
          );
          const fineNoise = lerp(
            Math.abs(hash(column + 13, row - 7, motionFrame + 41)),
            Math.abs(hash(column + 13, row - 7, motionFrame + 42)),
            motionMix,
          );
          const coarseNoise = lerp(
            Math.abs(
              hash(
                Math.floor(column / 3),
                Math.floor(row / 3),
                motionFrame + 67,
              ),
            ),
            Math.abs(
              hash(
                Math.floor(column / 3),
                Math.floor(row / 3),
                motionFrame + 68,
              ),
            ),
            motionMix,
          );
          const motionNoise = fineNoise * 0.62 + coarseNoise * 0.38;
          const texturedMotion =
            motionNoise > 0.28
              ? sample.motion * (0.34 + motionNoise * 0.82)
              : 0;
          const strength = Math.max(sample.strength, texturedMotion);
          const accent = Math.max(sample.accent, texturedMotion);
          const noise = Math.abs(hash(column, row, 0));
          const threshold = 0.13 + noise * 0.19;
          if (strength < threshold) continue;

          const normalized = clamp((strength - threshold) / (1 - threshold));
          const semanticAccent =
            accent >= threshold && accent >= strength * 0.72;
          const glyphIndex = Math.min(
            GLYPHS.length - 1,
            Math.floor(normalized * GLYPHS.length),
          );
          const highlight =
            normalized > 0.7 &&
            Math.abs(hash(column + 7, row - 3, 9)) > 0.86;
          const glyphX = column * cell + cell * 0.5;
          const glyphY = row * cell + cell * 0.5;
          const cursorDx = glyphX - pointerX;
          const cursorDy = glyphY - pointerY;
          const cursorAngle = Math.atan2(cursorDy, cursorDx);
          const cursorDistance = Math.hypot(cursorDx, cursorDy);
          const burstShape =
            0.76 +
            Math.cos(cursorAngle * 10 + 0.65) * 0.18 +
            Math.cos(cursorAngle * 3 - 0.8) * 0.09 +
            Math.sin(cursorAngle * 7 + 0.35) * 0.06;
          const cursorRadius =
            CURSOR_ACCENT_RADIUS *
            (burstShape + hash(column + 19, row - 11, 5) * 0.11);
          const cursorAccent =
            pointerVisible &&
            semanticAccent &&
            cursorDistance < cursorRadius &&
            Math.abs(hash(column + 37, row + 23, 17)) <
              CURSOR_ACCENT_CHANCE;

          context.fillStyle = cursorAccent
            ? "rgba(238, 238, 235, 0.72)"
            : highlight
              ? `rgba(245, 247, 250, ${
                  (0.22 + normalized * 0.34) *
                  (semanticAccent ? 1 : BASE_LAYER_BRIGHTNESS)
                })`
              : semanticAccent
                ? `rgba(224, 229, 235, ${0.025 + normalized * 0.32})`
                : `rgba(218, 223, 229, ${
                    (0.025 + normalized * 0.34) * BASE_LAYER_BRIGHTNESS
                  })`;
          context.fillText(GLYPHS[glyphIndex], glyphX, glyphY);
        }
      }
    };

    const draw = (time = 0) => {
      if (!reducedMotion && time - lastPaint < 38) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastPaint = time;
      context.clearRect(0, 0, width, height);
      drawArt(time);

      if (!reducedMotion) {
        frame = requestAnimationFrame(draw);
      }
    };

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerVisible = true;

      if (reducedMotion) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(draw);
      }
    };

    const hidePointer = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      pointerVisible = false;

      if (reducedMotion) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    document.addEventListener("mouseout", hidePointer);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("pointermove", updatePointer);
      document.removeEventListener("mouseout", hidePointer);
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
    const maskSize = 384;
    const maskCanvas = document.createElement("canvas");
    const maskContext = maskCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    const logo = new Image();
    maskCanvas.width = maskSize;
    maskCanvas.height = maskSize;

    let mask: Uint8ClampedArray | null = null;
    let width = 0;
    let height = 0;
    let scrollProgress = 0;
    let frame = 0;
    let lastPaint = 0;
    let pointerX = -CURSOR_ACCENT_RADIUS;
    let pointerY = -CURSOR_ACCENT_RADIUS;
    let pointerVisible = false;

    const updateScrollProgress = () => {
      const scrollRange = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      scrollProgress = clamp(window.scrollY / scrollRange);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio, 1.35);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      updateScrollProgress();
    };

    const draw = (time = 0) => {
      if (!reducedMotion && time - lastPaint < 42) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastPaint = time;
      context.clearRect(0, 0, width, height);

      if (mask) {
        const compact = width < 700;
        const cell = compact ? 11 : Math.max(9, Math.min(12, width / 145));
        const columns = Math.ceil(width / cell);
        const rows = Math.ceil(height / cell);
        const transform = getScytheTransform(scrollProgress);
        const markSize = compact
          ? width * 1.3455
          : Math.min(width * 0.9126, 1287);
        const motionTime = reducedMotion ? 0 : time * 0.001;
        const breathe = reducedMotion ? 0 : Math.sin(motionTime * 0.24);
        const orbit = reducedMotion ? 0 : Math.sin(motionTime * 0.13 + 0.7);
        const cameraDriftDuration = 6.5;
        const cameraDriftFrame = Math.floor(motionTime / cameraDriftDuration);
        const cameraDriftProgress = cubicBezierEaseInOut(
          motionTime / cameraDriftDuration - cameraDriftFrame,
        );
        const cameraDriftY = reducedMotion
          ? 0
          : lerp(
              hash(cameraDriftFrame, 17, 211) * 7,
              hash(cameraDriftFrame + 1, 17, 211) * 7,
              cameraDriftProgress,
            );
        const positionOffsetX = compact ? 36 : 80;
        const positionOffsetY = compact ? 84 : 150;
        const centerX = width * (
          compact
            ? lerp(0.86, 0.96, transform.centerX)
            : transform.centerX
        ) + positionOffsetX + orbit * (compact ? 1 : 2);
        const centerY =
          height * transform.centerY + positionOffsetY + cameraDriftY;
        const scale = transform.scale * (1 + breathe * 0.004);
        const rotation =
          ((transform.rotation + orbit * 0.16) * Math.PI) / 180;
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = `${Math.round(cell * 0.88)}px var(--font-geist-mono), monospace`;

        for (let row = 0; row < rows; row += 1) {
          for (let column = 0; column < columns; column += 1) {
            const glyphX = column * cell + cell * 0.5;
            const glyphY = row * cell + cell * 0.5;
            const dx = glyphX - centerX;
            const dy = glyphY - centerY;
            const rotatedX = dx * cos + dy * sin;
            const rotatedY = -dx * sin + dy * cos;
            const perspective = Math.max(
              0.82,
              1 + (rotatedY / markSize) * transform.depth,
            );
            const localX =
              (rotatedX / perspective - rotatedY * transform.shear) /
                (markSize * scale) +
              0.5;
            const localY = rotatedY / (markSize * scale) + 0.5;
            let alpha = 0;
            if (localX >= 0 && localX < 1 && localY >= 0 && localY < 1) {
              const maskX = Math.min(
                maskSize - 1,
                Math.floor(localX * maskSize),
              );
              const maskY = Math.min(
                maskSize - 1,
                Math.floor(localY * maskSize),
              );
              alpha = mask[(maskY * maskSize + maskX) * 4 + 3] / 255;
            }

            const stableNoise = Math.abs(hash(column, row, 31));
            const flickerFrame = Math.floor(motionTime * 2.2);
            const flicker = lerp(
              Math.abs(hash(column + 17, row - 9, flickerFrame)),
              Math.abs(hash(column + 17, row - 9, flickerFrame + 1)),
              smoothstep(0, 1, motionTime * 2.2 - flickerFrame),
            );
            const screenX = glyphX / Math.max(width, 1);
            const screenY = glyphY / Math.max(height, 1);
            const streamCenter =
              0.46 +
              Math.sin(screenX * 7.5 + motionTime * 0.22) * 0.13 +
              Math.sin(screenX * 2.3 - motionTime * 0.13) * 0.08;
            const streamDistance = Math.abs(screenY - streamCenter);
            const particleSeed = Math.abs(hash(column + 71, row - 43, 113));
            const dust = particleSeed > (compact ? 0.978 : 0.968);
            const streamParticle =
              streamDistance < 0.055 &&
              particleSeed > 0.82 + streamDistance * 1.5;
            const constellation =
              Math.abs(
                Math.sin(screenX * 19 + screenY * 13 + motionTime * 0.08),
              ) > 0.985 && particleSeed > 0.72;
            const ambientParticle = dust || streamParticle || constellation;
            const signal =
              0.5 +
              0.5 * Math.sin((localX * 0.72 + localY) * 24 - motionTime * 1.8);
            const density = alpha * (0.34 + stableNoise * 0.44 + signal * 0.22);

            const cursorDistance = Math.hypot(
              glyphX - pointerX,
              glyphY - pointerY,
            );
            const cursorAccent =
              pointerVisible &&
              cursorDistance < CURSOR_ACCENT_RADIUS &&
              flicker > 0.42;

            if (density < 0.4) {
              if (!ambientParticle) continue;
              const streamStrength = clamp(1 - streamDistance / 0.055);
              const twinkle =
                0.5 +
                0.5 *
                  Math.sin(
                    motionTime * (0.55 + particleSeed * 1.4) +
                      particleSeed * 19,
                  );
              const particleIntensity = clamp(
                0.12 +
                  twinkle * 0.46 +
                  streamStrength * 0.24 +
                  (cursorAccent ? 0.38 : 0),
              );
              const particleIndex = Math.min(
                PARTICLE_GLYPHS.length - 1,
                Math.floor(particleIntensity * PARTICLE_GLYPHS.length),
              );
              const driftX = Math.sin(motionTime * 0.35 + particleSeed * 8) * 2;
              const driftY = Math.cos(motionTime * 0.24 + particleSeed * 11) * 2;
              context.fillStyle = cursorAccent
                ? `rgba(240, 241, 237, ${0.25 + particleIntensity * 0.32})`
                : `rgba(214, 217, 212, ${0.018 + particleIntensity * 0.12})`;
              context.fillText(
                PARTICLE_GLYPHS[particleIndex],
                glyphX + driftX,
                glyphY + driftY,
              );
              continue;
            }

            const pulse = signal > 0.86 && flicker > 0.5;
            const intensity = clamp(
              (density - 0.34) / 0.66 + flicker * 0.18,
            );
            const glyphIndex = Math.min(
              GLYPHS.length - 1,
              Math.floor(intensity * GLYPHS.length),
            );

            context.fillStyle = cursorAccent
              ? `rgba(245, 245, 241, ${0.34 + intensity * 0.42})`
              : pulse
                ? `rgba(235, 236, 232, ${0.18 + intensity * 0.36})`
                : `rgba(220, 222, 218, ${0.035 + intensity * 0.25})`;
            context.fillText(GLYPHS[glyphIndex], glyphX, glyphY);
          }
        }
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    const updateScroll = () => {
      updateScrollProgress();
      if (reducedMotion) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(draw);
      }
    };

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerVisible = true;
    };

    const hidePointer = (event: MouseEvent) => {
      if (!event.relatedTarget) pointerVisible = false;
    };

    logo.onload = () => {
      if (!maskContext) return;
      maskContext.clearRect(0, 0, maskSize, maskSize);
      maskContext.drawImage(logo, 0, 0, maskSize, maskSize);
      mask = maskContext.getImageData(0, 0, maskSize, maskSize).data;
      resize();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };
    logo.src = "/scythe-logo.svg";

    resize();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    document.addEventListener("mouseout", hidePointer);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      document.removeEventListener("mouseout", hidePointer);
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

/* Previous procedural ASCII field, preserved for a quick rollback:
   <LegacyScrollSceneBackground />
*/
