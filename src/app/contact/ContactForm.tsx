"use client";

import { useState } from "react";
import { contactContent } from "@/data";

const { fields, submitLabel, successMessage } = contactContent.form;

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm";

// TODO: wire this up to a real endpoint (API route, form service, or CRM)
// once you decide how leads should be captured.
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="rounded-md border border-slate-200 p-6 text-sm text-slate-700">
        {successMessage}
      </p>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      {/* Fields come from content/contact.json - add one there and it renders. */}
      {fields.map((field) => (
        <div key={field.id}>
          <label
            htmlFor={field.id}
            className="text-sm font-medium text-slate-900"
          >
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.id}
              name={field.id}
              rows={field.rows ?? 5}
              required={field.required}
              className={inputClass}
            />
          ) : (
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              required={field.required}
              className={inputClass}
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700"
      >
        {submitLabel}
      </button>
    </form>
  );
}
