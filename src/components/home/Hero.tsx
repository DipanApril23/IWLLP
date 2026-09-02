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
  // the page. The arrows and dots are the manual control instead.
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

  const slide = heroSlides[active];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${siteConfig.shortName} highlights`}
      className="hero relative isolate flex w-full items-center overflow-hidden bg-slate-900"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Every slide stays mounted so switching is a crossfade, not a reload. */}
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

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="text-center lg:col-span-7 lg:text-left">
            {/* Only the copy is keyed on `active`, so it replays the entrance
                animation per slide. The CTAs below are identical on every
                slide and stay mounted - remounting them would drop :hover
                (and any in-flight click) every time the carousel advances. */}
            <div
              key={active}
              className="animate-hero-in motion-reduce:animate-none"
            >
              <h1 className="hero-title font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                {slide.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <p className="hero-lede mx-auto mt-6 max-w-xl text-base leading-relaxed font-medium text-white/95 sm:text-lg lg:mx-0">
                {slide.description}
              </p>
            </div>

            <div className="animate-hero-in mt-9 flex flex-wrap items-center justify-center gap-4 motion-reduce:animate-none lg:justify-start">
              <span className="cta-spin">
                <Button
                  href={heroCtas.primary.href}
                  className="bg-brand px-7 py-3.5 font-semibold hover:bg-brand-dark"
                >
                  {heroCtas.primary.label}
                </Button>
              </span>
              <span className="cta-spin">
                <Button
                  href={heroCtas.secondary.href}
                  variant="secondary"
                  className="border-white bg-white px-7 py-3.5 font-semibold text-slate-900 hover:bg-slate-100"
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

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute top-1/2 left-3 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-colors hover:bg-white/45 sm:left-6 sm:h-12 sm:w-12"
      >
        <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute top-1/2 right-3 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-colors hover:bg-white/45 sm:right-6 sm:h-12 sm:w-12"
      >
        <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
      </button>

      {/* Dots line up with the copy column rather than the viewport centre. */}
      <div className="absolute inset-x-0 bottom-7 z-20 sm:bottom-9">
        <Container>
          <div className="flex items-center justify-center gap-3 lg:justify-start">
            {heroSlides.map((item, i) => (
              <button
                key={item.image}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
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
