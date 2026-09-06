import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { team } from "@/data";
import { parseEmphasis } from "@/lib/text";

export function Team() {
  const lede = parseEmphasis(team.description);

  return (
    <section className="team relative isolate bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="team__head">
          <p className="team__eyebrow font-display text-accent">
            {team.eyebrow}
          </p>

          <h2 className="team__title font-display font-extrabold text-slate-900">
            {team.title}
          </h2>

          {/* Rule with the icon sitting on it, as on the original site - the
              same device the Mission / Vision / Values panels use, so the two
              sections read as one family. */}
          <div className="team__rule">
            <span className="team__rule-line" />
            <Icon
              name={team.icon}
              className="team__icon text-accent h-6 w-6"
              strokeWidth={1.75}
            />
            <span className="team__rule-line" />
          </div>

          <p className="team__lede">
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

        {/* The photograph and what it shows belong together, so they are one
            figure: picture on top, caption strip beneath carrying the office
            and the disciplines the copy above names. */}
        <figure className="team__frame">
          <div className="team__photo">
            <Image
              src={team.photo.image}
              alt={team.photo.alt}
              width={team.photo.width}
              height={team.photo.height}
              sizes="(min-width: 64rem) 58rem, 100vw"
              className="team__image"
            />
          </div>

          <figcaption className="team__caption">
            <span className="team__caption-text">{team.caption}</span>

            <ul className="team__tags">
              {team.disciplines.map((discipline) => (
                <li key={discipline} className="team__tag">
                  {discipline}
                </li>
              ))}
            </ul>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
