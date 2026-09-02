/**
 * Replaces `{token}` placeholders in a string with the matching value.
 *
 * Copy in `src/data/content` sometimes needs a value that lives somewhere else
 * (the phone number, the current year). Keeping the placeholder in the JSON
 * means an editor can move it around inside the sentence without touching a
 * component.
 */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
