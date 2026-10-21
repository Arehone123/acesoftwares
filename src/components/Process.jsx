import { RETAINER_RATE } from '../data.js'

const timeline = [
  ['Week 1', 'Discovery audit', 'We map your process, list the edge cases and deliver a visual architecture plan with an estimate of the hours it will save.'],
  ['Weeks 2–4', 'Build & test', 'We build the n8n workflows, AI logic, error handling and dashboards, then test them against your real data before anything goes live.'],
  ['Launch', 'Go live + 30 days hypercare', 'For the first 30 days after launch, bug fixes and adjustments are included in the build.'],
  ['Ongoing', 'Retain & improve', 'Monitoring, API updates and new automations under your retainer or pay-per-hour-saved agreement.'],
]

const split = [
  ['You pay us', [`Product retainer (R${RETAINER_RATE}/hr)`, 'Workflow fees (share of hours saved)', 'Custom build projects, if scoped separately']],
  ['You own directly', ['n8n Cloud or self-hosted server', 'AI API keys (OpenAI, Anthropic)', 'WhatsApp Business, Twilio & other SaaS']],
  ['Always included', ['Documentation & handover', 'Failure alerts & retries', 'POPIA-conscious data handling']],
]

export default function Process() {
  return (
    <section className="section section--alt" id="process">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">How we work</span>
          <h2>From manual to automated in weeks, not months</h2>
        </div>
        <ol className="timeline">
          {timeline.map(([when, title, text]) => (
            <li key={title}>
              <span className="timeline__when">{when}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <div className="split">
          {split.map(([title, items]) => (
            <div className="split__card" key={title}>
              <h4>{title}</h4>
              <ul className="checks">
                {items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
