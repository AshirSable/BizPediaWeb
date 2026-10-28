/*
  Closing scene from the homepage reference: a glowing planet over a futuristic
  skyline, a sea of clouds, and a figure standing on a cliff looking toward it.
  Pure SVG, deterministic (no randomness) so it renders identically on server and client.
*/

// Deterministic pseudo-random sequence
function seq(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

type Building = { x: number; w: number; h: number; spire: number; lit: number[][] };

function skyline(seed: number, from: number, to: number, base: number, minH: number, maxH: number, peakAt: number): Building[] {
  const r = seq(seed);
  const out: Building[] = [];
  let x = from;
  while (x < to) {
    const w = 7 + Math.round(r() * 15);
    // Taller towers cluster around the peak position
    const closeness = 1 - Math.min(1, Math.abs(x - peakAt) / 380);
    const h = Math.round(minH + (maxH - minH) * (0.25 + 0.75 * closeness) * (0.45 + r() * 0.55));
    const spire = r() > 0.55 ? Math.round(14 + r() * 46) : 0;
    const lit: number[][] = [];
    for (let wy = base - h + 8; wy < base - 6; wy += 6) {
      for (let wx = x + 2; wx < x + w - 2; wx += 4) if (r() > 0.86) lit.push([wx, wy]);
    }
    out.push({ x, w, h, spire, lit });
    x += w + Math.round(r() * 9);
  }
  return out;
}

const FAR = skyline(11, 700, 1440, 470, 50, 230, 1200);
const NEAR = skyline(29, 760, 1440, 488, 25, 300, 1100);

function City({ buildings, base, fill, windowColor, windowOpacity }: { buildings: Building[]; base: number; fill: string; windowColor: string; windowOpacity: number }) {
  return (
    <g>
      {buildings.map((b, i) => (
        <g key={i}>
          <path
            fill={fill}
            d={`M${b.x} ${base} V${base - b.h} ${b.spire ? `L${b.x + b.w / 2 - 1.5} ${base - b.h - 6} V${base - b.h - b.spire} H${b.x + b.w / 2 + 1.5} V${base - b.h - 6}` : ""} L${b.x + b.w} ${base - b.h} V${base} Z`}
          />
          {b.lit.map(([wx, wy], j) => (
            <rect key={j} x={wx} y={wy} width="2" height="2.4" fill={windowColor} opacity={windowOpacity} />
          ))}
          {b.spire > 30 && <circle cx={b.x + b.w / 2} cy={base - b.h - b.spire} r="1.6" fill="#bfe3ff" />}
        </g>
      ))}
    </g>
  );
}

const STARS = (() => {
  const r = seq(7);
  return Array.from({ length: 90 }, () => [Math.round(r() * 1440), Math.round(r() * 330), r() > 0.9 ? 1.3 : 0.7, 0.25 + r() * 0.6]);
})();

const CLOUDS = (() => {
  const r = seq(3);
  return Array.from({ length: 44 }, (_, i) => [640 + i * 19 + r() * 20, 478 + r() * 46, 60 + r() * 80, 12 + r() * 16, 0.3 + r() * 0.4]);
})();

export function PlanetHorizon({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg viewBox="0 0 1440 560" preserveAspectRatio="xMaxYMax slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="ph-sky" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0" stopColor="#02050d" />
            <stop offset="0.45" stopColor="#06112e" />
            <stop offset="0.8" stopColor="#1a2c63" />
            <stop offset="1" stopColor="#3a3f78" />
          </linearGradient>
          <radialGradient id="ph-horizon" cx="0.68" cy="0.86" r="0.5">
            <stop offset="0" stopColor="#ffe6f0" stopOpacity="0.95" />
            <stop offset="0.15" stopColor="#c9a6ff" stopOpacity="0.55" />
            <stop offset="0.45" stopColor="#4d6bff" stopOpacity="0.22" />
            <stop offset="1" stopColor="#1d4fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ph-planet" cx="0.32" cy="0.28" r="0.85">
            <stop offset="0" stopColor="#7fb6ff" />
            <stop offset="0.25" stopColor="#2f6ae6" />
            <stop offset="0.6" stopColor="#0d2a7a" />
            <stop offset="1" stopColor="#040d2b" />
          </radialGradient>
          <linearGradient id="ph-rim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9fe0ff" />
            <stop offset="0.5" stopColor="#5b8dff" stopOpacity="0.6" />
            <stop offset="1" stopColor="#e6c3ff" stopOpacity="0.8" />
          </linearGradient>
          <clipPath id="ph-planet-clip">
            <circle cx="1165" cy="330" r="300" />
          </clipPath>
          <filter id="ph-land" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.009 0.014" numOctaves="4" seed="8" />
            <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.68  0 0 0 0 1  0 0 0 7 -3.7" />
          </filter>
          <filter id="ph-clouds-tex" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="3" seed="2" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 6 -3.4" />
          </filter>
          <filter id="ph-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter id="ph-blur-md" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter id="ph-blur-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          <linearGradient id="ph-city-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7e95d6" />
            <stop offset="1" stopColor="#3a4f92" />
          </linearGradient>
          <linearGradient id="ph-city-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3c56a6" />
            <stop offset="0.5" stopColor="#1d2d66" />
            <stop offset="1" stopColor="#0c1636" />
          </linearGradient>
          <linearGradient id="ph-rock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#141c38" />
            <stop offset="1" stopColor="#03060f" />
          </linearGradient>
          <linearGradient id="ph-fade-bottom" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#02050d" stopOpacity="0" />
            <stop offset="1" stopColor="#02050d" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="ph-city-haze" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0a1638" stopOpacity="1" />
            <stop offset="1" stopColor="#0a1638" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ph-fade-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#02050d" stopOpacity="0.92" />
            <stop offset="0.38" stopColor="#02050d" stopOpacity="0.55" />
            <stop offset="0.6" stopColor="#02050d" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Sky & stars */}
        <rect width="1440" height="560" fill="url(#ph-sky)" />
        {STARS.map(([x, y, r, o], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#dbe8ff" opacity={o} />
        ))}

        {/* Planet */}
        <circle cx="1165" cy="330" r="330" fill="#3d7bff" opacity="0.35" filter="url(#ph-blur-lg)" />
        <circle cx="1165" cy="330" r="300" fill="url(#ph-planet)" />
        <g clipPath="url(#ph-planet-clip)">
          <rect x="865" y="30" width="600" height="600" filter="url(#ph-land)" opacity="0.38" />
          <rect x="865" y="30" width="600" height="600" filter="url(#ph-clouds-tex)" opacity="0.1" />
          {/* night-side shading */}
          <circle cx="1290" cy="420" r="300" fill="#02071a" opacity="0.45" filter="url(#ph-blur-lg)" />
        </g>
        <circle cx="1165" cy="330" r="300" fill="none" stroke="url(#ph-rim)" strokeWidth="3" />
        <circle cx="1165" cy="330" r="304" fill="none" stroke="#8fd0ff" strokeWidth="10" opacity="0.35" filter="url(#ph-blur-md)" />

        {/* Horizon glow behind the city */}
        <rect width="1440" height="560" fill="url(#ph-horizon)" />
        <ellipse cx="900" cy="478" rx="190" ry="46" fill="#fff1f6" opacity="0.6" filter="url(#ph-blur-lg)" />
        <ellipse cx="1300" cy="430" rx="220" ry="90" fill="#e7a6d6" opacity="0.28" filter="url(#ph-blur-lg)" />

        {/* Skyline: far (hazy) then near */}
        <g opacity="0.75">
          <City buildings={FAR} base={470} fill="url(#ph-city-far)" windowColor="#e8f1ff" windowOpacity={0.5} />
        </g>
        <City buildings={NEAR} base={485} fill="url(#ph-city-near)" windowColor="#9fd0ff" windowOpacity={0.85} />

        {/* Sea of clouds */}
        <g filter="url(#ph-blur-md)">
          {CLOUDS.map(([x, y, rx, ry, o], i) => (
            <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={i % 3 ? "#c9c3ef" : "#f3e6f5"} opacity={o} />
          ))}
        </g>
        <rect x="700" y="505" width="740" height="40" fill="#b9b2e6" opacity="0.22" filter="url(#ph-blur-md)" />
        {/* Haze where the skyline begins */}
        <rect x="690" y="150" width="200" height="350" fill="url(#ph-city-haze)" />

        {/* Distant mountain ridge on the left */}
        <path d="M0 400 L90 350 L170 385 L260 320 L360 380 L450 345 L560 410 L620 430 V560 H0 Z" fill="#0a1230" opacity="0.9" />
        <path d="M0 400 L90 350 L170 385 L260 320 L360 380 L450 345 L560 410" fill="none" stroke="#4d7bff" strokeOpacity="0.25" />

        {/* Cliff with rim light */}
        <path
          d="M380 560 L420 520 L470 505 L520 470 L560 462 L600 452 L640 446 L690 440 L728 437 L760 440 L800 452 L840 470 L880 498 L930 525 L980 560 Z"
          fill="url(#ph-rock)"
        />
        <path d="M520 470 L560 462 L600 452 L640 446 L690 440 L728 437 L760 440 L800 452 L840 470" fill="none" stroke="#9fc4ff" strokeOpacity="0.55" strokeWidth="1.5" filter="url(#ph-blur-sm)" />
        <path d="M0 560 V470 L80 455 L160 480 L240 470 L330 500 L420 520 L380 560 Z" fill="#03060f" />

        {/* Figure looking toward the city */}
        <g transform="translate(728 439) scale(1.45)">
          <ellipse cx="0" cy="-2" rx="16" ry="3" fill="#000" opacity="0.6" />
          <g fill="#04070f">
            <circle cx="0" cy="-86" r="7.5" />
            <path d="M-4 -79 H4 L5 -75 H-5 Z" />
            <path d="M-13 -75 Q0 -79 13 -75 L15 -44 L11 -41 H-11 L-15 -44 Z" />
            <path d="M-13 -73 L-18 -46 L-15 -44 L-10 -66 Z" />
            <path d="M13 -73 L18 -46 L15 -44 L10 -66 Z" />
            <path d="M-11 -42 H11 L10 -21 L8 0 H2.5 L1.2 -25 H-1.2 L-2.5 0 H-8 L-10 -21 Z" />
          </g>
          {/* rim light from the horizon */}
          <path d="M13 -75 L15 -44 M18 -46 L13 -73 M7 -86 A7.5 7.5 0 0 0 0 -93.5 M10 -21 L8 0" stroke="#cfe2ff" strokeWidth="1" opacity="0.7" fill="none" />
        </g>

        {/* Legibility fade for the copy on the left, and ground fade */}
        <rect width="1440" height="560" fill="url(#ph-fade-left)" />
        <rect y="440" width="1440" height="120" fill="url(#ph-fade-bottom)" />
      </svg>
      {/* On small screens the scene sits as a band below the copy; blend its top edge */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#02050d] to-transparent sm:hidden" />
    </div>
  );
}
