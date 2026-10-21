import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { CONTACT_EMAILS, SUPPORT_HOURS } from '../data/site.js'
import { mailtoFallback, sendSupportRequest } from '../lib/support.js'

/** The workflow's reply: an instant AI answer, or confirmation that a person is taking over. */
export function SupportReply({ status, message, onReset, compact = false }) {
  const human = status === 'transferred'
  return (
    <div className={`sreply ${human ? 'sreply--human' : ''} ${compact ? 'sreply--compact' : ''}`} role="status">
      <div className="sreply__head">
        <span className="sreply__icon"><Icon name={human ? 'users' : 'sparkles'} size={18} /></span>
        <div>
          <b>{human ? 'A support agent is on it' : 'Here’s what we found'}</b>
          <small className="mono-label">{human ? 'HANDED TO OUR TEAM' : 'AceSoftwares support assistant'}</small>
        </div>
      </div>
      <p className="sreply__msg">{message}</p>
      <p className="sreply__foot">
        {human
          ? <>We’ll reply by email. Need us sooner? Write to {CONTACT_EMAILS.map((e, i) => <span key={e}>{i > 0 && ' or '}<a className="ulink" href={`mailto:${e}`}>{e}</a></span>)}.</>
          : <>A person on our team has also received your message and will follow up if needed.</>}
      </p>
      {onReset && <button type="button" className="btn btn--grey btn--sm" onClick={onReset}>ASK SOMETHING ELSE</button>}
    </div>
  )
}

/** Floating 24/7 button that opens a quick support form on every page. */
export function SupportWidget() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [trap, setTrap] = useState('')
  const [st, setSt] = useState({ phase: 'idle' })
  const panel = useRef(null)
  const up = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    panel.current?.querySelector('input, textarea')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const submit = async (e) => {
    e.preventDefault()
    if (trap) return setSt({ phase: 'done', status: 'success', message: 'Thanks, we’ve received your message.' })
    setSt({ phase: 'sending' })
    const res = await sendSupportRequest({ ...form, interest: 'Support question', source: 'support-widget' })
    setSt(res.ok ? { phase: 'done', ...res } : { phase: 'error', ...res })
  }

  return (
    <>
      {open && (
        <div className="swidget" ref={panel} role="dialog" aria-label="Ask AceSoftwares support">
          <div className="swidget__head">
            <span className="swidget__logo"><img src="/logo.svg" alt="" width="28" height="28" /></span>
            <div>
              <b>AceSoftwares support</b>
              <small><i className="live" /> {SUPPORT_HOURS} · usually answers instantly</small>
            </div>
            <button type="button" className="swidget__close" onClick={() => setOpen(false)} aria-label="Close"><Icon name="x" size={16} /></button>
          </div>
          <div className="swidget__body">
            {st.phase === 'done' ? (
              <SupportReply compact status={st.status} message={st.message} onReset={() => { setSt({ phase: 'idle' }); setForm({ ...form, message: '' }) }} />
            ) : (
              <form onSubmit={submit} className="swidget__form">
                <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={trap} onChange={(e) => setTrap(e.target.value)} />
                <p className="swidget__hello">Hi! Ask us anything about automation, our products, pricing or an existing workflow.</p>
                <input required placeholder="Your name" autoComplete="name" value={form.name} onChange={up('name')} />
                <input required type="email" placeholder="Email address" autoComplete="email" value={form.email} onChange={up('email')} />
                <textarea required rows={3} placeholder="How can we help?" value={form.message} onChange={up('message')} />
                <button type="submit" className="btn btn--accent btn--block" disabled={st.phase === 'sending'}>
                  {st.phase === 'sending' ? <><span className="spinner spinner--light" /> THINKING…</> : <>SEND <Icon name="send" size={14} /></>}
                </button>
                {st.phase === 'error' && (
                  <p className="cform__error"><Icon name="alert" size={14} /> {st.message} <a className="ulink" href={mailtoFallback(form)}>Email us instead</a>.</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
      <button type="button" className={`supchip ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close support' : '24/7 support: ask us a question'}>
        {!open && <span className="supchip__pulse" />}
        <Icon name={open ? 'x' : 'chat'} size={15} />
        <span className="supchip__text">{open ? 'Close' : '24/7 support'}</span>
      </button>
    </>
  )
}
