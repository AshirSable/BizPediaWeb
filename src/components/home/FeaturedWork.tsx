"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Highlight } from "@/components/ui/SectionHeading";
import { DocumentDemo } from "@/components/demos/DocumentDemo";
import { KnowledgeDemo } from "@/components/demos/KnowledgeDemo";
import { LeadDemo } from "@/components/demos/LeadDemo";
import { home } from "@/content/pages";

const demos = [DocumentDemo, KnowledgeDemo, LeadDemo];

export function FeaturedWork() {
  const { title, text, items, button } = home.work;
  const [index, setIndex] = useState(0);
  const Demo = demos[index];
  const go = (d: number) => setIndex((i) => (i + d + items.length) % items.length);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="work-title">
      <div aria-hidden className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <div className="container-site relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal>
          <Eyebrow>Featured Demonstrations</Eyebrow>
          <h2 id="work-title" className="mt-4 font-display text-4xl font-bold leading-[1.08] sm:text-5xl">
            <Highlight text={title} words={2} />
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{text}</p>

          <div role="tablist" aria-label="Demonstrations" className="mt-9 space-y-2">
            {items.map((it, i) => (
              <button
                key={it.id}
                role="tab"
                id={`demo-tab-${it.id}`}
                aria-selected={i === index}
                aria-controls="demo-panel"
                onClick={() => setIndex(i)}
                className={`group relative block w-full overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 ${
                  i === index ? "border-accent/50 bg-card" : "border-transparent hover:bg-card"
                }`}
              >
                {i === index && <motion.span layoutId="demo-indicator" className="absolute inset-y-3 left-0 w-1 rounded-full bg-accent-2" />}
                <span className="block font-display font-semibold text-fg">{it.title}</span>
                <span className="mt-1 block text-sm text-muted">{it.text}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3">
            <ButtonLink href="/our-work">{button}</ButtonLink>
            <button type="button" aria-label="Previous demonstration" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-fg hover:border-accent-2">
              <ArrowLeft aria-hidden className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Next demonstration" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-fg hover:border-accent-2">
              <ArrowRight aria-hidden className="h-4 w-4" />
            </button>
          </div>
        </Reveal>

        <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${items[index].id}`} className="relative">
          <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(closest-side,rgb(36_99_255/0.25),transparent)] blur-2xl" />
          <AnimatePresence mode="wait">
            <motion.div key={index} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} className="relative">
              <Demo />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
