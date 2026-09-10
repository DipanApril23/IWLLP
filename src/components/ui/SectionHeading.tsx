export function SectionHeading({
  eyebrow,
  title,
  description,
  /**
   * Heading level. Sections inside a page are h2; a page whose only heading is
   * this one needs an h1, and /services, /about and /contact each had none.
   */
  level = 2,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-2 text-sm font-medium text-slate-500">{eyebrow}</p>
      ) : null}
      <Heading className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
