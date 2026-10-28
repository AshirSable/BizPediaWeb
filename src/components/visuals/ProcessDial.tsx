/** Circular "dial" of the seven process stages, with a sweeping highlight. */
export function ProcessDial({ steps }: { steps: string[] }) {
  const R = 150;
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[28rem]">
      <svg viewBox="-200 -200 400 400" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="dial-sweep" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3d9bff" stopOpacity="0" />
            <stop offset="1" stopColor="#3d9bff" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="dial-core">
            <stop offset="0" stopColor="#3d9bff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#1d4fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="190" fill="url(#dial-core)" />
        <circle r={R} fill="none" stroke="var(--border-strong)" />
        <circle r={R - 40} fill="none" stroke="var(--border)" strokeDasharray="2 8" />
        <g className="animate-spin-slow" style={{ transformOrigin: "center", animationDuration: "14s" }}>
          <path d={`M0 0 L0 ${-R} A${R} ${R} 0 0 1 ${R * Math.sin(Math.PI / 3.5)} ${-R * Math.cos(Math.PI / 3.5)} Z`} fill="url(#dial-sweep)" />
        </g>
        {steps.map((t, i) => {
          const a = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(a) * R;
          const y = Math.sin(a) * R;
          const lx = Math.cos(a) * (R + 30);
          const ly = Math.sin(a) * (R + 30);
          return (
            <g key={t}>
              <circle cx={x} cy={y} r="16" fill="var(--bg-elev)" stroke="#3d9bff" strokeWidth="1.5" />
              <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3d9bff" fontFamily="var(--font-display)">
                {String(i + 1).padStart(2, "0")}
              </text>
              <text x={lx} y={ly + 4} textAnchor={Math.abs(lx) < 20 ? "middle" : lx > 0 ? "start" : "end"} fontSize="13" fontWeight="600" fill="var(--fg)" fontFamily="var(--font-inter)">
                {t}
              </text>
            </g>
          );
        })}
        <text y="-4" textAnchor="middle" fontSize="13" fill="var(--muted)" fontFamily="var(--font-inter)">From your idea</text>
        <text y="18" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--fg)" fontFamily="var(--font-display)">to a working solution</text>
      </svg>
    </div>
  );
}
