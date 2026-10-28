"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ClipboardList, FlaskConical, Hammer, PenTool, Rocket, Search, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const icons = [Search, ClipboardList, PenTool, Hammer, FlaskConical, Rocket, TrendingUp];

type Step = { n: string; title: string; text: string };

/** Vertical timeline whose spine fills as you scroll; each step lights up when reached. */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-spine-fill]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 60%", scrub: 0.5 } },
        );
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 60%",
            toggleClass: { targets: el, className: "is-active" },
            onEnter: () => el.classList.add("is-reached"),
            onLeaveBack: () => el.classList.remove("is-reached"),
          });
          gsap.from(el.querySelector("[data-card]"), {
            opacity: 0,
            x: el.dataset.side === "left" ? -40 : 40,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="relative mx-auto max-w-5xl">
      {/* Spine */}
      <span aria-hidden className="absolute bottom-0 left-6 top-0 w-px bg-line-strong md:left-1/2" />
      <span aria-hidden data-spine-fill className="absolute bottom-0 left-6 top-0 w-[2px] origin-top -translate-x-[0.5px] bg-gradient-to-b from-[#1d4fff] via-[#3d9bff] to-[#7cc4ff] shadow-[0_0_12px_#3d9bff] md:left-1/2" />
      {steps.map((s, i) => {
        const Icon = icons[i];
        const left = i % 2 === 0;
        return (
          <li key={s.n} data-step data-side={left ? "left" : "right"} className="group relative grid py-8 pl-16 md:grid-cols-2 md:pl-0">
            {/* Node */}
            <span
              aria-hidden
              className="absolute left-6 top-1/2 z-10 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-bg text-subtle transition-all duration-500 group-[.is-reached]:border-accent-2 group-[.is-reached]:bg-accent group-[.is-reached]:text-white group-[.is-active]:scale-110 group-[.is-active]:shadow-[0_0_0_8px_var(--glow),0_0_30px_rgb(61_155_255/0.7)] md:left-1/2"
            >
              <Icon className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div data-card className={`${left ? "md:col-start-1 md:pr-20 md:text-right" : "md:col-start-2 md:pl-20"}`}>
              <div className="card p-6 transition-colors duration-500 group-[.is-active]:border-accent/60 sm:p-7">
                <span className="font-display text-5xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_var(--border-strong)] transition-all duration-500 group-[.is-reached]:[-webkit-text-stroke:1px_var(--accent-2)]">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-fg">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
