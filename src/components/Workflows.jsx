import { useState } from 'react'
import { workflows } from '../data.js'

const categories = ['All', ...new Set(workflows.map((w) => w.cat))]

export default function Workflows() {
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? workflows : workflows.filter((w) => w.cat === cat)

  return (
    <section className="section section--alt" id="workflows">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">n8n workflows</span>
          <h2>Workflows that give your team hours back</h2>
          <p>
            We design, build and host n8n automations around your processes. Every workflow starts with a
            simple question: <em>how many hours a week does this cost you now?</em>
          </p>
        </div>

        <div className="filters">
          {categories.map((c) => (
            <button key={c} className={`chip ${c === cat ? 'is-active' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="wf-grid">
          {list.map((w) => (
            <article className="wf" key={w.title}>
              <div className="wf__top">
                <span className="wf__cat">{w.cat}</span>
                <span className="wf__hours">−{w.hours} hrs/week</span>
              </div>
              <h3>{w.title}</h3>
              <div className="wf__flow">
                {w.steps.map((s, i) => (
                  <span key={s} className="wf__step">
                    {s}
                    {i < w.steps.length - 1 && <i aria-hidden="true">→</i>}
                  </span>
                ))}
              </div>
              <p>{w.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
