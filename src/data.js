// ---------------------------------------------------------------
// Business settings — change these and the whole site updates.
// ---------------------------------------------------------------
export const RETAINER_RATE = 450 // Rands per retainer hour (apps)
export const FEE_SHARE = 0.3 // Share of saved-hour value we charge on workflows
export const CONTACT_EMAIL = 'hello@acesoftwares.co.za' // TODO: confirm real inbox

export const formatR = (n) =>
  'R' + Math.round(n).toLocaleString('en-ZA').replace(/ /g, ',')

// ---------------------------------------------------------------
// Products (Ace OS suite). `preview` drives the example web app.
// ---------------------------------------------------------------
export const apps = [
  {
    id: 'mining',
    name: 'Mining Pulse',
    icon: '⛏',
    color: '#f5a524',
    tagline: 'Live mine operations intelligence',
    desc: 'Production, fleet health, safety incidents and compliance from every shift, collected in one live dashboard. Workflows pull data from sensors, spreadsheets and shift reports automatically.',
    features: ['Shift & production tracking', 'Equipment downtime alerts', 'Safety incident logging', 'DMRE compliance reports'],
    hoursSaved: 32,
    preview: {
      url: 'miningpulse.acesoftwares.co.za',
      nav: ['Overview', 'Production', 'Fleet', 'Safety', 'Reports'],
      kpis: [
        ['Tonnes today', '12,480', '+6.2%'],
        ['Fleet uptime', '94.2%', '+1.8%'],
        ['Open incidents', '3', '−2'],
        ['Shift compliance', '98%', '+0.5%'],
      ],
      chartLabel: 'Tonnes by shift (7 days)',
      chart: [62, 70, 58, 81, 76, 88, 92],
      tableTitle: 'Live alerts',
      rows: [
        ['HT-21 haul truck', 'Service due in 12h', 'warn'],
        ['Pit 3 conveyor', 'Running normally', 'ok'],
        ['Shaft B ventilation', 'Sensor offline', 'bad'],
      ],
    },
  },
  {
    id: 'community',
    name: 'Community Pulse',
    icon: '◎',
    color: '#22c3a6',
    tagline: 'Stakeholder & community engagement',
    desc: 'Log community grievances, stakeholder meetings and social commitments, and track sentiment over time. WhatsApp intake and AI triage help the right team respond quickly.',
    features: ['WhatsApp grievance intake', 'AI sentiment & triage', 'SLP commitment tracking', 'Stakeholder meeting minutes'],
    hoursSaved: 24,
    preview: {
      url: 'communitypulse.acesoftwares.co.za',
      nav: ['Overview', 'Grievances', 'Stakeholders', 'Projects', 'Reports'],
      kpis: [
        ['Open grievances', '18', '−4'],
        ['Avg. response', '1.6 days', '−0.8d'],
        ['Sentiment', '72 / 100', '+5'],
        ['SLP projects', '9 active', ''],
      ],
      chartLabel: 'Sentiment trend (weeks)',
      chart: [55, 58, 61, 60, 66, 69, 72],
      tableTitle: 'Latest grievances',
      rows: [
        ['Road dust — Ward 4', 'Assigned to Env.', 'warn'],
        ['Bursary query', 'Resolved', 'ok'],
        ['Water supply — Ext. 7', 'Escalated', 'bad'],
      ],
    },
  },
  {
    id: 'property',
    name: 'Property OS',
    icon: '⌂',
    color: '#3b82f6',
    tagline: 'Property & tenant management',
    desc: 'Leases, tenants, rent collection and maintenance in one system. Rent reminders, arrears follow-ups and maintenance dispatch run automatically.',
    features: ['Lease & tenant records', 'Automated rent reminders', 'Maintenance ticketing', 'Owner statements'],
    hoursSaved: 28,
    preview: {
      url: 'propertyos.acesoftwares.co.za',
      nav: ['Portfolio', 'Tenants', 'Leases', 'Maintenance', 'Finance'],
      kpis: [
        ['Occupancy', '96.4%', '+1.2%'],
        ['Rent collected', 'R1.84m', '+8%'],
        ['Arrears', 'R62k', '−21%'],
        ['Open tickets', '11', '−3'],
      ],
      chartLabel: 'Collections (6 months)',
      chart: [70, 74, 72, 80, 85, 91],
      tableTitle: 'Maintenance queue',
      rows: [
        ['Unit 12B — geyser', 'Plumber dispatched', 'warn'],
        ['Block C — lift', 'Completed', 'ok'],
        ['Unit 4A — leak', 'Urgent', 'bad'],
      ],
    },
  },
  {
    id: 'admin',
    name: 'Admin OS',
    icon: '▤',
    color: '#a78bfa',
    tagline: 'Back-office admin, automated',
    desc: 'Approvals, documents, tasks and scheduling for the back office. Admin OS sends requests to the right approver, files documents and chases outstanding items for you.',
    features: ['Approval workflows', 'Smart document filing', 'Task & deadline chasing', 'Meeting scheduling'],
    hoursSaved: 20,
    preview: {
      url: 'adminos.acesoftwares.co.za',
      nav: ['Inbox', 'Approvals', 'Documents', 'Tasks', 'Calendar'],
      kpis: [
        ['Pending approvals', '7', '−5'],
        ['Docs filed (auto)', '342', '+18%'],
        ['Overdue tasks', '2', '−6'],
        ['Avg. approval', '4.2h', '−61%'],
      ],
      chartLabel: 'Requests handled (days)',
      chart: [40, 52, 48, 60, 57, 66, 71],
      tableTitle: 'Approvals',
      rows: [
        ['Travel — J. Dlamini', 'Awaiting manager', 'warn'],
        ['Stationery PO #882', 'Approved', 'ok'],
        ['Contract renewal', 'Overdue', 'bad'],
      ],
    },
  },
  {
    id: 'hr',
    name: 'HR OS',
    icon: '☺',
    color: '#ec4899',
    tagline: 'People operations end-to-end',
    desc: 'Onboarding, leave, payroll inputs and performance reviews in one place. New hires get their contracts, accounts and induction schedule set up automatically.',
    features: ['Automated onboarding', 'Leave requests & balances', 'Payroll input exports', 'Performance check-ins'],
    hoursSaved: 26,
    preview: {
      url: 'hros.acesoftwares.co.za',
      nav: ['People', 'Onboarding', 'Leave', 'Payroll', 'Reviews'],
      kpis: [
        ['Headcount', '214', '+6'],
        ['Onboarding', '5 in progress', ''],
        ['Leave pending', '9', '−3'],
        ['Reviews done', '81%', '+12%'],
      ],
      chartLabel: 'Leave days taken (months)',
      chart: [48, 52, 60, 45, 70, 64],
      tableTitle: 'Onboarding',
      rows: [
        ['T. Nkosi — Engineer', 'Laptop ordered', 'warn'],
        ['L. Botha — Finance', 'Complete', 'ok'],
        ['S. Mokoena — Ops', 'Contract unsigned', 'bad'],
      ],
    },
  },
  {
    id: 'bid',
    name: 'Bid OS',
    icon: '✎',
    color: '#ff6b3d',
    tagline: 'Tenders & bids, won faster',
    desc: 'Bid OS pulls new tenders from public portals, uses AI to score how well each one fits, checks compliance documents such as tax clearance and B-BBEE certificates, and tracks every deadline.',
    features: ['Daily tender scraping', 'AI fit score & summary', 'Compliance doc vault', 'Deadline countdowns'],
    hoursSaved: 30,
    preview: {
      url: 'bidos.acesoftwares.co.za',
      nav: ['Pipeline', 'Tenders', 'Compliance', 'Library', 'Analytics'],
      kpis: [
        ['New tenders', '46', 'this week'],
        ['High fit', '8', '+3'],
        ['Bids in progress', '5', ''],
        ['Win rate', '34%', '+9%'],
      ],
      chartLabel: 'Tenders found (weeks)',
      chart: [30, 42, 38, 51, 47, 58, 46],
      tableTitle: 'Upcoming deadlines',
      rows: [
        ['Municipal IT support', 'Closes in 3 days', 'warn'],
        ['Fleet tracking RFQ', 'Submitted', 'ok'],
        ['B-BBEE cert', 'Expires in 9 days', 'bad'],
      ],
    },
  },
  {
    id: 'hirable',
    name: 'Hirable-ai',
    icon: '✦',
    color: '#06b6d4',
    tagline: 'AI-powered recruitment',
    desc: 'Hirable-ai screens CVs, ranks candidates against the job spec, books interviews and keeps applicants updated, so recruiters can spend their time talking to the best people.',
    features: ['AI CV screening & ranking', 'Interview auto-scheduling', 'Candidate WhatsApp updates', 'Job-spec generator'],
    hoursSaved: 35,
    preview: {
      url: 'hirable-ai.acesoftwares.co.za',
      nav: ['Jobs', 'Candidates', 'Interviews', 'Offers', 'Insights'],
      kpis: [
        ['Open roles', '12', '+2'],
        ['CVs screened', '1,284', 'by AI'],
        ['Shortlisted', '64', ''],
        ['Time to hire', '18 days', '−11d'],
      ],
      chartLabel: 'Applicants per role',
      chart: [88, 64, 72, 40, 95, 58],
      tableTitle: 'Top candidates',
      rows: [
        ['N. Khumalo — 94% match', 'Interview Tue', 'ok'],
        ['R. Pillay — 89% match', 'Awaiting reply', 'warn'],
        ['K. Smith — 61% match', 'Not a fit', 'bad'],
      ],
    },
  },
  {
    id: 'finance',
    name: 'Finance OS',
    icon: '◈',
    color: '#10b981',
    tagline: 'Finance ops without the spreadsheets',
    desc: 'Invoice capture, reconciliation, debtor follow-ups and cash-flow reporting. Finance OS reads supplier invoices, matches them to POs and syncs with Sage or Xero.',
    features: ['Invoice OCR & capture', 'Bank reconciliation', 'Debtor reminders', 'Cash-flow dashboards'],
    hoursSaved: 38,
    preview: {
      url: 'financeos.acesoftwares.co.za',
      nav: ['Dashboard', 'Payables', 'Receivables', 'Bank', 'Reports'],
      kpis: [
        ['Cash on hand', 'R4.2m', '+3.1%'],
        ['Invoices captured', '612', 'auto'],
        ['Unreconciled', '14', '−88%'],
        ['Debtor days', '38', '−9'],
      ],
      chartLabel: 'Net cash flow (months)',
      chart: [50, 46, 62, 58, 71, 77],
      tableTitle: 'Payables',
      rows: [
        ['Supplier INV-2231', 'Matched to PO', 'ok'],
        ['Supplier INV-2240', 'Needs approval', 'warn'],
        ['Supplier INV-2198', 'Duplicate flagged', 'bad'],
      ],
    },
  },
]

