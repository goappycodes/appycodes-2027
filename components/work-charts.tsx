import { COMPLEXITY, DOMAINS, HEAT, LEVELS, STACK, TOTALS, YEARS } from "@/lib/portfolio-data";

/* Static views over the register. No state, no client JS — the numbers do not
   change between requests, so these stay server components. */

const total = (r: number[]) => r.reduce((a, b) => a + b, 0);

/**
 * Sector by year. Cut by domain rather than by deliverable: the register's own
 * category column describes what was shipped (site, app, platform) and puts
 * 70% of the work in two rows, which is true and tells you nothing.
 */
export function WorkHeatmap() {
  const max = Math.max(...HEAT.flat());
  const colTotals = YEARS.map((_, c) => total(HEAT.map((r) => r[c])));

  return (
    <figure className="heat">
      <div className="heat__scroll">
        <table className="heat__t">
          <caption className="sr-only">
            Projects by sector and year, {TOTALS.firstYear} to {TOTALS.lastYear}.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="heat__corner">
                sector
              </th>
              {YEARS.map((y) => (
                <th key={y} scope="col" className="heat__year">
                  <span>{String(y).slice(2)}</span>
                </th>
              ))}
              <th scope="col" className="heat__tot">
                all
              </th>
            </tr>
          </thead>
          <tbody>
            {DOMAINS.map((dom, r) => (
              <tr key={dom}>
                <th scope="row" className="heat__cat">
                  {dom}
                </th>
                {HEAT[r].map((n, c) => (
                  <td
                    key={YEARS[c]}
                    className={`heat__c${n ? "" : " is-zero"}`}
                    /* sqrt, not linear — the busiest cell is many times the
                       quietest, and a linear ramp renders most of it blank. */
                    style={n ? ({ "--v": Math.sqrt(n / max).toFixed(3) } as React.CSSProperties) : undefined}
                    title={`${dom} · ${YEARS[c]} · ${n} ${n === 1 ? "project" : "projects"}`}
                  >
                    <span className="tnum">{n || ""}</span>
                  </td>
                ))}
                <td className="heat__tot tnum">{total(HEAT[r])}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" className="heat__cat">
                all
              </th>
              {colTotals.map((n, c) => (
                <td key={YEARS[c]} className="heat__tot tnum">
                  {n || "·"}
                </td>
              ))}
              <td className="heat__tot tnum">{TOTALS.projects}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <figcaption className="heat__cap">
        Sector is assigned from the client and the project; where the register does not record enough
        to place one, it stays in <b>Other</b> rather than being guessed into a bucket. Year is when
        an engagement first enters the register — 2016, 2019 and 2020 are blank because those
        channels predate the workspace it was rebuilt from, not because the studio was idle.
      </figcaption>
    </figure>
  );
}

/**
 * Complexity mix per sector, as a 100% stacked bar. Reads as: which sectors buy
 * hard engineering and which buy a website.
 */
export function ComplexityBars() {
  return (
    <div className="cbars">
      <ul className="cbars__key">
        {LEVELS.map((l, i) => (
          <li key={l}>
            <i style={{ "--i": i } as React.CSSProperties} />
            {l.toLowerCase()}
          </li>
        ))}
      </ul>
      <ul className="cbars__list">
        {DOMAINS.map((dom, r) => {
          const t = total(COMPLEXITY[r]);
          const hard = COMPLEXITY[r][3] + COMPLEXITY[r][4];
          return (
            <li key={dom} className="cbars__row">
              <span className="cbars__n">{dom}</span>
              <span
                className="cbars__bar"
                title={`${dom}: ${hard} of ${t} at medium-high or high`}
              >
                {COMPLEXITY[r].map((n, i) =>
                  n ? (
                    <i
                      key={LEVELS[i]}
                      style={{ "--i": i, width: `${(n / t) * 100}%` } as React.CSSProperties}
                    />
                  ) : null,
                )}
              </span>
              <span className="cbars__c tnum">{t}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The stack, in three bands by what each technology is for. A flat frequency
 * count puts WordPress on top — true of a decade of content sites, and a bad
 * description of what a new build starts from today.
 */
export function StackBands() {
  const max = Math.max(...STACK.flatMap((b) => b.items.map((i) => i.n)));
  return (
    <div className="sband">
      {STACK.map((b) => (
        <section key={b.band} className="sband__b">
          <h3 className="sband__h">
            {b.band}
            <span>{b.note}</span>
          </h3>
          <ul className="sbars">
            {b.items.map((s) => (
              <li key={s.name} className="sbars__row">
                <span className="sbars__n">{s.name}</span>
                <span className="sbars__bar">
                  <i style={{ width: `${Math.max(6, (s.n / max) * 100)}%` }} />
                </span>
                <span className="sbars__c tnum">{s.n}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
