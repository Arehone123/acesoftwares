// A mock web app rendered inside a browser frame — an example of each Ace OS product as a site.
export default function AppPreview({ app }) {
  const p = app.preview
  const max = Math.max(...p.chart)

  return (
    <div className="browser" style={{ '--app': app.color }} key={app.id}>
      <div className="browser__bar">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <div className="browser__url">
          <span className="lock">🔒</span> {p.url}
        </div>
      </div>
      <div className="browser__body">
        <aside className="mock__side">
          <div className="mock__brand">
            <span className="mock__logo">{app.icon}</span>
            {app.name}
          </div>
          {p.nav.map((item, i) => (
            <div key={item} className={`mock__nav ${i === 0 ? 'is-active' : ''}`}>{item}</div>
          ))}
          <div className="mock__auto">
            <span className="live" /> 6 automations running
          </div>
        </aside>
        <div className="mock__main">
          <div className="mock__head">
            <div>
              <small>Good morning 👋</small>
              <h4>{p.nav[0]}</h4>
            </div>
            <span className="mock__btn">+ New</span>
          </div>
          <div className="mock__kpis">
            {p.kpis.map(([label, value, delta]) => (
              <div className="mock__kpi" key={label}>
                <small>{label}</small>
                <b>{value}</b>
                {delta && <em>{delta}</em>}
              </div>
            ))}
          </div>
          <div className="mock__grid">
            <div className="mock__card">
              <small>{p.chartLabel}</small>
              <div className="mock__chart">
                {p.chart.map((v, i) => (
                  <span key={i} style={{ height: `${(v / max) * 100}%`, animationDelay: `${i * 0.05}s` }} />
                ))}
              </div>
            </div>
            <div className="mock__card">
              <small>{p.tableTitle}</small>
              <ul className="mock__rows">
                {p.rows.map(([a, b, s]) => (
                  <li key={a}>
                    <span className={`status status--${s}`} />
                    <span className="mock__row-a">{a}</span>
                    <span className="mock__row-b">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
