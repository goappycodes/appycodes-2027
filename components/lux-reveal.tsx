"use client";

import { useEffect } from "react";

/**
 * Soft fade-in-on-scroll for the enterprise/luxury /home-2 concept. Observes
 * every `.lux .reveal` and adds `is-in` as it enters the viewport (once). The
 * hidden start-state is set in CSS so there is no flash; a <noscript> fallback
 * keeps content visible if JS never runs. Honours prefers-reduced-motion.
 */
export function LuxReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".lux .reveal"));
    if (!els.length) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver !== "function") {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Safety net: if the observer hasn't revealed an already-visible section
    // shortly after load, reveal it anyway so content can never stay hidden.
    const fallback = window.setTimeout(() => {
      const vh = window.innerHeight;
      els.forEach((el) => {
        if (!el.classList.contains("is-in") && el.getBoundingClientRect().top < vh * 0.92) {
          el.classList.add("is-in");
          io.unobserve(el);
        }
      });
    }, 1200);

    return () => {
      clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return null;
}
