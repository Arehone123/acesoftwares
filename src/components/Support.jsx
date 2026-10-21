import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { CONTACT_EMAILS, SUPPORT_HOURS } from '../data/site.js'
import { loadPendingTicket, mailtoFallback, sendSupportRequest, watchTicket } from '../lib/support.js'

/**
 * The workflow's reply: an instant AI answer, or a ticket that a person answers by email.
 * For tickets, keeps checking until the team's reply arrives and then shows it here.
 */
export function SupportReply({ status, message, ticketId, onReset, compact = false }) {
  const human = status === 'transferred'
  const [answer, setAnswer] = useState(null)

  useEffect(() => {
    if (!human || !ticketId) return
    return watchTicket(ticketId, setAnswer)
  }, [human, ticketId])

  return (
    <div className={`sreply ${human ? 'sreply--human' : ''} ${compact ? 'sreply--compact' : ''}`} role="status" aria-live="polite">
      <div className="sreply__head">
        <span className="sreply__icon"><Icon name={answer ? 'chat' : human ? 'users' : 'sparkles'} size={18} /></span>
        <div>
          <b>{answer ? 'Our team replied' : human ? 'A support agent is on it' : 'Here’s what we found'}</b>
          <small className="mono-label">{human ? `TICKET ${ticketId || ''}` : 'AceSoftwares support assistant'}</small>
        </div>
      </div>
      <p className="sreply__msg">{message}</p>
      {human && !answer && ticketId && (
        <p className="sreply__wait"><span className="spinner" /> Waiting for our team’s reply. You can keep browsing; it will appear here.</p>
      )}
      {answer && <p className="sreply__msg sreply__msg--answer">{answer}</p>}
      <p className="sreply__foot">
        {human
          ? <>We’ll also reply by email. Need us sooner? Write to {CONTACT_EMAILS.map((e, i) => <span key={e}>{i > 0 && ' or '}<a className="ulink" href={`mailto:${e}`}>{e}</a></span>)}.</>
          : <>Not what you needed? Ask again, or email {CONTACT_EMAILS[0]} and a person will help.</>}
      </p>
      {onReset && <button type="button" className="btn btn--grey btn--sm" onClick={onReset}>ASK SOMETHING ELSE</button>}
    </div>
  )
}

export function EmailCopyToggle({ checked, onChange }) {
  return (
    <label className="ecopy">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>Email me a copy of the answer</span>
    </label>
  )
}

/** Floating 24/7 button that opens a quick support form on every page. */
export function SupportWidget() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [emailCopy, setEmailCopy] = useState(true)
  const [trap, setTrap] = useState('')
  const [st, setSt] = useState({ phase: 'idle' })
  const panel = useRef(null)
  const up = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  // Picks up an unanswered ticket from an earlier page, so the team's reply still shows up.
  useEffect(() => {
    const t = loadPendingTicket()
    if (t) setSt({ phase: 'done', status: 'transferred', ticketId: t.ticketId, message: t.message })
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    panel.current?.querySelector('input:not(.hp), textarea')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const submit = async (e) => {
    e.preventDefault()
    if (trap) return setSt({ phase: 'done', status: 'success', message: 'Thanks, we’ve received your message.' })
    setSt({ phase: 'sending' })
    const res = await sendSupportRequest({ ...form, emailCopy, interest: 'Support question', source: 'support-widget' })
    setSt(res.ok ? { phase: 'done', ...res } : { phase: 'error', ...res })
  }

  const waiting = st.phase === 'done' && st.status === 'transferred'

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
              <SupportReply compact status={st.status} ticketId={st.ticketId} message={st.message} onReset={() => { setSt({ phase: 'idle' }); setForm({ ...form, message: '' }) }} />
            ) : (
              <form onSubmit={submit} className="swidget__form">
                <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={trap} onChange={(e) => setTrap(e.target.value)} />
                <p className="swidget__hello">Hi! Ask us anything about automation, our products, pricing or an existing workflow.</p>
                <input required placeholder="Your name" autoComplete="name" value={form.name} onChange={up('name')} />
                <input required type="email" placeholder="Email address" autoComplete="email" value={form.email} onChange={up('email')} />
                <textarea required rows={3} placeholder="How can we help?" value={form.message} onChange={up('message')} />
                <EmailCopyToggle checked={emailCopy} onChange={setEmailCopy} />
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
        {!open && waiting && <span className="supchip__badge" aria-hidden="true" />}
        <Icon name={open ? 'x' : 'chat'} size={15} />
        <span className="supchip__text">{open ? 'Close' : '24/7 support'}</span>
      </button>
    </>
  )
}
