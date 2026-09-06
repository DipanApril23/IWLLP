import { PillarsCarousel } from "./PillarsCarousel";
import { pillars } from "@/data";
import { parseEmphasis } from "@/lib/text";

/**
 * The individual members, rendered inside the Team section rather than as a
 * section of its own.
 *
 * As two sections it read badly: an `<h2>OUR TEAM</h2>` followed straight away
 * by an eyebrow saying "Our Team", two sibling headings about the same subject,
 * and the icon/eyebrow/title/rule stack repeated verbatim a screen apart. These
 * people are part of the team introduced above, so the heading is an `<h3>` and
 * the eyebrow is gone - the parent heading already says whose team this is.
 */
export function Pillars() {
  const lede = parseEmphasis(pillars.description);

  return (
    <div className="pillars">
      <div className="pillars__head">
        <h3 className="pillars__title font-display font-extrabold text-slate-900">
          {pillars.title}
        </h3>

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
    </div>
  );
}
