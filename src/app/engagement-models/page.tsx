import type { Metadata } from "next";
import { CalendarClock, FlaskConical, Users, Wrench } from "lucide-react";
import { engagement } from "@/content/pages";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { MotionItem } from "@/components/ui/MotionItem";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({ ...engagement.seo, path: "/engagement-models" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Engagement Models", path: "/engagement-models" },
];
const icons = [CalendarClock, FlaskConical, Users, Wrench];
// Simple visual cue for how each model is shaped (scope clarity vs. ongoing involvement)
const shapes = ["Defined scope", "Exploratory", "Ongoing", "Continuous support"];

export default function EngagementPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        eyebrow="Engagement Models"
        title={engagement.h1}
        highlight={3}
        intro={engagement.intro}
        breadcrumbs={crumbs}
        actions={<ButtonLink href="/contact">{engagement.finalCta}</ButtonLink>}
      />
      <section className="pb-24" aria-label="Engagement models">
        <div className="container-site">
          <RevealGroup className="grid gap-4 md:grid-cols-2">
            {engagement.models.map((m, i) => {
              const Icon = icons[i];
              return (
                <MotionItem key={m.title}>
                  <SpotlightCard className="h-full p-8 sm:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1d4fff,#3d9bff)] text-white shadow-[0_12px_30px_-10px_rgb(36_99_255/0.8)]">
                        <Icon aria-hidden className="h-6 w-6" strokeWidth={1.7} />
                      </span>
                      <span className="rounded-full border border-line-strong px-3 py-1 text-xs font-semibold text-muted">{shapes[i]}</span>
                    </div>
                    <h2 className="mt-8 font-display text-2xl font-bold text-fg">{m.title}</h2>
                    <p className="mt-3 text-lg leading-relaxed text-muted">{m.text}</p>
                  </SpotlightCard>
                </MotionItem>
              );
            })}
          </RevealGroup>
          <Reveal className="mt-6">
            <div className="rounded-[1.25rem] border border-accent/40 bg-[linear-gradient(120deg,var(--glow),transparent)] p-8 sm:p-10">
              <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">{engagement.closing.title}</h2>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">{engagement.closing.text}</p>
            </div>
          </Reveal>
        </div>
      </section>
      <CtaBand title={engagement.finalCta} primary={{ label: engagement.finalCta, href: "/contact" }} secondary={{ label: "See How We Work", href: "/how-we-work" }} />
    </>
  );
}
