import { useEffect, useMemo, useRef, useState } from 'react'
import Flow from './Flow.jsx'
import Icon from './Icon.jsx'
import { BrandLogo, Mono } from './Blocks.jsx'
import { CountUp } from './Motion.jsx'
import { toN8nWorkflow } from '../data/n8nJson.js'
import { videos } from '../data/videos.js'
import { hasLogo } from '../data/logos.js'
import { formatR, FEE_SHARE } from '../data/site.js'

/* ---------------------------------------------------------------
   YouTube — thumbnail first, the real player loads on click.
   --------------------------------------------------------------- */
export function Video({ v, big = false }) {
  const video = typeof v === 'string' ? videos[v] : v
  const [play, setPlay] = useState(false)
  if (!video) return null
  return (
    <figure className={`video ${big ? 'video--big' : ''}`}>
      <div className="video__frame">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video__poster" onClick={() => setPlay(true)} aria-label={`Play: ${video.title}`}>
            <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="video__play"><Icon name="play" size={big ? 30 : 22} /></span>
            {video.tag && <span className="video__tag">{video.tag}</span>}
          </button>
        )}
      </div>
      <figcaption>
        <b>{video.title}</b>
        <span className="mono-label">n8n on YouTube</span>
      </figcaption>
    </figure>
  )
}

export function VideoGrid({ ids, title, sub }) {
  return (
    <section className="section">
      <div className="container">
        {title && (
          <div className="shead shead--center">
            <h2>{title}</h2>
            {sub && <p>{sub}</p>}
          </div>
        )}
        <div className="videogrid">{ids.map((id) => <Video key={id} v={id} />)}</div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------
   Real n8n canvas (official <n8n-demo> web component) with tabs.
   --------------------------------------------------------------- */
let demoLoader
const loadDemo = () => (demoLoader ||= import('@n8n_io/n8n-demo-component/n8n-demo.bundled.js'))

export function WorkflowEmbed({ name, columns, theme = 'light' }) {
  const [view, setView] = useState('animated')
  const [ready, setReady] = useState(false)
  const [copied, setCopied] = useState(false)
  const json = useMemo(() => JSON.stringify(toN8nWorkflow(name, columns), null, 2), [name, columns])

  useEffect(() => {
    if (view === 'n8n' && !ready) loadDemo().then(() => setReady(true)).catch(() => setView('json'))
  }, [view, ready])

  const copy = async () => {
    try { await navigator.clipboard.writeText(json); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* clipboard blocked */ }
  }
  const download = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }))
    a.download = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div className="wembed">
      <div className="wembed__bar">
        <div className="wembed__tabs" role="tablist">
          {[['animated', 'ANIMATED'], ['n8n', 'LIVE n8n CANVAS'], ['json', 'JSON']].map(([k, l]) => (
            <button key={k} type="button" role="tab" aria-selected={view === k} className={view === k ? 'is-active' : ''} onClick={() => setView(k)}>
              {k === 'n8n' && <BrandLogo name="n8n" size={13} />} {l}
            </button>
          ))}
        </div>
        <div className="wembed__actions">
          <button type="button" onClick={copy}><Icon name={copied ? 'check' : 'clipboard'} size={14} /> {copied ? 'COPIED' : 'COPY'}</button>
          <button type="button" onClick={download}><Icon name="upload" size={14} style={{ transform: 'rotate(180deg)' }} /> .JSON</button>
        </div>
      </div>
      <div className={`wembed__body ${view === 'animated' ? (theme === 'light' ? 'dots-light' : 'dots-dark') : ''}`}>
        {view === 'animated' && <div className="wembed__flow"><Flow columns={columns} theme={theme} /></div>}
        {view === 'n8n' && (ready
          ? <n8n-demo workflow={json} clicktointeract="true" hidecanvaserrors="true" collapseformobile="false" theme="light" />
          : <div className="wembed__loading"><span className="spinner" /> Loading the n8n canvas…</div>)}
        {view === 'json' && <pre className="wembed__json"><code>{json}</code></pre>}
      </div>
      <p className="wembed__hint mono-label">Copy the JSON and paste it into any n8n canvas (Ctrl+V) to import this workflow.</p>
    </div>
  )
}

