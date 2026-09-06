import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { WhatWeDoCards } from "./WhatWeDoCards";
import { whatWeDo } from "@/data";
import { parseEmphasis } from "@/lib/text";

export function WhatWeDo() {
  const lede = parseEmphasis(whatWeDo.description);

  return (
    <section className="what-we-do relative isolate overflow-hidden bg-black">
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

        <WhatWeDoCards cards={whatWeDo.cards} />
      </Container>
    </section>
  );
}
