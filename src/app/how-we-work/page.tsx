import type { Metadata } from "next";
import { howWeWork } from "@/content/pages";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Highlight } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProcessTimeline } from "@/components/visuals/ProcessTimeline";
import { ProcessDial } from "@/components/visuals/ProcessDial";

export const metadata: Metadata = pageMetadata({ ...howWeWork.seo, path: "/how-we-work" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "How We Work", path: "/how-we-work" },
];

export default function HowWeWorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: howWeWork.h1,
          description: howWeWork.intro,
          step: howWeWork.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
        }}
      />
      <PageHero
        eyebrow="How We Work"
        title={howWeWork.h1}
        highlight={2}
        intro={howWeWork.intro}
        breadcrumbs={crumbs}
        actions={<ButtonLink href="/contact">{howWeWork.finalCta}</ButtonLink>}
        visual={<ProcessDial steps={howWeWork.steps.map((s) => s.title)} />}
      />

      <section className="relative py-20 sm:py-28" aria-label="Our process, step by step">
        <div className="container-site">
          <ProcessTimeline steps={howWeWork.steps} />
        </div>
      </section>

      <section className="tone-invert py-24" aria-label={howWeWork.closing.title}>
        <Reveal className="container-site max-w-4xl text-center">
          <Eyebrow className="justify-center">Delivery</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-5xl">
            <Highlight text={howWeWork.closing.title} words={2} />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">{howWeWork.closing.text}</p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/engagement-models" variant="dark">View Engagement Models</ButtonLink>
          </div>
        </Reveal>
      </section>

      <CtaBand title={howWeWork.finalCta} primary={{ label: howWeWork.finalCta, href: "/contact" }} />
    </>
  );
}
