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
            <h4>Practices</h4>
            <Link href="/#services">Product platforms</Link>
            <Link href="/#services">Native mobile</Link>
            <Link href="/#services">AI systems</Link>
            <Link href="/#services">Rescue &amp; hardening</Link>
          </div>
          <div>
            <h4>Work</h4>
            <Link href="/case-studies/ontick/">Ontick</Link>
            <Link href="/case-studies/bloc/">Bloc</Link>
            <Link href="/case-studies/yippee-malta/">Yippee Malta</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/#how">How we work</Link>
            <Link href="/#writing">Writing</Link>
            <Link href="/#team">Founders</Link>
            <Link href="/contact/">Contact</Link>
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
