"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useId } from "react";

/* Isometric projection helpers (unit grid → SVG coordinates) */
const S = 22;
const C = Math.cos(Math.PI / 6);
const r2 = (n: number) => Math.round(n * 100) / 100;
const iso = (x: number, y: number, z: number) => [r2((x - y) * C * S + 250), r2((x + y) * 0.5 * S - z * S + 210)] as const;
const poly = (pts: (readonly [number, number])[]) => pts.map((p) => p.join(",")).join(" ");

type Tone = "core" | "glass" | "dark";
type CubeDef = { x: number; y: number; z: number; a: number; tone: Tone; depth: number; delay: number };

const CUBES: CubeDef[] = [
  { x: -1, y: -6, z: 2.5, a: 1.6, tone: "dark", depth: 26, delay: 0.4 },
  { x: -6, y: -1, z: 1.5, a: 2, tone: "glass", depth: 18, delay: 1.2 },
  { x: -2, y: -2, z: 0, a: 4, tone: "core", depth: 8, delay: 0 },
  { x: 3.5, y: -2.5, z: 1.2, a: 2.2, tone: "dark", depth: 20, delay: 2 },
  { x: -2.5, y: 3.5, z: 1, a: 2.3, tone: "dark", depth: 22, delay: 2.6 },
  { x: 3.6, y: 3, z: 0.4, a: 2.6, tone: "glass", depth: 14, delay: 1.6 },
  { x: 1, y: 6, z: 2.8, a: 1.3, tone: "glass", depth: 30, delay: 3.2 },
];

function Cube({ c, id }: { c: CubeDef; id: string }) {
  const { x, y, z, a } = c;
  const top = [iso(x, y, z + a), iso(x + a, y, z + a), iso(x + a, y + a, z + a), iso(x, y + a, z + a)];
  const left = [iso(x, y + a, z), iso(x + a, y + a, z), iso(x + a, y + a, z + a), iso(x, y + a, z + a)];
  const right = [iso(x + a, y, z), iso(x + a, y + a, z), iso(x + a, y + a, z + a), iso(x + a, y, z + a)];
  const fills: Record<Tone, [string, string, string]> = {
    core: [`url(#${id}-ct)`, `url(#${id}-cl)`, `url(#${id}-cr)`],
    glass: ["rgb(255 255 255 / 0.55)", "rgb(160 195 255 / 0.32)", "rgb(120 165 255 / 0.4)"],
    dark: ["#24376b", "#0b1532", "#13214a"],
  };
  const stroke = c.tone === "dark" ? "rgb(90 140 255 / 0.55)" : "rgb(255 255 255 / 0.8)";
  const [ft, fl, fr] = fills[c.tone];
  const [cx, cy] = iso(x + a / 2, y + a / 2, z + a);
  return (
    <g style={{ animation: `float-y ${6 + c.delay}s ease-in-out ${-c.delay}s infinite` }}>
      {c.tone === "core" && <ellipse cx={cx} cy={cy + a * S * 0.9} rx={a * S * 1.6} ry={a * S * 0.8} fill={`url(#${id}-glow)`} />}
      <polygon points={poly(left)} fill={fl} stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
      <polygon points={poly(right)} fill={fr} stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
      <polygon points={poly(top)} fill={ft} stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
      {c.tone === "core" && (
        <g transform={`translate(${cx - 20} ${cy - 20})`}>
          <path fill="#fff" fillOpacity="0.95" fillRule="evenodd" transform="scale(0.62)" d="M17 7h19.5C46 7 51.5 12.6 51.5 20c0 4.3-2 7.7-5.3 9.7 4.8 1.9 7.8 6.1 7.8 11.6C54 50.2 47.6 57 37.6 57H25.5V47.5h11c3.6 0 6-2.3 6-5.4s-2.4-5.3-6-5.3h-11V27.6h9.4c3.2 0 5.3-2 5.3-4.8s-2.1-4.7-5.3-4.7H17z M14 22h8.5v35H14z" />
        </g>
      )}
      {c.tone === "dark" && <circle cx={cx} cy={cy} r="2.5" fill="#5cc8ff" />}
    </g>
  );
}

function Layer({ c, id, mx, my }: { c: CubeDef; id: string; mx: ReturnType<typeof useSpring>; my: ReturnType<typeof useSpring> }) {
  const tx = useTransform(mx, (v) => v * c.depth);
  const ty = useTransform(my, (v) => v * c.depth * 0.6);
  return (
    <motion.g style={{ x: tx, y: ty }}>
      <Cube c={c} id={id} />
    </motion.g>
  );
}

export function IsoCubes() {
  const id = useId().replace(/:/g, "");
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 70, damping: 18 });
  const my = useSpring(rawY, { stiffness: 70, damping: 18 });
  const order = [...CUBES].sort((p, q) => p.x + p.y + p.z - (q.x + q.y + q.z));
  const grid: string[] = [];
  for (let i = -8; i <= 8; i += 2) {
    grid.push(`M${iso(i, -8, 0).join(" ")} L${iso(i, 8, 0).join(" ")}`);
    grid.push(`M${iso(-8, i, 0).join(" ")} L${iso(8, i, 0).join(" ")}`);
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[32rem]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        rawX.set(((e.clientX - r.left) / r.width) * 2 - 1);
        rawY.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      aria-hidden
    >
      <svg viewBox="0 0 500 420" className="w-full overflow-visible">
        <defs>
          <linearGradient id={`${id}-ct`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7cc4ff" />
            <stop offset="1" stopColor="#2463ff" />
          </linearGradient>
          <linearGradient id={`${id}-cl`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2f7dff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#1d4fff" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={`${id}-cr`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1d4fff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#0b2a99" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id={`${id}-glow`}>
            <stop offset="0" stopColor="#3d9bff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#3d9bff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <polygon points={poly([iso(-8, -8, 0), iso(8, -8, 0), iso(8, 8, 0), iso(-8, 8, 0)])} fill="rgb(61 123 255 / 0.06)" stroke="rgb(61 123 255 / 0.3)" />
        {grid.map((d, i) => (
          <path key={i} d={d} stroke="rgb(61 123 255 / 0.14)" />
        ))}
        {order.map((c, i) => (
          <Layer key={i} c={c} id={id} mx={mx} my={my} />
        ))}
      </svg>
    </div>
  );
}
