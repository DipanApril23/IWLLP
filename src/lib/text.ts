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

export type TextSegment = {
  text: string;
  /** True for the halves that sat between `**` markers. */
  emphasis: boolean;
};

/**
 * Splits copy written with `**bold**` markers into renderable segments.
 *
 * Long-form copy in the JSON needs a few emphasised phrases, and asking an
 * editor to hand-write an array of segments for one sentence is worse than
 * asking them to type two asterisks. Splitting on the marker leaves the
 * emphasised halves at every odd index.
 */
export function parseEmphasis(text: string): TextSegment[] {
  return text
    .split("**")
    .map((part, i) => ({ text: part, emphasis: i % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
}
