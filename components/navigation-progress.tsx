"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** Link navigation resets scroll; history and in-page anchors keep native behaviour. */
export function NavigationProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const pending = useRef<{ hash: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const finish = () => setLoading(false);
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, []);

  useEffect(() => {
    const navigation = pending.current;
    if (!navigation) return;
    pending.current = null;
    if (timer.current) clearTimeout(timer.current);
    const frame = requestAnimationFrame(() => {
      if (!navigation.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setLoading(false);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const target = new URL(link.href, window.location.href);
      if (target.origin !== window.location.origin || !/^https?:$/.test(target.protocol)) return;
      if (target.pathname === window.location.pathname) {
        if (!target.hash && target.search === window.location.search) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        return;
      }
      pending.current = { hash: target.hash };
      setLoading(true);
      if (timer.current) clearTimeout(timer.current);
      // Clear the indicator if a click is cancelled or navigation fails.
      timer.current = setTimeout(() => { pending.current = null; setLoading(false); }, 15000);
    };
    const onHistory = () => {
      pending.current = null;
      setLoading(false);
      if (timer.current) clearTimeout(timer.current);
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onHistory);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onHistory);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return <div className={`route-progress${loading ? " is-loading" : ""}`} role="status" aria-label={loading ? "Loading page" : undefined}><span aria-hidden="true" /></div>;
}
