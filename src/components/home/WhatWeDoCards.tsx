"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { WhatWeDoCard } from "@/data";
import { cn } from "@/lib/utils";

/** How long a card holds before the track advances. */
const ADVANCE_MS = 3400;

/** How long to leave the track alone after someone scrolls or taps it. */
const RESUME_AFTER_INTERACTION_MS = 7000;

/** Slack in px when comparing scroll positions - sub-pixel widths never land
 *  on an exact boundary. */
const EPSILON = 8;

export function WhatWeDoCards({ cards }: { cards: WhatWeDoCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const heldUntil = useRef(0);
  const [active, setActive] = useState(0);
  const [scrollable, setScrollable] = useState(false);

  const hold = useCallback(() => {
    heldUntil.current = Date.now() + RESUME_AFTER_INTERACTION_MS;
  }, []);

  // Auto-advance. It stands down entirely at xl, where all five cards already
  // fit and there is nothing to scroll.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      const overflow = track.scrollWidth - track.clientWidth;
      if (overflow < EPSILON) return;
      if (hovering.current || Date.now() < heldUntil.current) return;

      const card = track.firstElementChild;
      const step = card
        ? card.getBoundingClientRect().width + 1
        : track.clientWidth;
      const atEnd = track.scrollLeft >= overflow - EPSILON;

      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + step,
        behavior: "smooth",
      });
    }, ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, []);

  // Keep the dots in step with wherever the track actually is, whether it got
  // there on its own or because someone swiped.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const sync = () => {
      const overflow = track.scrollWidth - track.clientWidth;
      setScrollable(overflow >= EPSILON);

      const card = track.firstElementChild;
      const step = card ? card.getBoundingClientRect().width + 1 : 0;
      if (step > 0) {
        setActive(
          Math.min(cards.length - 1, Math.round(track.scrollLeft / step)),
        );
      }
    };

    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [cards.length]);

  function goTo(index: number) {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;
    hold();
    track.scrollTo({
      left: index * (card.getBoundingClientRect().width + 1),
      behavior: "smooth",
    });
  }

  return (
    <>
      <div
        ref={trackRef}
        className="what-we-do__track mt-14 sm:mt-16"
        role="group"
        aria-label="Our services"
        onPointerEnter={() => (hovering.current = true)}
        onPointerLeave={() => (hovering.current = false)}
        onPointerDown={hold}
        onTouchStart={hold}
      >
        {cards.map((card) => (
          <article key={card.title} className="what-we-do__card">
            <Icon
              name={card.icon}
              className="what-we-do__icon text-accent h-8 w-8"
              strokeWidth={1.75}
            />

            <h3 className="what-we-do__chip">{card.title}</h3>

            <p className="mt-4 text-sm leading-relaxed text-white/75">
              {card.description}
            </p>
          </article>
        ))}
      </div>

      {scrollable ? (
        <div className="what-we-do__dots">
          {cards.map((card, i) => (
            <button
              key={card.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${card.title}`}
              aria-current={i === active}
              className={cn("what-we-do__dot")}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
