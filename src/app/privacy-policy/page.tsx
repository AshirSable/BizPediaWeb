import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";

// Legal text must reflect actual practices and be reviewed before publication.
// This page intentionally contains no invented legal language and is excluded from indexing.
export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Bizpedia Tech",
  description: "The Bizpedia Tech Privacy Policy is being prepared.",
  path: "/privacy-policy",
  noIndex: true,
});

export default function Page() {
  return (
    <PageHero
      eyebrow="Legal"
      title="Privacy Policy"
      highlight={0}
      intro="This document is being prepared and will be published here after review."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy-policy" },
      ]}
    >
      <div className="card mt-10 flex items-start gap-4 p-6">
        <FileText aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent-text" />
        <p className="text-muted">If you have a question in the meantime, please contact us through the enquiry form.</p>
      </div>
      <ButtonLink href="/contact" variant="outline" className="mt-6">Contact Us</ButtonLink>
    </PageHero>
  );
}