/* ---------------------------------------------------------------
   ROI animations
   --------------------------------------------------------------- */

/** Rands ticking up in real time while the visitor reads the page. */
export function SavingsTicker({ people = 5, hoursPerWeek = 10, rate = 250 }) {
  const perSecond = (people * hoursPerWeek * rate * 52) / (365 * 24 * 3600)
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    const start = performance.now()
    const t = setInterval(() => setSecs((performance.now() - start) / 1000), 100)
    return () => clearInterval(t)
  }, [])
  const yearly = people * hoursPerWeek * rate * 52
  return (
    <div className="ticker-box">
      <p className="mono-label">SINCE YOU OPENED THIS PAGE, A TEAM OF {people} AUTOMATING {hoursPerWeek} HRS/WEEK EACH WOULD HAVE SAVED</p>
      <strong className="ticker-box__num">R{(perSecond * secs).toFixed(2)}</strong>
      <p className="ticker-box__sub">That’s <b>{formatR(yearly)}</b> a year, or <b>{formatR(yearly / 12)}</b> every month, at R{rate}/hour.</p>
    </div>
  )
}

/** Manual vs automated: the same job, raced side by side. */
const RACE = [
  ['Read & capture 120 invoices', 600, 4],
  ['Match each one to a PO', 360, 2],
  ['Chase 40 approvals by email', 240, 1],
  ['Post to Sage & file PDFs', 300, 2],
]
export function BeforeAfter() {
  const ref = useRef(null)
  const [go, setGo] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect() } }, { threshold: 0.3 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const manual = RACE.reduce((s, r) => s + r[1], 0)
  const auto = RACE.reduce((s, r) => s + r[2], 0)
  return (
    <div className={`race ${go ? 'is-go' : ''}`} ref={ref}>
      {[['Manual', 'manual', 1], ['With n8n', 'auto', 2]].map(([title, kind, col]) => (
        <div key={kind} className={`race__lane race__lane--${kind}`}>
          <div className="race__head">
            <b>{title}</b>
            <span className="mono-label">{kind === 'manual' ? `${(manual / 60).toFixed(0)} HOURS / MONTH` : `${auto} MINUTES / MONTH`}</span>
          </div>
          {RACE.map((r, i) => {
            const val = r[col]
            const pct = (val / RACE[0][1]) * 100
            return (
              <div key={r[0]} className="race__row">
                <span>{r[0]}</span>
                <div className="race__track">
                  <i style={{ width: go ? `${Math.max(pct, 1.5)}%` : 0, transitionDelay: `${i * 0.2}s`, transitionDuration: kind === 'manual' ? '2.6s' : '0.5s' }} />
                </div>
                <em>{kind === 'manual' ? `${val / 60}h` : `${val}m`}</em>
              </div>
            )
          })}
        </div>
      ))}
      <p className="race__result">
        <Icon name="zap" size={16} /> <b><CountUp to={Math.round((1 - auto / manual) * 100)} suffix="%" /></b> less time on the same work, every month.
      </p>
    </div>
  )
}

