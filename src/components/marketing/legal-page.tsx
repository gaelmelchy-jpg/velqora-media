import type { ReactNode } from "react";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";

type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="app-aurora" />
      <div className="app-noise" />

      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader />

        <main className="flex-1">
          <section className="relative border-b border-white/[0.06]">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
              <span className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Legal
              </span>
              <h1 className="text-balance mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-sm text-muted-foreground/70">
                Last updated: {lastUpdated}
              </p>
            </div>
          </section>

          <section className="relative">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[220px_1fr] lg:gap-16">
              {/* Section nav — hidden on mobile, sticky on larger screens */}
              <nav className="hidden lg:block">
                <div className="sticky top-24 flex flex-col gap-1 border-l border-white/[0.06] pl-5">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {section.heading}
                    </a>
                  ))}
                </div>
              </nav>

              <div className="max-w-[680px]">
                <div className="glass-panel rounded-2xl border-transparent p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
                  {intro}
                </div>

                <div className="mt-10 flex flex-col gap-12">
                  {sections.map((section, index) => (
                    <div key={section.id} id={section.id} className="scroll-mt-24">
                      <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                        <span className="mr-2 text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.heading}
                      </h2>
                      <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-medium [&_strong]:text-foreground [&_li]:leading-relaxed">
                        {section.body}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
