import { useState } from 'react'
import { tiers, RETAINER_RATE, FEE_SHARE, formatR } from '../data.js'

const steps = [
  ['Free audit', 'We map the manual process with you and measure how many hours it takes each week.'],
  ['Agree the hours saved', 'We agree a baseline (for example, 40 hrs/month) and how we will measure the saving afterwards.'],
  ['Pay per hour saved', 'You pay a fixed share of the value of each hour we save. You keep the rest.'],
  ['Review the results', 'Every month you get an execution report showing runs, hours saved and the fee for that month.'],
]

export default function Pricing({ onPick }) {
  const [plan, setPlan] = useState('apps')
  const keep = Math.round((1 - FEE_SHARE) * 100)

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Pricing</span>
          <h2>Two clear ways to work with us</h2>
          <p>
            Our products run on a monthly retainer. Our workflows are priced on the hours they save you, so
            you only pay when they work.
          </p>
        </div>

        <div className="switch" role="tablist">
          <button role="tab" aria-selected={plan === 'apps'} className={plan === 'apps' ? 'is-active' : ''} onClick={() => setPlan('apps')}>
            Apps · Monthly retainer
          </button>
          <button role="tab" aria-selected={plan === 'workflows'} className={plan === 'workflows' ? 'is-active' : ''} onClick={() => setPlan('workflows')}>
            Workflows · Pay per hour saved
          </button>
        </div>

        {plan === 'apps' ? (
          <>
            <div className="plans">
              {tiers.map((t) => (
                <article key={t.name} className={`plan ${t.featured ? 'plan--featured' : ''}`}>
                  {t.featured && <span className="plan__badge">Most popular</span>}
                  <h3>{t.name}</h3>
                  <p className="plan__desc">{t.desc}</p>
                  <div className="plan__price">
                    <span>{formatR(t.hours * RETAINER_RATE)}</span>/month
                  </div>
                  <p className="plan__hours">
                    {t.hours} retainer hours @ R{RETAINER_RATE}/hr
                  </p>
                  <ul className="checks">
                    {t.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <button
                    className={`btn btn--block ${t.featured ? 'btn--primary' : 'btn--ghost'}`}
                    onClick={() => onPick(`Apps — ${t.name}`)}
                  >
                    Choose {t.name}
                  </button>
                </article>
              ))}
            </div>
            <p className="plans__note">
              Need a different number of hours? Retainers are billed at <b>R{RETAINER_RATE} per hour</b>. Pick
              any number of hours per month and unused hours roll over for one month.
            </p>
          </>
        ) : (
          <>
            <div className="steps">
              {steps.map(([title, text], i) => (
                <div className="step" key={title}>
                  <span className="step__num">{i + 1}</span>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <div className="callout">
              <div>
                <h4>
                  You keep <span className="grad">{keep}%</span> of every hour we save.
                </h4>
                <p>
                  If the workflow doesn't save time, you don't pay for it. Platform and API costs (n8n Cloud,
                  OpenAI, WhatsApp Business) stay in your name, at cost, so nothing is hidden.
                </p>
              </div>
              <a href="#roi" className="btn btn--primary">Run the numbers →</a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