/** Cumulative cost over 12 months: manual vs automated (incl. our fee), drawn on scroll. */
export function PaybackChart({ hoursPerMonth = 160, rate = 250, buildCost = 0 }) {
  const ref = useRef(null)
  const [go, setGo] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect() } }, { threshold: 0.3 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const W = 640, H = 280, P = 36
  const manualM = hoursPerMonth * rate
  const autoM = manualM * 0.2 + manualM * 0.8 * FEE_SHARE // 20% still manual + our fee on the 80% saved
  const months = Array.from({ length: 13 }, (_, i) => i)
  const max = manualM * 12
  const x = (m) => P + (m / 12) * (W - P * 2)
  const y = (v) => H - P - (v / max) * (H - P * 2)
  const line = (f) => months.map((m, i) => `${i ? 'L' : 'M'}${x(m)} ${y(f(m))}`).join(' ')
  const saved = (manualM - autoM) * 12 - buildCost
  return (
    <div className={`payback ${go ? 'is-go' : ''}`} ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Cumulative cost, manual versus automated, over 12 months">
        {[0.25, 0.5, 0.75, 1].map((f) => <line key={f} x1={P} x2={W - P} y1={y(max * f)} y2={y(max * f)} className="payback__grid" />)}
        <path d={`${line((m) => manualM * m)} L ${x(12)} ${y(0)} L ${x(0)} ${y(0)} Z`} className="payback__area" />
        <path d={line((m) => manualM * m)} className="payback__line payback__line--manual" pathLength="1" />
        <path d={line((m) => buildCost + autoM * m)} className="payback__line payback__line--auto" pathLength="1" />
        {months.filter((m) => m % 3 === 0).map((m) => <text key={m} x={x(m)} y={H - 10} className="payback__axis">{m === 0 ? 'Now' : `M${m}`}</text>)}
        <text x={x(12) - 4} y={y(manualM * 12) - 8} className="payback__label" textAnchor="end">Manual {formatR(manualM * 12)}</text>
        <text x={x(12) - 4} y={y(buildCost + autoM * 12) - 8} className="payback__label payback__label--auto" textAnchor="end">With n8n {formatR(buildCost + autoM * 12)}</text>
      </svg>
      <div className="payback__legend">
        <span><i className="m" /> Doing it manually</span>
        <span><i className="a" /> Automated with AceSoftwares (incl. our fee)</span>
      </div>
      <p className="payback__saved">First-year saving: <b><CountUp to={Math.round(saved)} prefix="R" /></b></p>
    </div>
  )
}

/** "How n8n changes a business" — four animated stages. */
const STAGES = [
  ['alert', 'Before', 'Data retyped between systems, approvals lost in inboxes, reports built by hand every Friday.'],
  ['search', 'Week 1 · Audit', 'We time every manual step and agree how many hours it really costs you.'],
  ['workflow', 'Weeks 2–4 · Automate', 'n8n workflows and AI agents take over the repetitive steps; people keep the decisions.'],
  ['chart', 'After', 'Hours come back every week, errors drop, and you can see every run in a dashboard.'],
]
export function Transformation() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((x) => (x + 1) % STAGES.length), 3200)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="transform">
      <div className="transform__steps">
        {STAGES.map(([icon, title, text], k) => (
          <button key={title} type="button" className={`transform__step ${k === i ? 'is-active' : ''} ${k < i ? 'is-done' : ''}`} onClick={() => setI(k)}>
            <span className="transform__icon"><Icon name={icon} size={18} /></span>
            <b>{title}</b>
            <span>{text}</span>
            {k === i && <i className="transform__progress" />}
          </button>
        ))}
      </div>
      <div className={`transform__scene transform__scene--${i}`} aria-hidden="true">
        <div className="scene-papers">{Array.from({ length: 9 }, (_, k) => <span key={k} style={{ '--k': k }}><Icon name={['mail', 'file', 'sheet'][k % 3]} size={18} /></span>)}</div>
        <div className="scene-flow">
          {['webhook', 'bot', 'if', 'whatsapp'].map((ic, k) => <span key={k} style={{ '--k': k }}><Icon name={ic} size={22} /></span>)}
        </div>
        <div className="scene-meter">
          <small className="mono-label">HOURS / WEEK ON MANUAL WORK</small>
          <div className="scene-meter__bar"><i /></div>
          <b>{i < 2 ? '40 h' : i === 2 ? '18 h' : '6 h'}</b>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------
   Social proof
   --------------------------------------------------------------- */
export function StoryCard({ s }) {
  return (
    <a href={s.url} target="_blank" rel="noopener noreferrer" className="story">
      <div className="story__top">
        <span className="story__logo">{s.logo && hasLogo(s.logo) ? <BrandLogo name={s.logo} size={26} /> : <Mono name={s.company} size="lg" />}</span>
        <span className="mono-label">{s.company.toUpperCase()}</span>
      </div>
      <strong className="story__stat">{s.stat}</strong>
      <span className="story__label">{s.statLabel}</span>
      {s.quote ? <blockquote>“{s.quote}”</blockquote> : <p className="story__summary">{s.summary}</p>}
      {s.person && <span className="story__person">{s.person}</span>}
      <span className="story__src mono-label">SOURCE: {s.url.includes('youtube') ? 'n8n on YouTube' : 'n8n.io case study'} ↗</span>
    </a>
  )
}
