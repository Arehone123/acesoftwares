import { Link } from 'react-router-dom'
import Flow from '../components/Flow.jsx'
import Icon from '../components/Icon.jsx'
import { CtaBand, Faq, SectionHead } from '../components/Blocks.jsx'
import { Tilt } from '../components/Motion.jsx'
import { VideoGrid } from '../components/Media.jsx'
import { offers, feeLabel, TRAINING_FEE, PILOT_FEE, CONTACT_EMAILS } from '../data/site.js'

const fees = { TRAINING_FEE, PILOT_FEE }
export const offerPrice = (o) => o.price || feeLabel(fees[o.fee])

const formats = [
  ['play', 'Intro to n8n', 'Two hours, no experience needed. Build a workflow that sends you a WhatsApp message when a form is submitted.'],
  ['bot', 'AI agents hands-on', 'Connect an AI model to your tools and build an agent that can read, decide and act, with you in control.'],
  ['users', 'Community meetups', 'Show-and-tell evenings where local teams share what they’ve automated and what they learned.'],
  ['code', 'Advanced builders', 'Error handling, sub-workflows, code nodes and self-hosting for people already running n8n.'],
]

const pilotFlow = [
  [['Week 1', 'search', 'Audit']],
  [['Weeks 2–3', 'workflow', 'Build']],
  [['Week 4', 'gauge', 'Measure']],
  [['Go / no-go', 'if', 'Report']],
  [['Roll out', 'zap', 'Scale'], ['Stop', 'x', 'No cost after']],
]

const eventFaqs = [
  ['Are the workshops really free?', 'Yes. Our community workshops and events are sponsored by n8n, so there’s no charge to attend. Places can be limited, so register your interest early.'],
  ['Do I need to know how to code?', 'No. The introductory sessions are for complete beginners. Bring a laptop; we’ll help you set up on the day.'],
  ['What’s the difference between the workshops and corporate training?', 'Workshops are open community sessions. Corporate training is private to your company, built around your own processes, tools and data.'],
  ['What happens after a pilot?', 'You get a report showing the hours saved against the agreed baseline. If you continue, the workflow moves onto our pay-per-hour-saved model.'],
]

export default function Events() {
  return (
    <>
      <section className="hero hero--page hero--aurora">
        <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
        <div className="container hero__copy">
          <span className="tag tag--accent">EVENTS & TRAINING</span>
          <h1>Learn n8n with us.<br /><span className="grad-text">The workshops are on n8n.</span></h1>
          <p className="lead">Free community workshops and events sponsored by n8n, plus exclusive corporate training and pilot implementations for teams who want to move fast.</p>
          <div className="btns btns--center">
            <Link to="/contact" state={{ interest: 'Not sure yet — audit me', message: 'Please register me for the next free n8n workshop.' }} className="btn btn--accent btn--shine">REGISTER FOR A FREE WORKSHOP</Link>
            <a href="#training" className="btn btn--grey">CORPORATE TRAINING</a>
          </div>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container offers">
          {offers.map((o) => (
            <Tilt key={o.id} className={`offer ${o.id === 'workshops' ? 'offer--free' : ''}`} id={o.id === 'training' ? 'training' : undefined}>
              <span className="tag">{o.tag}</span>
              <span className="offer__icon"><Icon name={o.icon} size={22} /></span>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
              <ul className="ticks">{o.points.map((p) => <li key={p}><Icon name="check" size={15} />{p}</li>)}</ul>
              <div className="offer__price">{offerPrice(o)}</div>
              <Link to="/contact" state={{ message: `${o.title}: please send me details.` }} className={`btn btn--block ${o.id === 'workshops' ? 'btn--accent' : 'btn--grey'}`}>{o.cta}</Link>
            </Tilt>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Workshop formats" sub="We run these in Cape Town and online throughout the year. Tell us which ones you’re interested in and we’ll let you know about the next date." />
          <div className="evformats">
            {formats.map(([icon, title, text]) => (
              <div key={title} className="evformat">
                <Icon name={icon} size={22} />
                <h4>{title}</h4>
                <p>{text}</p>
                <span className="mono-label">FREE · SPONSORED BY n8n</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <div className="panel">
            <div className="panel__tabs"><span className="ptab is-active">PILOT IMPLEMENTATION</span></div>
            <div className="panel__body">
              <div className="panel__copy">
                <h3>Prove the hours before you commit</h3>
                <p>We automate one high-value process in your environment, measure the hours saved against an agreed baseline and give you a clear go / no-go report.</p>
                <Link to="/contact" state={{ message: 'We would like to run a pilot implementation.' }} className="ulink">Start a pilot</Link>
                <div className="panel__saved"><b>{feeLabel(PILOT_FEE)}</b></div>
              </div>
              <div className="panel__canvas dots-dark"><Flow columns={pilotFlow} /></div>
            </div>
          </div>
        </div>
      </section>

      <VideoGrid ids={['buildItYourself', 'whatsappAssistant', 'telegramAgent', 'agentsVsWorkflows', 'mcp', 'selfHosting']} title="Start learning before the workshop" sub="Hand-picked from n8n’s official YouTube channel." />

      <section className="section">
        <div className="container container--narrow">
          <SectionHead title="Questions about events & training" />
          <Faq items={eventFaqs} />
          <p className="center muted small">Email us: {CONTACT_EMAILS.map((e, i) => <span key={e}>{i > 0 && ' or '}<a className="ulink" href={`mailto:${e}`}>{e}</a></span>)}</p>
        </div>
      </section>
      <CtaBand title="Want a workshop for your team?" sub="Tell us how many people and what you’d like to automate. We’ll suggest the right session." />
    </>
  )
}
