// Loader for src/data/content/contact.json. The form fields are data too, so
// adding a field to the JSON adds it to the rendered form.
import contactContentJson from "./content/contact.json";

export type ContactField = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  /** Only read for `type: "textarea"`. */
  rows?: number;
  required?: boolean;
};

export const contactContent = {
  ...contactContentJson,
  form: {
    ...contactContentJson.form,
    fields: contactContentJson.form.fields as ContactField[],
  },
};
