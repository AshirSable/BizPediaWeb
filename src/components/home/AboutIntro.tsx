import { Cog, Target, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Highlight } from "@/components/ui/SectionHeading";
import { IsoCubes } from "@/components/visuals/IsoCubes";
import { home } from "@/content/pages";

// Labels echo the copy: "around your goals, people and processes"
const anchors = [
  { label: "Your goals", icon: Target, pos: "left-0 top-[8%]" },
  { label: "Your people", icon: Users, pos: "right-0 top-[22%]" },
  { label: "Your processes", icon: Cog, pos: "right-[6%] bottom-[8%]" },
];

export function AboutIntro() {
  const { title, text, button } = home.about;
  return (
    <section className="tone-invert relative overflow-hidden py-24 sm:py-32" aria-labelledby="about-intro-title">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_50%,black,transparent_70%)]" />
      <div className="container-site relative grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>About Bizpedia Tech</Eyebrow>
          <h2 id="about-intro-title" className="mt-4 font-display text-4xl font-bold leading-[1.08] sm:text-5xl">
            <Highlight text={title} words={2} />
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{text}</p>
          <div className="mt-9">
            <ButtonLink href="/about" variant="dark">{button}</ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="relative">
          <IsoCubes />
          {anchors.map(({ label, icon: Icon, pos }) => (
            <div key={label} aria-hidden className={`glass absolute ${pos} flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-fg shadow-[var(--shadow-card)]`}>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--glow)] text-accent-text">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              {label}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
