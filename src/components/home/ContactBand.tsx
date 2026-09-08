import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { contactBand, contactForm } from "@/data";
import { parseEmphasis } from "@/lib/text";

export function ContactBand() {
  const lede = parseEmphasis(contactBand.description);

  return (
    <section className="contact relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
      {contactBand.background.image ? (
        <Image
          src={contactBand.background.image}
          alt={contactBand.background.alt}
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
      ) : null}

      {/* Readability wash. In CSS because it changes direction with the
          layout: weighted to the copy side on a desktop, even over the whole
          frame once the two columns stack. */}
      <div className="contact__shade absolute inset-0 -z-10" />

      <Container>
        <div className="contact__grid">
          <div className="contact__intro">
            <p className="contact__eyebrow font-display text-accent">
              <Icon
                name={contactBand.icon}
                className="contact__eyebrow-icon h-5 w-5"
                strokeWidth={1.75}
              />
              {contactBand.eyebrow}
            </p>

            <h2 className="contact__title font-display font-extrabold">
              {contactBand.title}
            </h2>

            <span className="contact__rule" aria-hidden />

            <p className="contact__lede">
              {lede.map((segment, i) =>
                segment.emphasis ? (
                  <strong key={i} className="contact__strong">
                    {segment.text}
                  </strong>
                ) : (
                  <span key={i}>{segment.text}</span>
                ),
              )}
            </p>

            {/* Not everyone wants to fill in a form. The number and the address
                come from site.json, so they stay right when it changes. */}
            <ul
              className="contact__details"
              aria-label={contactBand.labels.detailsRegion}
            >
              {contactBand.details.map((detail) => (
                <li key={detail.label} className="contact__detail">
                  <span className="contact__detail-icon" aria-hidden>
                    <Icon name={detail.icon} className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="contact__detail-body">
                    <span className="contact__detail-label">{detail.label}</span>
                    {detail.href ? (
                      <a className="contact__detail-value" href={detail.href}>
                        {detail.value}
                      </a>
                    ) : (
                      <span className="contact__detail-value">
                        {detail.value}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact__card">
            <p className="contact__card-title font-display">
              {contactBand.formHeading}
            </p>
            <p className="contact__card-note">{contactBand.formNote}</p>

            {/* The enquiry form is hosted elsewhere and embedded as-is. The
                widget's own resizer sets the frame's height as the form grows
                and shrinks - it does not stay one height, a failed submit adds
                an error line under every required field - and the CSS keeps a
                floor under it so a blocked script degrades to a whole form
                rather than a cropped one. */}
            <div className="contact__frame">
              <iframe
                src={contactForm.src}
                id={contactForm.elementId}
                title={contactBand.labels.formTitle}
                loading="lazy"
                className="contact__iframe"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name={contactForm.formName}
                data-height={contactForm.declaredHeight}
                data-layout-iframe-id={contactForm.elementId}
                data-form-id={contactForm.formId}
              />
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
