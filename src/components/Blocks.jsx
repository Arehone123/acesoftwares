import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import { integrationByName, monogram } from '../data/integrations.js'
import { appById } from '../data/apps.js'
import { tiers, RETAINER_RATE, FEE_SHARE, formatR } from '../data/site.js'

/** Small square tile with a coloured monogram for a third-party tool. */
export function Mono({ name, size = 'sm' }) {
  const i = integrationByName(name)
  return (
    <span className={`mono mono--${size}`} style={{ '--c': i?.color || '#555' }} title={name}>
      {monogram(name)}
    </span>
  )
}

/** Grey template card, as used in the workflow library. */
export function WorkflowCard({ w }) {
  const shown = w.tools.slice(0, 3)
  const extra = w.tools.length - shown.length + w.flow.flat().length
  const app = w.app && appById(w.app)
  return (
    <Link to={`/workflows/${w.slug}`} className="wfcard">
      <p className="wfcard__title">{w.title}</p>
      <div className="wfcard__foot">
        <div className="wfcard__icons">
          {shown.map((t) => <Mono key={t} name={t} />)}
          <span className="wfcard__more">+{extra}</span>
        </div>
        <span className="wfcard__hours" title="Hours saved per week">−{w.hours}h/wk</span>
      </div>
      {app && <span className="wfcard__app" style={{ '--c': app.color }}><Icon name={app.icon} size={12} /></span>}
    </Link>
  )
}

export function Faq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq">
      {items.map(([q, a], i) => (
        <div key={q} className={`faq__item ${open === i ? 'is-open' : ''}`}>
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            {q}
            <Icon name={open === i ? 'x' : 'plus'} size={16} />
          </button>
          {open === i && <p>{a}</p>}
        </div>
      ))}
    </div>
  )
}

