import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { homeCta } from "@/data";

export function CtaSection() {
  return (
    <section className="py-24">
      <Container className="flex flex-col items-start gap-6 rounded-xl bg-slate-900 p-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold text-white">
            {homeCta.title}
          </p>
          <p className="mt-2 text-sm text-slate-300">{homeCta.description}</p>
        </div>
        <span className="cta-spin">
          <Button href={homeCta.button.href}>{homeCta.button.label}</Button>
        </span>
      </Container>
    </section>
  );
}
