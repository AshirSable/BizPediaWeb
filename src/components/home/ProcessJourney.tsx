"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Boxes, Lightbulb, PenTool, Rocket, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Highlight } from "@/components/ui/SectionHeading";
import { home } from "@/content/pages";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const icons = [Lightbulb, PenTool, Boxes, ShieldCheck, Rocket];
// Where each step sits along the ribbon (0 → 1)
const STOPS = [0.1, 0.3, 0.5, 0.7, 0.9];
const PATH =
  "M 330 650 C 430 650 470 585 560 585 C 650 585 660 610 720 560 C 790 500 790 470 860 455 C 930 440 960 430 1000 370 C 1040 310 1060 260 1170 140";

export function ProcessJourney() {
  const { title, text, steps, button } = home.process;
  const root = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState(-1);
  const [nodes, setNodes] = useState<{ x: number; y: number }[]>([]);

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;
      const main = svg.querySelector<SVGPathElement>("[data-ribbon='main']")!;
      const len = main.getTotalLength();
      setNodes(STOPS.map((f) => main.getPointAtLength(f * len)));
      const drawn = svg.querySelectorAll<SVGPathElement>("[data-draw]");
      const comet = svg.querySelector<SVGGElement>("[data-comet]")!;
      const arrow = svg.querySelector<SVGGElement>("[data-arrow]")!;

      const setProgress = (p: number) => {
        drawn.forEach((el) => {
          el.style.strokeDasharray = `${len}`;
          el.style.strokeDashoffset = `${len * (1 - p)}`;
        });
        const pt = main.getPointAtLength(Math.max(0.001, p) * len);
        comet.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        comet.style.opacity = p > 0.01 && p < 0.99 ? "1" : "0";
        arrow.style.opacity = p > 0.97 ? "1" : "0";
        let idx = -1;
        STOPS.forEach((s, i) => {
          if (p >= s - 0.02) idx = i;
        });
        setActive((prev) => (prev === idx ? prev : idx));
      };

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          other: "(max-width: 1023px), (prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };
          if (!desktop) {
            setProgress(1);
            return;
          }
          setProgress(0);
          const state = { p: 0 };
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=220%",
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
            },
          });
          tl.to(state, { p: 1, ease: "none", duration: 1, onUpdate: () => setProgress(state.p) }, 0);
          tl.to("[data-mountain='far']", { yPercent: -6, ease: "none", duration: 1 }, 0);
          tl.to("[data-mountain='near']", { yPercent: -14, ease: "none", duration: 1 }, 0);
          tl.to("[data-stars]", { yPercent: -10, ease: "none", duration: 1 }, 0);
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  const current = active >= 0 ? steps[active] : null;

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-[#02050d] text-white lg:h-screen lg:min-h-[44rem]"
      aria-labelledby="journey-title"
    >
      {/* Sky, stars, mountains */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_70%_20%,#0d2a6b_0%,#051333_45%,#02050d_80%)]" />
        <svg data-stars className="absolute inset-0 h-[115%] w-full" preserveAspectRatio="none">
          {Array.from({ length: 90 }).map((_, i) => (
            <circle key={i} cx={`${(i * 73.3) % 100}%`} cy={`${(i * 37.7) % 70}%`} r={i % 9 === 0 ? 1.3 : 0.6} fill="#d6e4ff" opacity={0.2 + ((i * 7) % 6) / 10} />
          ))}
        </svg>
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute bottom-0 h-72 w-full lg:h-[55%]">
          <defs>
            <linearGradient id="mt-far" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#13285e" />
              <stop offset="1" stopColor="#030817" />
            </linearGradient>
            <linearGradient id="mt-near" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0b1838" />
              <stop offset="1" stopColor="#02050d" />
            </linearGradient>
          </defs>
          <path data-mountain="far" fill="url(#mt-far)" opacity="0.8" d="M0 260 L120 170 L210 220 L330 110 L430 200 L560 120 L660 190 L790 80 L900 180 L1010 130 L1120 200 L1240 100 L1340 170 L1440 130 V420 H0Z" />
          <path data-mountain="far" fill="none" stroke="#3d7bff" strokeOpacity="0.25" d="M0 260 L120 170 L210 220 L330 110 L430 200 L560 120 L660 190 L790 80 L900 180 L1010 130 L1120 200 L1240 100 L1340 170 L1440 130" />
          <path data-mountain="near" fill="url(#mt-near)" d="M0 330 L160 250 L280 300 L420 220 L560 300 L700 240 L850 310 L990 230 L1130 300 L1280 240 L1440 290 V440 H0Z" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#02050d] to-transparent" />
      </div>

      <div className="container-site relative grid h-full gap-10 py-24 lg:block lg:py-0">
        {/* Copy */}
        <div className="relative z-10 max-w-md lg:absolute lg:left-[max(2.5rem,calc((100vw-82rem)/2+2.5rem))] lg:top-[16%]">
          <Eyebrow className="!text-[#7cb6ff]">Our Process</Eyebrow>
          <h2 id="journey-title" className="mt-4 font-display text-5xl font-bold leading-[1.04] sm:text-6xl">
            <Highlight text={title} words={1} />
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[#b4c1dd]">{text}</p>
          <div className="mt-8">
            <ButtonLink href="/how-we-work">{button}</ButtonLink>
          </div>

          {/* Active step detail (desktop) */}
          <div className="mt-12 hidden min-h-[8.5rem] lg:block" aria-live="polite">
            {current ? (
              <div key={active} className="rounded-2xl border border-[#3d7bff]/25 bg-[#071334]/60 p-5 backdrop-blur-md [animation:fade-in_0.5s_ease]">
                <p className="text-xs font-semibold tracking-[0.14em] text-[#7cb6ff]">
                  STEP {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                </p>
                <p className="mt-2 font-display text-xl font-semibold">{current.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#b4c1dd]">{current.text}</p>
              </div>
            ) : (
              <p className="text-sm text-[#7584a6]">Scroll to follow the journey →</p>
            )}
          </div>
        </div>

        {/* Ribbon */}
        <div className="relative -mx-5 aspect-[1200/720] sm:mx-0 lg:absolute lg:inset-0 lg:aspect-auto">
          <svg ref={svgRef} viewBox="0 0 1200 720" preserveAspectRatio="xMaxYMid meet" className="h-full w-full" aria-hidden>
            <defs>
              <linearGradient id="rib" x1="300" y1="650" x2="1170" y2="140" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#1d4fff" stopOpacity="0.4" />
                <stop offset="0.5" stopColor="#2f7dff" />
                <stop offset="1" stopColor="#8fd0ff" />
              </linearGradient>
              <filter id="rib-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
              <radialGradient id="orb" cx="35%" cy="30%" r="70%">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.35" stopColor="#9cd0ff" />
                <stop offset="1" stopColor="#1d4fff" />
              </radialGradient>
              <radialGradient id="orb-glow">
                <stop offset="0" stopColor="#5aa8ff" stopOpacity="0.8" />
                <stop offset="1" stopColor="#1d4fff" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Track preview */}
            <path d={PATH} fill="none" stroke="#3d7bff" strokeOpacity="0.14" strokeWidth="20" strokeLinecap="round" />
            {/* Ribbon layers */}
            <path data-draw d={PATH} fill="none" stroke="#2f7dff" strokeOpacity="0.55" strokeWidth="38" strokeLinecap="round" filter="url(#rib-blur)" />
            <path data-draw data-ribbon="main" d={PATH} fill="none" stroke="url(#rib)" strokeWidth="18" strokeLinecap="round" />
            <path data-draw d={PATH} fill="none" stroke="#e6f2ff" strokeOpacity="0.85" strokeWidth="2.5" strokeLinecap="round" transform="translate(0 -6)" />
            <path data-draw d={PATH} fill="none" stroke="#9fd0ff" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" transform="translate(0 7)" />

            {/* Arrow head */}
            <g data-arrow style={{ transition: "opacity 0.4s" }} opacity="0">
              <path d="M1170 140 L1128 150 L1160 178 Z" fill="#cde8ff" />
              <circle cx="1170" cy="140" r="40" fill="url(#orb-glow)" />
            </g>

            {/* Step nodes */}
            {nodes.map((pt, i) => {
              const on = i <= active;
              const Icon = icons[i];
              return (
                <g key={i} transform={`translate(${pt.x} ${pt.y})`}>
                  <circle r={on ? 46 : 28} fill="url(#orb-glow)" style={{ transition: "r 0.6s ease, opacity 0.6s", opacity: on ? 1 : 0.3 }} />
                  <circle r="17" fill="url(#orb)" style={{ transition: "opacity 0.6s, transform 0.6s", opacity: on ? 1 : 0.35, transform: on ? "scale(1)" : "scale(0.75)" }} />
                  <g style={{ transition: "opacity 0.6s, transform 0.6s", opacity: on ? 1 : 0.35, transform: on ? "translateY(0)" : "translateY(8px)" }}>
                    <foreignObject x="-80" y="-150" width="160" height="110">
                      <div className="flex h-full flex-col items-center justify-end text-center">
                        <span className={`grid h-11 w-11 place-items-center rounded-xl border ${on ? "border-[#5b9dff]/60 bg-[#0d2463]/70 text-[#9fd0ff] shadow-[0_0_24px_rgb(61_155_255/0.5)]" : "border-white/10 bg-white/5 text-[#7584a6]"}`}>
                          <Icon className="h-5 w-5" strokeWidth={1.6} />
                        </span>
                        <span className="mt-2 text-[13px] font-semibold leading-tight text-white">{steps[i].title}</span>
                      </div>
                    </foreignObject>
                  </g>
                </g>
              );
            })}

            {/* Comet at the drawing tip */}
            <g data-comet style={{ opacity: 0 }}>
              <circle r="30" fill="url(#orb-glow)" />
              <circle r="6" fill="#ffffff" />
            </g>
          </svg>
        </div>

        {/* Steps list (mobile / reduced motion) */}
        <ol className="grid gap-3 sm:grid-cols-2 lg:hidden">
          {steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-[#3d7bff]/20 bg-[#071334]/60 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0d2463] text-[#9fd0ff]">
                  <Icon aria-hidden className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-[#7cb6ff]">STEP {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#b4c1dd]">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
        {/* Screen-reader version of the desktop journey */}
        <ol className="sr-only hidden lg:block">
          {steps.map((s) => (
            <li key={s.title}>
              {s.title}: {s.text}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
