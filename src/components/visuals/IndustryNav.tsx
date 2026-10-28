"use client";

import { useEffect, useState } from "react";

/** Sticky in-page navigation that tracks which industry is on screen. */
export function IndustryNav({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Industries on this page" className="hidden lg:block">
      <ul className="sticky top-28 space-y-1 border-l border-line">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? "true" : undefined}
              className={`-ml-px block border-l-2 py-2 pl-4 text-sm transition-colors ${
                active === it.id ? "border-accent-2 font-semibold text-fg" : "border-transparent text-muted hover:text-fg"
              }`}
            >
              {it.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
