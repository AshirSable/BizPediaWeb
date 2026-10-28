"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { primaryNav } from "@/content/site";
import { services } from "@/content/services";
import { ServiceIcon } from "@/components/visuals/ServiceIcon";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-line bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className={`container-site flex items-center justify-between gap-6 transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
        <Link href="/" aria-label="Bizpedia Tech home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) =>
              item.label === "Services" ? (
                <li key={item.href} className="relative" onMouseEnter={openServices} onMouseLeave={scheduleClose}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={`rounded-lg py-2 pl-3 pr-1 text-[0.85rem] font-medium transition-colors hover:text-fg ${
                        isActive(item.href) ? "text-fg" : "text-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      aria-label="Show services"
                      onClick={() => setServicesOpen((v) => !v)}
                      className="rounded-md p-1 text-muted hover:text-fg"
                    >
                      <ChevronDown aria-hidden className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        id="services-menu"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 top-full w-[40rem] -translate-x-1/2 pt-3"
                      >
                        <div className="glass grid grid-cols-2 gap-1 rounded-2xl p-2 shadow-2xl shadow-black/30">
                          {services.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              onFocus={openServices}
                              onBlur={scheduleClose}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[var(--glow)]"
                            >
                              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-bg-soft text-accent-text">
                                <ServiceIcon slug={s.slug} className="h-4.5 w-4.5" />
                              </span>
                              <span>
                                <span className="block text-sm font-semibold text-fg">{s.name}</span>
                                <span className="mt-0.5 line-clamp-1 block text-xs text-subtle">{s.seo.description}</span>
                              </span>
                            </Link>
                          ))}
                          <Link
                            href="/services"
                            className="flex items-center justify-center gap-2 rounded-xl p-3 text-sm font-semibold text-accent-text hover:bg-[var(--glow)]"
                          >
                            Explore All Services <ArrowRight aria-hidden className="h-4 w-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative rounded-lg px-3 py-2 text-[0.85rem] font-medium transition-colors hover:text-fg ${
                      isActive(item.href) ? "text-fg" : "text-muted"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-2" />
                    )}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-xl bg-[linear-gradient(110deg,#1d4fff,#3d9bff)] px-4 py-2.5 text-[0.82rem] font-semibold text-white shadow-[0_8px_24px_-8px_rgb(36_99_255/0.7)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Discuss Your Project <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-line-strong text-fg lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="container-site py-6">
              <ul className="space-y-1">
                {primaryNav.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`block rounded-xl px-3 py-3 font-display text-2xl font-semibold ${isActive(item.href) ? "text-accent-text" : "text-fg"}`}
                    >
                      {item.label}
                    </Link>
                    {item.label === "Services" && (
                      <ul className="mb-2 ml-3 border-l border-line pl-3">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link href={`/services/${s.slug}`} className="block py-2 text-sm text-muted hover:text-fg">
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 font-semibold text-white"
              >
                Discuss Your Project <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
