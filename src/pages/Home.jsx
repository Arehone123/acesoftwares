import { useState } from 'react'
import { Link } from 'react-router-dom'
import Flow from '../components/Flow.jsx'
import Icon from '../components/Icon.jsx'
import { CtaBand, Mono, SectionHead, WorkflowCard } from '../components/Blocks.jsx'
import { apps } from '../data/apps.js'
import { workflows, workflowBySlug } from '../data/workflows.js'
import { partners, RETAINER_RATE, FEE_SHARE } from '../data/site.js'

const heroFlow = [
  [['New enquiry', 'webhook', 'Webhook']],
  [['Prepare data', 'code', 'Code']],
  [['Triage request', 'bot', 'AI agent']],
  [['Urgent?', 'if', 'Branch']],
  [['Alert team', 'whatsapp', 'WhatsApp'], ['Send auto-reply', 'mail', 'Email']],
]

const teams = [
  { tab: 'FINANCE', slug: 'invoice-inbox-to-sage-xero', title: 'How finance teams stopped capturing invoices by hand', text: 'Supplier invoices are read, matched to purchase orders and posted to Sage or Xero, all in one workflow.' },
  { tab: 'HR', slug: 'new-hire-onboarding', title: 'How HR gets new starters ready before day one', text: 'Accounts, equipment, payroll and induction are set up in parallel the moment an offer is signed.' },
  { tab: 'TENDERS', slug: 'tender-radar', title: 'How bid teams find the right tenders every morning', text: 'Public portals are scanned daily and every tender is scored for fit before anyone opens their laptop.' },
  { tab: 'IT & DATA CENTRE', slug: 'infrastructure-alert-triage', title: 'How operations teams turn alert noise into one incident', text: 'Alerts are grouped, enriched and routed, so engineers only get paged for what matters.' },
  { tab: 'RECRUITMENT', slug: 'cv-screening-pipeline', title: 'How recruiters read every CV without reading every CV', text: 'Applications are ranked against the job spec with reasons, and interviews book themselves.' },
]

const trustItems = [
  {
    title: 'Full visibility across every step',
    text: 'Open any node and see exactly what came in, what the AI decided and what went out. Nothing is a black box.',
    flow: [[['Email arrives', 'mail', 'Outlook']], [['Read & decide', 'bot', 'AI agent']], [['Needs a person?', 'if', 'Branch']], [['Ask approver', 'chat', 'Teams'], ['Continue', 'ok', 'Auto']]],
  },
  {
    title: 'Rules around every AI action',
    text: 'AI handles the messy parts; your rules and approvals decide what actually happens. People stay in the loop for anything sensitive.',
    flow: [[['Request', 'webhook', 'Webhook']], [['Draft answer', 'bot', 'AI agent']], [['Within policy?', 'if', 'Guardrail']], [['Send', 'send', 'Reply'], ['Human review', 'users', 'Queue']]],
  },
  {
    title: 'Hosted in South Africa',
    text: 'Self-host your workflows in your own environment or a local data centre managed with Sovrinn. Your data stays where you need it.',
    flow: [[['Your systems', 'db', 'On-prem']], [['n8n', 'server', 'Self-hosted']], [['Encrypted store', 'lock', 'Secrets']], [['Audit log', 'history', 'SIEM']]],
  },
]

const ownItems = [
  { title: 'Documentation, built in', text: 'Every workflow is readable at a glance and comes with a written handover document.' },
  { title: 'Recover in one step', text: 'Failures are flagged immediately. Fix the step that broke and re-run just that step.' },
  { title: 'Every change, tracked', text: 'Version history shows who changed what, and when. Roll back in seconds.' },
]

const floatTiles = ['WhatsApp', 'Sage', 'OpenAI', 'Microsoft Teams', 'Google Sheets', 'Xero', 'Slack', 'PostgreSQL', 'HubSpot', 'Anthropic Claude', 'Jira', 'Outlook']

