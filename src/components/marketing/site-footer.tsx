import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-card/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-sky-400 text-xs font-bold text-white">
              V
            </div>
            <span className="font-heading text-sm font-semibold tracking-tight">
              Velqora Media
            </span>
          </a>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Performance marketing, influencer partnerships, and brand deals for
            entertainment and consumer brands.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6 text-sm">
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold tracking-wider text-muted-foreground/70 uppercase">
              Agency
            </span>
            <a
              href="#results"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Results
            </a>
            <a
              href="#services"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </a>
            <a
              href="#about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </a>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold tracking-wider text-muted-foreground/70 uppercase">
              Legal
            </span>
            <Link
              href="/terms"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 pb-8 text-xs text-muted-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>© 2026 Velqora Media. All rights reserved.</span>
        <span className="flex gap-4">
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
        </span>
      </div>
    </footer>
  );
}
