import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { home } from "@/content/pages";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceArt } from "@/components/visuals/ServiceArt";
import { ServiceIcon } from "@/components/visuals/ServiceIcon";

export const metadata: Metadata = pageMetadata({
  title: "AI, Automation & Software Development Services | Bizpedia Tech",
  description: home.services.text,
  path: "/services",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        eyebrow="Our Services"
        title={home.services.title}
        highlight={4}
        intro={home.services.text}
        breadcrumbs={crumbs}
        actions={<ButtonLink href="/contact">Discuss Your Project</ButtonLink>}
      >
        <nav aria-label="Jump to a service" className="mt-12 flex flex-wrap gap-2">
          {services.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-3.5 py-2 text-xs font-medium text-fg transition-colors hover:border-accent-2">
              <ServiceIcon slug={s.slug} className="h-3.5 w-3.5 text-accent-text" />
              {s.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="pb-24" aria-label="All services">
        <div className="container-site space-y-6">
          {services.map((s, i) => {
            const summary = s.summary || s.intro.split(". ")[0] + ".";
            const flip = i % 2 === 1;
            return (
              <Reveal key={s.slug}>
                <article id={s.slug} className="card group grid scroll-mt-28 items-center gap-8 overflow-hidden p-6 sm:p-10 lg:grid-cols-2">
                  <div className={flip ? "lg:order-2" : ""}>
                    <span className="font-display text-sm font-bold text-accent-text">{String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
                    <h2 className="mt-3 font-display text-3xl font-bold text-fg">{s.name}</h2>
                    <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">{summary}</p>
                    <ul className="mt-6 grid gap-2 text-sm text-fg-soft sm:grid-cols-2">
                      {s.offerings.slice(0, 4).map((o) => (
                        <li key={o.title} className="flex items-start gap-2">
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
                          {o.title}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/services/${s.slug}`} className="mt-8 inline-flex items-center gap-2 font-semibold text-accent-text">
                      Explore {s.name} <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                  <div className={`relative rounded-2xl border border-line bg-bg-soft p-4 ${flip ? "lg:order-1" : ""}`}>
                    <ServiceArt slug={s.slug} className="h-auto w-full" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="tone-invert py-20" aria-label="Engagement models">
        <div className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">Flexible Ways to Build Your Next Technology Project</h2>
            <p className="mt-2 text-muted">Choose a project model for fixed-scope delivery, prototypes, dedicated development or ongoing maintenance.</p>
          </div>
          <ButtonLink href="/engagement-models" variant="dark">View Engagement Models</ButtonLink>
        </div>
      </section>

      <CtaBand title={home.cta.title} text={home.cta.text} primary={{ label: home.cta.primary, href: "/contact" }} />
    </>
  );
}
