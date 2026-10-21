import { useState } from 'react'
import { Link } from 'react-router-dom'
import Flow from '../components/Flow.jsx'
import Icon from '../components/Icon.jsx'
import { CtaBand, Faq, SectionHead } from '../components/Blocks.jsx'
import { AiEstimator, AiTiers } from '../components/Ai.jsx'
import { Video } from '../components/Media.jsx'
import { aiTiers, tierCapacity, WORDS_PER_PAGE, MANUAL_MINUTES_PER_PAGE } from '../data/site.js'

const agents = [
  {
    tab: 'SUPPORT AGENT',
    title: 'Answers customers on WhatsApp, day and night',
    text: 'Reads each message, looks up the answer in your documents, replies in seconds and hands anything sensitive to a person.',
    flow: [[['WhatsApp message', 'whatsapp', 'Trigger']], [['Support agent', 'bot', 'AI agent']], [['Needs a person?', 'if', 'Branch']], [['Reply', 'whatsapp', 'WhatsApp'], ['Hand over', 'users', 'Team inbox']]],
  },
  {
    tab: 'DOCUMENT AGENT',
    title: 'Reads invoices, contracts and forms for you',
    text: 'Pulls the fields you need from PDFs and scans, checks them against your rules and posts the results to your systems.',
    flow: [[['New document', 'upload', 'SharePoint']], [['Read & extract', 'ocr', 'Parse']], [['Document agent', 'bot', 'AI agent']], [['Post to Sage', 'receipt', 'Sage'], ['Flag issues', 'chat', 'Teams']]],
  },
  {
    tab: 'RESEARCH AGENT',
    title: 'Scores every tender against your capabilities',
    text: 'Downloads tender packs, reads every page, scores the fit and writes a one-page brief for the bid team.',
    flow: [[['Every morning', 'clock', 'Schedule']], [['Fetch tenders', 'globe', 'HTTP']], [['Research agent', 'bot', 'AI agent']], [['Brief to Bid OS', 'briefcase', 'Bid OS'], ['Alert team', 'whatsapp', 'WhatsApp']]],
  },
  {
    tab: 'HR AGENT',
    title: 'Screens CVs and books the interviews',
    text: 'Reads each CV against the job spec, explains its score, and books interviews with shortlisted candidates.',
    flow: [[['New application', 'mail', 'Gmail']], [['Screening agent', 'bot', 'AI agent']], [['Shortlist?', 'if', 'Score ≥ 75']], [['Book interview', 'calendar', 'Calendar'], ['Polite decline', 'mail', 'Gmail']]],
  },
]

const faqs = [
  ['What counts as an execution?', 'One run of an agent from start to finish: for example, reading one email and replying, or reading one invoice and posting it. Multi-step runs on the Pro plan can include several AI calls and document parsing within a single execution.'],
  ['How did you work out the pages and words?', `We assume one page is about ${WORDS_PER_PAGE} words. Starter assumes about one page per execution; Pro assumes about two pages per multi-step execution. Short messages use far less, so you can usually handle more items than the page figures suggest.`],
  ['What happens if we go over our allowance?', 'Your agents keep running. We let you know when you reach 80% of your plan, and if you regularly need more, we move you to the next plan or agree a custom allowance.'],
  ['Can we use our own AI accounts instead?', 'Yes. Bring your own OpenAI, Anthropic or Google keys and pay the provider directly at cost. The managed plans are for teams that prefer one fixed monthly price with no surprise token bills.'],
  ['Is our data used to train the AI?', 'We use business API accounts with AI providers whose API terms say they do not train on API data by default. For sensitive work we can use models hosted in your region or on your own infrastructure.'],
  ['How do AI plans fit with your other pricing?', 'They sit alongside it. Add an AI plan to any product retainer (R450/hour) or to a workflow on our pay-per-hour-saved model.'],
]

