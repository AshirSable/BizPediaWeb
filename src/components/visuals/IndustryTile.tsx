import Image from "next/image";
import { Building2, Cpu, GraduationCap, HeartPulse, Landmark, Scale, ShoppingBag, Truck, type LucideProps } from "lucide-react";

const icons: Record<string, React.ComponentType<LucideProps>> = {
  "financial-services": Landmark,
  "healthcare-administration": HeartPulse,
  education: GraduationCap,
  "retail-ecommerce": ShoppingBag,
  "real-estate": Building2,
  "logistics-operations": Truck,
  "professional-services": Scale,
  "startups-emerging-technology": Cpu,
};

export const industryIcon = (id: string) => icons[id] ?? Cpu;

/*
  Industry photography lives in /public/industries/<id>.jpg.
  Source: Unsplash (unsplash.com/license — free for commercial use, no attribution required).
    financial-services            photo-1611974789855-9c2a0a7236a3
    healthcare-administration     photo-1576091160550-2173dba999ef
    education                     photo-1541339907198-e08756dedf3f
    retail-ecommerce              photo-1441986300917-64674bd600d8
    real-estate                   photo-1486406146926-c627a92ad1ab
    logistics-operations          photo-1494412574643-ff11b0a5c1c3
    professional-services         photo-1519389950473-47ba0277781c
    startups-emerging-technology  photo-1550751827-4bd374c3f58b
*/
const photos = new Set(Object.keys(icons));

/** Focal point per photo so tight crops keep the subject in frame. */
const focus: Record<string, string> = {
  "healthcare-administration": "50% 70%",
  education: "40% 60%",
  "real-estate": "50% 35%",
  "startups-emerging-technology": "50% 45%",
};

/**
 * Brand-graded industry photo. The caller sets positioning and size via className
 * (it must establish a containing block, e.g. `relative` or `absolute`).
 * A navy colour grade unifies the set; it eases off on hover of a `.group` ancestor.
 */
export function IndustryScene({
  id,
  className = "",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority = false,
}: {
  id: string;
  className?: string;
  /** Kept for call-site compatibility with the old illustrated scenes. */
  variant?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = `/industries/${photos.has(id) ? id : "startups-emerging-technology"}.jpg`;
  return (
    <div aria-hidden className={`isolate overflow-hidden bg-[#050b1c] ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        quality={80}
        style={{ objectPosition: focus[id] ?? "50% 50%" }}
        className="object-cover saturate-[0.9] transition-[transform,filter] duration-[1.2s] ease-out-expo group-hover:scale-[1.06] group-hover:saturate-100"
      />
      {/* brand colour grade */}
      <div className="absolute inset-0 bg-[#0b2a7a] opacity-45 mix-blend-color transition-opacity duration-700 group-hover:opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_0%,rgb(61_155_255/0.28),transparent_55%)] mix-blend-screen" />
      {/* vignette for label legibility */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(2_5_13/0.94)_0%,rgb(2_5_13/0.55)_32%,rgb(2_5_13/0.08)_62%,transparent_80%)]" />
    </div>
  );
}
