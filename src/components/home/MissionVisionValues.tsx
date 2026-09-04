import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { missionVisionValues } from "@/data";

export function MissionVisionValues() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mvv">
          {missionVisionValues.map((card) => (
            <article key={card.title} className="mvv__card">
              {card.image ? (
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 64rem) 33vw, 100vw"
                  className="mvv__image object-cover object-center"
                />
              ) : null}

              <div className="mvv__shade" />

              <div className="mvv__body">
                <h3 className="mvv__title font-display">{card.title}</h3>

                {/* Rule with the icon sitting on it, as in the original. The
                    rules are flex children so they split whatever width is
                    left over once the icon has taken its own. */}
                <div className="mvv__rule">
                  <span className="mvv__rule-line" />
                  <Icon
                    name={card.icon}
                    className="mvv__icon text-accent h-5 w-5"
                    strokeWidth={1.75}
                  />
                  <span className="mvv__rule-line" />
                </div>

                <p className="mvv__text">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
