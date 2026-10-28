import { Blocks, Handshake, Layers, Target, Zap } from "lucide-react";
import { RevealGroup } from "@/components/ui/Reveal";
import { MotionItem } from "@/components/ui/MotionItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { home } from "@/content/pages";

const icons = [Target, Layers, Zap, Handshake, Blocks];

export function WhySection() {
  const { title, text, items } = home.why;
  return (
    <section className="tone-invert relative overflow-hidden py-24 sm:py-32" aria-label={title}>
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-site relative">
        <SectionHeading eyebrow="Why Bizpedia Tech" title={title} highlight={2} text={text} align="center" />
        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it, i) => {
            const Icon = icons[i];
            return (
              <MotionItem key={it.title}>
                <SpotlightCard className="h-full p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1d4fff,#3d9bff)] text-white shadow-[0_10px_24px_-8px_rgb(36_99_255/0.7)]">
                    <Icon aria-hidden className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-fg">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{it.text}</p>
                </SpotlightCard>
              </MotionItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
