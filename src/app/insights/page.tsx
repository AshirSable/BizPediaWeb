import type { Metadata } from "next";
import { BookOpenText } from "lucide-react";
import { insights } from "@/content/pages";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({ ...insights.seo, path: "/insights" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
];

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero eyebrow="Insights" title={insights.h1} highlight={3} intro={insights.intro} breadcrumbs={crumbs}>
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Article categories">
          {insights.categories.map((c) => (
            <li key={c} className="rounded-full border border-line-strong bg-card px-4 py-2 text-sm font-medium text-fg">
              {c}
            </li>
          ))}
        </ul>
      </PageHero>
      <section className="pb-28" aria-label="Articles">
        <Reveal className="container-site">
          <div className="card grid place-items-center px-6 py-20 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[var(--glow)] text-accent-text">
              <BookOpenText aria-hidden className="h-7 w-7" strokeWidth={1.6} />
            </span>
            <h2 className="mt-6 font-display text-2xl font-bold text-fg">Articles are on the way</h2>
            <p className="mt-3 max-w-md text-muted">Our first guides are being written. In the meantime, we are happy to talk through your technology questions directly.</p>
            <ButtonLink href="/contact" className="mt-8">{insights.cta}</ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
