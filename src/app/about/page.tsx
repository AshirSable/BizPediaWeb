import type { Metadata } from "next";
import { Compass, Eye, Handshake, Lightbulb, ShieldCheck, Sprout, Target } from "lucide-react";
import { about } from "@/content/pages";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { MotionItem } from "@/components/ui/MotionItem";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { BrandOrbit } from "@/components/visuals/BrandOrbit";

export const metadata: Metadata = pageMetadata({ ...about.seo, path: "/about" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];
const valueIcons = [Target, Lightbulb, Handshake, ShieldCheck, Sprout];
const disciplines = ["Business understanding", "Product design", "Software engineering", "Data science"];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        eyebrow="About Bizpedia Tech"
        title={about.h1}
        highlight={3}
        intro={about.paragraphs[0]}
        breadcrumbs={crumbs}
        actions={<ButtonLink href="/contact">{about.finalCta}</ButtonLink>}
        visual={<BrandOrbit />}
      />

      {/* Philosophy */}
      <section className="tone-invert relative overflow-hidden py-24 sm:py-28" aria-label="Our approach">
        <div className="container-site grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <Reveal>
            <p className="font-display text-2xl font-medium leading-snug text-fg sm:text-3xl">{about.paragraphs[1]}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid grid-cols-2 gap-3">
              {disciplines.map((d, i) => (
                <li key={d} className="card flex aspect-[4/3] flex-col justify-between p-5">
                  <span className="font-display text-sm font-bold text-accent-text">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-lg font-semibold leading-tight text-fg">{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="py-24 sm:py-28" aria-label="Mission and vision">
        <div className="container-site grid gap-5 md:grid-cols-2">
          {[
            { label: "Our Mission", text: about.mission, icon: Compass },
            { label: "Our Vision", text: about.vision, icon: Eye },
          ].map(({ label, text, icon: Icon }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-line bg-[linear-gradient(150deg,var(--bg-elev),var(--bg-soft))] p-8 sm:p-10">
                <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1d4fff,#3d9bff)] text-white">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <h2 className="relative mt-6 font-display text-sm font-semibold uppercase tracking-[0.16em] text-accent-text">{label}</h2>
                <p className="relative mt-3 font-display text-2xl font-semibold leading-snug text-fg sm:text-3xl">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="tone-invert relative py-24 sm:py-28" aria-label={about.valuesTitle}>
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-site relative">
          <SectionHeading eyebrow="Our Values" title={about.valuesTitle} highlight={2} />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {about.values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <MotionItem key={v.title}>
                  <SpotlightCard className="h-full p-6">
                    <Icon aria-hidden className="h-7 w-7 text-accent-text" strokeWidth={1.6} />
                    <h3 className="mt-8 font-display text-lg font-semibold text-fg">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
                  </SpotlightCard>
                </MotionItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="py-20" aria-label="Brand idea">
        <div className="container-site text-center">
          <Eyebrow className="justify-center">Our Brand Idea</Eyebrow>
          <p className="mx-auto mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-fg sm:text-6xl">
            Ideas to Intelligence. <span className="text-gradient">Intelligence to Impact.</span>
          </p>
        </div>
      </section>

      <CtaBand title={about.finalCta} primary={{ label: about.finalCta, href: "/contact" }} secondary={{ label: "Explore Our Services", href: "/services" }} />
    </>
  );
}
