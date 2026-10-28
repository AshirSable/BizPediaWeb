import type { ReactNode } from "react";
import { Sparkle } from "lucide-react";
import { Reveal } from "./Reveal";

/** Wraps the last `highlight` words of a title in the brand gradient. */
export function Highlight({ text, words = 2 }: { text: string; words?: number }) {
  const parts = text.split(" ");
  if (words <= 0 || parts.length <= words) return <>{text}</>;
  const head = parts.slice(0, -words).join(" ");
  const tail = parts.slice(-words).join(" ");
  return (
    <>
      {head} <span className="text-gradient">{tail}</span>
    </>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow ${className}`}>
      <Sparkle aria-hidden className="h-3.5 w-3.5" />
      {children}
    </p>
  );
}

type Props = {
  eyebrow?: string;
  title: string;
  highlight?: number;
  text?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, highlight = 2, text, as = "h2", align = "left", className = "", children }: Props) {
  const Tag = as;
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow ? <Eyebrow className={center ? "justify-center" : ""}>{eyebrow}</Eyebrow> : null}
      <Tag
        className={`mt-4 font-display font-bold text-fg ${
          as === "h1" ? "text-4xl sm:text-5xl lg:text-6xl leading-[1.05]" : "text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1]"
        }`}
      >
        <Highlight text={title} words={highlight} />
      </Tag>
      {text ? <p className={`mt-5 text-base leading-relaxed text-muted sm:text-lg ${center ? "mx-auto" : ""} max-w-2xl`}>{text}</p> : null}
      {children}
    </Reveal>
  );
}
