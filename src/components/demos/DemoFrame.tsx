import type { ReactNode } from "react";
import { FlaskConical } from "lucide-react";

/** Window chrome shared by the demonstrations, with an explicit "simulated" label. */
export function DemoFrame({ title, children, actions }: { title: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-bg-elev shadow-[0_30px_80px_-30px_rgb(0_20_80/0.45)]">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-line bg-bg-soft px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#06d6a0]/70" />
          <span className="ml-2 truncate text-xs font-semibold text-muted">{title}</span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-[#b45309] dark:text-[#fbbf24]">
          <FlaskConical aria-hidden className="h-3 w-3" /> Simulated · sample data
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
      {actions ? <div className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-3 sm:px-5">{actions}</div> : null}
    </div>
  );
}

export function DemoButton({ children, onClick, primary, disabled }: { children: ReactNode; onClick: () => void; primary?: boolean; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all disabled:opacity-50 ${
        primary ? "bg-accent text-white hover:brightness-110" : "border border-line-strong text-fg hover:border-accent-2"
      }`}
    >
      {children}
    </button>
  );
}
