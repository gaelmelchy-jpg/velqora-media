"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, Target, ShoppingCart, DollarSign } from "lucide-react";

const CLIENTS = [
  { name: "Solrise Fuels", href: "https://solrisefuels.com/" },
  { name: "Natasha Graziano", href: "https://www.instagram.com/natashagraziano/" },
  { name: "Men's Health", href: "https://www.mens.com/" },
  { name: "THINX", href: "https://www.thinx.com/" },
] as const;

type Stat = {
  icon: typeof TrendingUp;
  value: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  {
    icon: DollarSign,
    value: 0.08,
    decimals: 2,
    prefix: "$",
    label: "Cost per lead on Natasha Graziano's funnel — closing at $5K per deal",
  },
  {
    icon: TrendingUp,
    value: 6.75,
    decimals: 2,
    suffix: "×",
    label: "Peak ROAS across managed ad accounts",
  },
  {
    icon: ShoppingCart,
    value: 1172,
    decimals: 0,
    suffix: "+",
    label: "Purchases driven in a single active campaign window",
  },
  {
    icon: Target,
    value: 130662,
    decimals: 0,
    prefix: "$",
    suffix: "+",
    label: "Purchase value tracked in a single week, one account",
  },
];

/** Count-up animation, gated on scroll-into-view. Respects prefers-reduced-motion by
 *  skipping straight to the final value instead of animating — same rule HeroNetwork
 *  follows for its canvas loop. */
function AnimatedNumber({ value, decimals, start }: { value: number; decimals: number; start: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    let rafId = 0;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, value]);

  const formatted =
    value >= 1000
      ? Math.round(display).toLocaleString("en-US")
      : display.toFixed(decimals);

  return <>{formatted}</>;
}

export function ResultsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="results" className="relative border-t border-white/[0.06]">
      <div ref={sectionRef} className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Proof
          </span>
          <h2 className="text-balance mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Real accounts, real numbers
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            These aren&rsquo;t case studies pulled from a deck — they&rsquo;re live
            accounts we run today.
          </p>
        </div>

        {/* Client wordmarks */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {CLIENTS.map((client) => (
            <a
              key={client.name}
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative font-heading text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors duration-300 hover:text-foreground sm:text-xl"
            >
              {client.name}
              <span className="absolute inset-x-0 -bottom-1.5 h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        {/* Animated stat grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel group flex flex-col gap-3 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <stat.icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <div className="font-heading text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                {stat.prefix}
                <AnimatedNumber value={stat.value} decimals={stat.decimals} start={inView} />
                {stat.suffix}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
