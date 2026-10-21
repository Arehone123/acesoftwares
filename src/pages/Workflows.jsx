import { useMemo } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import Flow from '../components/Flow.jsx'
import Icon from '../components/Icon.jsx'
import { CtaBand, Mono, RoiCalculator, SectionHead, WorkflowCard } from '../components/Blocks.jsx'
import { categories, workflows, workflowBySlug } from '../data/workflows.js'
import { appById } from '../data/apps.js'
import { FEE_SHARE } from '../data/site.js'

const stack = ['Google Sheets', 'OpenAI', 'WhatsApp', 'Gmail', 'Outlook', 'Sage', 'Xero', 'Microsoft Teams', 'Slack', 'PostgreSQL', 'Jira', 'HubSpot', 'Google Drive', 'SharePoint', 'Anthropic Claude', 'Twilio SMS']

export function WorkflowsIndex() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const cat = params.get('cat') || ''

  const set = (k, v) => {
    const next = new URLSearchParams(params)
    if (v) next.set(k, v)
    else next.delete(k)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const needle = q.toLowerCase()
    return workflows.filter(
      (w) =>
        (!cat || w.cat === cat) &&
        (!needle || [w.title, w.cat, ...w.tools, w.overview].join(' ').toLowerCase().includes(needle))
    )
  }, [q, cat])

  const filtering = q || cat
  const trending = [...workflows].sort((a, b) => b.hours - a.hours).slice(0, 6)
  const recent = workflows.slice(-6).reverse()

  return (
    <>
      <section className="hero hero--page hero--search">
        <svg className="hero__wires" viewBox="0 0 1600 300" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 120 C 200 120, 220 210, 420 210" />
          <path d="M1180 210 C 1380 210, 1400 300, 1600 300" />
        </svg>
        <div className="container hero__copy">
          <h1><span className="accent">{workflows.length}</span> ready-to-deploy<br />automation workflows</h1>
          <div className="search">
            <i className="search__dot" />
            <input
              value={q}
              onChange={(e) => set('q', e.target.value)}
              placeholder="Search tools, teams, tasks…"
              aria-label="Search workflows"
            />
            <Icon name="search" size={18} />
            <i className="search__dot search__dot--r" />
          </div>
          <div className="chips">
            <button type="button" className={`chip ${!cat ? 'is-active' : ''}`} onClick={() => set('cat', '')}>ALL</button>
            {categories.map((c) => (
              <button type="button" key={c} className={`chip ${cat === c ? 'is-active' : ''}`} onClick={() => set('cat', cat === c ? '' : c)}>{c.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </section>

      {filtering ? (
        <section className="section section--flush">
          <div className="container">
            <p className="mono-label results-label">{results.length} RESULT{results.length === 1 ? '' : 'S'}{cat && ` IN ${cat.toUpperCase()}`}{q && ` FOR “${q.toUpperCase()}”`}</p>
            {results.length ? (
              <div className="wfgrid">{results.map((w) => <WorkflowCard key={w.slug} w={w} />)}</div>
            ) : (
              <div className="empty">
                <p>No template for that yet, so we can build it for you.</p>
                <Link to="/contact" state={{ message: `Workflow idea: ${q}` }} className="btn btn--accent">REQUEST A WORKFLOW</Link>
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
          <section className="section section--flush">
            <div className="container">
              <SectionHead title={<>Trending <span className="hl">AI</span> workflows</>} />
              <div className="wfgrid">{trending.map((w) => <WorkflowCard key={w.slug} w={w} />)}</div>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <SectionHead title="Recently added" />
              <div className="wfgrid">{recent.map((w) => <WorkflowCard key={w.slug} w={w} />)}</div>
            </div>
          </section>
          <section className="section section--flush">
            <div className="container">
              <SectionHead title="Start with your stack" />
              <div className="stackchips">
                {stack.map((s) => (
                  <button type="button" key={s} className="stackchip" onClick={() => set('q', s)}>
                    <Mono name={s} /> {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <SectionHead title="Browse by team" />
              <div className="catgrid">
                {categories.map((c) => (
                  <button type="button" key={c} className="catcard" onClick={() => set('cat', c)}>
                    <b>{c}</b>
                    <span className="mono-label">{workflows.filter((w) => w.cat === c).length} WORKFLOWS</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
      <CtaBand title="Don’t see your process?" sub="Most of what we build is custom. Describe the task and we’ll tell you how many hours it could give back." />
    </>
  )
}

export function WorkflowDetail() {
  const { slug } = useParams()
  const w = workflowBySlug(slug)
  if (!w) return <Navigate to="/workflows" replace />
  const app = w.app && appById(w.app)
  const more = workflows.filter((x) => x.cat === w.cat && x.slug !== w.slug).slice(0, 3)

  return (
    <>
      <section className="section wfd">
        <div className="container wfd__top">
          <div className="wfd__copy">
            <Link to="/workflows" className="back"><Icon name="back" size={14} /> Back to workflows</Link>
            <div className="wfd__tools">{w.tools.map((t) => <Mono key={t} name={t} />)}</div>
            <h1>{w.title}</h1>
            <div className="btns">
              <Link to="/contact" state={{ interest: 'Workflows — pay per hour saved', message: `I'd like the workflow: ${w.title}` }} className="btn btn--accent">USE THIS WORKFLOW</Link>
              <Link to="/contact" state={{ message: `Customise: ${w.title}` }} className="btn btn--grey">CUSTOMISE WITH US</Link>
            </div>
          </div>
          <div className="wfd__canvas dots-light">
            <Flow columns={w.flow} theme="light" />
          </div>
        </div>
        <div className="container wfd__body">
          <aside className="wfd__meta">
            <dl>
              <dt className="mono-label">BUILT BY</dt><dd>AceSoftwares</dd>
              <dt className="mono-label">CATEGORY</dt><dd>{w.cat}</dd>
              <dt className="mono-label">HOURS SAVED</dt><dd>~{w.hours} hrs / week</dd>
              <dt className="mono-label">PRICING</dt><dd>{Math.round(FEE_SHARE * 100)}% of the value of hours saved</dd>
              {app && (<><dt className="mono-label">PART OF</dt><dd><Link to={`/products/${app.id}`} className="ulink">{app.name}</Link></dd></>)}
            </dl>
          </aside>
          <div className="wfd__main">
            <h2>Quick overview</h2>
            <p>{w.overview}</p>
            <h3>How it works</h3>
            <ol className="steps-list">{w.how.map((h) => <li key={h}>{h}</li>)}</ol>
            <h3>Connects</h3>
            <div className="stackchips stackchips--left">
              {w.tools.map((t) => <Link key={t} to={`/workflows?q=${encodeURIComponent(t)}`} className="stackchip"><Mono name={t} /> {t.toUpperCase()}</Link>)}
            </div>
            <h3>What would it save you?</h3>
            <RoiCalculator initialHours={Math.max(1, Math.round(w.hours / 3))} />
          </div>
        </div>
      </section>
      {more.length > 0 && (
        <section className="section section--flush">
          <div className="container">
            <SectionHead title={`More ${w.cat} workflows`} />
            <div className="wfgrid">{more.map((x) => <WorkflowCard key={x.slug} w={x} />)}</div>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  )
}