/** "Describe your task" prompt box — sends the text to the contact page. */
export function PromptBox({ chips = ['PROCESS INVOICES', 'SCREEN CVS', 'TRACK TENDERS', 'TRIAGE ALERTS'] }) {
  const [text, setText] = useState('')
  const nav = useNavigate()
  const go = (msg) => nav('/contact', { state: { message: msg, interest: 'Workflows — pay per hour saved' } })
  return (
    <div className="prompt">
      <form className="prompt__box" onSubmit={(e) => { e.preventDefault(); if (text.trim()) go(text) }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Every Monday we download the debtors list, then email each client who is late…"
          rows={3}
        />
        <button type="submit" className="prompt__send" aria-label="Send" disabled={!text.trim()}>
          <Icon name="arrow" size={16} />
        </button>
      </form>
      <div className="prompt__chips">
        {chips.map((c) => (
          <button type="button" key={c} className="chip" onClick={() => setText(`We want to automate: ${c.toLowerCase()}.`)}>{c}</button>
        ))}
      </div>
    </div>
  )
}

/** Example web app inside a browser frame. */
export function BrowserMock({ app }) {
  const p = app.preview
  const max = Math.max(...p.chart)
  return (
    <div className="bmock" style={{ '--app': app.color }}>
      <div className="bmock__bar">
        <span className="dot" /><span className="dot" /><span className="dot" />
        <div className="bmock__url"><Icon name="lock" size={11} /> {p.url}</div>
      </div>
      <div className="bmock__body">
        <aside className="bmock__side">
          <div className="bmock__brand"><span><Icon name={app.icon} size={14} /></span>{app.name}</div>
          {p.nav.map((n, i) => <div key={n} className={`bmock__nav ${i === 0 ? 'is-active' : ''}`}>{n}</div>)}
          <div className="bmock__auto"><i className="live" /> 6 workflows active</div>
        </aside>
        <div className="bmock__main">
          <div className="bmock__head">
            <div><small>Good morning</small><h4>{p.nav[0]}</h4></div>
            <span className="bmock__btn">+ New</span>
          </div>
          <div className="bmock__kpis">
            {p.kpis.map(([l, v, d]) => (
              <div key={l} className="bmock__kpi"><small>{l}</small><b>{v}</b>{d && <em>{d}</em>}</div>
            ))}
          </div>
          <div className="bmock__grid">
            <div className="bmock__card">
              <small>{p.chartLabel}</small>
              <div className="bmock__chart">
                {p.chart.map((v, i) => <span key={i} style={{ height: `${(v / max) * 100}%`, animationDelay: `${i * 50}ms` }} />)}
              </div>
            </div>
            <div className="bmock__card">
              <small>{p.tableTitle}</small>
              <ul>
                {p.rows.map(([a, b, s]) => (
                  <li key={a}><i className={`st st--${s}`} /><span>{a}</span><em>{b}</em></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Tiers() {
  const nav = useNavigate()
  return (
    <div className="tiers">
      {tiers.map((t) => (
        <article key={t.name} className={`tier ${t.featured ? 'tier--featured' : ''}`}>
          {t.featured && <span className="tag tag--accent">MOST POPULAR</span>}
          <h3>{t.name}</h3>
          <p className="muted">{t.desc}</p>
          <div className="tier__price">{formatR(t.hours * RETAINER_RATE)}<span>/month</span></div>
          <p className="mono-label">{t.hours} HOURS × R{RETAINER_RATE}</p>
          <ul className="ticks">{t.features.map((f) => <li key={f}><Icon name="check" size={15} />{f}</li>)}</ul>
          <button type="button" className={`btn ${t.featured ? 'btn--accent' : 'btn--grey'} btn--block`} onClick={() => nav('/contact', { state: { interest: `Apps — ${t.name}` } })}>
            CHOOSE {t.name.toUpperCase()}
          </button>
        </article>
      ))}
    </div>
  )
}

const WEEKS_PER_MONTH = 52 / 12

function Slider({ label, value, onChange, min, max, step = 1, fmt = (v) => v }) {
  return (
    <label className="slider">
      <span>{label}<output>{fmt(value)}</output></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} style={{ '--pct': `${((value - min) / (max - min)) * 100}%` }} />
    </label>
  )
}

export function RoiCalculator({ initialHours = 6 }) {
  const [people, setPeople] = useState(3)
  const [hours, setHours] = useState(initialHours)
  const [rate, setRate] = useState(250)
  const [auto, setAuto] = useState(80)
  const nav = useNavigate()

  const saved = people * hours * (auto / 100) * WEEKS_PER_MONTH
  const value = saved * rate
  const fee = value * FEE_SHARE
  const net = value - fee
  const share = Math.round(FEE_SHARE * 100)

  return (
    <div className="roi">
      <div className="roi__in">
        <Slider label="People doing this task" value={people} onChange={setPeople} min={1} max={50} />
        <Slider label="Hours each spends per week" value={hours} onChange={setHours} min={1} max={40} />
        <Slider label="Cost per staff hour" value={rate} onChange={setRate} min={80} max={1200} step={10} fmt={formatR} />
        <Slider label="Share we can automate" value={auto} onChange={setAuto} min={20} max={95} step={5} fmt={(v) => `${v}%`} />
      </div>
      <div className="roi__out">
        <p className="mono-label">HOURS SAVED / MONTH</p>
        <strong className="roi__big">{Math.round(saved).toLocaleString('en-ZA')}</strong>
        <dl>
          <dt>Value of those hours</dt><dd>{formatR(value)}</dd>
          <dt>Our fee ({share}%)</dt><dd>{formatR(fee)}</dd>
          <dt className="net">Your net saving / month</dt><dd className="net">{formatR(net)}</dd>
          <dt>Net saving / year</dt><dd>{formatR(net * 12)}</dd>
        </dl>
        <div className="roi__bar"><i style={{ width: `${100 - share}%` }} /><b style={{ width: `${share}%` }} /></div>
        <p className="roi__legend"><span><i /> You keep {100 - share}%</span><span><b /> Our fee {share}%</span></p>
        <button
          type="button"
          className="btn btn--accent btn--block"
          onClick={() => nav('/contact', { state: { interest: 'Workflows — pay per hour saved', message: `${people} people × ${hours} hrs/week at ${formatR(rate)}/hr. Estimated ${Math.round(saved)} hrs saved per month.` } })}
        >
          GET THIS WORKFLOW BUILT
        </button>
      </div>
    </div>
  )
}

export function SectionHead({ eyebrow, title, sub, children, align = 'center' }) {
  return (
    <div className={`shead shead--${align}`}>
      {eyebrow && <span className="tag">{eyebrow}</span>}
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
      {children}
    </div>
  )
}

export function CtaBand({ title = 'Tell us what eats your team’s week.', sub = 'Describe one manual process. We’ll come back with the hours it costs you and how we’d automate it, free.' }) {
  return (
    <section className="section">
      <div className="container">
        <div className="ctaband">
          <h2>{title}</h2>
          <p>{sub}</p>
          <PromptBox />
        </div>
      </div>
    </section>
  )
}
