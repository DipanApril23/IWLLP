/**
 * Renders a schema.org object as a JSON-LD script.
 *
 * The object comes from src/lib/seo.ts, which builds it from the content JSON,
 * so nothing user-facing is written here.
 */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
