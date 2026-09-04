import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { whatWeDo } from "@/data";
import { parseEmphasis } from "@/lib/text";

export function WhatWeDo() {
  const lede = parseEmphasis(whatWeDo.description);

  return (
    <section className="what-we-do relative isolate overflow-hidden bg-slate-950">
      {whatWeDo.background.image ? (
        <Image
          src={whatWeDo.background.image}
          alt={whatWeDo.background.alt}
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
      ) : null}

      {/* Readability wash. Kept in CSS because it changes direction with the
          layout - across on desktop, evenly over the whole frame on phones. */}
      <div className="what-we-do__shade absolute inset-0 -z-10" />

      <Container className="relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-accent text-sm font-semibold tracking-[0.2em] uppercase">
            {whatWeDo.eyebrow}
          </p>

          <h2 className="what-we-do__title font-display mt-3 font-extrabold text-white">
            {whatWeDo.title}
          </h2>

          <p className="what-we-do__lede mt-5 leading-relaxed text-white/80">
            {lede.map((segment, i) =>
              segment.emphasis ? (
                <strong key={i} className="font-semibold text-white">
                  {segment.text}
                </strong>
              ) : (
                <span key={i}>{segment.text}</span>
              ),
            )}
          </p>

          <div className="mt-8">
            <span className="cta-spin">
              <Button
                href={whatWeDo.cta.href}
                variant="secondary"
                className="border-white bg-white px-7 py-3.5 font-semibold tracking-wide text-slate-900 uppercase hover:bg-slate-100"
              >
                {whatWeDo.cta.label}
              </Button>
            </span>
          </div>
        </div>

        {/* The 1px gap plus the panel's own background is what draws the
            hairlines between cards - it stays correct at any column count,
            unlike per-card borders on a wrapping grid. */}
        <div className="what-we-do__panel mt-14 sm:mt-16">
          {whatWeDo.cards.map((card) => (
            <article key={card.title} className="what-we-do__card">
              <ServiceIcon
                name={card.icon}
                className="what-we-do__icon text-accent h-8 w-8"
                strokeWidth={1.75}
              />

              <h3 className="what-we-do__chip">{card.title}</h3>

              <p className="mt-4 text-sm leading-relaxed text-white/75">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
