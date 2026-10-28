"use client";

import { useReducedMotion } from "motion/react";
import { useId } from "react";
import type { ServiceSlug } from "@/content/services";

/*
  Animated, theme-aware SVG illustrations — one per service.
  Panels use CSS variables so they adapt to light and dark themes.
*/

const PANEL = "var(--bg-elev)";
const LINE = "var(--border-strong)";
const MUTED = "var(--subtle)";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5cc8ff" />
        <stop offset="1" stopColor="#1d4fff" />
      </linearGradient>
      <radialGradient id={`${id}-glow`}>
        <stop offset="0" stopColor="#3d9bff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#3d9bff" stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}-soft`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
  );
}

function Pulse({ path, dur = 3, begin = 0, r = 3.5, still }: { path: string; dur?: number; begin?: number; r?: number; still: boolean }) {
  if (still) return null;
  return (
    <circle r={r} fill="#9fd4ff">
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

function Automation({ id, still }: { id: string; still: boolean }) {
  const nodes = [
    { x: 30, y: 40, t: "Enquiry" },
    { x: 30, y: 200, t: "Document" },
    { x: 150, y: 120, t: "AI Assist", core: true },
    { x: 280, y: 40, t: "CRM" },
    { x: 280, y: 120, t: "Review" },
    { x: 280, y: 200, t: "Notify" },
  ];
  const links = ["M120 62 C150 62 140 140 150 142", "M120 222 C150 222 140 145 150 142", "M240 142 C260 142 255 62 280 62", "M240 142 L280 142", "M240 142 C260 142 255 222 280 222"];
  return (
    <>
      {links.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke={LINE} strokeWidth="2" />
          <path d={d} fill="none" stroke="#3d9bff" strokeWidth="2" strokeDasharray="6 10" className="animate-dash" />
          <Pulse path={d} dur={2.4 + i * 0.3} begin={i * 0.4} still={still} />
        </g>
      ))}
      {nodes.map((n) => (
        <g key={n.t} transform={`translate(${n.x} ${n.y})`}>
          {n.core && <circle cx="45" cy="22" r="70" fill={`url(#${id}-glow)`} />}
          <rect width={n.core ? 90 : 90} height="44" rx="12" fill={n.core ? `url(#${id}-blue)` : PANEL} stroke={n.core ? "#7cc4ff" : LINE} />
          <circle cx="20" cy="22" r="7" fill={n.core ? "#fff" : "#3d9bff"} opacity={n.core ? 0.9 : 0.8} />
          <text x="34" y="26.5" fontSize="11.5" fontWeight="600" fill={n.core ? "#fff" : "var(--fg)"} fontFamily="var(--font-inter)">
            {n.t}
          </text>
        </g>
      ))}
      <g transform="translate(296 165)">
        <rect width="58" height="18" rx="9" fill="#3d9bff" opacity="0.15" />
        <text x="29" y="12.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#3d9bff" fontFamily="var(--font-inter)">HUMAN CHECK</text>
      </g>
    </>
  );
}

