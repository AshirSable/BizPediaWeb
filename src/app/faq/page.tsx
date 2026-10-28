import type { Metadata } from "next";
import { faq } from "@/content/pages";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({ ...faq.seo, path: "/faq" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQs", path: "/faq" },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq.items)} />
      <PageHero
        eyebrow="FAQs"
        title="Frequently Asked Questions"
        highlight={1}
        intro="Answers about AI development, custom software, SaaS products, workflow automation, integrations and project delivery."
        breadcrumbs={crumbs}
      />
      <section className="pb-24" aria-label="Questions and answers">
        <Reveal className="container-site max-w-4xl">
          <FaqAccordion items={faq.items} />
        </Reveal>
      </section>
      <CtaBand title="Have a Business Challenge Worth Solving?" text="Tell us what you want to build, improve or automate. We will help you explore a practical way forward." primary={{ label: "Start a Conversation", href: "/contact" }} />
    </>
  );
}
