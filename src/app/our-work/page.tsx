import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import { ourWork } from "@/content/pages";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { DocumentDemo } from "@/components/demos/DocumentDemo";
import { KnowledgeDemo } from "@/components/demos/KnowledgeDemo";
import { LeadDemo } from "@/components/demos/LeadDemo";

export const metadata: Metadata = pageMetadata({ ...ourWork.seo, path: "/our-work" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Our Work", path: "/our-work" },
];
const demoComponents = [DocumentDemo, KnowledgeDemo, LeadDemo];

export default function OurWorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero eyebrow="Our Work & Demonstrations" title={ourWork.h1} highlight={2} intro={ourWork.intro} breadcrumbs={crumbs}>
        <div className="mt-8 inline-flex items-start gap-3 rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-3 text-sm text-fg-soft">
          <FlaskConical aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#d97706]" />
          These are interactive reference demonstrations that run in your browser with sample data. They are not client projects and do not connect to real systems.
        </div>
        <nav aria-label="Demonstrations" className="mt-8 flex flex-wrap gap-2">
          {ourWork.demos.map((d) => (
            <a key={d.id} href={`#${d.id}`} className="rounded-full border border-line-strong bg-card px-4 py-2 text-sm font-medium text-fg hover:border-accent-2">
              {d.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {ourWork.demos.map((d, i) => {
        const Demo = demoComponents[i];
        return (
          <section key={d.id} id={d.id} className={`scroll-mt-20 py-20 sm:py-24 ${i % 2 === 1 ? "tone-invert" : ""}`} aria-labelledby={`${d.id}-title`}>
            <div className="container-site grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <Eyebrow>Demonstration {String(i + 1).padStart(2, "0")}</Eyebrow>
                <h2 id={`${d.id}-title`} className="mt-4 font-display text-3xl font-bold text-fg sm:text-4xl">
                  {d.title}
                </h2>
                <p className="mt-4 font-display text-xl font-semibold text-accent-text">{d.lead}</p>
                <p className="mt-4 text-lg leading-relaxed text-muted">{d.text}</p>
              </Reveal>
              <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <Demo />
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="border-t border-line py-20" aria-label={ourWork.closing.title}>
        <Reveal className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-fg">{ourWork.closing.title}</h2>
            <p className="mt-3 text-lg text-muted">{ourWork.closing.text}</p>
          </div>
          <ButtonLink href="/contact">{ourWork.finalCta}</ButtonLink>
        </Reveal>
      </section>

      <CtaBand title={ourWork.finalCta} primary={{ label: ourWork.finalCta, href: "/contact" }} secondary={{ label: "Explore Our Services", href: "/services" }} />
    </>
  );
}
