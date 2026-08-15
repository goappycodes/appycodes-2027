"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { SERVICES_DATA } from "@/lib/services-data";
import { ServiceTitle } from "@/components/service-title";
import { ArrowUpRight, Menu, Close, Chevron, ChevronRight, Mail } from "@/components/icons";

const SERVICES_HREF = "/services/";

/* Selected work, shown in the mobile drawer — the menu doubles as the fastest
   route to the proof, which on a phone is the thing people came for. */
const DRAWER_WORK = [
  { href: "/case-studies/ontick/", img: "/images/ontick-6.png", name: "Ontick", metric: "£2M+ processed" },
  { href: "/case-studies/bloc/", img: "/images/bloc-6.png", name: "Bloc", metric: "4+ yrs, 5 codebases" },
  { href: "/case-studies/yippee-malta/", img: "/images/yippee-6.png", name: "Yippee Malta", metric: "90+ web vitals" },
  { href: "/case-studies/professional-energy/", img: "/images/pes-6.png", name: "Professional Energy", metric: "100+ suppliers" },
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

        <Link
          className="btn btn--ink btn--sm nav__cta notch notch-sm"
          href="/contact/"
        >
          start a project
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

          <div className="drawer__body">
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

            <p className="drawer__lbl">selected work</p>
            <div className="drawer__work">
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
            <Link className="btn btn--grad notch drawer__cta" href="/contact/">
              start a project
            </Link>
            <a className="drawer__mail" href={`mailto:${SITE.email}`}>
              <Mail aria-hidden /> {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
