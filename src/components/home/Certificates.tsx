import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { CertificateWall } from "./CertificateWall";
import { certificates } from "@/data";

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
        </div>

        <CertificateWall items={certificates.items} />
      </Container>
    </section>
  );
}