function NeuralNet({ id, still }: { id: string; still: boolean }) {
  const layers = [
    [60, 110, 160, 210],
    [40, 85, 130, 175, 220],
    [60, 110, 160, 210],
    [100, 170],
  ];
  const xs = [50, 150, 250, 340];
  const edges: string[] = [];
  layers.forEach((col, li) => {
    if (li === layers.length - 1) return;
    col.forEach((y1) => layers[li + 1].forEach((y2) => edges.push(`M${xs[li]} ${y1} L${xs[li + 1]} ${y2}`)));
  });
  return (
    <>
      <circle cx="200" cy="135" r="140" fill={`url(#${id}-glow)`} opacity="0.6" />
      {edges.map((d, i) => (
        <path key={i} d={d} stroke="#3d7bff" strokeOpacity="0.22" strokeWidth="1" />
      ))}
      {edges
        .filter((_, i) => i % 5 === 0)
        .map((d, i) => (
          <Pulse key={i} path={d} dur={1.8 + (i % 4) * 0.4} begin={i * 0.25} r={2.5} still={still} />
        ))}
      {layers.map((col, li) =>
        col.map((y, i) => (
          <g key={`${li}-${i}`}>
            <circle cx={xs[li]} cy={y} r="11" fill={PANEL} stroke="#3d9bff" strokeOpacity="0.7" strokeWidth="1.5" />
            <circle cx={xs[li]} cy={y} r="5" fill={`url(#${id}-blue)`}>
              {!still && <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + ((li + i) % 3)}s`} repeatCount="indefinite" />}
            </circle>
          </g>
        )),
      )}
      <g transform="translate(300 235)">
        <rect width="80" height="26" rx="8" fill={PANEL} stroke={LINE} />
        <text x="40" y="17" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--fg)" fontFamily="var(--font-inter)">Prediction</text>
      </g>
    </>
  );
}

function Win({ x, y, w, h, o = 1, children }: { x: number; y: number; w: number; h: number; o?: number; children?: React.ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <rect width={w} height={h} rx="12" fill={PANEL} stroke={LINE} />
      <rect width={w} height="22" rx="12" fill="var(--bg-soft)" />
      <circle cx="14" cy="11" r="3" fill="#ff6b6b" opacity="0.7" />
      <circle cx="25" cy="11" r="3" fill="#ffd166" opacity="0.7" />
      <circle cx="36" cy="11" r="3" fill="#06d6a0" opacity="0.7" />
      {children}
    </g>
  );
}

function Windows({ id }: { id: string }) {
  return (
    <>
      <circle cx="220" cy="150" r="150" fill={`url(#${id}-glow)`} opacity="0.5" />
      <g className="animate-float" style={{ animationDelay: "-2s" }}>
        <Win x={20} y={30} w={190} h={130} o={0.55}>
          {[40, 58, 76, 94, 112].map((y) => (
            <rect key={y} x="14" y={y} width={y % 36 === 4 ? 120 : 160} height="8" rx="4" fill={LINE} />
          ))}
        </Win>
      </g>
      <g className="animate-float">
        <Win x={90} y={80} w={250} h={170}>
          <rect x="12" y="34" width="54" height="124" rx="8" fill="var(--bg-soft)" />
          {[46, 64, 82, 100].map((y, i) => (
            <rect key={y} x="20" y={y} width="38" height="7" rx="3.5" fill={i === 0 ? "#3d9bff" : LINE} />
          ))}
          <rect x="78" y="34" width="76" height="46" rx="8" fill={`url(#${id}-blue)`} opacity="0.9" />
          <rect x="162" y="34" width="76" height="46" rx="8" fill="var(--bg-soft)" stroke={LINE} />
          <path d="M170 68 l14 -10 l12 6 l14 -14 l18 8" fill="none" stroke="#3d9bff" strokeWidth="2" />
          {[92, 108, 124, 140].map((y) => (
            <g key={y}>
              <rect x="78" y={y} width="160" height="10" rx="5" fill="var(--bg-soft)" />
              <rect x="78" y={y} width={60 + (y % 50)} height="10" rx="5" fill="#3d9bff" opacity="0.25" />
            </g>
          ))}
        </Win>
      </g>
      <g className="animate-float" style={{ animationDelay: "-4s" }}>
        <g transform="translate(300 40)">
          <rect width="80" height="50" rx="12" fill={PANEL} stroke="#3d9bff" strokeOpacity="0.6" />
          <text x="40" y="22" textAnchor="middle" fontSize="9" fill={MUTED} fontFamily="var(--font-inter)">API</text>
          <text x="40" y="38" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3d9bff" fontFamily="var(--font-inter)">{"{ }"}</text>
        </g>
      </g>
    </>
  );
}

function Growth({ id, still }: { id: string; still: boolean }) {
  const steps = [
    { x: 30, h: 50, t: "Idea" },
    { x: 105, h: 85, t: "MVP" },
    { x: 180, h: 125, t: "Launch" },
    { x: 255, h: 170, t: "Scale" },
  ];
  const path = "M55 220 C120 210 150 170 205 150 S300 70 370 30";
  return (
    <>
      <circle cx="300" cy="80" r="120" fill={`url(#${id}-glow)`} />
      {steps.map((s, i) => (
        <g key={s.t}>
          <rect x={s.x} y={270 - s.h} width="60" height={s.h} rx="10" fill={i === 3 ? `url(#${id}-blue)` : PANEL} stroke={i === 3 ? "#7cc4ff" : LINE}>
            {!still && <animate attributeName="height" values={`0;${s.h}`} dur="1.2s" begin={`${i * 0.2}s`} fill="freeze" />}
            {!still && <animate attributeName="y" values={`270;${270 - s.h}`} dur="1.2s" begin={`${i * 0.2}s`} fill="freeze" />}
          </rect>
          <text x={s.x + 30} y="288" textAnchor="middle" fontSize="11" fontWeight="600" fill={MUTED} fontFamily="var(--font-inter)">{s.t}</text>
        </g>
      ))}
      <path d={path} fill="none" stroke="#3d9bff" strokeWidth="2.5" strokeDasharray="5 8" className="animate-dash" />
      <g>
        {!still && <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" path={path} />}
        <g transform={still ? "translate(370 30)" : undefined}>
          <circle r="16" fill={`url(#${id}-glow)`} />
          <path d="M-9 -5 L9 0 L-9 5 L-5 0 Z" fill="#fff" />
        </g>
      </g>
    </>
  );
}

function Devices({ id }: { id: string }) {
  return (
    <>
      <circle cx="200" cy="150" r="150" fill={`url(#${id}-glow)`} opacity="0.5" />
      <g className="animate-float">
        <rect x="20" y="40" width="290" height="200" rx="14" fill={PANEL} stroke={LINE} />
        <rect x="20" y="40" width="290" height="26" rx="14" fill="var(--bg-soft)" />
        <rect x="110" y="48" width="110" height="10" rx="5" fill={LINE} />
        <rect x="38" y="82" width="150" height="16" rx="6" fill="var(--fg)" opacity="0.85" />
        <rect x="38" y="106" width="120" height="16" rx="6" fill="#3d9bff" />
        <rect x="38" y="132" width="140" height="6" rx="3" fill={LINE} />
        <rect x="38" y="144" width="110" height="6" rx="3" fill={LINE} />
        <rect x="38" y="164" width="70" height="22" rx="8" fill={`url(#${id}-blue)`} />
        <rect x="200" y="82" width="92" height="104" rx="10" fill={`url(#${id}-blue)`} opacity="0.25" />
        <circle cx="246" cy="134" r="24" fill="none" stroke="#3d9bff" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={38 + i * 88} y="200" width="78" height="26" rx="8" fill="var(--bg-soft)" />
        ))}
      </g>
      <g className="animate-float" style={{ animationDelay: "-3s" }}>
        <rect x="268" y="96" width="104" height="190" rx="20" fill={PANEL} stroke="#3d9bff" strokeOpacity="0.6" strokeWidth="1.5" />
        <rect x="300" y="104" width="40" height="8" rx="4" fill={LINE} />
        <rect x="280" y="122" width="80" height="54" rx="10" fill={`url(#${id}-blue)`} />
        <rect x="280" y="186" width="64" height="7" rx="3.5" fill={LINE} />
        <rect x="280" y="199" width="48" height="7" rx="3.5" fill={LINE} />
        <rect x="280" y="218" width="80" height="22" rx="8" fill="#3d9bff" opacity="0.25" />
        <rect x="280" y="246" width="80" height="22" rx="8" fill="var(--bg-soft)" />
      </g>
    </>
  );
}

function Analytics({ id, still }: { id: string; still: boolean }) {
  const bars = [70, 110, 90, 150, 130, 190];
  const line = "M40 190 L95 160 L150 172 L205 120 L260 132 L315 70 L370 50";
  return (
    <>
      <circle cx="300" cy="90" r="130" fill={`url(#${id}-glow)`} opacity="0.7" />
      {[60, 110, 160, 210].map((y) => (
        <line key={y} x1="30" x2="380" y1={y} y2={y} stroke={LINE} strokeDasharray="3 6" />
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={40 + i * 56} y={260 - h} width="32" height={h} rx="8" fill={i === bars.length - 1 ? `url(#${id}-blue)` : "#3d9bff"} opacity={i === bars.length - 1 ? 1 : 0.25 + i * 0.08}>
          {!still && <animate attributeName="height" values={`0;${h}`} dur="1.1s" begin={`${i * 0.12}s`} fill="freeze" />}
          {!still && <animate attributeName="y" values={`260;${260 - h}`} dur="1.1s" begin={`${i * 0.12}s`} fill="freeze" />}
        </rect>
      ))}
      <path d={line} fill="none" stroke="#9fd4ff" strokeWidth="2.5" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={still ? 0 : 1}>
        {!still && <animate attributeName="stroke-dashoffset" values="1;0" dur="1.8s" begin="0.4s" fill="freeze" />}
      </path>
      {line
        .replace(/[ML]/g, "")
        .trim()
        .split(/\s+/)
        .reduce<number[][]>((acc, v, i, arr) => (i % 2 ? acc : [...acc, [Number(v), Number(arr[i + 1])]]), [])
        .map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="4" fill={PANEL} stroke="#3d9bff" strokeWidth="2" />
        ))}
      <g transform="translate(36 22)">
        <rect width="118" height="30" rx="10" fill={PANEL} stroke={LINE} />
        <circle cx="16" cy="15" r="5" fill="#3d9bff" />
        <text x="28" y="19" fontSize="10.5" fontWeight="600" fill="var(--fg)" fontFamily="var(--font-inter)">Forecast view</text>
      </g>
    </>
  );
}

function Video({ id, still }: { id: string; still: boolean }) {
  return (
    <>
      <circle cx="200" cy="120" r="140" fill={`url(#${id}-glow)`} opacity="0.6" />
      <g className="animate-float">
        <rect x="50" y="20" width="300" height="170" rx="16" fill={PANEL} stroke={LINE} />
        <rect x="62" y="32" width="276" height="146" rx="10" fill={`url(#${id}-blue)`} opacity="0.18" />
        <circle cx="200" cy="105" r="30" fill={`url(#${id}-blue)`} />
        <path d="M192 92 L214 105 L192 118 Z" fill="#fff" />
        <circle cx="200" cy="105" r="30" fill="none" stroke="#7cc4ff">
          {!still && <animate attributeName="r" values="30;46" dur="2s" repeatCount="indefinite" />}
          {!still && <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />}
        </circle>
        <rect x="74" y="44" width="54" height="16" rx="8" fill="#3d9bff" opacity="0.3" />
        <text x="101" y="55" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#3d9bff" fontFamily="var(--font-inter)">AI-ASSISTED</text>
      </g>
      {/* timeline */}
      <g transform="translate(30 210)">
        <rect width="340" height="66" rx="12" fill={PANEL} stroke={LINE} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={12 + i * 64} y="10" width="58" height="22" rx="5" fill="#3d9bff" opacity={0.15 + (i % 2) * 0.15} />
        ))}
        {Array.from({ length: 40 }).map((_, i) => {
          const h = Math.round((4 + Math.abs(Math.sin(i * 0.9)) * 14) * 10) / 10;
          return <rect key={i} x={14 + i * 8} y={48 - h / 2} width="3" height={h} rx="1.5" fill={MUTED} opacity="0.6" />;
        })}
        <rect x="120" y="4" width="2" height="58" fill="#3d9bff">
          {!still && <animate attributeName="x" values="12;326;12" dur="8s" repeatCount="indefinite" />}
        </rect>
      </g>
    </>
  );
}

export function ServiceArt({ slug, className = "" }: { slug: ServiceSlug; className?: string }) {
  const id = useId().replace(/:/g, "");
  const still = !!useReducedMotion();
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden fill="none">
      <Defs id={id} />
      {slug === "ai-automation" && <Automation id={id} still={still} />}
      {slug === "ai-machine-learning" && <NeuralNet id={id} still={still} />}
      {slug === "custom-software-development" && <Windows id={id} />}
      {slug === "saas-product-development" && <Growth id={id} still={still} />}
      {slug === "web-mobile-development" && <Devices id={id} />}
      {slug === "data-analytics-business-intelligence" && <Analytics id={id} still={still} />}
      {slug === "ai-video-creative" && <Video id={id} still={still} />}
    </svg>
  );
}
