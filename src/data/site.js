// ---------------------------------------------------------------
// Business settings — change these and the whole site updates.
// ---------------------------------------------------------------
export const RETAINER_RATE = 450 // Rands per retainer hour (apps)
export const FEE_SHARE = 0.3 // Share of saved-hour value we charge on workflows
export const CONTACT_EMAIL = 'hello@acesoftwares.co.za' // TODO: confirm real inbox

export const formatR = (n) =>
  'R' + Math.round(n).toLocaleString('en-ZA').replace(/[  ]/g, ',')

export const tiers = [
  {
    name: 'Starter',
    hours: 10,
    desc: 'One product, kept healthy and improving.',
    features: ['1 Ace OS product, hosted & maintained', 'Uptime & workflow-failure monitoring', 'Bug fixes & minor tweaks', 'Next-business-day response', 'Monthly usage report'],
  },
  {
    name: 'Growth',
    hours: 25,
    featured: true,
    desc: 'Several products, customised to how you work.',
    features: ['Up to 3 Ace OS products', 'Custom fields, reports & dashboards', 'New mini-workflows each month', 'Fixes within 12 business hours', 'Monthly strategy call'],
  },
  {
    name: 'Scale',
    hours: 50,
    desc: 'A full digital back office for your business.',
    features: ['All 8 Ace OS products available', 'Dedicated automation engineer', 'Fixes within 4 business hours', 'Custom integrations & AI agents', 'Quarterly ROI review'],
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
  ['How do you measure "hours saved"?', 'During the audit we time the manual process and agree a baseline with you. After launch, n8n logs every execution. Hours saved = executions × agreed minutes saved per execution, and it’s shown in your monthly report.'],
  ['What does the R450/hour retainer cover?', 'Hosting management, monitoring, bug fixes, API changes, new features and small workflows for your Ace OS products. You choose how many hours per month you need. Unused hours roll over for one month.'],
  ['Why n8n?', 'n8n is open and extensible. It can be self-hosted, which keeps sensitive data in South Africa, and it connects to hundreds of services. It also lets us mix visual workflows with custom code and AI agents when a process needs it.'],
  ['Who pays for software subscriptions and AI tokens?', 'You do, directly. Subscriptions and API keys are set up in your company’s name, so you own your accounts and see the real costs. We never mark up usage.'],
  ['Where is everything hosted?', 'On n8n Cloud or on your own infrastructure. Through our partner Sovrinn we can also provide managed data centre hosting and monitoring.'],
  ['What if a workflow breaks?', 'Every workflow has error handling, retries and failure alerts. When something does break, such as a third-party API changing, we fix it within the response time of your plan.'],
]
