"use client";

import { useState } from "react";
import { CLUTCH_PROFILE, CLUTCH_STATS, REVIEWS } from "@/lib/site";
import styles from "./home-concepts.module.css";

const REVIEWS_WITH_IMAGES = REVIEWS.filter((review) => review.avatar).slice(0, 4);

function SmallArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d={direction === "left" ? "M15 10H4m4.5-4.5L4 10l4.5 4.5" : "M4 10h11m-4.5-4.5L15 10l-4.5 4.5"} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const review = REVIEWS_WITH_IMAGES[index];
  const go = (next: number) => setIndex((next + REVIEWS_WITH_IMAGES.length) % REVIEWS_WITH_IMAGES.length);

  return (
    <div className={styles.quoteGrid}>
      <a className={styles.rating} href={CLUTCH_PROFILE} target="_blank" rel="noreferrer" aria-label={`View Appycodes on Clutch — ${CLUTCH_STATS.rating} out of 5 from ${CLUTCH_STATS.count} reviews`}>
        <span className={styles.clutchBrand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/award-clutch.png" alt="" />
          <b>Clutch</b>
        </span>
        <span className={styles.stars} aria-label="Five out of five stars">★★★★★</span>
        <strong>{CLUTCH_STATS.rating} <small>/ 5.0</small></strong>
        <p>Across {CLUTCH_STATS.count} independently published client reviews</p>
      </a>

      <div className={styles.quoteStage} aria-live="polite">
        <blockquote className={styles.activeQuote} key={review.url}>
          <p>“{review.quote}”</p>
          <footer>
            <span className={styles.quotePerson}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={review.avatar} alt="" />
              <span><strong>{review.name}</strong><small>{review.role}</small></span>
            </span>
            <a href={review.url} target="_blank" rel="noreferrer">Verified review · {review.date}</a>
          </footer>
        </blockquote>

        <div className={styles.sliderControls} aria-label="Testimonial controls">
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous testimonial"><SmallArrow direction="left" /></button>
          <div className={styles.sliderDots}>
            {REVIEWS_WITH_IMAGES.map((item, dot) => (
              <button key={item.url} type="button" className={dot === index ? styles.activeDot : ""} onClick={() => setIndex(dot)} aria-label={`Show testimonial ${dot + 1}`} aria-current={dot === index ? "true" : undefined} />
            ))}
          </div>
          <span>{String(index + 1).padStart(2, "0")} / {String(REVIEWS_WITH_IMAGES.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next testimonial"><SmallArrow direction="right" /></button>
        </div>
      </div>
    </div>
  );
}
