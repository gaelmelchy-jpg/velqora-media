"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight Canvas 2D network field for the marketing hero — suggests an
 * AI-native, connected product without the weight of a 3D/WebGL library.
 *
 * Perf/accessibility rules this intentionally follows:
 * - No animation loop at all when `prefers-reduced-motion: reduce` — draws one
 *   static frame and stops.
 * - Pauses the RAF loop when the tab is hidden or the canvas scrolls
 *   off-screen (IntersectionObserver), so it never burns a background frame
 *   budget.
 * - Particle count scales down on narrow/mobile viewports.
 * - Capped device pixel ratio (2x) to avoid oversized canvases on hi-dpi
 *   displays eating fill-rate for no visible gain.
 */
export function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;
    let visible = true;
    let lastTime = 0;

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];

    function nodeCountForWidth(w: number) {
      if (w < 640) return 26;
      if (w < 1024) return 40;
      return 58;
    }

    function seed() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.max(1, Math.floor(width * dpr));
      canvas!.height = Math.max(1, Math.floor(height * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = nodeCountForWidth(width);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.6,
      }));
    }

    const LINK_DIST = 150;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Connections first, so nodes render on top.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.22;
            ctx.strokeStyle = `rgba(93, 149, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(151, 184, 255, 0.85)";
        ctx.fill();
      }
    }

    function step(time: number) {
      if (!visible) return;
      const dt = lastTime ? Math.min(time - lastTime, 48) : 16;
      lastTime = time;

      for (const n of nodes) {
        n.x += n.vx * (dt / 16);
        n.y += n.vy * (dt / 16);
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      draw();
      rafId = requestAnimationFrame(step);
    }

    seed();
    draw();

    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        seed();
        draw();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !reduceMotion) {
        lastTime = 0;
        rafId = requestAnimationFrame(step);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    let observer: IntersectionObserver | undefined;
    if (!reduceMotion) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const onScreen = entry?.isIntersecting ?? true;
          visible = onScreen && !document.hidden;
          if (visible) {
            lastTime = 0;
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(step);
          } else {
            cancelAnimationFrame(rafId);
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(canvas);
      rafId = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent_85%)]"
    />
  );
}
