"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * Mouse-tracked 3D tilt + glare, the tactile "wow" interaction agency portfolio
 * sites use on logo/result tiles. Pure CSS transform (perspective + rotateX/Y) —
 * no WebGL needed for a hover-only effect on a handful of cards. Falls back to a
 * flat hover (no tilt) under prefers-reduced-motion, same rule as every other
 * animation on this site.
 */
export function TiltCard({
  children,
  className = "",
  href,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 14;
    const rotateX = (0.5 - py) * 14;
    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`,
    });
    setGlare({ x: px * 100, y: py * 100, opacity: 0.12 });
  }

  function handleLeave() {
    setStyle({ transform: "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)" });
    setGlare((g) => ({ ...g, opacity: 0 }));
  }

  const card = (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...style, transition: "transform 0.15s ease-out" }}
      className={`glass-panel group relative overflow-hidden will-change-transform ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-150"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(240px circle at ${glare.x}% ${glare.y}%, white, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="contents">
        {card}
      </a>
    );
  }

  return card;
}
