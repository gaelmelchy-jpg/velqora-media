import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Results", href: "#results" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-background/75 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-sky-400 text-sm font-bold text-white shadow-[0_0_20px_-4px_rgba(47,111,238,0.75)] transition-shadow group-hover:shadow-[0_0_26px_-2px_rgba(47,111,238,0.9)]">
            V
          </div>
          <span className="font-heading text-[15px] font-semibold tracking-tight">
            Velqora Media
          </span>
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-[21px] h-px scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button size="sm" render={<a href="#contact">Work with us</a>} />
        </div>
      </div>
    </header>
  );
}
