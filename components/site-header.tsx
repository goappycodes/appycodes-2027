import Link from "next/link";
import { NAV } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="nav nav--dark">
      <div className="wrap nav__in">
        <Link className="logo" href="/">
          appycodes<i />
        </Link>
        <nav className="nav__links">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn--ink btn--sm nav__cta notch notch-sm" href="/contact/">
          start a project
        </Link>
      </div>
    </header>
  );
}
