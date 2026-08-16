"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Soft fade-in-on-scroll. Observes every `.lux .reveal` and adds `is-in` as it
 * enters the viewport (once). The hidden start-state is set in CSS so there is
 * no flash; a <noscript> fallback keeps content visible if JS never runs.
 * Honours prefers-reduced-motion.
 *
 * This lives in the root layout, which does NOT remount between routes — so the
 * effect keys on the pathname and re-observes each page's sections. Without
 * that, anything reached by client-side navigation stays at opacity 0 forever.
 *
 * A scroll listener backs up the observer: if its callbacks never arrive, the
 * page must still become readable, so failure has to mean "no animation", never
 * "no content".
 */
export function LuxReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".lux .reveal:not(.is-in)"));
    if (!els.length) return;

    const show = (el: HTMLElement) => el.classList.add("is-in");

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver !== "function") {
      els.forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target as HTMLElement);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Backstop: reveal anything that has reached the viewport, whether or not
    // the observer reported it. Runs on scroll (rAF-throttled), on resize, and
    // once shortly after mount for content that is already in view.
    // Time-throttled rather than rAF-throttled: requestAnimationFrame does not
    // run while a tab is not rendering, which is exactly when this backstop
    // would be needed.
    let last = 0;
    let trailing = 0;
    function sweep() {
      const vh = window.innerHeight;
      for (const el of els) {
        if (el.classList.contains("is-in")) continue;
        if (el.getBoundingClientRect().top < vh * 0.92) {
          show(el);
          io.unobserve(el);
        }
      }
    }
    // Throttled with a trailing call — dropping the last event of a fast scroll
    // would leave those sections hidden until the user scrolled again.
    function onScroll() {
      const wait = 100 - (Date.now() - last);
      if (wait <= 0) {
        last = Date.now();
        sweep();
      } else if (!trailing) {
        trailing = window.setTimeout(() => {
          trailing = 0;
          last = Date.now();
          sweep();
        }, wait);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const initial = window.setTimeout(sweep, 600);

    return () => {
      clearTimeout(initial);
      clearTimeout(trailing);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
