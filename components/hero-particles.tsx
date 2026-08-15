"use client";

import { useEffect, useRef } from "react";

/**
 * Hero particle network — a slow-drifting constellation of nodes and notched
 * modules, wired by proximity. Tuned to be clearly visible on the dark hero.
 * Honours prefers-reduced-motion (renders a single static frame).
 */
export function HeroParticles() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    const color =
      getComputedStyle(document.documentElement).getPropertyValue("--solid-hi").trim() ||
      "#5ECD04";

    let W = 0,
      H = 0,
      dpr = 1,
      raf = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number; mod: number };
    let parts: P[] = [];

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      if (!W || !H) return;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const seed = () => {
      const n = Math.max(14, Math.min(26, Math.round(W / 38)));
      parts = [];
      for (let i = 0; i < n; i++) {
        const kind = Math.random();
        parts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.26,
          vy: (Math.random() - 0.5) * 0.26,
          r: kind < 0.6 ? 2.5 + Math.random() * 3 : 0,
          mod: kind >= 0.82 ? 11 + Math.random() * 6 : 0,
        });
      }
    };
    const notch = (x: number, y: number, s: number, c: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + s - c, y);
      ctx.lineTo(x + s, y + c);
      ctx.lineTo(x + s, y + s);
      ctx.lineTo(x, y + s);
      ctx.closePath();
    };
    const draw = (move: boolean) => {
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);
      const max = Math.min(W, H) * 0.5;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i];
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < max) {
            ctx.globalAlpha = (1 - d / max) * 0.85;
            ctx.lineWidth = 1.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of parts) {
        ctx.globalAlpha = 1;
        if (p.mod) {
          ctx.lineWidth = 2;
          notch(p.x - p.mod / 2, p.y - p.mod / 2, p.mod, p.mod * 0.32);
          ctx.stroke();
        } else if (p.r) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        if (move) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }
      }
      ctx.globalAlpha = 1;
    };
    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      resize();
      if (!W || !H) {
        raf = requestAnimationFrame(start);
        return;
      }
      seed();
      if (raf) cancelAnimationFrame(raf);
      if (reduce) draw(false);
      else loop();
    };

    const ro =
      typeof ResizeObserver === "function"
        ? new ResizeObserver(() => resize())
        : null;
    if (ro) ro.observe(canvas);
    else window.addEventListener("resize", resize);
    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="art hero-art" aria-hidden="true" />;
}
