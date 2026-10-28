import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "./Logo";
import { legalLinks, quickLinks, secondaryLinks, site } from "@/content/site";
import { services } from "@/content/services";

export function Footer() {
  return (
    // Always dark, and it starts on the exact colour the closing CTA scene fades to (#02050d),
    // so the two read as one continuous surface with no seam.
    <footer className="tone-dark relative overflow-hidden !bg-[linear-gradient(to_bottom,#02050d_0%,#040917_55%,#060c1d_100%)]">
      <div aria-hidden className="pointer-events-none absolute -bottom-48 left-1/2 h-96 w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(36_99_255/0.14),transparent)]" />      <div className="container-site relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1fr]">
        <div>
          <Link href="/" aria-label="Bizpedia Tech home">
            <Logo />
          </Link>
          <p className="mt-5 text-sm font-semibold text-fg">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{site.footerBlurb}</p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="font-sans text-sm font-semibold tracking-normal text-fg">Quick Links</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted transition-colors hover:text-accent-text">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Our services">
          <h2 className="font-sans text-sm font-semibold tracking-normal text-fg">Our Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-muted transition-colors hover:text-accent-text">{s.footerName}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-normal text-fg">Contact</h2>
          <p className="mt-4 text-sm text-muted">{site.legalName}</p>
          <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-text hover:underline">
            <Mail aria-hidden className="h-4 w-4" /> Send a project enquiry
          </Link>
          <ul className="mt-6 space-y-2.5 text-sm">
            {secondaryLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted transition-colors hover:text-accent-text">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-subtle sm:flex-row">
          <p>Copyright © 2026 {site.legalName}. All rights reserved.</p>
          <ul className="flex gap-5">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent-text">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
