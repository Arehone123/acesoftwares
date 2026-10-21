import { CONTACT_EMAILS, SUPPORT_WEBHOOK } from '../data/site.js'

/**
 * Sends a contact / support request to the AceSoftwares n8n workflow.
 * Sent as form data (a "simple" request, so no CORS preflight). The workflow replies with
 * { status: 'success' | 'transferred', message } — an AI answer, or confirmation a person will follow up.
 *
 * Resolves to { ok, status, message }. Never throws: on failure, ok=false and the caller can offer email.
 */
export async function sendSupportRequest({ name, email, company = '', interest = '', message = '', source = 'website' }) {
  const body = new URLSearchParams({
    name,
    email,
    work_email: email,
    company,
    interest,
    message,
    process_takes_most_time: message,
    source,
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    submitted_at: new Date().toISOString(),
  })

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 60000) // AI answers can take a while

  try {
    const res = await fetch(SUPPORT_WEBHOOK, { method: 'POST', body, signal: controller.signal })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      console.warn('Support workflow error', res.status, data)
      return { ok: false, status: 'error', message: 'Sorry, our support assistant is unavailable right now.' }
    }
    return { ok: true, status: data.status || 'success', message: data.message || 'Thanks, we’ve received your message.' }
  } catch (err) {
    return { ok: false, status: 'error', message: err.name === 'AbortError' ? 'This is taking longer than usual.' : 'We couldn’t reach our support system.' }
  } finally {
    clearTimeout(timer)
  }
}

/** mailto: fallback with the same details, for when the webhook can't be reached. */
export function mailtoFallback({ name, email, company = '', interest = '', message = '' }) {
  const subject = `Website enquiry — ${company || name}`
  const text = [`Name: ${name}`, `Company: ${company}`, `Email: ${email}`, `Interested in: ${interest}`, '', message].join('\n')
  return `mailto:${CONTACT_EMAILS.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
}
