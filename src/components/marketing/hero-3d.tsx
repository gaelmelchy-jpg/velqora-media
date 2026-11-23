"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * WebGL 3D particle field for the marketing hero — a real depth-of-field
 * constellation (not a flat 2D canvas), with mouse-parallax and a slow
 * autonomous rotation. Built with vanilla Three.js (no React renderer
 * dependency) to keep the bundle small for a handful of decorative points.
 *
 * Same perf/accessibility discipline as the rest of this site:
 * - No animation loop at all under prefers-reduced-motion — renders one
 *   static frame and stops.
 * - Pauses the render loop when the canvas scrolls off-screen
 *   (IntersectionObserver) or the tab is hidden, so it never burns a
 *   background frame budget.
 * - Particle/line count scales down on narrow viewports.
 * - Capped device pixel ratio (2x).
 * - Full WebGL resource disposal on unmount.
 */
export function Hero3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Soft circular sprite for glowing points — drawn once to a canvas texture
    // rather than loading an external image.
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const sctx = spriteCanvas.getContext("2d")!;
    const gradient = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(120,170,255,0.6)");
    gradient.addColorStop(1, "rgba(120,170,255,0)");
    sctx.fillStyle = gradient;
    sctx.fillRect(0, 0, 64, 64);
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    function particleCountForWidth(w: number) {
      if (w < 640) return 90;
      if (w < 1024) return 140;
      return 200;
    }

    const count = particleCountForWidth(window.innerWidth);
    const positions = new Float32Array(count * 3);
    const velocities: THREE.Vector3[] = [];
    const spread = 16;
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.004
        )
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.32,
      map: spriteTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.9,
    });

    const points = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    // Constellation lines between nearby particles — a thin, dim blue mesh of
    // connections that gives real depth as the field rotates.
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3a7bed,
      transparent: true,
      opacity: 0.18,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const maxLines = count * 3;
    const linePositions = new Float32Array(maxLines * 6);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);

    function updateLines() {
      const pos = geometry.attributes.position.array as Float32Array;
      let lineIndex = 0;
      const maxDistSq = 16;
      for (let i = 0; i < count && lineIndex < maxLines; i++) {
        for (let j = i + 1; j < count && lineIndex < maxLines; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;
          if (distSq < maxDistSq) {
            const base = lineIndex * 6;
            linePositions[base] = pos[i * 3];
            linePositions[base + 1] = pos[i * 3 + 1];
            linePositions[base + 2] = pos[i * 3 + 2];
            linePositions[base + 3] = pos[j * 3];
            linePositions[base + 4] = pos[j * 3 + 1];
            linePositions[base + 5] = pos[j * 3 + 2];
            lineIndex++;
          }
        }
      }
      lineGeometry.setDrawRange(0, lineIndex * 2);
      lineGeometry.attributes.position.needsUpdate = true;
    }

    function resize() {
      const rect = container!.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    resize();
    updateLines();

    let pointerX = 0;
    let pointerY = 0;
    function handlePointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      pointerX = (e.clientX - rect.left) / rect.width - 0.5;
      pointerY = (e.clientY - rect.top) / rect.height - 0.5;
    }
    window.addEventListener("pointermove", handlePointerMove);

    let rafId = 0;
    let visible = true;
    let running = !reduceMotion;
    let lineUpdateCounter = 0;

    function animate() {
      if (!running) return;
      rafId = requestAnimationFrame(animate);
      if (!visible || document.hidden) return;

      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;
        for (let axis = 0; axis < 3; axis++) {
          const limit = axis === 1 ? spread / 2 : spread;
          if (pos[i * 3 + axis] > limit || pos[i * 3 + axis] < -limit) {
            velocities[i].setComponent(axis, -velocities[i].getComponent(axis));
          }
        }
      }
      geometry.attributes.position.needsUpdate = true;

      lineUpdateCounter++;
      if (lineUpdateCounter % 3 === 0) updateLines();

      group.rotation.y += 0.0009;
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointerY * 0.3, 0.03);
      group.rotation.y += pointerX * 0.0004;

      renderer.render(scene, camera);
    }

    if (reduceMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    function handleVisibilityChange() {
      if (!document.hidden && running) renderer.render(scene, camera);
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      geometry.dispose();
      lineGeometry.dispose();
      material.dispose();
      lineMaterial.dispose();
      spriteTexture.dispose();
      renderer.dispose();
      container!.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 [&>canvas]:h-full [&>canvas]:w-full"
      aria-hidden="true"
    />
  );
}
