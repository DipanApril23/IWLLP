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
 * Built to survive the list growing. On a phone the wall is a swipeable track,
 * one card at a time, so its height is one card however many there are. Wider
 * up it is a grid that derives its column count from the width rather than
 * hard-coding one per breakpoint, and shows two rows of whatever that works out
 * to before offering the rest (uncapped, twenty certificates run to 7000px).
 * The dialog carries a thumbnail rail either way, so reaching the last one
 * stays a single click rather than nineteen.
 */
export function CertificateWall({ items }: { items: Certificate[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  /** What the stylesheet made of the wall. Null until measured. */
  const [layout, setLayout] = useState<{
    /** True below the breakpoint where the wall becomes a swipeable track. */
    track: boolean;
    /** Columns the grid resolved to. 1 while it is a track. */
    columns: number;
  } | null>(null);
  const [active, setActive] = useState(0);

  // The stylesheet decides both the column count and whether the wall is a grid
  // at all, so the component asks it rather than repeating the breakpoints.
  // auto-fill lays the tracks out whether or not there are cards to fill them,
  // so the count is right even while the wall is collapsed.
  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;

    const measure = () => {
      const style = getComputedStyle(wall);
      const track = style.display === "flex";
      const columns = style.gridTemplateColumns
        .split(" ")
        .filter((value) => value && value !== "none").length;
      setLayout({ track, columns: Math.max(1, columns) });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wall);
    return () => observer.disconnect();
  }, []);

  // As a track the wall scrolls rather than stacking, so its height is one card
  // whatever the count - there is nothing to cap and nothing to hide.
  const cap = layout?.track
    ? items.length
    : Math.max(
        layout
          ? layout.columns * CERTIFICATES_ROWS_BEFORE_TOGGLE
          : CERTIFICATES_INITIAL_COUNT,
        CERTIFICATES_MIN_VISIBLE,
      );
  const capped = items.length > cap;
  const visible = expanded ? items : items.slice(0, cap);

  // Keep the dots in step with wherever the track actually is, whether it got
  // there by swipe or by tapping a dot.
  useEffect(() => {
    const wall = wallRef.current;
    if (!wall || !layout?.track) return;

    const sync = () => {
      const first = wall.firstElementChild;
      const second = wall.children[1];
      if (!first) return;
      const step = second
        ? second.getBoundingClientRect().left - first.getBoundingClientRect().left
        : first.getBoundingClientRect().width;
      if (step > 0) setActive(Math.round(wall.scrollLeft / step));
    };

    sync();
    wall.addEventListener("scroll", sync, { passive: true });
    return () => wall.removeEventListener("scroll", sync);
  }, [layout?.track]);

  function scrollToCard(index: number) {
    const wall = wallRef.current;
    const first = wall?.firstElementChild;
    const second = wall?.children[1];
    if (!wall || !first) return;
    const step = second
      ? second.getBoundingClientRect().left - first.getBoundingClientRect().left
      : first.getBoundingClientRect().width;
    wall.scrollTo({ left: index * step, behavior: "smooth" });
  }

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

      {/* Position for the track. The grid needs none - every card is on screen
          at once - so these only exist below the breakpoint. */}
      {layout?.track && items.length > 1 ? (
        <div className="certs__dots">
          {items.map((item, i) => (
            <button
              key={item.image}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={interpolate(labels.showCertificate, {
                title: item.title,
                issuer: item.issuer,
              })}
              aria-current={i === active}
              className="certs__dot"
            />
          ))}
        </div>
      ) : null}

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
