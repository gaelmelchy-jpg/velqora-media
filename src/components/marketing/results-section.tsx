"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, Target, ShoppingCart, DollarSign } from "lucide-react";

const CLIENTS = [
  {
    name: "Solrise Fuels",
    category: "Energy & fuel",
    initial: "S",
    href: "https://solrisefuels.com/",
  },
  {
    name: "Natasha Graziano",
    category: "Creator & speaker",
    initial: "N",
    href: "https://www.instagram.com/natashagraziano/",
  },
  {
    name: "Mens.com",
    category: "Men's telehealth",
    initial: "M",
    href: "https://www.mens.com/",
  },
  {
    name: "THINX",
    category: "Apparel",
    initial: "T",
    href: "https://www.thinx.com/",
  },
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

        {/* Client grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {CLIENTS.map((client) => (
            <a
              key={client.name}
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel group flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-sky-400 font-heading text-base font-semibold text-white shadow-[0_0_20px_-6px_rgba(47,111,238,0.6)] transition-shadow group-hover:shadow-[0_0_26px_-4px_rgba(47,111,238,0.85)]">
                {client.initial}
              </div>
              <span className="font-heading text-sm font-semibold tracking-tight sm:text-base">
                {client.name}
              </span>
              <span className="text-xs text-muted-foreground">{client.category}</span>
            </a>
          ))}
        </div>

        {/* Animated stat grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
