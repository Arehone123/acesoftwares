import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import { CountUp, Tilt } from './Motion.jsx'
import { aiTiers, tierCapacity, WORDS_PER_PAGE, MANUAL_MINUTES_PER_PAGE } from '../data/site.js'

const fmt = (n) => n.toLocaleString('en-ZA').replace(/[  ]/g, ',')
const short = (n) => (n >= 1e6 ? `${+(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${+(n / 1e3).toFixed(0)}k` : `${n}`)

/** Managed-LLM plan cards with page / word capacity. */
export function AiTiers() {
  const nav = useNavigate()
  const maxPages = Math.max(...aiTiers.map((t) => tierCapacity(t)?.pages || 0))
  return (
    <div className="aitiers">
      {aiTiers.map((t) => {
        const cap = tierCapacity(t)
        return (
          <Tilt key={t.name} className={`aitier ${t.featured ? 'aitier--featured' : ''}`}>
            {t.featured && <span className="tag tag--accent">MOST POPULAR</span>}
            <h3>{t.name}</h3>
            <div className="aitier__price">{t.price}<span>{t.per}</span></div>
            <p className="aitier__desc">{t.desc}</p>

            <div className="aitier__cap">
              <div>
                <b>{t.executions ? <CountUp to={t.executions} /> : 'Custom'}</b>
                <span>{t.executions ? t.kind : t.kind}</span>
              </div>
              <div className="aitier__grid">
                <div><small className="mono-label">PAGES / MONTH</small><b>{cap ? `~${short(cap.pages)}` : '200k+'}</b></div>
                <div><small className="mono-label">WORDS / MONTH</small><b>{cap ? `~${short(cap.words)}` : '100M+'}</b></div>
              </div>
              <div className="aitier__meter" aria-hidden="true">
                <i style={{ width: cap ? `${Math.max(8, (cap.pages / maxPages) * 100)}%` : '100%' }} className={cap ? '' : 'is-max'} />
              </div>
              <p className="aitier__equiv">
                {cap
                  ? <>Reading that by hand would take about <b>{fmt(cap.manualHours)} staff hours</b> a month.</>
                  : <>Volumes, models and response times agreed with you in a short scoping call.</>}
              </p>
            </div>

            <p className="mono-label">GOOD FOR</p>
            <ul className="ticks">{t.examples.map((e) => <li key={e}><Icon name="check" size={15} />{e}</li>)}</ul>
            <button
              type="button"
              className={`btn btn--block ${t.featured ? 'btn--accent' : 'btn--grey'}`}
              onClick={() => nav('/contact', { state: { interest: `AI agents — ${t.name}`, message: `We'd like AI agents on the ${t.name} plan.` } })}
            >
              {t.executions ? `START ON ${t.name.toUpperCase()}` : 'TALK TO US'}
            </button>
          </Tilt>
        )
      })}
    </div>
  )
}

/** How much do you need? Documents × pages → words, manual hours and the right plan. */
export function AiEstimator() {
  const [docs, setDocs] = useState(2000)
  const [pages, setPages] = useState(3)
  const nav = useNavigate()

  const totalPages = docs * pages
  const words = totalPages * WORDS_PER_PAGE
  const hours = Math.round((totalPages * MANUAL_MINUTES_PER_PAGE) / 60)
  const tier = aiTiers.find((t) => {
    const c = tierCapacity(t)
    return c && totalPages <= c.pages && (t.name !== 'Starter' || pages <= 2)
  }) || aiTiers[aiTiers.length - 1]

  const slider = (label, value, set, min, max, step, out) => (
    <label className="slider">
      <span>{label}<output>{out}</output></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} style={{ '--pct': `${((value - min) / (max - min)) * 100}%` }} />
    </label>
  )

  return (
    <div className="aiest">
      <div className="aiest__in">
        {slider('Documents, emails or messages per month', docs, setDocs, 100, 100000, 100, fmt(docs))}
        {slider('Average pages per document', pages, setPages, 1, 30, 1, pages)}
        <p className="muted small">We assume 1 page ≈ {WORDS_PER_PAGE} words and that a person spends about {MANUAL_MINUTES_PER_PAGE} minutes reading, deciding and capturing each page.</p>
      </div>
      <div className="aiest__out">
        <div className="aiest__stats">
          <div><small className="mono-label">PAGES / MONTH</small><b>{fmt(totalPages)}</b></div>
          <div><small className="mono-label">WORDS / MONTH</small><b>{short(words)}</b></div>
          <div><small className="mono-label">MANUAL HOURS</small><b>{fmt(hours)}</b></div>
        </div>
        <div className="aiest__rec" key={tier.name}>
          <span className="mono-label">RECOMMENDED PLAN</span>
          <strong>{tier.name}</strong>
          <span>{tier.price}{tier.per}</span>
        </div>
        <button
          type="button"
          className="btn btn--accent btn--block"
          onClick={() => nav('/contact', { state: { interest: `AI agents — ${tier.name}`, message: `About ${fmt(docs)} documents a month, ${pages} pages each (${fmt(totalPages)} pages, ~${short(words)} words).` } })}
        >
          GET A QUOTE FOR THIS VOLUME
        </button>
      </div>
    </div>
  )
}
