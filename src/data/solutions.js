// Solution (use-case) landing pages. Tabs reuse the Flow column format.
export const solutions = [
  {
    id: 'it-ops',
    nav: 'IT & Data Centre Ops',
    title: 'Keep the racks running with processes you can see',
    sub: 'Every monitoring tool, ticket queue and on-call rota in your stack, joined up. Delivered with our data centre management partner, Sovrinn.',
    partner: 'Sovrinn',
    stack: ['Prometheus', 'Grafana', 'PagerDuty', 'Jira', 'Slack', 'Microsoft Teams', 'Webhook', 'PostgreSQL'],
    pillars: [
      ['server', 'Hosted where you need it', 'Self-host n8n in your own data centre or a South African facility managed with Sovrinn.'],
      ['lock', 'Credentials stay locked down', 'Secrets live in an encrypted store with role-based access per team.'],
      ['history', 'Every run on record', 'Execution history and audit logs you can stream to your SIEM.'],
    ],
    tabsTitle: 'Some IT processes are more predictable than others',
    tabsSub: 'Use workflows for the repeatable, AI agents for the ambiguous and people for the sensitive. Run all three in one place.',
    tabs: [
      {
        tab: 'ALERT TRIAGE',
        title: 'Fifty alerts in, one incident out',
        text: 'Alerts are grouped, enriched with the affected rack and service owner, and classified. Critical incidents page on-call; the rest become tickets.',
        flow: [
          [['Alert', 'webhook', 'Webhook']], [['Group', 'filter', '10 min']], [['Classify', 'bot', 'AI agent']],
          [['Critical?', 'if', 'Branch']], [['Page on-call', 'phone', 'PagerDuty'], ['Ticket', 'ticket', 'Jira']],
        ],
      },
      {
        tab: 'CAPACITY',
        title: 'Know when you’ll run out of room',
        text: 'Power, cooling and rack space are tracked every week with a forecast, so expansion is planned rather than urgent.',
        flow: [
          [['Weekly', 'clock', 'Schedule']], [['Power & temp', 'temp', 'Metrics'], ['Inventory', 'server', 'DCIM']],
          [['Forecast', 'chart', 'Code']], [['Report', 'mail', 'Outlook']],
        ],
      },
      {
        tab: 'ACCESS REVIEWS',
        title: 'Reviews that don’t rely on memory',
        text: 'Every account in every system is compared with who should have access. Managers confirm or revoke with one click.',
        flow: [
          [['Monthly', 'clock', 'Schedule']], [['AD users', 'users', 'Directory'], ['App users', 'db', 'Systems']],
          [['Compare', 'code', 'Code']], [['Ask manager', 'chat', 'Teams']], [['Revoke', 'lock', 'Directory']],
        ],
      },
      {
        tab: 'CHANGE NOTICES',
        title: 'Maintenance windows everyone actually reads',
        text: 'Planned work is announced to affected clients automatically, with reminders before the window and confirmation when it’s done.',
        flow: [
          [['Change approved', 'ticket', 'Jira']], [['Find affected', 'db', 'CMDB']], [['Write notice', 'bot', 'AI agent']],
          [['Email clients', 'mail', 'Outlook'], ['Status page', 'globe', 'HTTP']],
        ],
      },
    ],
    metricsTitle: 'Move the numbers you report on',
    metricsText: 'Mean time to resolve drops when fewer alerts reach people and the ones that do arrive with context.',
    metrics: [
      ['Alerts a person never opens', 'Duplicates and known false positives are closed before they reach the queue.'],
      ['MTTR', 'Engineers start with the affected rack, owner and recent changes already attached.'],
      ['Hours per incident', 'Lookups that took twenty minutes happen in seconds.'],
      ['Time to produce evidence', 'Audit evidence is collected on a schedule and timestamped as it’s taken.'],
    ],
    workflowCat: 'IT Ops',
    faqs: [
      ['Can n8n run inside our own data centre?', 'Yes. We deploy self-hosted n8n with Docker on your infrastructure or in a facility managed with Sovrinn, so nothing leaves your network unless you want it to.'],
      ['Who can change the workflows?', 'Separate projects and role-based access mean each team only edits its own workflows. Changes can be reviewed before they go live.'],
      ['Where do credentials live?', 'In n8n’s encrypted credential store, or in an external secrets manager if you use one.'],
      ['How do we keep test and production apart?', 'We set up separate environments with version-controlled workflows, so changes are tested before they reach production.'],
    ],
  },
  {
    id: 'finance-ops',
    nav: 'Finance Operations',
    title: 'Close the month without the spreadsheet marathon',
    sub: 'Invoices, reconciliations, debtors and reporting, automated end to end and connected to Sage or Xero.',
    stack: ['Sage', 'Xero', 'Outlook', 'Google Sheets', 'Microsoft Excel 365', 'OpenAI', 'Paystack', 'Microsoft Teams'],
    pillars: [
      ['shield', 'Approvals built in', 'Nothing posts without the right sign-off, and every approval is recorded.'],
      ['eye', 'Exceptions only', 'Your team sees the handful of items that need judgement, not every line.'],
      ['history', 'Full audit trail', 'Every capture, match and posting is logged for your auditors.'],
    ],
    tabsTitle: 'Finance work that runs itself',
    tabsSub: 'Rules for the predictable, AI for messy documents and people for approvals.',
    tabs: [
      {
        tab: 'PAYABLES',
        title: 'Invoices captured before anyone opens the inbox',
        text: 'Supplier invoices are read, matched to POs and posted. Mismatches go to an approver with the reason.',
        flow: [
          [['Invoice email', 'mail', 'Trigger']], [['Read invoice', 'ocr', 'AI OCR']], [['Match PO', 'db', 'Lookup']],
          [['Matched?', 'if', 'Branch']], [['Post', 'receipt', 'Sage / Xero'], ['Approve', 'chat', 'Teams']],
        ],
      },
      {
        tab: 'RECONCILIATION',
        title: 'Only look at the exceptions',
        text: 'Bank lines are matched with your rules first and AI second. What’s left is a short list.',
        flow: [
          [['Statement', 'bank', 'Daily']], [['Rules', 'code', 'Code'], ['Fuzzy match', 'bot', 'AI']],
          [['Matched?', 'if', 'Branch']], [['Reconcile', 'ok', 'Ledger'], ['Exceptions', 'sheet', 'Sheet']],
        ],
      },
      {
        tab: 'DEBTORS',
        title: 'Reminders that get paid',
        text: 'Polite at 7 days, firm at 30 and escalated at 60, and stopped the moment payment lands.',
        flow: [
          [['Weekdays', 'clock', 'Schedule']], [['Aged debtors', 'db', 'Ledger']], [['Days overdue', 'if', 'Switch']],
          [['Email', 'mail', '7 days'], ['Email + SMS', 'send', '30 days'], ['Escalate', 'bell', '60 days']],
        ],
      },
    ],
    metricsTitle: 'Numbers your CFO will notice',
    metricsText: 'Less time capturing and matching means faster closes and fewer surprises.',
    metrics: [
      ['Days to close', 'Reconciliations happen daily, not at month-end.'],
      ['Debtor days', 'Consistent follow-up shortens the time to get paid.'],
      ['Invoices touched by hand', 'Only exceptions need a person.'],
      ['Duplicate payments', 'Duplicates are caught before they’re posted.'],
    ],
    workflowCat: 'Finance',
    faqs: [
      ['Does this work with Sage and Xero?', 'Yes, both, as well as QuickBooks. Other systems can be connected through their APIs.'],
      ['Who approves what gets posted?', 'You define the rules. Anything outside them waits for a named approver.'],
      ['Is our financial data sent to AI providers?', 'Only the documents that need reading, using your own API account. We can also use models hosted in your region.'],
    ],
  },
  {
    id: 'mining-ops',
    nav: 'Mining & Community',
    title: 'From the pit to the community, nothing slips through',
    sub: 'Mining Pulse and Community Pulse connect production, safety and stakeholder engagement in one live picture.',
    stack: ['PostgreSQL', 'Microsoft Excel 365', 'WhatsApp', 'Twilio SMS', 'OpenAI', 'Outlook', 'SharePoint', 'Schedule'],
    pillars: [
      ['hardhat', 'Safety first', 'Incidents reach the right supervisor in minutes, with photos and location.'],
      ['handshake', 'Community heard', 'Grievances logged in any language and tracked to resolution.'],
      ['filecheck', 'Reports on time', 'Regulatory and board reports compiled from data you already capture.'],
    ],
    tabsTitle: 'Operations that report themselves',
    tabsSub: 'Connect shift data, equipment and community channels so managers act on facts, not phone calls.',
    tabs: [
      {
        tab: 'DAILY REPORT',
        title: 'The morning report writes itself',
        text: 'Yesterday’s production, downtime and incidents summarised before the 07:00 meeting.',
        flow: [
          [['06:00', 'clock', 'Schedule']], [['Sensors', 'db', 'Historian'], ['Shift sheets', 'sheet', 'Excel']],
          [['Summarise', 'bot', 'AI agent']], [['Email PDF', 'mail', 'Outlook']],
        ],
      },
      {
        tab: 'FLEET',
        title: 'Fix it before it stops',
        text: 'Service intervals and telemetry flag equipment at risk and book the work order.',
        flow: [
          [['Telemetry', 'activity', 'Webhook']], [['Check limits', 'gauge', 'Code']], [['At risk?', 'if', 'Branch']],
          [['Work order', 'wrench', 'Mining Pulse'], ['Alert foreman', 'whatsapp', 'WhatsApp']],
        ],
      },
      {
        tab: 'GRIEVANCES',
        title: 'Every voice logged',
        text: 'WhatsApp messages translated, classified and routed to community liaison officers.',
        flow: [
          [['WhatsApp', 'whatsapp', 'Trigger']], [['Classify', 'bot', 'AI agent']], [['Urgent?', 'if', 'Branch']],
          [['Call liaison', 'phone', 'Twilio'], ['Log', 'handshake', 'Community Pulse']],
        ],
      },
    ],
    metricsTitle: 'What changes on site',
    metricsText: 'Fewer phone calls chasing numbers, and more time acting on them.',
    metrics: [
      ['Unplanned downtime', 'Equipment issues are flagged before they stop production.'],
      ['Incident close-out time', 'Actions are tracked and chased automatically.'],
      ['Grievance response time', 'Messages reach the right officer the same day.'],
      ['Report preparation hours', 'Reports compile themselves from captured data.'],
    ],
    workflowCat: 'Operations',
    faqs: [
      ['Can it read data from our existing systems?', 'Usually yes: historians, SQL databases, Excel files and most systems with an API or export.'],
      ['Does it work with poor connectivity on site?', 'Field capture can queue offline and sync when a connection is available.'],
      ['Which languages does grievance intake support?', 'AI translation handles the major South African languages; we test with your community before launch.'],
    ],
  },
]

export const solutionById = (id) => solutions.find((s) => s.id === id)
