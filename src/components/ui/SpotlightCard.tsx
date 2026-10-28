"use client";

import type { ReactNode } from "react";

/** Card with a cursor-following gradient border highlight. */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`card card-glow transition-[transform,background-color] duration-500 ease-out-expo hover:-translate-y-1 hover:bg-card-hover ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
