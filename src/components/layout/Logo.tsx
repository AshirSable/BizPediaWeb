import { useId } from "react";

/** Bizpedia Tech mark: the "B" identity, a forward-moving orbit and the innovation spark. */
export function LogoMark({ className = "h-9 w-9", title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={`b-${id}`} x1="10" y1="6" x2="54" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5cc8ff" />
          <stop offset="0.55" stopColor="#2a7bff" />
          <stop offset="1" stopColor="#1546e8" />
        </linearGradient>
        <linearGradient id={`o-${id}`} x1="4" y1="46" x2="52" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1546e8" stopOpacity="0" />
          <stop offset="0.35" stopColor="#1f63ff" />
          <stop offset="1" stopColor="#7fd3ff" />
        </linearGradient>
      </defs>
      {/* B body: top bar + bowls, with a separated stem */}
      <path
        fill={`url(#b-${id})`}
        fillRule="evenodd"
        d="M17 7h19.5C46 7 51.5 12.6 51.5 20c0 4.3-2 7.7-5.3 9.7 4.8 1.9 7.8 6.1 7.8 11.6C54 50.2 47.6 57 37.6 57H25.5V47.5h11c3.6 0 6-2.3 6-5.4s-2.4-5.3-6-5.3h-11V27.6h9.4c3.2 0 5.3-2 5.3-4.8s-2.1-4.7-5.3-4.7H17z"
      />
      <path fill={`url(#b-${id})`} d="M14 22h8.5v35H14z" />
      {/* Orbit swoosh */}
      <path
        fill={`url(#o-${id})`}
        d="M4.5 47.8c-2.2-4.6 7.6-14.1 22.5-21.3 13.2-6.3 25.6-8.8 30.4-6.5-5-1.2-16.4 1.8-28.4 7.6C15.4 34.1 6.4 41.8 8 46.3c.8 2.3 4.4 3.1 9.7 2.5-6.4 1.7-11.6 1.3-13.2-1z"
      />
      {/* Innovation spark */}
      <path fill="#5cc8ff" d="M55 2.5l1.6 4.4 4.4 1.6-4.4 1.6L55 14.5l-1.6-4.4-4.4-1.6 4.4-1.6z" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="font-display text-[1.15rem] font-extrabold leading-none tracking-tight text-fg">
        Bizpedia <span className="font-semibold text-accent-text">Tech</span>
      </span>
    </span>
  );
}
