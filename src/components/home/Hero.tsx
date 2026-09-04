"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import {
  HERO_AUTOPLAY_MS,
  HERO_SWIPE_THRESHOLD_PX,
  heroCtas,
  heroHeading,
  heroSlides,
  siteConfig,
} from "@/data";
import { cn } from "@/lib/utils";

type HeroProps = {
  /**
   * Drops into the reserved right-hand column, which is where the chatbot
   * wizard is going. The column is only laid out from `lg` up - below that the
   * hero is a single centred stack and the chatbot belongs in a floating
   * launcher instead.
   */
  chatbotSlot?: React.ReactNode;
};

export function Hero({ chatbotSlot }: HeroProps) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(
    () => setActive((i) => (i + 1) % heroSlides.length),
    [],
  );
  const prev = useCallback(
    () => setActive((i) => (i - 1 + heroSlides.length) % heroSlides.length),
    [],
  );

  // Autoplay never pauses: the hero fills the viewport, so pausing on hover or
  // focus would leave it frozen for anyone whose cursor is simply resting on
  // the page. The arrows, dots and swipe are the manual control instead.
  // `active` is a dependency on purpose - manual navigation restarts the timer
  // so a slide is never cut short right after the user picks it.
  useEffect(() => {
    const timer = window.setInterval(next, HERO_AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [active, next]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  }

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < HERO_SWIPE_THRESHOLD_PX) return;
    if (distance < 0) next();
    else prev();
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${siteConfig.shortName} highlights`}
      className="hero relative isolate flex w-full items-center overflow-hidden bg-slate-900"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Every slide stays mounted so switching is a crossfade, not a reload.
          Only the photograph changes - the heading over it is fixed. */}
      <div className="absolute inset-0 -z-20">
        {heroSlides.map((item, i) => (
          <div
            key={item.image}
            aria-hidden={i !== active}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none",
              i === active ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              className={cn(
                "hero-image object-cover object-center",
                i === active && "hero-image--active",
              )}
            />
          </div>
        ))}
      </div>

      <div className="hero-shade--side absolute inset-0 -z-10" />
      <div className="hero-shade--edges absolute inset-0 -z-10" />

      <Container className="relative z-10 py-20 sm:py-24 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Static copy: it animates in once on mount and then stays put, so
              nothing re-animates or reflows as the background rotates. */}
          <div className="animate-hero-in text-center motion-reduce:animate-none lg:col-span-7 lg:text-left">
            <h1 className="hero-title font-display font-extrabold text-white">
              {heroHeading.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="hero-lede mx-auto mt-5 max-w-xl leading-relaxed font-medium text-white/95 sm:mt-6 lg:mx-0">
              {heroHeading.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-9 lg:justify-start">
              <span className="cta-spin">
                <Button
                  href={heroCtas.primary.href}
                  className="bg-brand px-6 py-3.5 font-semibold hover:bg-brand-dark sm:px-7"
                >
                  {heroCtas.primary.label}
                </Button>
              </span>
              <span className="cta-spin">
                <Button
                  href={heroCtas.secondary.href}
                  variant="secondary"
                  className="border-white bg-white px-6 py-3.5 font-semibold text-slate-900 hover:bg-slate-100 sm:px-7"
                >
                  {heroCtas.secondary.label}
                </Button>
              </span>
            </div>
          </div>

          {/* Reserved for the chatbot wizard - kept in the grid so the copy
              column keeps its width whether or not the slot is filled. */}
          <div className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-end">
            {chatbotSlot}
          </div>
        </div>
      </Container>

      {/* Arrows are pointer affordances and would sit on top of the copy on a
          narrow screen, so they start at `sm`. Touch devices below that swipe,
          and the dots stay available at every width. */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute top-1/2 left-3 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-colors hover:bg-white/45 sm:flex lg:left-6 lg:h-12 lg:w-12"
      >
        <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute top-1/2 right-3 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-colors hover:bg-white/45 sm:flex lg:right-6 lg:h-12 lg:w-12"
      >
        <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
      </button>

      {/* Dots line up with the copy column rather than the viewport centre. */}
      <div className="absolute inset-x-0 bottom-6 z-20 sm:bottom-9">
        <Container>
          <div className="flex items-center justify-center gap-3 lg:justify-start">
            {heroSlides.map((item, i) => (
              <button
                key={item.image}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === active
                    ? "bg-accent w-8"
                    : "w-2.5 bg-white/55 hover:bg-white/85",
                )}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
