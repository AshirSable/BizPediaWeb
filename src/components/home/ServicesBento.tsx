import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Highlight } from "@/components/ui/SectionHeading";
import { ServiceArt } from "@/components/visuals/ServiceArt";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { homeServices } from "@/content/services";
import { home } from "@/content/pages";

export function ServicesBento() {
  const { title, text, button } = home.services;
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="services-title">
      <div aria-hidden className="absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-60" />
      <div className="container-site relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-3xl">
            <Eyebrow>Our Services</Eyebrow>
            <h2 id="services-title" className="mt-4 font-display text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
              <Highlight text={title} words={4} />
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-md lg:text-right">
            <p className="text-muted">{text}</p>
            <ButtonLink href="/services" variant="outline" className="mt-5">
              {button}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {homeServices.map((s, i) => {
            const large = i < 2;
            return (
              <Reveal key={s.slug} delay={(i % 4) * 0.06} className={large ? "md:col-span-1 lg:col-span-2" : ""}>
                <SpotlightCard className="h-full">
                  <Link
                    href={`/services/${s.slug}`}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] p-6 ${large ? "lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-4" : ""}`}
                  >
                    <div className={`relative ${large ? "lg:order-2" : ""}`}>
                      <ServiceArt slug={s.slug} className={`w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] ${large ? "h-48 lg:h-56" : "h-40"}`} />
                    </div>
                    <div className={`mt-4 flex flex-1 flex-col ${large ? "lg:order-1 lg:mt-0" : ""}`}>
                      <h3 className="font-display text-lg font-semibold leading-snug text-fg">{s.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
                      <span className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-fg transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                        <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:rotate-45" />
                        <span className="sr-only">Learn more about {s.name}</span>
                      </span>
                    </div>
                  </Link>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
