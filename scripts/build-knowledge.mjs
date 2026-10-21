// Generates public/knowledge.txt — a plain-text summary of the site that the n8n support workflow
// fetches (https://acesoftwares.tech/knowledge.txt) and gives to its AI agent as context.
// Runs automatically before `npm run dev` and `npm run build`, so it always matches the site's data.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  RETAINER_RATE, FEE_SHARE, CONTACT_EMAILS, SUPPORT_HOURS, tiers, offers, aiTiers, tierCapacity, faqs, partners,
  WORDS_PER_PAGE, TRAINING_FEE, PILOT_FEE,
} from '../src/data/site.js'
import { apps } from '../src/data/apps.js'
import { workflows } from '../src/data/workflows.js'
import { solutions } from '../src/data/solutions.js'

const R = (n) => 'R' + Math.round(n).toLocaleString('en-US')
const lines = []
const h = (t) => lines.push('', `## ${t}`)
const p = (...t) => lines.push(...t)

p('# AceSoftwares — support knowledge base',
  'AceSoftwares is an automation agency that builds business operating systems, n8n workflows and AI agents.',
  `Support: ${SUPPORT_HOURS} for every client. Email: ${CONTACT_EMAILS.join(' or ')}. Website: https://acesoftwares.tech`)

h('Pricing')
p(`- Products (Ace OS apps): monthly retainer billed at ${R(RETAINER_RATE)} per hour. Unused hours roll over for one month.`)
tiers.forEach((t) => p(`  - ${t.name}: ${R(t.hours * RETAINER_RATE)}/month (${t.hours} hours). ${t.desc} Includes: ${t.features.join('; ')}.`))
p(`- Workflows: priced on hours saved. We charge ${Math.round(FEE_SHARE * 100)}% of the value of the hours a workflow saves; the client keeps ${Math.round((1 - FEE_SHARE) * 100)}%. If it saves nothing, the client pays nothing.`,
  '- Free discovery audit for every new client. 30 days of fixes included after launch.',
  '- Software and AI accounts: clients can use their own accounts and pay providers at cost, or choose a managed AI plan.')

h('AI agents (managed AI plans)')
p('We build AI agents on n8n. Clients can power them with their own AI keys (at cost) or our managed AI models on a fixed monthly plan.')
aiTiers.forEach((t) => {
  const c = tierCapacity(t)
  p(`- ${t.name}: ${t.price}${t.per}. ${t.executions ? `${t.executions.toLocaleString('en-US')} ${t.kind}.` : `Custom: ${t.kind}.`}` +
    (c ? ` About ${c.pages.toLocaleString('en-US')} pages (~${(c.words / 1e6).toLocaleString('en-US')} million words) a month.` : '') +
    ` Good for: ${t.examples.join(', ')}.`)
})
p(`- 1 page is assumed to be about ${WORDS_PER_PAGE} words.`)

h('Training, workshops and pilots')
const fee = (key) => ({ TRAINING_FEE, PILOT_FEE }[key])
offers.forEach((o) => p(`- ${o.title}: ${o.price || (fee(o.fee) ? R(fee(o.fee)) : 'fee on request')}. ${o.text}`))

h('Products')
apps.forEach((a) => p(`- ${a.name} (${a.tagline}): ${a.desc} Features: ${a.features.map((f) => f[1]).join(', ')}.`))

h('Solutions')
solutions.forEach((s) => p(`- ${s.nav}: ${s.sub}`))

h('Example workflows')
workflows.forEach((w) => p(`- ${w.title} [${w.cat}, saves ~${w.hours} hrs/week]: ${w.overview}`))

h('Partners')
partners.forEach((x) => p(`- ${x.name} (${x.role}): ${x.desc}`))

h('Frequently asked questions')
faqs.forEach(([q, a]) => p(`Q: ${q}`, `A: ${a}`))

const out = fileURLToPath(new URL('../public/knowledge.txt', import.meta.url))
writeFileSync(out, lines.join('\n') + '\n')
console.log(`knowledge.txt: ${lines.join('\n').length.toLocaleString('en-US')} characters`)
