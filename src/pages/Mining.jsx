import { useState } from 'react'
import { Link } from 'react-router-dom'
import Flow from '../components/Flow.jsx'
import Icon from '../components/Icon.jsx'
import { BrowserMock, CtaBand, Faq, SectionHead } from '../components/Blocks.jsx'
import { CountUp, Tilt } from '../components/Motion.jsx'
import { appById } from '../data/apps.js'
import { formatR } from '../data/site.js'
import { compare, compliance, guardrails, mineSteps, pilotPhases, pilotTargets, proof, roadmap, shaftSteps, stakes } from '../data/mining.js'

const minepulse = appById('minepulse')
const shaftpulse = appById('shaftpulse')

const connectFlow = [
  [['Community report', 'phone', 'MinePulse'], ['Underground issue', 'hardhat', 'ShaftPulse']],
  [['Owner department', 'users', 'One register']],
  [['Commit & escalate', 'if', 'Clocks']],
  [['Grievance register', 'db', 'Sync'], ['Maintenance system', 'wrench', 'Work orders']],
]

const faqs = [
  ['Do MinePulse and ShaftPulse replace our existing systems?', 'No. Community cases sync to your existing grievance register, engineering work orders can be pushed to your maintenance system, and your ethics hotline stays the route for anonymous misconduct reports.'],
  ['Does it work underground without signal?', 'Yes. ShaftPulse saves issues on the phone and sends them when the device reaches the station, shaft bank or lamp room. Kiosks can be placed at stations and lamp rooms.'],
  ['Can residents without smartphones or data report?', 'Yes. MinePulse works over USSD on any phone with no data, as well as WhatsApp and an app, in six languages. Field officers can log verbal reports on a tablet.'],
  ['How is personal information protected?', 'Personal information is handled under POPIA with role-based access, anonymous reporting and an audit trail on every record. South African data hosting is available.'],
  ['How do we start?', 'With a 12-week paid pilot at one operation, covering its host communities in MinePulse and two underground levels plus surface in ShaftPulse, measured against agreed targets before any wider rollout.'],
]

function steps(list) {
  return (
    <ol className="msteps">
      {list.map(([icon, title, text], i) => (
        <li key={title} style={{ '--i': i }}>
          <span className="msteps__icon"><Icon name={icon} size={17} /></span>
          <div><b>{title}</b><p>{text}</p></div>
        </li>
      ))}
    </ol>
  )
}

/** Production value = gold output (kg/day) × gold price (R/kg). Every input is editable. */
function ValueCalculator() {
  const [kg, setKg] = useState(20)
  const [price, setPrice] = useState(2250000)
  const [days, setDays] = useState(1)
  const [hours, setHours] = useState(6)
  const perDay = kg * price
  const perHour = perDay / 24
  const mine = days * perDay
  const shaft = hours * 12 * perHour
  const total = mine + shaft

  const field = (label, value, set, min, max, step, fmt, hint) => (
    <label className="slider">
      <span>{label}<output>{fmt(value)}</output></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} style={{ '--pct': `${((value - min) / (max - min)) * 100}%` }} />
      {hint && <small className="muted">{hint}</small>}
    </label>
  )

  return (
    <div className="mcalc">
      <div className="mcalc__in">
        {field('Gold output per operation', kg, setKg, 2, 60, 1, (v) => `${v} kg/day`)}
        {field('Gold price', price, setPrice, 1500000, 3000000, 10000, formatR, 'Per kilogram. Set to today’s price.')}
        {field('Production days protected from protests a year (MinePulse)', days, setDays, 0, 10, 1, (v) => `${v} day${v === 1 ? '' : 's'}`)}
        {field('Production hours protected by faster fixes a month (ShaftPulse)', hours, setHours, 0, 40, 1, (v) => `${v} h`)}
      </div>
      <div className="mcalc__out">
        <p className="mono-label">PRODUCTION VALUE = GOLD OUTPUT × GOLD PRICE</p>
        <div className="mcalc__unit">
          <div><small className="mono-label">ONE DAY</small><b>{formatR(perDay)}</b></div>
          <div><small className="mono-label">ONE HOUR</small><b>{formatR(perHour)}</b></div>
        </div>
        <div className="mcalc__rows">
          <div><span>MinePulse: protected days</span><b>{formatR(mine)}</b></div>
          <div><span>ShaftPulse: protected hours</span><b>{formatR(shaft)}</b></div>
        </div>
        <p className="mono-label">PROTECTED PRODUCTION VALUE / YEAR</p>
        <strong className="mcalc__total" key={Math.round(total / 1e5)}>{formatR(total)}</strong>
        <p className="mcalc__note">Every figure is an assumption you control. The pilot is designed to measure the real numbers at your operation.</p>
      </div>
    </div>
  )
}

