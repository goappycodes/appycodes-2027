"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { NAV } from "@/lib/site";
import { SERVICES_DATA } from "@/lib/services-data";
import { ServiceTitle } from "@/components/service-title";
import { ArrowUpRight, Menu, Close, Chevron, ChevronRight, Gauge, FlagUK, FlagEU, FlagIndia } from "@/components/icons";

const SERVICES_HREF = "/services/";
const ESTIMATOR_HREF = "/software-project-estimator/";

/* The case study promoted inside the desktop services menu. */
const MEGA_FEATURE = {
  href: "/case-studies/ontick/",
  img: "/images/ontick-6.png",
  name: "Ontick",
  body: "Off Eventbrite onto a ticketing platform they own — multi-organizer, Stripe instalments, two native apps.",
  fig: "£2M+",
  figlabel: "processed since launch",
};

/* Selected work, shown in the mobile drawer — the menu doubles as the fastest
   route to the proof, which on a phone is the thing people came for. */
const DRAWER_WORK = [
  { href: "/case-studies/creoate/", img: "/images/creoate-featured.png", name: "Creoate", metric: "8+ yrs, still shipping" },
  { href: "/case-studies/decofetch/", img: "/images/decofetch-featured.png", name: "Decofetch", metric: "custom, front to back" },
  { href: "/case-studies/ba-engine-room/", img: "/images/engineroom-featured.png", name: "BA Engine Room", metric: "AI ops platform" },
  { href: "/case-studies/ontick/", img: "/images/ontick-6.png", name: "Ontick", metric: "£2M+ processed" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  // Close everything on route change.
  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  // Escape closes; outside-click closes the mega-menu.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setDrawerOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // The drawer is a modal dialog: move focus into it, keep Tab inside it, and
  // hand focus back to the burger on close.
  useEffect(() => {
    if (!drawerOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    panel.addEventListener("keydown", onKeyDown);
    return () => {
      panel.removeEventListener("keydown", onKeyDown);
      // Only pull focus back if it is still inside the closing panel — a route
      // change moves it elsewhere and should not be overridden.
      if (panel.contains(document.activeElement)) burgerRef.current?.focus();
    };
  }, [drawerOpen]);

  function openMega() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="nav nav--dark">
      <div className="wrap nav__in">
        <Link className="logo" href="/" aria-label="Appycodes — home">
          appycodes<i />
        </Link>

        {/* ---------- desktop nav ---------- */}
        <nav className="nav__links" aria-label="Primary">
          <ul className="nav__list">
            {NAV.map((item) =>
              item.href === SERVICES_HREF ? (
                <li
                  key={item.href}
                  className={`nav__has-mega${megaOpen ? " is-open" : ""}`}
                  ref={megaRef}
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleClose}
                  onFocus={openMega}
                  onBlur={(e) => {
                    if (!megaRef.current?.contains(e.relatedTarget as Node)) {
                      scheduleClose();
                    }
                  }}
                >
                  <button
                    type="button"
                    className={`nav__link nav__trigger${isActive(item.href) ? " is-active" : ""}`}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    aria-controls={menuId}
                    onClick={() => setMegaOpen((v) => !v)}
                  >
                    {item.label}
                    <Chevron className="nav__caret" aria-hidden />
                  </button>

                  <div className="mega" id={menuId} role="menu" aria-label="Services">
                    <div className="mega__card notch notch-lg">
                      <div className="mega__head">
                        <span className="mega__eyebrow">what we do</span>
                        <Link className="mega__all" href={SERVICES_HREF} role="menuitem">
                          all services <ArrowUpRight aria-hidden />
                        </Link>
                      </div>
                      <div className="mega__cols">
                        <div className="mega__grid">
                          {SERVICES_DATA.map((s, i) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}/`}
                              className="mega__item"
                              role="menuitem"
                            >
                              <span className="mega__n">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="mega__body">
                                <span className="mega__title">
                                  <ServiceTitle label={s.title} />
                                  <ArrowUpRight className="mega__arrow" aria-hidden />
                                </span>
                                <span className="mega__desc">{s.summary}</span>
                              </span>
                            </Link>
                          ))}
                        </div>

                        {/* the menu doubles as a shortcut to the proof */}
                        <Link href={MEGA_FEATURE.href} className="mega__promo" role="menuitem">
                          <span className="mega__promo-shot">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={MEGA_FEATURE.img} alt="" loading="lazy" />
                          </span>
                          <span className="mega__promo-k">featured work</span>
                          <span className="mega__promo-t">{MEGA_FEATURE.name}</span>
                          <span className="mega__promo-d">{MEGA_FEATURE.body}</span>
                          <span className="mega__promo-m">
                            <b className="tnum">{MEGA_FEATURE.fig}</b> {MEGA_FEATURE.figlabel}
                          </span>
                        </Link>
                      </div>

                      {/* a tool, not a service — always shown, full width */}
                      <Link href={ESTIMATOR_HREF} className="mega__tool" role="menuitem">
                        <span className="mega__tool-ico" aria-hidden>
                          <Gauge />
                        </span>
                        <span className="mega__tool-b">
                          <span className="mega__tool-t">Project cost estimator</span>
                          <span className="mega__tool-d">
                            Eight quick questions for a realistic cost range — effort, timeline and
                            recommended stack. No email.
                          </span>
                        </span>
                        <span className="mega__tool-cta">
                          <span className="mega__tool-badge">2 min</span>
                          <ArrowUpRight className="mega__tool-arrow" aria-hidden />
                        </span>
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    className={`nav__link${isActive(item.href) ? " is-active" : ""}`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="nav__right">
          {/* UK & EU market, India-based team — quiet credibility marker, not a CTA */}
          <span className="nav__region" role="img" aria-label="Working with UK and EU businesses, built by a team in India">
            <span className="flag flag--uk"><FlagUK /></span>
            <span className="flag flag--eu"><FlagEU /></span>
            <span className="flag flag--in"><FlagIndia /></span>
            <span className="nav__region-txt">UK &amp; EU</span>
          </span>

          <Link
            className="btn btn--ink btn--sm nav__cta notch notch-sm"
            href="/contact/"
          >
            Start a project
          </Link>

          {/* ---------- mobile toggle ---------- */}
          <button
            type="button"
            className="nav__burger"
            ref={burgerRef}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            {drawerOpen ? <Close aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      {/* ---------- mobile drawer ---------- */}
      <div className={`drawer${drawerOpen ? " is-open" : ""}`} aria-hidden={!drawerOpen}>
        <button
          type="button"
          className="drawer__scrim"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setDrawerOpen(false)}
        />
        <div className="drawer__panel" role="dialog" aria-modal="true" aria-label="Menu" ref={panelRef}>
          {/* the panel carries its own header so it can cover the site nav —
              no guessing at the header's height with top padding */}
          <div className="drawer__top">
            <Link className="logo" href="/" onClick={() => setDrawerOpen(false)}>
              appycodes<i />
            </Link>
            <button
              type="button"
              className="drawer__close"
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
            >
              <Close aria-hidden />
            </button>
          </div>

          <div className="drawer__body" onClick={(event) => {
            if ((event.target as Element).closest("a[href]")) setDrawerOpen(false);
          }}>
            <p className="drawer__lbl">services</p>
            <div className="drawer__services">
              {SERVICES_DATA.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}/`}
                  className={`drawer__svc${pathname.startsWith(`/services/${s.slug}`) ? " is-active" : ""}`}
                >
                  <span className="drawer__n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="drawer__svc-b">
                    <span className="drawer__svc-t">
                      <ServiceTitle label={s.title} />
                    </span>
                    <span className="drawer__svc-d">{s.summary}</span>
                  </span>
                  <ChevronRight className="drawer__chev" aria-hidden />
                </Link>
              ))}
              <Link href={SERVICES_HREF} className="drawer__all">
                all services <ArrowUpRight aria-hidden />
              </Link>
            </div>

            <p className="drawer__lbl">tools</p>
            <div className="drawer__links">
              <Link
                href={ESTIMATOR_HREF}
                className={`drawer__link drawer__link--tool${isActive(ESTIMATOR_HREF) ? " is-active" : ""}`}
              >
                <span className="drawer__tool-ico" aria-hidden>
                  <Gauge />
                </span>
                <span className="drawer__tool-b">
                  <span className="drawer__tool-t">project cost estimator</span>
                  <span className="drawer__tool-d">a 2-minute ballpark — no email</span>
                </span>
                <ChevronRight className="drawer__chev" aria-hidden />
              </Link>
            </div>

            <p className="drawer__lbl">selected work</p>
            <div className="drawer__work" role="region" aria-label="Selected work — swipe for more">
              {DRAWER_WORK.map((w) => (
                <Link key={w.href} href={w.href} className="drawer__case">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.img} alt="" loading="lazy" />
                  <span className="drawer__case-t">{w.name}</span>
                  <span className="drawer__case-m">{w.metric}</span>
                </Link>
              ))}
            </div>

            <p className="drawer__lbl">company</p>
            <div className="drawer__links">
              {NAV.filter((n) => n.href !== SERVICES_HREF).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`drawer__link${isActive(item.href) ? " is-active" : ""}`}
                >
                  {item.label}
                  <ChevronRight className="drawer__chev" aria-hidden />
                </Link>
              ))}
            </div>
          </div>

          <div className="drawer__foot">
            <span className="drawer__region">
              <span className="flag flag--uk"><FlagUK /></span>
              <span className="flag flag--eu"><FlagEU /></span>
              Working with UK &amp; EU businesses
            </span>
            <Link className="btn btn--grad notch drawer__cta" href="/contact/" onClick={() => setDrawerOpen(false)}>
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