// ---------------------------------------------------------------
// Example n8n workflows (hours = manual hours saved per week)
// ---------------------------------------------------------------
export const workflows = [
  { cat: 'Sales', title: 'Lead capture → CRM → WhatsApp', steps: ['Web form', 'Enrich lead', 'CRM', 'WhatsApp'], hours: 8, desc: 'Every new lead is enriched, scored, added to the CRM and sent to a sales rep on WhatsApp within seconds.' },
  { cat: 'Finance', title: 'Invoice inbox → Sage / Xero', steps: ['Email', 'AI OCR', 'Match PO', 'Sage'], hours: 12, desc: 'Supplier invoices are read from the inbox, matched to purchase orders and posted to your accounting system.' },
  { cat: 'Tenders', title: 'Tender radar', steps: ['Schedule', 'Scrape portals', 'AI score', 'Bid OS'], hours: 10, desc: 'Public tender portals are checked every morning, and the opportunities that fit your business are ranked for you.' },
  { cat: 'HR', title: 'New-hire onboarding', steps: ['HR OS', 'Contract', 'M365 account', 'Slack'], hours: 6, desc: 'When a hire is signed off, the contract, email account, induction calendar and welcome pack are created automatically.' },
  { cat: 'HR', title: 'CV screening pipeline', steps: ['Job inbox', 'Parse CV', 'AI rank', 'Hirable-ai'], hours: 15, desc: 'Applications are parsed and ranked against the job spec, and the shortlist goes straight to the recruiter.' },
  { cat: 'Operations', title: 'Daily ops report', steps: ['Schedule', 'Sensors / DB', 'Summarise', 'Email PDF'], hours: 7, desc: 'Data from sensors, spreadsheets and systems is collected into a daily management report and sent before 7am.' },
  { cat: 'Finance', title: 'Debtor follow-ups', steps: ['Schedule', 'Aged debtors', 'Personalise', 'Email + SMS'], hours: 5, desc: 'Friendly reminders that get firmer over time go out to overdue accounts, and payments are logged when they arrive.' },
  { cat: 'Operations', title: 'Infrastructure health alerts', steps: ['Webhook', 'Classify', 'Ticket', 'On-call'], hours: 9, desc: 'Server and data-centre alerts are deduplicated, classified and routed to the right on-call engineer.' },
  { cat: 'Sales', title: 'Customer support triage', steps: ['WhatsApp', 'AI intent', 'Auto-reply', 'Helpdesk'], hours: 11, desc: 'Common questions get an instant answer, and complex ones are logged and assigned to an agent.' },
]

// ---------------------------------------------------------------
// Retainer tiers (hours × RETAINER_RATE)
// ---------------------------------------------------------------
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

// ---------------------------------------------------------------
// Partners
// ---------------------------------------------------------------
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
