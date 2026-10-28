import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "dark" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ease-out-expo focus-visible:outline-2 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(110deg,#1d4fff_0%,#2b74ff_55%,#3d9bff_100%)] shadow-[0_8px_24px_-8px_rgb(36_99_255/0.7),inset_0_1px_0_rgb(255_255_255/0.25)] hover:shadow-[0_14px_36px_-10px_rgb(36_99_255/0.9),inset_0_1px_0_rgb(255_255_255/0.3)] hover:-translate-y-0.5",
  outline:
    "text-fg border border-line-strong bg-transparent hover:border-accent-2 hover:bg-[var(--glow)] hover:-translate-y-0.5",
  dark: "bg-[var(--btn-dark-bg)] text-[var(--btn-dark-fg)] hover:-translate-y-0.5 hover:shadow-lg",
  ghost: "text-accent-text px-0 py-1 hover:gap-3.5",
};

type CommonProps = { variant?: Variant; children: ReactNode; className?: string; arrow?: boolean; icon?: ReactNode };

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  arrow = true,
  icon,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {icon ?? (arrow ? <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /> : null)}
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  arrow = false,
  icon,
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {icon ?? (arrow ? <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /> : null)}
    </button>
  );
}
