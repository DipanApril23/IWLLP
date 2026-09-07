import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { CertificateWall } from "./CertificateWall";
import { certificates } from "@/data";
import { interpolate } from "@/lib/text";

export function Certificates() {
  return (
    <section className="certs relative isolate pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <Container>
        <div className="certs__head">
          <p className="certs__eyebrow font-display text-accent">
            <Icon
              name={certificates.icon}
              className="certs__eyebrow-icon h-5 w-5"
              strokeWidth={1.75}
            />
            {certificates.eyebrow}
          </p>

          <h2 className="certs__title font-display font-extrabold">
            {certificates.title}
          </h2>

          <span className="certs__rule" aria-hidden />

          <p className="certs__lede">{certificates.description}</p>

          {/* Two labels rather than one with a {count} token, so "1 credential"
              never renders as "1 credentials". */}
          <p className="certs__count">
            {certificates.items.length === 1
              ? certificates.labels.countOne
              : interpolate(certificates.labels.countMany, {
                  count: certificates.items.length,
                })}
          </p>
        </div>

        <CertificateWall items={certificates.items} />
      </Container>
    </section>
  );
}
