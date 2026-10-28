"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, BrainCircuit, Code2, Rocket, Workflow } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { home } from "@/content/pages";

const RobotScene = dynamic(() => import("@/components/three/RobotScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

/** Static stand-in shown while the 3D scene loads, or when WebGL is unavailable. */
function SceneFallback() {
  return (
    <div aria-hidden className="absolute inset-0 grid place-items-center">
      <div className="relative h-64 w-64 -translate-x-[18%] translate-y-[6%] rounded-full bg-[radial-gradient(circle_at_40%_35%,#2a6bff_0%,#0a2265_45%,transparent_70%)] opacity-80 blur-[2px]">
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-[#3d9bff]/40" />
        <div className="absolute -inset-10 rounded-full border border-[#3d9bff]/15" />
      </div>
    </div>
  );
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const chips = [
  { label: "AI Automation", href: "/services/ai-automation", icon: Workflow, pos: "left-[6%] top-[58%] sm:left-[4%] sm:top-[34%]", depth: 18 },
  { label: "AI & Machine Learning", href: "/services/ai-machine-learning", icon: BrainCircuit, pos: "left-[16%] top-[8%] sm:left-[20%] sm:top-[14%]", depth: 26 },
  { label: "Custom Software", href: "/services/custom-software-development", icon: Code2, pos: "left-[52%] top-[4%] sm:left-[44%] sm:top-[10%]", depth: 14 },
  { label: "SaaS & Product", href: "/services/saas-product-development", icon: Rocket, pos: "left-[40%] top-[70%] sm:left-[38%] sm:top-[58%]", depth: 22 },
];

const pillars = ["AI-Powered Solutions", "Custom Software", "SaaS & Product Development", "Intelligent Automation"];
const pillarIcons = [BrainCircuit, Code2, Rocket, Workflow];

export function Hero() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    // Feature detection has to run in the browser after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWebgl(hasWebGL());
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section className="relative isolate overflow-hidden bg-bg text-fg" aria-labelledby="hero-title">
      {/* Atmosphere */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_72%_40%,#cfdcff_0%,#e6edfc_45%,#f5f7fc_80%)] dark:bg-[radial-gradient(70%_70%_at_72%_40%,#0b2463_0%,#04102e_40%,#02050d_75%)]" />
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_70%)]" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-[90rem] grid-rows-[auto_1fr] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] lg:grid-rows-1">
        {/* Copy */}
        <div className="relative z-10 flex flex-col justify-center px-5 pb-6 pt-32 sm:px-8 lg:pb-24 lg:pl-10 lg:pr-0 lg:pt-28 xl:pl-14">
          <p className="eyebrow enter">AI Solutions · Custom Software · SaaS Engineering · Intelligent Automation</p>
          <h1 id="hero-title" className="mt-6 font-display text-[2.9rem] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl xl:text-[4.6rem]">
            {[
              { t: "Ideas to", c: "" },
              { t: "Intelligence.", c: "" },
              { t: "Intelligence", c: "text-gradient" },
              { t: "to ", c: "", tail: "Impact." },
            ].map((line, i) => (
              // Each line is masked for the rise-in; the extra bottom padding keeps descenders (g, p)
              // and the gradient's background-clip area inside the mask, and the negative margin
              // cancels it out so line spacing is unchanged.
              <span key={i} className="-mb-[0.3em] block overflow-hidden pb-[0.14em] pr-[0.08em]">
                <span className={`enter-rise block pb-[0.16em] ${line.c}`} style={{ animationDelay: `${100 + i * 90}ms` }}>
                  {line.t}
                  {line.tail ? <span className="text-gradient">{line.tail}</span> : null}
                </span>
              </span>
            ))}
          </h1>
          <p
            className="enter [animation-delay:450ms] mt-7 max-w-[34rem] text-lg leading-relaxed text-muted"
          >
            {home.hero.lead}
          </p>
          <div className="enter mt-9 flex flex-wrap gap-3 [animation-delay:550ms]">
            <ButtonLink href="/contact">{home.hero.primary}</ButtonLink>
            <ButtonLink
              href="/services"
              variant="outline"
              
              icon={<span aria-hidden className="grid h-5 w-5 place-items-center rounded-full bg-[#2463ff]/30"><span className="h-2 w-2 rounded-full bg-[#5b9dff] shadow-[0_0_8px_#5b9dff]" /></span>}
            >
              {home.hero.secondary}
            </ButtonLink>
          </div>
          <ul
            className="enter [animation-delay:700ms] mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4"
            aria-label="What we do"
          >
            {pillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <li key={p} className="flex items-center gap-2.5 text-[0.78rem] leading-tight text-muted">
                  <Icon aria-hidden className="h-5 w-5 shrink-0 text-accent-text" strokeWidth={1.6} />
                  {p}
                </li>
              );
            })}
          </ul>
        </div>

        {/* 3D stage */}
        <div className="relative h-[26rem] sm:h-[34rem] lg:h-auto">
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_80%,transparent)] lg:-left-[12%] lg:[mask-image:linear-gradient(to_right,transparent,black_16%)]">
            {webgl === false ? <SceneFallback /> : webgl ? <RobotScene className="absolute inset-0" /> : <SceneFallback />}
          </div>
          {/* Floating service chips */}
          <div className="pointer-events-none absolute inset-0 lg:-left-[12%]">
            {chips.map((chip, i) => (
              <Chip key={chip.label} chip={chip} index={i} sx={sx} sy={sy} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden className="absolute bottom-8 right-8 hidden items-center gap-3 text-xs text-muted lg:flex">
        <span className="relative h-9 w-5 rounded-full border border-line-strong">
          <span className="absolute left-1/2 top-2 h-1.5 w-1 -translate-x-1/2 rounded-full bg-fg [animation:scroll-dot_1.8s_ease-in-out_infinite]" />
        </span>
        Scroll
      </div>
    </section>
  );
}

function Chip({
  chip,
  index,
  sx,
  sy,
}: {
  chip: (typeof chips)[number];
  index: number;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(sx, (v) => v * -chip.depth);
  const y = useTransform(sy, (v) => v * -chip.depth * 0.6);
  const Icon = chip.icon;
  return (
    <motion.div style={{ x, y }} className={`absolute ${chip.pos} ${index > 1 ? "hidden sm:block" : ""}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href={chip.href}
          className="pointer-events-auto group flex items-center gap-2.5 rounded-xl border border-[#3d7bff]/30 bg-white/60 px-3.5 py-2.5 text-[0.78rem] font-medium text-fg shadow-[0_0_30px_-8px_rgb(36_99_255/0.45),inset_0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#5b9dff]/70 dark:bg-[#06112e]/55 dark:text-[#dbe6ff] dark:hover:bg-[#0a1a44]/70"
          style={{ animation: `float-y ${6 + index}s ease-in-out ${index * 0.7}s infinite` }}
        >
          <Icon aria-hidden className="h-4.5 w-4.5 text-accent-text" strokeWidth={1.6} />
          {chip.label}
          <ArrowRight aria-hidden className="h-3.5 w-0 opacity-0 transition-all group-hover:w-3.5 group-hover:opacity-100" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
