import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { PillarsCarousel } from "./PillarsCarousel";
import { pillars } from "@/data";
import { parseEmphasis } from "@/lib/text";

export function Pillars() {
  const lede = parseEmphasis(pillars.description);

  return (
    <section className="pillars relative isolate pt-4 pb-16 sm:pb-20 lg:pb-24">
      <Container>
        {/* Centred, unlike the band above it: this heading introduces a row of
            people rather than sitting beside one picture, so nothing pulls it
            to a side. */}
        <div className="pillars__head">
          <p className="pillars__eyebrow font-display text-accent">
            <Icon
              name={pillars.icon}
              className="pillars__eyebrow-icon h-5 w-5"
              strokeWidth={1.75}
            />
            {pillars.eyebrow}
          </p>

          <h2 className="pillars__title font-display font-extrabold text-slate-900">
            {pillars.title}
          </h2>

          <span className="pillars__rule" aria-hidden />

          <p className="pillars__lede">
            {lede.map((segment, i) =>
              segment.emphasis ? (
                <strong key={i} className="font-semibold text-slate-900">
                  {segment.text}
                </strong>
              ) : (
                <span key={i}>{segment.text}</span>
              ),
            )}
          </p>
        </div>

        <PillarsCarousel members={pillars.members} />
      </Container>
    </section>
  );
}