export default function Mining() {
  const [product, setProduct] = useState('mine')
  const app = product === 'mine' ? minepulse : shaftpulse

  return (
    <>
      <section className="hero hero--page hero--aurora">
        <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
        <div className="container hero__copy">
          <span className="tag tag--accent">MINING · MINEPULSE + SHAFTPULSE</span>
          <h1>Inside and outside the fence,<br /><span className="grad-text">every issue owned and on the clock</span></h1>
          <p className="lead">Two linked platforms for mines: MinePulse for issues raised by host communities outside the fence, and ShaftPulse for issues between departments inside the mine. Both turn every issue into a tracked case with an owner, a committed date, automatic escalation and a live cost.</p>
          <div className="btns btns--center">
            <Link to="/contact" state={{ interest: 'Pilot implementation', message: 'We’d like to discuss a 12-week MinePulse + ShaftPulse pilot.' }} className="btn btn--accent btn--shine">BOOK A 12-WEEK PILOT</Link>
            <a href="#value" className="btn btn--grey">CALCULATE THE VALUE</a>
          </div>
        </div>
      </section>

      {/* STAKES */}
      <section className="section section--flush">
        <div className="container">
          <div className="mstakes">
            {stakes.map(([big, text, url]) => (
              <a key={big} href={url} target="_blank" rel="noopener noreferrer" className="mstake">
                <b>{big}</b><span>{text}</span><small className="mono-label">SOURCE ↗</small>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="section">
        <div className="container">
          <SectionHead title="Two front doors, one register" sub="Most mines already have sound procedures. They run on letters, meetings, phone calls and manual logs, so issues are slow to surface, hard to count and easy to lose between departments." />
          <div className="mcompare">
            <div className="mcompare__head"><span /><span><Icon name="handshake" size={18} /> MinePulse<small>Outside the fence</small></span><span><Icon name="hardhat" size={18} /> ShaftPulse<small>Inside the fence</small></span></div>
            {compare.map(([k, a, b]) => (
              <div key={k} className="mcompare__row"><span className="mono-label">{k}</span><span>{a}</span><span>{b}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT DEEP DIVE */}
      <section className="section section--grey">
        <div className="container">
          <div className="switch switch--center" role="tablist">
            <button type="button" role="tab" aria-selected={product === 'mine'} className={product === 'mine' ? 'is-active' : ''} onClick={() => setProduct('mine')}>MINEPULSE · COMMUNITIES</button>
            <button type="button" role="tab" aria-selected={product === 'shaft'} className={product === 'shaft' ? 'is-active' : ''} onClick={() => setProduct('shaft')}>SHAFTPULSE · UNDERGROUND</button>
          </div>
          <div className="mdeep" key={product} style={{ '--app': app.color }}>
            <div className="mdeep__copy">
              <h2>{app.name}</h2>
              <p className="muted">{app.desc}</p>
              <h4>How it works</h4>
              {steps(product === 'mine' ? mineSteps : shaftSteps)}
              <Link to={`/products/${app.id}`} className="ulink">Full {app.name} features</Link>
            </div>
            <div className="mdeep__visual">
              <BrowserMock app={app} />
              <div className="panel__canvas dots-dark mdeep__flow"><Flow columns={app.flow} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <SectionHead title={`${app.name} key features`} />
          <div className="feat4" style={{ '--app': app.color }}>
            {app.features.map(([icon, title, text]) => (
              <Tilt key={title} className="feat">
                <span className="feat__icon"><Icon name={icon} size={20} /></span>
                <h4>{title}</h4>
                <p>{text}</p>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECT */}
      <section className="section section--flush">
        <div className="container">
          <div className="panel">
            <div className="panel__tabs"><span className="ptab is-active">HOW THE TWO CONNECT</span></div>
            <div className="panel__body">
              <div className="panel__copy">
                <h3>Two front doors onto the same owner departments</h3>
                <p>A community blasting complaint in MinePulse links to Rock Engineering’s blast records in ShaftPulse. A pump failure inside the mine links to the community seepage case it caused.</p>
                <p>Neither platform replaces what you already run: cases sync to your grievance register and work orders go to your maintenance system.</p>
              </div>
              <div className="panel__canvas dots-dark"><Flow columns={connectFlow} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE */}
      <section className="section" id="value">
        <div className="container">
          <SectionHead title={<>What a protected <span className="hl">production hour</span> is worth</>} sub="Almost all of the value comes from protected production time. Change any assumption to match your operation." />
          <ValueCalculator />
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="section section--grey">
        <div className="container">
          <SectionHead title="Built around what you already report" sub="Both platforms produce the evidence mines already have to report, instead of adding new obligations." />
          <div className="mcomp">
            {compliance.map(([fw, asks, helps]) => (
              <div key={fw} className="mcomp__card">
                <b>{fw}</b>
                <p className="muted">{asks}</p>
                <p><Icon name="check" size={14} /> {helps}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRY PROOF */}
      <section className="section">
        <div className="container">
          <SectionHead title="How the world’s miners already use AI" sub="Reported results from the industry. Most need expensive equipment or open-pit fleets; MinePulse and ShaftPulse are the low-cost first layer that captures the data every later AI tool needs." />
          <div className="mproof">
            {proof.map(([who, what, result, strength, url]) => (
              <a key={who} href={url} target="_blank" rel="noopener noreferrer" className="mproof__card">
                <span className="mono-label">{who}</span>
                <p>{what}</p>
                <b>{result}</b>
                <span className={`mproof__src mproof__src--${/filing|peer/i.test(strength) ? 'strong' : /release/i.test(strength) ? 'mid' : 'weak'}`}>{strength} ↗</span>
              </a>
            ))}
          </div>
          <p className="center muted small">Figures are as reported by each source. Company filings and peer-reviewed studies are the strongest evidence; treat vendor and press figures as indicative.</p>
        </div>
      </section>

      {/* AI ROADMAP */}
      <section className="section section--flush">
        <div className="container">
          <SectionHead title={<>The AI <span className="hl">roadmap</span></>} sub="Once the platforms are collecting data, these AI capabilities become possible, added only where they are proven and affordable." />
          <div className="mroad">
            {roadmap.map(([icon, title, text, when], i) => (
              <Tilt key={title} className="mroad__card" style={{ '--i': i }}>
                <span className="mroad__when mono-label">{when}</span>
                <span className="mroad__icon"><Icon name={icon} size={20} /></span>
                <h4>{title}</h4>
                <p>{text}</p>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* PILOT */}
      <section className="section">
        <div className="container">
          <SectionHead title="Start with a 12-week pilot" sub="One operation, both platforms, measured against agreed targets before any wider rollout." />
          <ol className="timeline">
            {pilotPhases.map(([when, title, text]) => (
              <li key={title}><span className="timeline__when">{when}</span><h4>{title}</h4><p>{text}</p></li>
            ))}
          </ol>
          <div className="mtargets">
            <p className="mono-label">PROPOSED PILOT TARGETS (CONFIRMED WITH YOU)</p>
            {pilotTargets.map(([m, t]) => (
              <div key={m} className="mtargets__row"><span>{m}</span><b>{t}</b></div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARDRAILS */}
      <section className="section section--grey">
        <div className="container">
          <SectionHead title="Clear limits, by design" />
          <div className="mguard">
            {guardrails.map((g) => <div key={g}><Icon name="shield" size={18} /><p>{g}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionHead title="Mining questions" />
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand title="Let’s protect your next production day." sub="Tell us about your operation. We’ll scope a 12-week pilot for MinePulse and ShaftPulse." />
    </>
  )
}
