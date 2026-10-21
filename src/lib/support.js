import { CONTACT_EMAILS, SUPPORT_STATUS_WEBHOOK, SUPPORT_WEBHOOK } from '../data/site.js'

/**
 * Sends a contact / support request to the AceSoftwares n8n workflow.
 * Sent as form data (a "simple" request, so no CORS preflight). The workflow replies with
 * { status: 'success' | 'transferred', ticket_id, message }: an AI answer, or a ticket a person will answer.
 *
 * Resolves to { ok, status, ticketId, message }. Never throws: on failure ok=false and the caller can offer email.
 */
export async function sendSupportRequest({ name, email, company = '', interest = '', message = '', emailCopy = true, source = 'website' }) {
  const body = new URLSearchParams({
    name,
    email,
    work_email: email,
    company,
    interest,
    message,
    process_takes_most_time: message,
    email_copy: emailCopy ? 'true' : 'false',
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
    const result = {
      ok: true,
      status: data.status || 'success',
      ticketId: data.ticket_id || null,
      message: data.message || 'Thanks, we’ve received your message.',
    }
    if (result.status === 'transferred' && result.ticketId) savePendingTicket(result)
    return result
  } catch (err) {
    return { ok: false, status: 'error', message: err.name === 'AbortError' ? 'This is taking longer than usual.' : 'We couldn’t reach our support system.' }
  } finally {
    clearTimeout(timer)
  }
}

/** One check of a ticket: { status: 'pending' | 'answered' | 'not_found' | 'error', answer } */
export async function checkTicket(ticketId) {
  try {
    const res = await fetch(`${SUPPORT_STATUS_WEBHOOK}?id=${encodeURIComponent(ticketId)}`)
    if (!res.ok) return { status: 'error' }
    return await res.json()
  } catch {
    return { status: 'error' }
  }
}

/**
 * Polls a ticket until a person answers it (or we give up). Calls onAnswer(answer) once.
 * Checks every 20s for the first 10 minutes, then every 60s, for up to 2 hours. Returns a stop() function.
 */
export function watchTicket(ticketId, onAnswer) {
  const started = Date.now()
  let stopped = false
  let timer
  const tick = async () => {
    if (stopped) return
    const t = await checkTicket(ticketId)
    if (stopped) return
    if (t.status === 'answered' && t.answer) {
      clearPendingTicket(ticketId)
      onAnswer(t.answer)
      return
    }
    const age = Date.now() - started
    if (t.status === 'not_found' || age > 2 * 3600e3) return
    timer = setTimeout(tick, age < 10 * 60e3 ? 20000 : 60000)
  }
  timer = setTimeout(tick, 15000)
  return () => { stopped = true; clearTimeout(timer) }
}

// Remember an open ticket so the widget can still show the reply after a page change or reload.
const KEY = 'ace-support-ticket'
function savePendingTicket({ ticketId, message }) {
  try { localStorage.setItem(KEY, JSON.stringify({ ticketId, message, at: Date.now() })) } catch { /* storage unavailable */ }
}
export function loadPendingTicket() {
  try {
    const t = JSON.parse(localStorage.getItem(KEY) || 'null')
    return t && Date.now() - t.at < 24 * 3600e3 ? t : null
  } catch { return null }
}
export function clearPendingTicket(ticketId) {
  try {
    const t = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (!ticketId || t?.ticketId === ticketId) localStorage.removeItem(KEY)
  } catch { /* storage unavailable */ }
}

/** mailto: fallback with the same details, for when the webhook can't be reached. */
export function mailtoFallback({ name, email, company = '', interest = '', message = '' }) {
  const subject = `Website enquiry — ${company || name}`
  const text = [`Name: ${name}`, `Company: ${company}`, `Email: ${email}`, `Interested in: ${interest}`, '', message].join('\n')
  return `mailto:${CONTACT_EMAILS.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
}
