import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { CONTACT_EMAILS, SUPPORT_HOURS, tiers } from '../data/site.js'

const interests = ['Not sure yet — audit me', ...tiers.map((t) => `Apps — ${t.name}`), 'Workflows — pay per hour saved', 'Free n8n workshop', 'Corporate training', 'Pilot implementation']

export function Contact() {
  const { state } = useLocation()
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    interest: state?.interest || interests[0],
    message: state?.message || '',
  })
  const [sent, setSent] = useState(false)
  const up = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  // No backend yet: open the visitor's email client with the details filled in.
  const submit = (e) => {
    e.preventDefault()
    const subject = `Automation audit request — ${form.company || form.name}`
    const body = [`Name: ${form.name}`, `Company: ${form.company}`, `Email: ${form.email}`, `Interested in: ${form.interest}`, '', form.message].join('\n')
    window.location.href = `mailto:${CONTACT_EMAILS.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="section contact">
      <div className="container contact__inner">
        <div>
          <span className="tag">FREE AUTOMATION AUDIT</span>
          <h1>Tell us what’s eating your team’s time.</h1>
          <p className="lead">In 30 minutes we’ll find your top three automation opportunities and estimate the hours each one would save. No obligation.</p>
          <ul className="ticks">
            <li><Icon name="check" size={15} />Process mapping with your team</li>
            <li><Icon name="check" size={15} />Hours-saved estimate for each process</li>
            <li><Icon name="check" size={15} />Recommended product or workflow</li>
          </ul>
          <div className="contact__cards">
            <div className="support__card support__card--mini">
              <span className="support__big">{SUPPORT_HOURS}</span>
              <p><b>Support for every client.</b> Workflows are monitored around the clock, and you can reach us any time.</p>
            </div>
            <div className="contact__emails">
              <p className="mono-label">EMAIL US</p>
              {CONTACT_EMAILS.map((e) => <a key={e} className="contact__email" href={`mailto:${e}`}><Icon name="mail" size={16} /> {e}</a>)}
            </div>
          </div>
        </div>
        <form className="cform" onSubmit={submit}>
          <div className="cform__row">
            <label><span>NAME</span><input required autoComplete="name" value={form.name} onChange={up('name')} /></label>
            <label><span>COMPANY</span><input autoComplete="organization" value={form.company} onChange={up('company')} /></label>
          </div>
          <label><span>WORK EMAIL</span><input type="email" required autoComplete="email" value={form.email} onChange={up('email')} /></label>
          <label><span>INTERESTED IN</span>
            <select value={form.interest} onChange={up('interest')}>{interests.map((i) => <option key={i}>{i}</option>)}</select>
          </label>
          <label><span>WHAT PROCESS TAKES THE MOST TIME?</span><textarea rows={5} value={form.message} onChange={up('message')} /></label>
          <button type="submit" className="btn btn--accent btn--block">BOOK MY FREE AUDIT</button>
          <p className="muted small center">
            {sent ? `Thanks! If your email app didn’t open, write to ${CONTACT_EMAILS.join(' or ')}.` : 'This opens your email app with the details filled in.'}
          </p>
        </form>
      </div>
    </section>
  )
}

export function NotFound() {
  return (
    <section className="hero hero--page">
      <div className="container hero__copy">
        <span className="tag">404</span>
        <h1>This step didn’t run.</h1>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <div className="btns btns--center"><Link to="/" className="btn btn--accent">BACK HOME</Link></div>
      </div>
    </section>
  )
}
