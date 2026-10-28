import { LogoMark } from "@/components/layout/Logo";

/** The logo concept as an animated orbit: identity, forward movement, innovation, global impact. */
export function BrandOrbit() {
  const labels = [
    { t: "Identity", pos: "left-[2%] top-[20%]" },
    { t: "Forward movement", pos: "right-0 top-[10%]" },
    { t: "Innovation", pos: "right-[4%] bottom-[18%]" },
    { t: "Global impact", pos: "left-[6%] bottom-[8%]" },
  ];
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[30rem]">
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgb(61_155_255/0.35),transparent)] blur-xl" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute" style={{ inset: `${8 + i * 12}%`, transform: `rotateX(65deg) rotateY(${i * 18 - 18}deg)` }}>
          <div
            className="absolute inset-0 rounded-full border border-[#3d7bff]/35"
            style={{ animation: `spin-slow ${30 + i * 15}s linear infinite ${i % 2 ? "reverse" : ""}` }}
          >
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-[#7cc4ff] shadow-[0_0_14px_#3d9bff]" />
          </div>
        </div>
      ))}
      <div className="absolute inset-0 grid place-items-center">
        <div className="animate-float rounded-[2rem] border border-[#3d7bff]/30 bg-[#050b1c] p-8 shadow-[0_0_80px_-10px_rgb(36_99_255/0.7)]">
          <LogoMark className="h-28 w-28" />
        </div>
      </div>
      {labels.map((l) => (
        <span key={l.t} className={`glass absolute ${l.pos} rounded-full px-3 py-1.5 text-xs font-semibold text-fg`}>
          {l.t}
        </span>
      ))}
    </div>
  );
}
