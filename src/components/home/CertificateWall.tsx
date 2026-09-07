"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import {
  CERTIFICATES_INITIAL_COUNT,
  CERTIFICATES_MIN_VISIBLE,
  CERTIFICATES_ROWS_BEFORE_TOGGLE,
  certificates,
  type Certificate,
} from "@/data";
import { interpolate } from "@/lib/text";

const labels = certificates.labels;

/**
 * The credential wall: the certificates the firm holds, each opening full size
 * in a dialog.
 *
 * Built to survive the list growing. The grid derives its column count from the
 * width rather than hard-coding one per breakpoint; the wall shows two rows of
 * whatever that works out to before offering the rest (uncapped, twenty
 * certificates run to 7000px on a phone); and the dialog carries a thumbnail
 * rail so reaching the last one stays a single click rather than nineteen.
 */
export function CertificateWall({ items }: { items: Certificate[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  /** Columns the grid actually resolved to. Null until measured. */
  const [columns, setColumns] = useState<number | null>(null);

  // The grid picks its own column count from the available width, so the only
  // way to cap by rows is to ask it what it decided. auto-fill lays the tracks
  // out whether or not there are cards to fill them, so the computed value is
  // right even while the wall is collapsed.
  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;

    const measure = () => {
      const tracks = getComputedStyle(wall)
        .gridTemplateColumns.split(" ")
        .filter((track) => track && track !== "none").length;
      setColumns(Math.max(1, tracks));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wall);
    return () => observer.disconnect();
  }, []);

  const perRow = columns ?? 0;
  const cap = Math.max(
    perRow > 0
      ? perRow * CERTIFICATES_ROWS_BEFORE_TOGGLE
      : CERTIFICATES_INITIAL_COUNT,
    CERTIFICATES_MIN_VISIBLE,
  );
  const capped = items.length > cap;
  const visible = expanded ? items : items.slice(0, cap);

  // Drive the native dialog from state rather than the other way round, so
  // Escape, the backdrop and the buttons all end up in the same place.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  // Keep the active thumbnail in view. Scrolled by hand rather than with
  // scrollIntoView, which would also move the page behind the dialog.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || open === null) return;
    const thumb = rail.children[open] as HTMLElement | undefined;
    if (!thumb) return;
    rail.scrollTo({
      left: thumb.offsetLeft - rail.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: "smooth",
    });
  }, [open]);

  const move = useCallback(
    (delta: number) =>
      setOpen((i) =>
        i === null ? i : (i + delta + items.length) % items.length,
      ),
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
      <ul ref={wallRef} className="certs__wall" aria-label={labels.region}>
        {visible.map((item, i) => (
          <li key={item.image} className="certs__card">
            {/* The scan sits on a cream mat with a gold rule inside it, like a
                mounted document. The mat is the frame's padding, so `fill`
                insets to it and the scan is never cropped - the set already
                mixes landscape and A4 portrait, and `cover` would slice the
                text off whichever way round it was set. */}
            <span className="certs__frame">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 80rem) 17rem, (min-width: 40rem) 45vw, 90vw"
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

      {capped ? (
        <div className="certs__more-row">
          <button
            type="button"
            className="certs__more"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded
              ? labels.showFewer
              : interpolate(labels.showAll, { count: items.length })}
            <ChevronDown
              className={`certs__chevron h-4 w-4${expanded ? " certs__chevron--up" : ""}`}
              strokeWidth={2.5}
            />
          </button>
        </div>
      ) : null}

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
                    current: open! + 1,
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

              {/* Direct access to every certificate. Stepping is fine at four
                  and useless at twenty - this keeps the last one a single
                  click away however long the list gets. */}
              {items.length > 2 ? (
                <div
                  ref={railRef}
                  className="certs__rail"
                  role="group"
                  aria-label={labels.rail}
                >
                  {items.map((item, i) => (
                    <button
                      key={item.image}
                      type="button"
                      onClick={() => setOpen(i)}
                      aria-label={interpolate(labels.railItem, {
                        title: item.title,
                        issuer: item.issuer,
                      })}
                      aria-current={i === open}
                      className="certs__thumb"
                    >
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="4rem"
                        className="certs__thumb-scan"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
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
