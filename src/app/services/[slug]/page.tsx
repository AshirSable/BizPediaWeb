import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check, MessageSquareText } from "lucide-react";
import { getService, services, type Service } from "@/content/services";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { MotionItem } from "@/components/ui/MotionItem";
import { SectionHeading, Eyebrow, Highlight } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { FaqAccordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceArt } from "@/components/visuals/ServiceArt";
import { ServiceIcon } from "@/components/visuals/ServiceIcon";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ ...s.seo, path: `/services/${s.slug}` });
}

/* Offerings are laid out three different ways so service pages don't feel identical. */
function OfferingsGrid({ s }: { s: Service }) {
  return (
    <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {s.offerings.map((o, i) => (
        <MotionItem key={o.title}>
          <SpotlightCard className="group h-full p-7">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold text-accent-text">{String(i + 1).padStart(2, "0")}</span>
              <span className="h-px flex-1 translate-x-3 bg-gradient-to-r from-line-strong to-transparent" />
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold text-fg">{o.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{o.text}</p>
          </SpotlightCard>
        </MotionItem>
      ))}
    </RevealGroup>
  );
}

function OfferingsSplit({ s }: { s: Service }) {
  return (
    <div className="mt-14 grid gap-x-12 gap-y-2 lg:grid-cols-2">
      {s.offerings.map((o, i) => (
        <Reveal key={o.title} delay={(i % 2) * 0.08}>
          <div className="group flex gap-5 border-t border-line py-7">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-bg-elev font-display text-sm font-bold text-accent-text transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-fg">{o.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{o.text}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function OfferingsStack({ s }: { s: Service }) {
  return (
    <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1fr]">
      {s.offerings.map((o, i) => (
        <Reveal key={o.title} delay={(i % 2) * 0.08} className={i === 0 ? "lg:row-span-2" : ""}>
          <div
            className={`relative h-full overflow-hidden rounded-[1.25rem] border border-line p-7 ${
              i === 0 ? "bg-[linear-gradient(140deg,#1d4fff,#0b2a99)] text-white" : "bg-card"
            }`}
          >
            {i === 0 && <div aria-hidden className="bg-grid absolute inset-0 opacity-40 [--grid-line:rgb(255_255_255/0.08)]" />}
            <div className="relative">
              <span className={`text-sm font-bold ${i === 0 ? "text-[#bfe0ff]" : "text-accent-text"}`}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={`mt-3 font-display font-semibold ${i === 0 ? "text-3xl text-white" : "text-xl text-fg"}`}>{o.title}</h3>
              <p className={`mt-3 leading-relaxed ${i === 0 ? "max-w-sm text-lg text-[#d5e4ff]" : "text-muted"}`}>{o.text}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function OfferingsList({ s }: { s: Service }) {
  return (
    <RevealGroup className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {s.offerings.map((o) => (
        <MotionItem key={o.title}>
          <div className="flex h-full items-center gap-4 rounded-2xl border border-line bg-card p-5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--glow)] text-accent-text">
              <Check aria-hidden className="h-4 w-4" />
            </span>
            <span className="font-medium text-fg">{o.title}</span>
          </div>
        </MotionItem>
      ))}
    </RevealGroup>
  );
}

const layouts = [OfferingsGrid, OfferingsSplit, OfferingsStack];

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const index = services.findIndex((x) => x.slug === s.slug);
  const Offerings = s.offeringsAsList ? OfferingsList : layouts[index % layouts.length];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.name, path: `/services/${s.slug}` },
  ];
  const contactHref = `/contact?service=${s.slug}`;
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          description: s.seo.description,
          serviceType: s.name,
          url: `${site.url}/services/${s.slug}`,
          provider: { "@type": "Organization", name: site.legalName, url: site.url },
        }}
      />
      {s.faqs.length > 0 && <JsonLd data={faqJsonLd(s.faqs)} />}

      <PageHero
        eyebrow={s.name}
        title={s.h1}
        highlight={s.h1.split(" ").length > 7 ? 3 : 2}
        intro={s.intro}
        breadcrumbs={crumbs}
        actions={
          <>
            <ButtonLink href={contactHref}>{s.button ?? s.finalCta}</ButtonLink>
            <ButtonLink href="/our-work" variant="outline">See Demonstrations</ButtonLink>
          </>
        }
        visual={
          <div className="relative">
            <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl" />
            <div className="card relative overflow-hidden p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[linear-gradient(135deg,#1d4fff,#3d9bff)] text-white">
                  <ServiceIcon slug={s.slug} className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-fg">{s.name}</span>
              </div>
              <ServiceArt slug={s.slug} className="h-auto w-full" />
            </div>
          </div>
        }
      />

      {/* Offerings */}
      <section className="relative py-20 sm:py-28" aria-labelledby="offerings-title">
        <div className="container-site">
          <div id="offerings-title">
            <SectionHeading eyebrow="Capabilities" title={s.offeringsTitle} highlight={s.offeringsTitle.split(" ").length > 3 ? 2 : 1} />
          </div>
          <Offerings s={s} />
        </div>
      </section>

      {/* Approach */}
      <section className="tone-invert relative overflow-hidden py-20 sm:py-28" aria-label={s.approach.title}>
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_20%_50%,black,transparent_70%)]" />
        {s.extra ? (
          <div className="container-site relative grid gap-12 lg:grid-cols-2">
            <Reveal>
              <Eyebrow>Our Approach</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] sm:text-4xl">
                <Highlight text={s.approach.title} words={2} />
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{s.approach.text}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card h-full p-8">
                <Eyebrow>Outcome</Eyebrow>
                <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] text-fg">{s.extra.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">{s.extra.text}</p>
              </div>
            </Reveal>
          </div>
        ) : (
          <Reveal className="container-site relative max-w-4xl text-center">
            <Eyebrow className="justify-center">Our Approach</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] sm:text-5xl">
              <Highlight text={s.approach.title} words={2} />
            </h2>
            <p className="mx-auto mt-8 max-w-3xl font-display text-xl font-medium leading-relaxed text-fg-soft sm:text-2xl">{s.approach.text}</p>
          </Reveal>
        )}
      </section>

      {/* FAQ */}
      {s.faqs.length > 0 && (
        <section className="py-20 sm:py-28" aria-labelledby="faq-title">
          <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Eyebrow>FAQs</Eyebrow>
              <h2 id="faq-title" className="mt-4 font-display text-3xl font-bold leading-[1.1] sm:text-4xl">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
              <Link href="/faq" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-text hover:underline">
                <MessageSquareText aria-hidden className="h-4 w-4" /> View all FAQs
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion items={s.faqs} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Related services */}
      <section className="border-t border-line py-16" aria-labelledby="more-services">
        <div className="container-site">
          <h2 id="more-services" className="font-display text-lg font-semibold text-fg">Explore other services</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3.5 transition-colors hover:border-accent-2">
                  <span className="flex items-center gap-3 text-sm font-medium text-fg">
                    <ServiceIcon slug={o.slug} className="h-4.5 w-4.5 text-accent-text" />
                    {o.name}
                  </span>
                  <ArrowUpRight aria-hidden className="h-4 w-4 text-subtle transition-transform group-hover:rotate-45 group-hover:text-accent-text" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={s.finalCta} text={undefined} primary={{ label: s.finalCta, href: contactHref }} secondary={{ label: "See How We Work", href: "/how-we-work" }} />
    </>
  );
}
