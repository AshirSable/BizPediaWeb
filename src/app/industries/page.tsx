import type { Metadata } from "next";
import { Info } from "lucide-react";
import { industries } from "@/content/pages";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { IndustryScene, industryIcon } from "@/components/visuals/IndustryTile";
import { IndustryNav } from "@/components/visuals/IndustryNav";

export const metadata: Metadata = pageMetadata({ ...industries.seo, path: "/industries" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        eyebrow="Industries We Serve"
        title={industries.h1}
        highlight={2}
        intro={industries.intro}
        breadcrumbs={crumbs}
        actions={<ButtonLink href="/contact">{industries.finalCta}</ButtonLink>}
        visual={
          <div className="grid grid-cols-4 gap-2.5" aria-hidden>
            {industries.items.map((it, i) => (
              <div key={it.id} className={`overflow-hidden rounded-2xl border border-line ${i % 3 === 0 ? "translate-y-4" : ""}`}>
                <IndustryScene id={it.id} variant="hero" className="relative block aspect-[3/4]" />
              </div>
            ))}
          </div>
        }
      />

      <section className="relative pb-24" aria-label="Industries">
        <div className="container-site grid gap-12 lg:grid-cols-[16rem_1fr]">
          <IndustryNav items={industries.items.map(({ id, title }) => ({ id, title }))} />
          <div className="space-y-5">
            {industries.items.map((it, i) => {
              const Icon = industryIcon(it.id);
              return (
                <Reveal key={it.id}>
                  <article id={it.id} className="card group grid scroll-mt-28 overflow-hidden sm:grid-cols-[18rem_1fr]">
                    <IndustryScene id={it.id} variant="list" className="relative block h-48 sm:h-full sm:min-h-[12rem]" />
                    <div className="p-7 sm:p-9">
                      <div className="flex items-center gap-3">
                        <Icon aria-hidden className="h-5 w-5 text-accent-text" strokeWidth={1.8} />
                        <span className="font-display text-sm font-bold text-subtle">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <h2 className="mt-3 font-display text-2xl font-bold text-fg sm:text-3xl">{it.title}</h2>
                      <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">{it.text}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="tone-invert py-20" aria-label={industries.closing.title}>
        <Reveal className="container-site">
          <div className="card flex flex-col gap-6 p-8 sm:flex-row sm:items-start sm:p-10">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--glow)] text-accent-text">
              <Info aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">{industries.closing.title}</h2>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">{industries.closing.text}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand title={industries.finalCta} primary={{ label: industries.finalCta, href: "/contact" }} secondary={{ label: "Explore Our Services", href: "/services" }} />
    </>
  );
}
