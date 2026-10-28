import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AboutIntro } from "@/components/home/AboutIntro";
import { ProcessJourney } from "@/components/home/ProcessJourney";
import { ServicesBento } from "@/components/home/ServicesBento";
import { IndustriesShowcase } from "@/components/home/IndustriesShowcase";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhySection } from "@/components/home/WhySection";
import { CtaBand } from "@/components/ui/CtaBand";
import { home } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...home.seo, path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <ProcessJourney />
      <ServicesBento />
      <IndustriesShowcase />
      <FeaturedWork />
      <WhySection />
      <CtaBand
        title={home.cta.title}
        text={home.cta.text}
        primary={{ label: home.cta.primary, href: "/contact" }}
        secondary={{ label: home.cta.secondary, href: "/services" }}
      />
    </>
  );
}
