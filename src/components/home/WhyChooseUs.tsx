import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyChooseUs } from "@/data";

export function WhyChooseUs() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-24">
      <Container>
        <SectionHeading
          eyebrow={whyChooseUs.eyebrow}
          title={whyChooseUs.title}
        />

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {whyChooseUs.points.map((point) => (
            <div key={point.title}>
              <p className="text-base font-medium text-slate-900">
                {point.title}
              </p>
              <p className="mt-2 text-sm text-slate-600">{point.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
