import Link from "next/link";
import { SERVICES_DATA } from "@/lib/services-data";
import { SECTORS_DATA } from "@/lib/sectors-data";

export function SiteFooter() {
  return (
    <footer className="foot dotted">
      <div className="wrap foot__in">
        <div className="foot__cols">
          <div className="foot__brand">
            <span className="logo">
              appycodes<i />
            </span>
            <p>
              Senior product engineering for companies that have outgrown off-the-shelf. Building
              since 2015.
            </p>
          </div>
          <div>
            <h4>Services</h4>
            {SERVICES_DATA.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/`} className="foot__svc">
                {s.title}
              </Link>
            ))}
            <Link href="/services/" className="foot__svc">All services</Link>
          </div>
          <div>
            <h4>Sectors</h4>
            {SECTORS_DATA.slice(0, 6).map((s) => (
              <Link key={s.slug} href={`/sectors/${s.slug}/`} className="foot__svc">
                {s.name}
              </Link>
            ))}
            <Link href="/sectors/" className="foot__svc">All sectors</Link>
          </div>
          <div>
            <h4>Work</h4>
            <Link href="/case-studies/ontick/">Ontick</Link>
            <Link href="/case-studies/bloc/">Bloc</Link>
            <Link href="/case-studies/yippee-malta/">Yippee Malta</Link>
            <Link href="/case-studies/professional-energy/">Professional Energy</Link>
            <Link href="/case-studies/">All work</Link>
            <Link href="/atlas/">The atlas</Link>
            <Link href="/problems/">Problems solved</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/about/">About</Link>
            <Link href="/year-four/">The year-four test</Link>
            <Link href="/blog/">Writing</Link>
            <Link href="/reviews/">Reviews</Link>
            <Link href="/contact/">Contact</Link>
            <Link href="/privacy/">Privacy</Link>
            <Link href="/terms/">Terms</Link>
          </div>
        </div>
        <div className="foot__bar">
          <p>© {new Date().getFullYear()} Appycodes. Building since 2015.</p>
          <span className="foot__badge notch notch-sm">Alloy</span>
        </div>
      </div>
    </footer>
  );
}
