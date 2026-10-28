import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Eyebrow, Highlight } from "./SectionHeading";

type Props = {
  eyebrow: string;
  title: string;
  highlight?: number;
  intro: string;
  breadcrumbs: { name: string; path: string }[];
  actions?: ReactNode;
  visual?: ReactNode;
  /** Narrow single-column layout when no visual is given */
  children?: ReactNode;
};

/** Shared hero for inner pages: dark, atmospheric, with a page-specific visual on the right. */
export function PageHero({ eyebrow, title, highlight = 2, intro, breadcrumbs, actions, visual, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-40">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
        <div className="absolute -bottom-40 left-[-10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(61_155_255/0.12),transparent)]" />
      </div>
      <div className={`container-site grid items-center gap-14 ${visual ? "lg:grid-cols-[1.05fr_1fr]" : ""}`}>
        <div className={visual ? "" : "max-w-3xl"}>
          <div className="enter">
            <Breadcrumbs items={breadcrumbs} />
            <Eyebrow className="mt-8">{eyebrow}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.06] text-fg sm:text-5xl lg:text-[3.6rem]">
              <Highlight text={title} words={highlight} />
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{intro}</p>
            {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {children}
        </div>
        {visual ? (
          <div className="enter relative [animation-delay:150ms]">{visual}</div>
        ) : null}
      </div>
    </section>
  );
}
