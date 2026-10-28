import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-subtle">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-muted">{item.name}</span>
              ) : (
                <>
                  <Link href={item.path} className="transition-colors hover:text-accent-text">{item.name}</Link>
                  <ChevronRight aria-hidden className="h-3 w-3" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
