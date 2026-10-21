import { useState } from 'react'
import { CONTACT_EMAIL, tiers } from '../data.js'

const interests = [
  'Not sure yet — audit me',
  ...tiers.map((t) => `Apps — ${t.name}`),
  'Workflows — pay per hour saved',
]

export default function Contact({ interest, setInterest, message, setMessage }) {
  const [form, setForm] = useState({ name: '', company: '', email: '' })
  const [sent, setSent] = useState(false)
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  // No backend yet: open the visitor's email client with the details filled in.
  const submit = (e) => {
    e.preventDefault()
    const subject = `Automation audit request — ${form.company || form.name}`
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Interested in: ${interest}`,
      '',
      message,
    ].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="section cta" id="contact">
      <div className="container cta__inner">
        <div className="cta__copy">
          <span className="eyebrow">Free automation audit</span>
          <h2>Tell us what's eating your team's time.</h2>
          <p>
            In 30 minutes we'll find your top three automation opportunities and estimate the hours each one
            would save. No obligation.
          </p>
          <ul className="checks">
            <li>Process mapping</li>
            <li>Hours-saved estimate</li>
            <li>Recommended product or workflow</li>
          </ul>
        </div>
        <form className="cta__form" onSubmit={submit}>
          <div className="grid2">
            <label>
              <span>Name</span>
              <input required autoComplete="name" value={form.name} onChange={update('name')} />
            </label>
            <label>
              <span>Company</span>
              <input autoComplete="organization" value={form.company} onChange={update('company')} />
            </label>
          </div>
          <label>
            <span>Work email</span>
            <input type="email" required autoComplete="email" value={form.email} onChange={update('email')} />
          </label>
          <label>
            <span>Interested in</span>
            <select value={interest} onChange={(e) => setInterest(e.target.value)}>
              {interests.map((i) => <option key={i}>{i}</option>)}
            </select>
          </label>
          <label>
            <span>What process takes the most time?</span>
            <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
          <button className="btn btn--primary btn--block" type="submit">Book my free audit</button>
          <p className="form__note">
            {sent
              ? `Thanks! If your email app didn't open, write to us at ${CONTACT_EMAIL}.`
              : 'This opens your email app with the details filled in.'}
          </p>
        </form>
      </div>
    </section>
  )
}
