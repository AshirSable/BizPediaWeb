import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";
import { Eyebrow, Highlight } from "./SectionHeading";
import { PlanetHorizon } from "@/components/visuals/PlanetHorizon";

type Props = {
  title: string;
  text?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  eyebrow?: string;
  headingLevel?: "h2" | "h3";
};

/** Closing call-to-action band with the planet-horizon scene from the homepage design. */
export function CtaBand({ title, text, primary, secondary, eyebrow = "Let’s build together", headingLevel = "h2" }: Props) {
  const H = headingLevel;
  return (
    <section className="relative isolate overflow-hidden bg-[#02050d] text-white dark:bg-bg" aria-label={title}>
      <PlanetHorizon className="max-sm:top-auto max-sm:h-[26rem]" />
      <div className="container-site relative z-10 flex min-h-[38rem] items-start pb-56 pt-20 sm:items-center sm:py-28 lg:min-h-[36rem]">
        <Reveal className="max-w-xl">
          <Eyebrow className="!text-[#7cb6ff]">{eyebrow}</Eyebrow>
          <H className="mt-4 font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
            <Highlight text={title} words={title.split(" ").length > 4 ? 2 : 1} />
          </H>
          {text ? <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#b4c1dd]">{text}</p> : null}
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="outline" className="!border-white/25 !text-white hover:!bg-white/10">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
