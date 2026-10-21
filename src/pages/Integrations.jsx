import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { CtaBand, Mono } from '../components/Blocks.jsx'
import { integrationCats, integrations } from '../data/integrations.js'
import { workflows } from '../data/workflows.js'

export default function Integrations() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const list = integrations.filter(
    (i) => (!cat || i.cat === cat) && (!q || `${i.name} ${i.desc} ${i.cat}`.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <>
      <section className="hero hero--page hero--search">
        <div className="container hero__copy">
          <span className="tag">INTEGRATIONS</span>
          <h1>Connect the tools<br />you already pay for</h1>
          <p className="lead">We build on n8n, which connects to hundreds of services out of the box, and to any other system through its API. These are the ones our clients use most.</p>
          <div className="search">
            <i className="search__dot" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search integrations…" aria-label="Search integrations" />
            <Icon name="search" size={18} />
            <i className="search__dot search__dot--r" />
          </div>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container intlayout">
          <aside className="intside">
            <p className="mono-label">CATEGORIES</p>
            <button type="button" className={!cat ? 'is-active' : ''} onClick={() => setCat('')}>All <span>{integrations.length}</span></button>
            {integrationCats.map((c) => (
              <button type="button" key={c} className={cat === c ? 'is-active' : ''} onClick={() => setCat(c)}>
                {c} <span>{integrations.filter((i) => i.cat === c).length}</span>
              </button>
            ))}
          </aside>
          <div>
            <div className="intgrid">
              {list.map((i) => {
                const count = workflows.filter((w) => w.tools.includes(i.name)).length
                return (
                  <Link key={i.name} to={`/workflows?q=${encodeURIComponent(i.name)}`} className="inttile">
                    <Mono name={i.name} size="xl" />
                    <h3>{i.name}</h3>
                    <p>{i.desc}</p>
                    <span className="mono-label">{count ? `${count} WORKFLOW${count > 1 ? 'S' : ''}` : i.cat.toUpperCase()}</span>
                  </Link>
                )
              })}
              <Link to="/contact" state={{ message: 'We need an integration with: ' }} className="inttile inttile--ask">
                <span className="mono mono--xl mono--plus"><Icon name="plus" size={26} /></span>
                <h3>Something else?</h3>
                <p>If it has an API, a database or even an export file, we can connect it.</p>
                <span className="mono-label">ASK US</span>
              </Link>
            </div>
            {!list.length && <p className="empty">Nothing matches “{q}”, but we can probably connect it. <Link className="ulink" to="/contact">Ask us</Link></p>}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
