import type { Metadata } from "next";
import { Suspense } from "react";
import { Building2, Clock, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { contact, faq } from "@/content/pages";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow, Highlight } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/ui/JsonLd";
import { ContactForm } from "@/components/forms/ContactForm";
import { PlanetHorizon } from "@/components/visuals/PlanetHorizon";

export const metadata: Metadata = pageMetadata({ ...contact.seo, path: "/contact" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  const getStarted = faq.items.find((f) => f.q === "How do we get started?");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <section className="relative isolate overflow-hidden pb-24 pt-32 sm:pt-40">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[34rem] overflow-hidden">
          <PlanetHorizon className="max-sm:opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
        </div>
        <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="enter lg:pt-6">
            <div className="text-white">
              <Breadcrumbs items={crumbs} />
            </div>
            <Eyebrow className="mt-8 !text-[#7cb6ff]">{contact.formTitle}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.06] text-white sm:text-5xl">
              <Highlight text={contact.h1} words={2} />
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#c3cfe8]">{contact.intro}</p>

            <div className="mt-24 space-y-4 lg:mt-36">
              <h2 className="font-display text-lg font-semibold text-fg">{contact.detailsTitle}</h2>
              <div className="card flex items-start gap-4 p-5">
                <Building2 aria-hidden className="mt-0.5 h-5 w-5 text-accent-text" />
                <div>
                  <p className="font-semibold text-fg">{site.legalName}</p>
                  {site.contact.email || site.contact.phone || site.contact.location ? (
                    <ul className="mt-2 space-y-1 text-sm text-muted">
                      {site.contact.email && <li>Email: <a className="text-accent-text hover:underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>}
                      {site.contact.phone && <li>Phone: {site.contact.phone}</li>}
                      {site.contact.location && <li>Office location: {site.contact.location}</li>}
                    </ul>
                  ) : (
                    <p className="mt-1 text-sm text-muted">Please use the enquiry form to reach our team.</p>
                  )}
                </div>
              </div>
              {getStarted && (
                <div className="card flex items-start gap-4 p-5">
                  <Clock aria-hidden className="mt-0.5 h-5 w-5 text-accent-text" />
                  <div>
                    <p className="font-semibold text-fg">{getStarted.q}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{getStarted.a}</p>
                  </div>
                </div>
              )}
              <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-accent-text hover:underline">
                <MessageSquareText aria-hidden className="h-4 w-4" /> Read frequently asked questions
              </Link>
            </div>
          </div>

          <div className="enter [animation-delay:150ms]">
            <div className="card relative overflow-hidden !bg-bg-elev">
              <div className="border-b border-line px-6 py-5 sm:px-8">
                <h2 className="font-display text-xl font-bold text-fg">{contact.formTitle}</h2>
              </div>
              <Suspense fallback={<div className="min-h-[40rem]" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