export default function Home() {
  const [team, setTeam] = useState(0)
  const [trust, setTrust] = useState(0)
  const [own, setOwn] = useState(1)
  const t = teams[team]
  const tw = workflowBySlug(t.slug)
  const trending = [...workflows].sort((a, b) => b.hours - a.hours).slice(0, 6)

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__copy">
          <h1>Run the business.<br />Let the workflows do the work.</h1>
          <p className="lead">
            AceSoftwares builds the operating systems and n8n workflows that take repetitive work off your team.
            Every step stays visible, so you can see what it does and explain it to anyone.
          </p>
          <div className="btns btns--center">
            <Link to="/contact" className="btn btn--accent">BOOK A FREE AUDIT</Link>
            <Link to="/pricing" className="btn btn--grey">SEE PRICING</Link>
          </div>
        </div>
        <div className="container container--wide">
          <Flow columns={heroFlow} theme="light" tools maxScale={1.1} />
          <p className="hero__hint mono-label">CLICK ANY STEP TO INSPECT IT</p>
        </div>
      </section>

      {/* PRODUCT STRIP */}
      <section className="strip">
        <p>Eight business operating systems. One automation backbone.</p>
        <div className="strip__row">
          {apps.map((a) => (
            <Link key={a.id} to={`/products/${a.id}`} className="strip__item" title={a.name}>
              <Icon name={a.icon} size={26} />
              <span>{a.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* TEAMS PANEL */}
      <section className="section section--tight">
        <div className="container">
          <div className="panel">
            <div className="panel__tabs" role="tablist">
              {teams.map((x, i) => (
                <button key={x.tab} role="tab" aria-selected={i === team} className={`ptab ${i === team ? 'is-active' : ''}`} onClick={() => setTeam(i)}>{x.tab}</button>
              ))}
            </div>
            <div className="panel__body">
              <div className="panel__copy">
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <Link to={`/workflows/${t.slug}`} className="ulink">See the workflow</Link>
                <div className="panel__saved"><b>−{tw.hours} hrs</b> per week, typical team</div>
              </div>
              <div className="panel__canvas dots-dark">
                <Flow columns={tw.flow} key={t.slug} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT PILLS */}
      <section className="container pills3">
        <div className="pillcard"><Icon name="workflow" size={22} /><span><b>8 products</b> built and running on n8n</span></div>
        <div className="pillcard"><Icon name="clock" size={22} /><span><b>R{RETAINER_RATE}/hour</b> flat monthly retainer</span></div>
        <div className="pillcard"><Icon name="gauge" size={22} /><span><b>Pay per hour saved</b>, keep {Math.round((1 - FEE_SHARE) * 100)}% of the value</span></div>
      </section>

      {/* INTEGRATIONS CLOUD */}
      <section className="section cloud">
        <div className="cloud__tiles" aria-hidden="true">
          {floatTiles.map((n, i) => (
            <span key={n} className={`cloud__tile cloud__tile--${i}`}><Mono name={n} size="lg" /></span>
          ))}
        </div>
        <div className="container cloud__copy">
          <h2>Plugs into the stack you already run</h2>
          <p>WhatsApp, Sage, Microsoft 365, your database or that old system with an API: if it has a way in, we can automate around it.</p>
          <Link to="/integrations" className="btn btn--grey">EXPLORE INTEGRATIONS</Link>
        </div>
      </section>

      {/* SPLIT: TRUST */}
      <section className="section">
        <div className="container split">
          <div className="split__copy">
            <h2>See + understand<br />+ trust your automations</h2>
            <p className="muted">Connect any AI model, see every decision and add a human approval wherever it matters.</p>
            <div className="acc">
              {trustItems.map((x, i) => (
                <button key={x.title} type="button" className={`acc__item ${i === trust ? 'is-open' : ''}`} onClick={() => setTrust(i)}>
                  <b>{x.title}</b>
                  {i === trust && <span>{x.text}</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="split__canvas dots-dark">
            <Flow columns={trustItems[trust].flow} key={trust} />
          </div>
        </div>
      </section>

      {/* SPLIT: OWN */}
      <section className="section section--flush">
        <div className="container split split--rev">
          <div className="split__canvas dots-dark split__canvas--status">
            <div className={`status-flow status-flow--${own}`}>
              <span className="sf sf--ok"><Icon name="pen" size={26} /><small>Calculate totals</small></span>
              <i />
              <span className={`sf ${own === 1 ? 'sf--fail' : 'sf--ok'}`}><Icon name="sheet" size={26} /><small>Update report</small></span>
              <i />
              <span className={`sf ${own === 1 ? 'sf--idle' : 'sf--ok'}`}><Icon name="whatsapp" size={26} /><small>Notify managers</small></span>
              <i />
              <span className="sf sf--plus"><Icon name="plus" size={16} /></span>
            </div>
            {own === 1 && <p className="status-note"><Icon name="alert" size={14} /> Step 2 failed: sheet locked. <u>Re-run step</u></p>}
            {own === 2 && <p className="status-note status-note--ok"><Icon name="history" size={14} /> v14 · edited by AceSoftwares · 2 days ago</p>}
          </div>
          <div className="split__copy">
            <h2>Built by us +<br />readable by anyone</h2>
            <p className="muted">Workflows your team can follow in a visual builder, with code underneath wherever it’s needed. You own everything we build.</p>
            <div className="acc">
              {ownItems.map((x, i) => (
                <button key={x.title} type="button" className={`acc__item ${i === own ? 'is-open' : ''}`} onClick={() => setOwn(i)}>
                  <b>{x.title}</b>
                  {i === own && <span>{x.text}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section">
        <div className="container">
          <SectionHead title="Our products" sub="Each product is a full web app for one part of your business, with n8n workflows running behind it." />
          <div className="prodgrid">
            {apps.map((a) => (
              <Link key={a.id} to={`/products/${a.id}`} className="prod" style={{ '--app': a.color }}>
                <span className="prod__icon"><Icon name={a.icon} size={24} /></span>
                <h3>{a.name}</h3>
                <p>{a.tagline}</p>
                <span className="prod__go mono-label">VIEW PRODUCT <Icon name="arrow" size={13} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="section section--grey">
        <div className="container">
          <SectionHead title="Two clear ways to pay" sub="A flat retainer for our products. A share of the hours saved for our workflows." />
          <div className="duo">
            <div className="duo__card">
              <span className="tag">APPS</span>
              <div className="duo__big">R{RETAINER_RATE}<span>/hour</span></div>
              <p>Monthly retainer for hosting, support and continuous improvement of your Ace OS products. Pick your hours: 10, 25, 50 or more.</p>
              <Link to="/pricing" className="ulink">See retainer plans</Link>
            </div>
            <div className="duo__card duo__card--dark">
              <span className="tag tag--accent">WORKFLOWS</span>
              <div className="duo__big">{Math.round(FEE_SHARE * 100)}%<span> of hours saved</span></div>
              <p>We measure the hours a workflow saves you and charge a share of their value. If it saves nothing, you pay nothing.</p>
              <Link to="/pricing#roi" className="ulink">Calculate your savings</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="section">
        <div className="container">
          <SectionHead title={<>Popular <span className="hl">workflow</span> templates</>} />
          <div className="wfgrid">{trending.map((w) => <WorkflowCard key={w.slug} w={w} />)}</div>
          <p className="center"><Link to="/workflows" className="ulink">Browse all {workflows.length} workflows</Link></p>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="section section--flush">
        <div className="container">
          <SectionHead title="Built with partners we trust" />
          <div className="partners">
            {partners.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="partner">
                <span className="tag">{p.role.toUpperCase()}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <span className="mono-label">{p.url.replace(/^https?:\/\//, '').toUpperCase()} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
