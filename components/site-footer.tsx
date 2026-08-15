import Link from "next/link";

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
            <h4>Explore</h4>
            <Link href="/services/">Services</Link>
            <Link href="/case-studies/">Work</Link>
            <Link href="/blog/">Writing</Link>
            <Link href="/reviews/">Reviews</Link>
          </div>
          <div>
            <h4>Work</h4>
            <Link href="/case-studies/ontick/">Ontick</Link>
            <Link href="/case-studies/bloc/">Bloc</Link>
            <Link href="/case-studies/yippee-malta/">Yippee Malta</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/about/">About</Link>
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
