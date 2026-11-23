import type { Metadata } from "next";
import { Film, Megaphone, Sparkles, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { HeroNetwork } from "@/components/marketing/hero-network";
import { ResultsSection } from "@/components/marketing/results-section";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Velqora Media — Performance marketing & brand partnerships",
  description:
    "Velqora Media runs paid social, influencer partnerships, and brand deals for entertainment and consumer brands — the same playbook behind real accounts like Natasha Graziano, Solrise Fuels, Men's Health, and THINX.",
};

const SERVICES = [
  {
    icon: Megaphone,
    title: "Paid social & performance ads",
    description:
      "Meta, TikTok, and Google campaigns built and optimized for ROAS — not vanity metrics. We run the ad accounts ourselves, day to day.",
  },
  {
    icon: Users,
    title: "Influencer & creator partnerships",
    description:
      "Sourcing, negotiating, and managing brand deals with creators — from a single sponsored post to a recurring partnership.",
  },
  {
    icon: Film,
    title: "Live events & brand activations",
    description:
      "On-the-ground production and talent coordination for brand activations, from booking to day-of execution.",
  },
  {
    icon: Sparkles,
    title: "Funnel & landing page builds",
    description:
      "Pages built to convert the traffic we're already buying — wired straight into the same CRM stack running the ad accounts.",
  },
] as const;

export default function MarketingHomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="app-aurora" />
      <div className="app-noise" />

      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader />

        <main className="flex-1">
          {/* Hero */}
          <section className="relative overflow-hidden">
            <div className="app-aurora-hero" />
            <div className="app-grid" />
            <HeroNetwork />

            <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32">
              <div className="mx-auto max-w-3xl text-center">
                <Badge
                  variant="outline"
                  className="enter-up mx-auto border-primary/30 bg-primary/10 text-primary"
                >
                  <Sparkles className="h-3 w-3" />
                  Performance marketing &amp; brand partnerships
                </Badge>

                <h1
                  className="enter-up text-balance mt-7 font-heading text-[2.75rem] leading-[1.08] font-semibold tracking-tight sm:text-6xl md:text-[4.25rem]"
                  style={{ animationDelay: "60ms" }}
                >
                  We run the ads{" "}
                  <span className="bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
                    other agencies just report on
                  </span>
                </h1>

                <p
                  className="enter-up mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
                  style={{ animationDelay: "120ms" }}
                >
                  Velqora Media is a small, hands-on team running paid social, influencer
                  partnerships, and brand deals for entertainment and consumer brands —
                  real accounts, real ad spend, real ROAS.
                </p>

                <div
                  className="enter-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
                  style={{ animationDelay: "180ms" }}
                >
                  <Button
                    size="lg"
                    className="h-12 px-7 text-base shadow-[0_0_32px_-8px_rgba(47,111,238,0.65)] transition-shadow hover:shadow-[0_0_44px_-6px_rgba(47,111,238,0.85)]"
                    render={<a href="#contact">Work with us</a>}
                  />
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-7 text-base"
                    render={<a href="#results">See results</a>}
                  />
                </div>
              </div>
            </div>
          </section>

          <ResultsSection />

          {/* Services */}
          <section id="services" className="relative border-t border-white/[0.06] bg-card/20">
            <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                  Services
                </span>
                <h2 className="text-balance mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  What we run, end to end
                </h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                  No fixed packages — every engagement is scoped to the brand. These are
                  the pieces we put together most often.
                </p>
              </div>

              <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {SERVICES.map((service) => (
                  <Card
                    key={service.title}
                    className="glass-panel group border-transparent p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-5 font-heading text-base font-semibold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Founder / about */}
          <section id="about" className="relative border-t border-white/[0.06]">
            <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                  About
                </span>
                <h2 className="text-balance mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  Run by one operator, not an account team
                </h2>
              </div>

              <div className="glass-panel mt-12 flex flex-col items-center gap-6 rounded-2xl p-8 text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
                {/* Placeholder avatar — replace with Gael's real photo */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-sky-400 font-heading text-3xl font-semibold text-white shadow-[0_0_30px_-6px_rgba(47,111,238,0.6)]">
                  G
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight">
                    Gael Melchy Calderón
                  </h3>
                  <p className="text-sm text-primary">Founder</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Gael is a Los Angeles-based entrepreneur with a background in talent
                    management, live events, and brand partnerships in entertainment.
                    Velqora Media grew out of running ad accounts and brand deals for real
                    clients himself — no account managers relaying between you and the
                    person actually in the ads platform.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="relative border-t border-white/[0.06] bg-card/20">
            <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
              <div className="mx-auto max-w-xl text-center">
                <span className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                  Contact
                </span>
                <h2 className="text-balance mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  Tell us about your brand
                </h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                  What you&rsquo;re running today, what you want to scale — we&rsquo;ll get
                  back to you shortly. You&rsquo;ll get a confirmation the moment you submit.
                </p>
              </div>

              <div className="mt-12">
                <ContactForm />
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
