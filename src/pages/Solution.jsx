import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Flow from '../components/Flow.jsx'
import Icon from '../components/Icon.jsx'
import { CtaBand, Faq, Mono, SectionHead, WorkflowCard } from '../components/Blocks.jsx'
import { solutionById } from '../data/solutions.js'
import { workflows } from '../data/workflows.js'
import { partners } from '../data/site.js'

export default function Solution() {
  const { id } = useParams()
  const s = solutionById(id)
  const [tab, setTab] = useState(0)
  if (!s) return <Navigate to="/" replace />
  const t = s.tabs[Math.min(tab, s.tabs.length - 1)]
  const related = workflows.filter((w) => w.cat === s.workflowCat).slice(0, 6)
  const partner = s.partner && partners.find((p) => p.name === s.partner)

  return (
    <>
      <section className="hero hero--page">
        <div className="container hero__copy">
          <h1 className="boxed">{s.title}</h1>
          <p className="lead">{s.sub}</p>
          <div className="btns btns--center">
            <Link to="/contact" state={{ message: `Interested in ${s.nav} automation.` }} className="btn btn--accent">BOOK A FREE AUDIT</Link>
            <Link to="/pricing" className="btn btn--grey">SEE PRICING</Link>
          </div>
        </div>
        <div className="container runs-on">
          <p className="mono-label">RUNS ON</p>
          <div>
            <span className="wordmark">n8n</span>
            {partner && <a href={partner.url} target="_blank" rel="noopener noreferrer" className="wordmark">{partner.name} ↗</a>}
            <span className="wordmark">AceSoftwares</span>
          </div>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <div className="tilegrid">
            {s.stack.map((n) => (
              <Link key={n} to={`/workflows?q=${encodeURIComponent(n)}`} className="bigtile" title={n}>
                <Mono name={n} size="xl" />
                <span className="mono-label">{n.toUpperCase()}</span>
              </Link>
            ))}
          </div>
          <div className="pillars">
            {s.pillars.map(([icon, title, text]) => (
              <div key={title} className="pillar">
                <span className="pillar__plus"><Icon name={icon} size={16} /></span>
                <p><b>{title}.</b> {text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={s.tabsTitle} sub={s.tabsSub} />
          <div className="panel">
            <div className="panel__tabs" role="tablist">
              {s.tabs.map((x, i) => (
                <button key={x.tab} role="tab" aria-selected={i === tab} className={`ptab ${i === tab ? 'is-active' : ''}`} onClick={() => setTab(i)}>{x.tab}</button>
              ))}
            </div>
            <div className="panel__body">
              <div className="panel__copy">
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
              <div className="panel__canvas dots-dark"><Flow columns={t.flow} key={id + tab} /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <div className="metrics">
            <div className="metrics__intro">
              <h2>{s.metricsTitle}</h2>
              <p>{s.metricsText}</p>
            </div>
            {s.metrics.map(([title, text]) => (
              <div key={title} className="metric">
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead title="Workflows to start with" />
            <div className="wfgrid">{related.map((w) => <WorkflowCard key={w.slug} w={w} />)}</div>
          </div>
        </section>
      )}

      <section className="section section--flush">
        <div className="container container--narrow">
          <SectionHead title={<>Delegate the ‘what’<br />Decide the ‘how’</>} sub="You want to know what can be automated, and to stay in control of it. Here are the answers people ask us for." />
          <Faq items={s.faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
