import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { team } from "@/data";
import { parseEmphasis } from "@/lib/text";

export function Team() {
  const lede = parseEmphasis(team.description);

  return (
    <section className="team relative isolate bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        {/* Copy beside the photograph rather than stacked above it. A centred
            stack put a full-width paragraph and a full-width picture end to
            end, which left the section mostly empty space to scroll past. */}
        <div className="team__grid">
          <div className="team__copy">
            <p className="team__eyebrow font-display text-accent">
              <Icon
                name={team.icon}
                className="team__eyebrow-icon h-5 w-5"
                strokeWidth={1.75}
              />
              {team.eyebrow}
            </p>

            <h2 className="team__title font-display font-extrabold text-slate-900">
              {team.title}
            </h2>

            <span className="team__rule" aria-hidden />

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

            {/* The disciplines the paragraph above names, pulled out so the
                section says what the team does and not only who it is. */}
            <ul className="team__tags">
              {team.disciplines.map((discipline) => (
                <li key={discipline} className="team__tag">
                  {discipline}
                </li>
              ))}
            </ul>
          </div>

          <figure className="team__frame">
            <div className="team__photo">
              <Image
                src={team.photo.image}
                alt={team.photo.alt}
                width={team.photo.width}
                height={team.photo.height}
                sizes="(min-width: 64rem) 58vw, 100vw"
                className="team__image"
              />
            </div>

            <figcaption className="team__caption">{team.caption}</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