export default function AiAgents() {
  const [tab, setTab] = useState(0)
  const a = agents[tab]
  const starter = tierCapacity(aiTiers[0])
  const pro = tierCapacity(aiTiers[1])

  return (
    <>
      <section className="hero hero--page hero--aurora">
        <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
        <div className="container hero__copy">
          <span className="tag tag--accent">AI AGENTS</span>
          <h1>AI agents that read, decide<br /><span className="grad-text">and get the work done</span></h1>
          <p className="lead">We design, build and run AI agents on n8n for your business, and we can power them with our own managed AI models on one fixed monthly plan. No surprise token bills.</p>
          <div className="btns btns--center">
            <a href="#plans" className="btn btn--accent">SEE AI PLANS</a>
            <a href="#estimate" className="btn btn--grey">ESTIMATE YOUR VOLUME</a>
          </div>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <div className="panel">
            <div className="panel__tabs" role="tablist">
              {agents.map((x, i) => (
                <button key={x.tab} role="tab" aria-selected={i === tab} className={`ptab ${i === tab ? 'is-active' : ''}`} onClick={() => setTab(i)}>{x.tab}</button>
              ))}
            </div>
            <div className="panel__body">
              <div className="panel__copy">
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <Link to="/contact" state={{ interest: 'AI agents — Pro', message: `We'd like a ${a.tab.toLowerCase()}.` }} className="ulink">Build this agent for us</Link>
              </div>
              <div className="panel__canvas dots-dark"><Flow columns={a.flow} key={tab} /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Two ways to power your agents" />
          <div className="duo">
            <div className="duo__card">
              <span className="tag">BRING YOUR OWN KEYS</span>
              <div className="duo__big">At cost</div>
              <p>Your OpenAI, Anthropic or Google account, in your company’s name. You pay the provider directly for exactly what you use.</p>
            </div>
            <div className="duo__card duo__card--dark">
              <span className="tag tag--accent">OUR MANAGED AI</span>
              <div className="duo__big">Fixed<span> monthly</span></div>
              <p>Your agents run on our AI models with a monthly allowance of executions. One predictable price, set up and monitored by us.</p>
              <a href="#plans" className="ulink">See the plans</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--flush" id="plans">
        <div className="container">
          <SectionHead title={<>Managed AI <span className="hl">plans</span></>} sub="Monthly execution allowances on our own AI models. Add them to any retainer or pay-per-hour-saved workflow." />
          <AiTiers />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="What that looks like in pages and words" sub={`A guide to how much your agents can read each month. We assume 1 page ≈ ${WORDS_PER_PAGE} words.`} />
          <div className="captable">
            <div className="captable__row captable__row--head">
              <span>Plan</span><span>Executions</span><span>Pages / month</span><span>Words / month</span><span>Equal to by hand</span>
            </div>
            {aiTiers.map((t) => {
              const c = tierCapacity(t)
              return (
                <div key={t.name} className={`captable__row ${t.featured ? 'is-featured' : ''}`}>
                  <span><b>{t.name}</b><small>{t.price}{t.per}</small></span>
                  <span>{t.executions ? t.executions.toLocaleString('en-ZA').replace(/[  ]/g, ',') : 'Custom'}</span>
                  <span>{c ? `~${c.pages.toLocaleString('en-ZA').replace(/[  ]/g, ',')}` : '200,000+'}</span>
                  <span>{c ? `~${(c.words / 1e6).toLocaleString('en-ZA')} million` : '100 million+'}</span>
                  <span>{c ? `~${c.manualHours.toLocaleString('en-ZA').replace(/[  ]/g, ',')} staff hours` : 'Scoped with you'}</span>
                </div>
              )
            })}
          </div>
          <div className="capnotes">
            <div><Icon name="mail" size={18} /><p><b>Emails & messages</b> are usually 100–300 words, so {aiTiers[0].executions.toLocaleString('en-ZA').replace(/[  ]/g, ',')} executions on Starter can cover around {aiTiers[0].executions.toLocaleString('en-ZA').replace(/[  ]/g, ',')} customer conversations a month.</p></div>
            <div><Icon name="receipt" size={18} /><p><b>Invoices & forms</b> are typically 1–2 pages: Pro’s ~{pro.pages.toLocaleString('en-ZA').replace(/[  ]/g, ',')} pages covers roughly 50,000 invoices a month.</p></div>
            <div><Icon name="file" size={18} /><p><b>Contracts & tender packs</b> can run to 20–100 pages each. Heavy documents like these usually belong on Enterprise.</p></div>
            <div><Icon name="clock" size={18} /><p><b>Manual time</b> assumes {MANUAL_MINUTES_PER_PAGE} minutes per page to read, decide and capture. Starter’s capacity alone is about {starter.manualHours} staff hours.</p></div>
          </div>
        </div>
      </section>

      <section className="section section--grey" id="estimate">
        <div className="container">
          <SectionHead title="How much will your agents need to read?" sub="Move the sliders to match your volumes and we’ll suggest a plan." />
          <AiEstimator />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__copy">
            <span className="tag">WATCH</span>
            <h2>Agent or workflow?</h2>
            <p className="muted">Not every job needs an AI agent. This video from n8n explains when an agent is the right tool and when a simple workflow with AI does the job better. We’ll help you choose the cheaper option.</p>
          </div>
          <Video v="agentsVsWorkflows" big />
        </div>
      </section>

      <section className="section section--flush">
        <div className="container container--narrow">
          <SectionHead title="AI plan questions" />
          <Faq items={faqs} />
        </div>
      </section>
      <CtaBand title="Tell us what your agent should do." sub="Describe the job. We’ll tell you which plan fits and how many hours it could save." />
    </>
  )
}
