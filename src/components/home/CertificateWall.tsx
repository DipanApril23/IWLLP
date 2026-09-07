"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Award, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { certificates, type Certificate } from "@/data";
import { interpolate } from "@/lib/text";

const labels = certificates.labels;

/**
 * The credential wall: every certificate visible at once, each opening full
 * size in a dialog.
 *
 * The original site steps through them one at a time, which means four clicks
 * before you know what the firm actually holds - the opposite of what a wall
 * of credentials is for. Showing all four and enlarging on demand puts the
 * whole set in one glance and still gives the scan enough room to be read.
 */
export function CertificateWall({ items }: { items: Certificate[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  // Drive the native dialog from state rather than the other way round, so
  // Escape, the backdrop and the buttons all end up in the same place.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  const move = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length],
  );

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  }

  const current = open === null ? null : items[open];

  return (
    <>
      <ul className="certs__wall" aria-label={labels.region}>
        {items.map((item, i) => (
          <li key={item.image} className="certs__card">
            {/* The scan sits on a cream mat with a gold rule inside it, like a
                mounted document. The mat is the frame's padding, so `fill`
                insets to it and the scan is never cropped - one of the four is
                A4 portrait against three landscape, and `cover` would slice
                the text off whichever way round it was set. */}
            <span className="certs__frame">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 80rem) 16rem, (min-width: 40rem) 45vw, 90vw"
                className="certs__scan"
              />
              <span className="certs__view" aria-hidden>
                <Maximize2 className="h-4 w-4" strokeWidth={2} />
                {labels.view}
              </span>
            </span>

            <span className="certs__seal" aria-hidden>
              <Award className="h-4 w-4" strokeWidth={2} />
            </span>

            <span className="certs__issuer">{item.issuer}</span>

            <h3 className="certs__name font-display">
              {/* Stretched over the whole card, so the card is clickable but
                  there is still exactly one focus stop and a real heading. */}
              <button
                type="button"
                className="certs__open"
                onClick={() => setOpen(i)}
              >
                {item.title}
              </button>
            </h3>

            <span className="certs__valid">{item.validity}</span>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="certs__dialog"
        aria-label={labels.dialogTitle}
        onClose={() => setOpen(null)}
        onKeyDown={handleKeyDown}
        onClick={(event) => {
          // Clicks land on the dialog itself only when they miss the panel.
          if (event.target === dialogRef.current) setOpen(null);
        }}
      >
        {current ? (
          <div className="certs__modal">
            <div className="certs__stage">
              <Image
                src={current.image}
                alt={current.alt}
                fill
                sizes="(min-width: 56rem) 55vw, 92vw"
                className="certs__full"
              />
            </div>

            <div className="certs__details">
              <p className="certs__kicker">{labels.dialogTitle}</p>

              <p className="certs__modal-issuer">{current.issuerName}</p>
              <p className="certs__modal-title font-display">{current.title}</p>

              <dl className="certs__facts">
                <dt>{labels.heldBy}</dt>
                <dd>{current.holder}</dd>
                <dt>{labels.issuedBy}</dt>
                <dd>{current.issuer}</dd>
                {current.reference ? (
                  <>
                    <dt>{labels.referenceLabel}</dt>
                    <dd className="certs__ref">{current.reference}</dd>
                  </>
                ) : null}
              </dl>

              <p className="certs__modal-detail">{current.detail}</p>

              <p className="certs__modal-valid">{current.validity}</p>

              <div className="certs__nav">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label={labels.previous}
                  className="certs__step"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
                </button>

                <span className="certs__position">
                  {interpolate(labels.position, {
                    current: (open ?? 0) + 1,
                    total: items.length,
                  })}
                </span>

                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label={labels.next}
                  className="certs__step"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={labels.close}
              className="certs__close"
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
