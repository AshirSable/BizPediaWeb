import { BrainCircuit, ChartColumnIncreasing, Clapperboard, Code2, Rocket, Smartphone, Workflow, type LucideProps } from "lucide-react";
import type { ServiceSlug } from "@/content/services";

const map: Record<ServiceSlug, React.ComponentType<LucideProps>> = {
  "ai-automation": Workflow,
  "ai-machine-learning": BrainCircuit,
  "custom-software-development": Code2,
  "saas-product-development": Rocket,
  "web-mobile-development": Smartphone,
  "data-analytics-business-intelligence": ChartColumnIncreasing,
  "ai-video-creative": Clapperboard,
};

export function ServiceIcon({ slug, className = "h-5 w-5" }: { slug: ServiceSlug; className?: string }) {
  const Icon = map[slug];
  return <Icon aria-hidden className={className} strokeWidth={1.75} />;
}
