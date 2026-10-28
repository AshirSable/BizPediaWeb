import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/layout/Logo";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden px-5 pt-24 text-center">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <div className="relative">
        <LogoMark className="mx-auto h-16 w-16 animate-float" />
        <p className="mt-8 font-display text-7xl font-extrabold text-gradient">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-fg">This page could not be found</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">The link may be outdated, or the page may have moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/services" variant="outline">Explore Our Services</ButtonLink>
        </div>
      </div>
    </section>
  );
}
