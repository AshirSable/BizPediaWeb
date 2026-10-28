export const site = {
  name: "Bizpedia Tech",
  legalName: "Bizpedia Tech Private Limited",
  tagline: "Ideas to Intelligence. Intelligence to Impact.",
  footerBlurb:
    "We build AI-powered solutions, custom software and intelligent automation for real business needs.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  // Placeholders from the approved copy. Replace with verified details before publishing.
  contact: {
    email: null as string | null,
    phone: null as string | null,
    location: null as string | null,
  },
};

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Our Work", href: "/our-work" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const quickLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Our Work", href: "/our-work" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const secondaryLinks: NavItem[] = [
  { label: "Engagement Models", href: "/engagement-models" },
  { label: "FAQs", href: "/faq" },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];
