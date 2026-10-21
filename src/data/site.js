// ---------------------------------------------------------------
// Business settings — change these and the whole site updates.
// ---------------------------------------------------------------
export const RETAINER_RATE = 450 // Rands per retainer hour (apps)
export const FEE_SHARE = 0.3 // Share of saved-hour value we charge on workflows
export const CONTACT_EMAILS = ['info@acetheacademia.com', 'n8ncapetown@gmail.com']
export const CONTACT_EMAIL = CONTACT_EMAILS[0]
export const SUPPORT_HOURS = '24/7'
// Set these to a number (Rands) to show a price; null shows "Fee on request".
export const TRAINING_FEE = null
export const PILOT_FEE = null
export const feeLabel = (fee) => (fee ? formatR(fee) : 'Fee on request')

export const offers = [
  {
    id: 'workshops',
    tag: 'FREE · SPONSORED BY n8n',
    icon: 'users',
    title: 'Free n8n workshops & community events',
    text: 'Hands-on sessions where you build your first automations with n8n. Free to attend: the venue, catering and materials are paid for by n8n.',
    points: ['Beginner to advanced tracks', 'Build a real workflow on the day', 'Meet the Cape Town automation community', 'No cost to attendees'],
    price: 'Free',
    cta: 'REGISTER INTEREST',
  },
  {
    id: 'training',
    tag: 'EXCLUSIVE',
    icon: 'briefcase',
    title: 'Corporate n8n training',
    text: 'Private training for your team, on your processes and your data. Your staff leave able to build, run and maintain their own workflows.',
    points: ['Tailored to your team & tools', 'On-site or online', 'Hands-on labs with your use cases', 'Certificates of completion'],
    fee: 'TRAINING_FEE',
    cta: 'BOOK TRAINING',
  },
  {
    id: 'pilot',
    tag: 'PROVE IT FIRST',
    icon: 'zap',
    title: 'Pilot implementation',
    text: 'One high-value process automated end to end in your environment, so you can measure the hours saved before committing to a wider rollout.',
    points: ['One process, fully automated', 'Measured hours-saved baseline', 'Runs in your environment', 'Clear go / no-go report'],
    fee: 'PILOT_FEE',
    cta: 'START A PILOT',
  },
]

export const formatR = (n) =>
  'R' + Math.round(n).toLocaleString('en-ZA').replace(/[  ]/g, ',')

export const tiers = [
  {
    name: 'Starter',
    hours: 10,
    desc: 'One product, kept healthy and improving.',
    features: ['1 Ace OS product, hosted & maintained', 'Bug fixes & minor tweaks', '24/7 support line & monitoring', 'Fixes next business day', 'Monthly usage report'],
  },
  {
    name: 'Growth',
    hours: 25,
    featured: true,
    desc: 'Several products, customised to how you work.',
    features: ['Up to 3 Ace OS products', 'Custom fields, reports & dashboards', 'New mini-workflows each month', '24/7 support, fixes within 12 hours', 'Monthly strategy call'],
  },
  {
    name: 'Scale',
    hours: 50,
    desc: 'A full digital back office for your business.',
    features: ['All 8 Ace OS products available', 'Dedicated automation engineer', '24/7 priority support, fixes within 4 hours', 'Custom integrations & AI agents', 'Quarterly ROI review'],
  },
]

export const partners = [
  {
    name: 'n8n',
    role: 'Workflow automation platform',
    desc: 'The workflow engine behind our automations. It can be self-hosted, so your data stays where you need it.',
    url: 'https://n8n.io',
  },
  {
    name: 'Sovrinn',
    role: 'Data centre management',
    desc: 'Our data centre management partner. Together we automate monitoring, alerting and operations for the infrastructure your systems run on.',
    url: 'https://www.sovrinn.com',
  },
]

export const faqs = [
  ['Do you offer 24/7 support?', 'Yes. Every client gets 24/7 support: workflows are monitored around the clock, and you can reach us any time by email at info@acetheacademia.com or n8ncapetown@gmail.com. Fix times depend on your plan.'],
  ['Are the n8n workshops really free?', 'Yes. Our community workshops and events are sponsored by n8n, so there is no cost to attend. Corporate training and pilot implementations are separate paid services.'],
  ['How do you measure "hours saved"?', 'During the audit we time the manual process and agree a baseline with you. After launch, n8n logs every execution. Hours saved = executions × agreed minutes saved per execution, and it’s shown in your monthly report.'],
  ['What does the R450/hour retainer cover?', 'Hosting management, monitoring, bug fixes, API changes, new features and small workflows for your Ace OS products. You choose how many hours per month you need. Unused hours roll over for one month.'],
  ['Why n8n?', 'n8n is open and extensible. It can be self-hosted, which keeps sensitive data in South Africa, and it connects to hundreds of services. It also lets us mix visual workflows with custom code and AI agents when a process needs it.'],
  ['Who pays for software subscriptions and AI tokens?', 'Your choice. Bring your own AI keys and subscriptions in your company’s name and pay providers directly at cost, or use our managed AI plans: a fixed monthly price that includes the AI usage, with no surprise token bills.'],
  ['How much can an AI agent read on each plan?', 'As a guide: Starter covers about 10,000 pages (roughly 5 million words) a month, Pro about 100,000 pages (roughly 50 million words), and Enterprise is sized to your volumes. We assume one page is about 500 words.'],
  ['Where is everything hosted?', 'On n8n Cloud or on your own infrastructure. Through our partner Sovrinn we can also provide managed data centre hosting and monitoring.'],
  ['What if a workflow breaks?', 'Every workflow has error handling, retries and failure alerts. When something does break, such as a third-party API changing, we fix it within the response time of your plan.'],
]

// ---------------------------------------------------------------
// AI agents on our managed LLMs — fixed monthly plans.
// Capacity guide assumptions (shown on the site):
// ---------------------------------------------------------------
export const WORDS_PER_PAGE = 500
export const MANUAL_MINUTES_PER_PAGE = 3 // time a person spends reading, deciding and capturing one page

export const aiTiers = [
  {
    name: 'Starter',
    price: 'R500 – R1,000',
    per: '/month',
    executions: 10000,
    pagesPerExecution: 1,
    kind: 'lightweight / standard executions',
    desc: 'For one or two agents doing everyday work: answering questions, sorting emails, drafting replies.',
    examples: ['Email & WhatsApp triage', 'FAQ / support answers', 'Short summaries & replies', 'Data extraction from forms'],
  },
  {
    name: 'Pro',
    price: 'R2,500 – R5,000',
    per: '/month',
    executions: 50000,
    pagesPerExecution: 2,
    featured: true,
    kind: 'multi-step LLM executions + document parsing',
    desc: 'For teams running several agents that reason over documents and take actions across systems.',
    examples: ['Invoice & contract parsing', 'CV screening & ranking', 'Multi-step research agents', 'Tender document summaries'],
  },
  {
    name: 'Enterprise',
    price: 'From R10,000',
    per: '/month',
    executions: null,
    pagesPerExecution: null,
    kind: 'heavy document processing & multi-agent systems',
    desc: 'For high-volume, unstructured documents and complex multi-agent processes. Sized to your volumes.',
    examples: ['Bulk unstructured extraction', 'Multi-agent orchestration', 'Large knowledge bases (RAG)', 'Premium reasoning models'],
  },
]

export const tierCapacity = (t) => {
  if (!t.executions) return null
  const pages = t.executions * t.pagesPerExecution
  return {
    pages,
    words: pages * WORDS_PER_PAGE,
    manualHours: Math.round((pages * MANUAL_MINUTES_PER_PAGE) / 60),
  }
}
