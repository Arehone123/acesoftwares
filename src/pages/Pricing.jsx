import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { CtaBand, Faq, RoiCalculator, SectionHead, Tiers } from '../components/Blocks.jsx'
import { faqs, offers, FEE_SHARE, RETAINER_RATE } from '../data/site.js'
import { Tilt } from '../components/Motion.jsx'
import { offerPrice } from './Events.jsx'
import { AiTiers } from '../components/Ai.jsx'
import { PaybackChart, SavingsTicker, VideoGrid } from '../components/Media.jsx'

const steps = [
  ['search', 'Free audit', 'We map the manual process with you and time how long it takes each week.'],
  ['handshake', 'Agree the baseline', 'We agree the hours it costs today and how the saving will be measured.'],
  ['workflow', 'We build & run it', 'We build, test and host the workflow. 30 days of fixes are included after launch.'],
  ['chart', 'Pay per hour saved', 'Each month you get a report of runs and hours saved. You pay a share of their value.'],
]

const split = [
  ['You pay us', [`Product retainer at R${RETAINER_RATE}/hour`, `Workflow fees: ${Math.round(FEE_SHARE * 100)}% of the value of hours saved`, 'Custom builds, if scoped separately']],
  ['You pay providers directly', ['n8n Cloud or your own server', 'AI usage with your own keys, at cost (or one of our managed AI plans)', 'WhatsApp Business, Twilio and other SaaS']],
  ['Always included', ['24/7 customer support', 'Free discovery audit', 'Documentation & handover', 'Failure alerts, retries and monitoring']],
]

export default function Pricing() {
  const loc = useLocation()
  const [mode, setMode] = useState(loc.hash === '#roi' ? 'workflows' : 'apps')
  const keep = Math.round((1 - FEE_SHARE) * 100)

  return (
    <>
      <section className="hero hero--page">
        <div className="container hero__copy">
          <span className="tag">PRICING</span>
          <h1>Pay for time,<br />or pay for time saved</h1>
          <p className="lead">Our products run on a flat R{RETAINER_RATE}/hour monthly retainer. Our workflows are priced on the hours they give back to your team.</p>
          <div className="switch" role="tablist">
            <button type="button" role="tab" aria-selected={mode === 'apps'} className={mode === 'apps' ? 'is-active' : ''} onClick={() => setMode('apps')}>APPS · RETAINER</button>
            <button type="button" role="tab" aria-selected={mode === 'workflows'} className={mode === 'workflows' ? 'is-active' : ''} onClick={() => setMode('workflows')}>WORKFLOWS · PER HOUR SAVED</button>
          </div>
        </div>
      </section>

      {mode === 'apps' ? (
        <section className="section section--flush">
          <div className="container">
            <Tiers />
            <p className="center muted small">Need different hours? Any number of hours at <b>R{RETAINER_RATE}/hour</b>. Unused hours roll over for one month.</p>
          </div>
        </section>
      ) : (
        <section className="section section--flush">
          <div className="container">
            <div className="steps4">
              {steps.map(([icon, title, text], i) => (
                <div key={title} className="step">
                  <span className="mono-label">STEP {i + 1}</span>
                  <Icon name={icon} size={22} />
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <div className="keep">
              <h3>You keep <span className="accent">{keep}%</span> of every hour we save.</h3>
              <p>If the workflow doesn’t save time, you don’t pay for it. Usage costs stay in your name, at cost.</p>
            </div>
          </div>
        </section>
      )}

      <section className="section" id="roi">
        <div className="container">
          <SectionHead title="What would one workflow save you?" sub="Enter the numbers for one manual process. The estimate updates as you go." />
          <RoiCalculator />
          <p className="center muted small">This is an estimate. The final saving is agreed in your free audit and measured from n8n execution logs.</p>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <SectionHead title={<>AI agent <span className="hl">plans</span></>} sub="Your agents on our managed AI models: a fixed monthly allowance instead of variable token bills." />
          <AiTiers />
          <p className="center"><Link to="/ai-agents" className="ulink">See pages and words per plan, and estimate your volume</Link></p>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <SectionHead title="Training, workshops & pilots" sub="Start learning for free, train your whole team, or prove the value with a pilot." />
          <div className="offers">
            {offers.map((o) => (
              <Tilt key={o.id} className={`offer ${o.id === 'workshops' ? 'offer--free' : ''}`}>
                <span className="tag">{o.tag}</span>
                <span className="offer__icon"><Icon name={o.icon} size={22} /></span>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <div className="offer__price">{offerPrice(o)}</div>
                <Link to="/events" className="ulink">Learn more</Link>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container money">
          <SavingsTicker />
          <div className="money__chart">
            <h3>Payback over 12 months</h3>
            <PaybackChart />
          </div>
        </div>
      </section>

      <VideoGrid ids={['peopleOps750', 'saved250k']} title="What automation is worth" sub="Two real ROI stories from n8n’s official channel." />

      <section className="section section--grey">
        <div className="container">
          <SectionHead title="Who pays for what" sub="No hidden costs: use your own accounts at cost, or a fixed monthly AI plan from us." />
          <div className="split3">
            {split.map(([title, items]) => (
              <div key={title} className="split3__card">
                <h4>{title}</h4>
                <ul className="ticks">{items.map((x) => <li key={x}><Icon name="check" size={15} />{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionHead title="Pricing questions" />
          <Faq items={faqs} />
          <p className="center"><Link to="/contact" className="ulink">Still have questions? Talk to us</Link></p>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
