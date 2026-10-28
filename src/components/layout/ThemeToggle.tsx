"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // Avoid a hydration mismatch: the theme is only known on the client.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex h-8 w-[3.75rem] shrink-0 items-center rounded-full border border-line-strong bg-bg-soft p-1 transition-colors ${className}`}
    >
      <Moon aria-hidden className="absolute left-2 h-3.5 w-3.5 text-subtle" />
      <Sun aria-hidden className="absolute right-2 h-3.5 w-3.5 text-subtle" />
      <span
        className={`relative z-10 grid h-6 w-6 place-items-center rounded-full bg-[linear-gradient(135deg,#2b74ff,#3d9bff)] text-white shadow-[0_0_12px_rgb(61_155_255/0.6)] transition-transform duration-500 ease-out-expo ${
          isDark ? "translate-x-0" : "translate-x-[1.75rem]"
        }`}
      >
        {isDark ? <Moon aria-hidden className="h-3.5 w-3.5" /> : <Sun aria-hidden className="h-3.5 w-3.5" />}
      </span>
    </button>
  );
}
