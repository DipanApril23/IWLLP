"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  PILLARS_ADVANCE_MS,
  PILLARS_RESUME_MS,
  pillars,
  type PillarMember,
} from "@/data";
import { interpolate } from "@/lib/text";

/** Slack in px when comparing scroll positions - sub-pixel widths never land
 *  on an exact boundary. */
const EPSILON = 8;

export function PillarsCarousel({ members }: { members: PillarMember[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const heldUntil = useRef(0);
  const [active, setActive] = useState(0);
  /** One dot per position the track can rest at, not one per member: at three
   *  across, eight members only make six distinct views. */
  const [stops, setStops] = useState(0);

  const hold = useCallback(() => {
    heldUntil.current = Date.now() + PILLARS_RESUME_MS;
  }, []);

  /** Width of one card plus the gap between two - the distance of one step. */
  const step = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild;
    const second = track?.children[1];
    if (!track || !first) return 0;
    const a = first.getBoundingClientRect();
    return second ? second.getBoundingClientRect().left - a.left : a.width;
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({ left: index * step(), behavior: "smooth" });
    },
    [step],
  );

  const go = useCallback(
    (delta: number) => {
      const track = trackRef.current;
      const s = step();
      if (!track || s <= 0) return;
      const last = Math.round((track.scrollWidth - track.clientWidth) / s);
      const now = Math.round(track.scrollLeft / s);
      // Wrap at both ends so the arrows never dead-end on a card.
      const next = now + delta < 0 ? last : now + delta > last ? 0 : now + delta;
      scrollTo(next);
    },
    [scrollTo, step],
  );

  // Auto-advance. It stands down when every member already fits.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (track.scrollWidth - track.clientWidth < EPSILON) return;
      if (hovering.current || Date.now() < heldUntil.current) return;
      go(1);
    }, PILLARS_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [go]);

  // Keep the dots in step with wherever the track actually is, whether it got
  // there on its own or because someone swiped.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const sync = () => {
      const s = step();
      const overflow = track.scrollWidth - track.clientWidth;
      setStops(s > 0 && overflow >= EPSILON ? Math.round(overflow / s) + 1 : 0);
      if (s > 0) setActive(Math.round(track.scrollLeft / s));
    };

    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [step]);

  return (
    <div className="pillars__panel">
      <div
        ref={trackRef}
        className="pillars__track"
        role="group"
        aria-label={pillars.labels.region}
        onPointerEnter={() => (hovering.current = true)}
        onPointerLeave={() => (hovering.current = false)}
        onPointerDown={hold}
        onTouchStart={hold}
      >
        {members.map((member) => (
          <article key={member.name} className="pillars__card">
            <div className="pillars__avatar">
              <Image
                src={member.image}
                alt={member.alt}
                fill
                sizes="(min-width: 64rem) 8.5rem, 7.5rem"
                // Eager, unlike everything else on the page: a lazy portrait
                // that is off to the right of the track only starts loading
                // once the carousel has already scrolled it into view, so the
                // avatar arrives blank and pops in mid-advance. At this size
                // the eight optimised portraits are a few KB each.
                loading="eager"
                className="pillars__portrait"
              />
            </div>

            <h3 className="pillars__name font-display">{member.name}</h3>
            <p className="pillars__years">{member.experience}</p>
            <p className="pillars__bio">{member.bio}</p>
          </article>
        ))}
      </div>

      {/* Arrows sit in the panel's own padding rather than over a card, and
          start at sm - below that the padding is too narrow to hold them and
          a touch device swipes instead. */}
      {stops > 1 ? (
        <>
          <button
            type="button"
            onClick={() => {
              hold();
              go(-1);
            }}
            aria-label={pillars.labels.previous}
            className="pillars__arrow pillars__arrow--prev"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={() => {
              hold();
              go(1);
            }}
            aria-label={pillars.labels.next}
            className="pillars__arrow pillars__arrow--next"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>

          <div className="pillars__dots">
            {Array.from({ length: stops }, (_, i) => (
              <button
                key={members[i]?.name ?? i}
                type="button"
                onClick={() => {
                  hold();
                  scrollTo(i);
                }}
                aria-label={interpolate(pillars.labels.showMember, {
                  name: members[i]?.name ?? "",
                })}
                aria-current={i === active}
                className="pillars__dot"
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
