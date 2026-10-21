import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { CONTACT_EMAILS, SUPPORT_HOURS, tiers } from '../data/site.js'
import { mailtoFallback, sendSupportRequest } from '../lib/support.js'
import { SupportReply } from '../components/Support.jsx'

const interests = ['Not sure yet — audit me', ...tiers.map((t) => `Apps — ${t.name}`), 'Workflows — pay per hour saved', 'AI agents — Starter', 'AI agents — Pro', 'AI agents — Enterprise', 'Free n8n workshop', 'Corporate training', 'Pilot implementation']

export function Contact() {
  const { state } = useLocation()
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    interest: state?.interest || interests[0],
    message: state?.message || '',
  })
  const [trap, setTrap] = useState('') // honeypot: real visitors never see or fill this
  const [state_, setState] = useState({ phase: 'idle' }) // idle | sending | done | error
  const up = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  // Sends the request to our n8n support workflow, which answers instantly or hands over to a person.
  const submit = async (e) => {
    e.preventDefault()
    if (trap) return setState({ phase: 'done', status: 'success', message: 'Thanks, we’ve received your message.' })
    setState({ phase: 'sending' })
    const res = await sendSupportRequest({ ...form, source: 'contact-page' })
    setState(res.ok ? { phase: 'done', ...res } : { phase: 'error', ...res })
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
        {state_.phase === 'done' ? (
          <SupportReply
            status={state_.status}
            message={state_.message}
            onReset={() => { setState({ phase: 'idle' }); setForm({ ...form, message: '' }) }}
          />
        ) : (
        <form className="cform" onSubmit={submit}>
          <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={trap} onChange={(e) => setTrap(e.target.value)} />
          <div className="cform__row">
            <label><span>NAME</span><input required autoComplete="name" value={form.name} onChange={up('name')} /></label>
            <label><span>COMPANY</span><input autoComplete="organization" value={form.company} onChange={up('company')} /></label>
          </div>
          <label><span>WORK EMAIL</span><input type="email" required autoComplete="email" value={form.email} onChange={up('email')} /></label>
          <label><span>INTERESTED IN</span>
            <select value={form.interest} onChange={up('interest')}>{interests.map((i) => <option key={i}>{i}</option>)}</select>
          </label>
          <label><span>WHAT PROCESS TAKES THE MOST TIME? (OR ASK US ANYTHING)</span><textarea required rows={5} value={form.message} onChange={up('message')} /></label>
          <button type="submit" className="btn btn--accent btn--block" disabled={state_.phase === 'sending'}>
            {state_.phase === 'sending' ? <><span className="spinner spinner--light" /> SENDING…</> : 'BOOK MY FREE AUDIT'}
          </button>
          {state_.phase === 'error' ? (
            <p className="cform__error">
              <Icon name="alert" size={15} /> {state_.message} Please try again, or{' '}
              <a className="ulink" href={mailtoFallback(form)}>send it by email instead</a>.
            </p>
          ) : (
            <p className="muted small center">Our support assistant replies instantly, and a person follows up on every request, {SUPPORT_HOURS}.</p>
          )}
        </form>
        )}
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
