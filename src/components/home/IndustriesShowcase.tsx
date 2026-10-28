import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Eyebrow, Highlight } from "@/components/ui/SectionHeading";
import { IndustryScene, industryIcon } from "@/components/visuals/IndustryTile";
import { MotionItem } from "@/components/ui/MotionItem";
import { home, industries } from "@/content/pages";

/*
  Bento layout on a 4-column grid (2 columns on mobile):
    [ 0  0  1  2 ]
    [ 0  0  3  4 ]
    [ 5  6  7  7 ]
*/
const span = (i: number, last: number) =>
  i === 0 ? "col-span-2 row-span-2" : i === last ? "col-span-2" : "";

export function IndustriesShowcase() {
  const { title, text, list, button } = home.industries;
  const items = list.map((label, i) => ({ label, id: industries.items[i].id, text: industries.items[i].text }));
  const last = items.length - 1;
  return (
    <section className="tone-invert relative overflow-hidden py-24 sm:py-32" aria-labelledby="industries-title">
      <div aria-hidden className="absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <div className="container-site relative">
        <Reveal className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Eyebrow>Industries We Serve</Eyebrow>
            <h2 id="industries-title" className="mt-4 font-display text-4xl font-bold leading-[1.08] sm:text-5xl">
              <Highlight text={title} words={2} />
            </h2>
          </div>
          <div>
            <p className="max-w-md text-lg leading-relaxed text-muted">{text}</p>
            <div className="mt-7">
              <ButtonLink href="/industries" variant="dark">{button}</ButtonLink>
            </div>
          </div>
        </Reveal>

        <RevealGroup
          className="mt-14 grid grid-flow-dense auto-rows-[10.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[13.5rem]"
          stagger={0.06}
        >
          {items.map((it, i) => {
            const Icon = industryIcon(it.id);
            const feature = i === 0;
            return (
              <MotionItem key={it.id} className={span(i, last)}>
                <Link
                  href={`/industries#${it.id}`}
                  className="group relative block h-full overflow-hidden rounded-2xl bg-[#050b1c] shadow-[0_18px_40px_-18px_rgb(5_20_60/0.55)] ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 ease-out-expo [transform:translateZ(0)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-20px_rgb(36_99_255/0.6)]"
                >
                  <IndustryScene
                    id={it.id}
                    className="absolute inset-0"
                    sizes={feature ? "(min-width: 1024px) 50vw, 100vw" : i === last ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                  />
                  {/* hover ring drawn inside the clip so rounded corners stay crisp */}
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-[#5b9dff]/70" />
                  {/* sweeping light on hover */}
                  <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-[transform,opacity] duration-1000 ease-out-expo group-hover:translate-x-[300%] group-hover:opacity-100" />

                  <span className="absolute left-3 top-3 font-display text-[0.7rem] font-bold tracking-[0.18em] text-white/70 sm:left-4 sm:top-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute right-3 top-3 grid h-8 w-8 translate-y-1 place-items-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:right-4 sm:top-4">
                    <ArrowUpRight aria-hidden className="h-4 w-4" />
                  </span>

                  <span className={`absolute inset-x-3 bottom-3 block sm:inset-x-4 sm:bottom-4 ${feature ? "lg:inset-x-6 lg:bottom-6" : ""}`}>
                    <span className="flex items-center gap-2.5">
                      <span className={`grid shrink-0 place-items-center rounded-full border border-[#7cc4ff]/45 bg-[#0a1a44]/60 text-[#9fd4ff] backdrop-blur-md ${feature ? "h-10 w-10" : "h-8 w-8"}`}>
                        <Icon aria-hidden className={feature ? "h-4.5 w-4.5" : "h-3.5 w-3.5"} strokeWidth={2} />
                      </span>
                      <span className={`font-display font-semibold leading-tight text-white ${feature ? "text-xl sm:text-2xl" : "text-[0.85rem] sm:text-base"}`}>
                        {it.label}
                      </span>
                    </span>
                    {feature ? (
                      <span className="mt-3 hidden max-w-sm text-sm leading-relaxed text-[#c6d3ee] sm:block">{it.text}</span>
                    ) : (
                      <span className="hidden max-h-0 overflow-hidden text-[0.8rem] leading-snug text-[#c6d3ee] opacity-0 transition-all duration-500 ease-out-expo group-hover:mt-2 group-hover:max-h-16 group-hover:opacity-100 lg:line-clamp-2">
                        {it.text}
                      </span>
                    )}
                  </span>
                </Link>
              </MotionItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
