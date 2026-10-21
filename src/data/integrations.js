// Tools we connect to through n8n. Shown as monogram tiles (no third-party logos).
export const integrationCats = ['Communication', 'Finance', 'Productivity', 'CRM & Sales', 'AI', 'Data', 'IT & DevOps', 'Core']

export const integrations = [
  ['WhatsApp', 'Communication', '#25d366', 'Send and receive WhatsApp Business messages.'],
  ['Slack', 'Communication', '#611f69', 'Post alerts and collect approvals in channels.'],
  ['Microsoft Teams', 'Communication', '#5b5fc7', 'Chat, approvals and meeting transcripts.'],
  ['Gmail', 'Communication', '#ea4335', 'Read, label and send email.'],
  ['Outlook', 'Communication', '#0a64ad', 'Shared mailboxes, calendars and email.'],
  ['Telegram', 'Communication', '#229ed9', 'Bots and channel notifications.'],
  ['Twilio SMS', 'Communication', '#f22f46', 'SMS and voice notifications.'],
  ['Sage', 'Finance', '#00d639', 'Post invoices, payments and journals.'],
  ['Xero', 'Finance', '#13b5ea', 'Invoices, bank feeds and contacts.'],
  ['QuickBooks', 'Finance', '#2ca01c', 'Accounting records and reports.'],
  ['Paystack', 'Finance', '#0ba4db', 'Payments and payment links.'],
  ['Stripe', 'Finance', '#635bff', 'Payments, subscriptions and payouts.'],
  ['Google Sheets', 'Productivity', '#0f9d58', 'Read and write rows as lightweight databases.'],
  ['Google Drive', 'Productivity', '#1fa463', 'Store, move and share files.'],
  ['Google Calendar', 'Productivity', '#4285f4', 'Create events and find free time.'],
  ['Microsoft Excel 365', 'Productivity', '#107c41', 'Work with workbooks in OneDrive and SharePoint.'],
  ['SharePoint', 'Productivity', '#036c70', 'Document libraries and lists.'],
  ['Microsoft 365', 'Productivity', '#d83b01', 'Users, groups and licences.'],
  ['Notion', 'Productivity', '#111111', 'Pages, databases and wikis.'],
  ['Airtable', 'Productivity', '#fcb400', 'Bases, tables and records.'],
  ['HubSpot', 'CRM & Sales', '#ff7a59', 'Contacts, deals and marketing lists.'],
  ['Salesforce', 'CRM & Sales', '#00a1e0', 'Leads, opportunities and accounts.'],
  ['Pipedrive', 'CRM & Sales', '#1a1a1a', 'Pipelines and deals.'],
  ['Zoho CRM', 'CRM & Sales', '#e42527', 'Leads, contacts and modules.'],
  ['Zendesk', 'CRM & Sales', '#03363d', 'Support tickets and help centre.'],
  ['OpenAI', 'AI', '#10a37f', 'GPT models for agents, extraction and writing.'],
  ['Anthropic Claude', 'AI', '#d97757', 'Claude models for agents and long documents.'],
  ['Google Gemini', 'AI', '#4796e3', 'Gemini models for multimodal tasks.'],
  ['Vector store', 'AI', '#7c3aed', 'Embeddings for search over your documents.'],
  ['PostgreSQL', 'Data', '#336791', 'Query and update relational data.'],
  ['MySQL', 'Data', '#00758f', 'Query and update relational data.'],
  ['Supabase', 'Data', '#3ecf8e', 'Postgres, auth and storage.'],
  ['MongoDB', 'Data', '#47a248', 'Documents and collections.'],
  ['Jira', 'IT & DevOps', '#0052cc', 'Issues, projects and service desk.'],
  ['GitHub', 'IT & DevOps', '#24292f', 'Repos, issues and releases.'],
  ['PagerDuty', 'IT & DevOps', '#06ac38', 'On-call paging and incidents.'],
  ['Prometheus', 'IT & DevOps', '#e6522c', 'Metrics and alerting.'],
  ['Grafana', 'IT & DevOps', '#f46800', 'Dashboards and alerts.'],
  ['HTTP Request', 'Core', '#555555', 'Call any REST API.'],
  ['Webhook', 'Core', '#555555', 'Start workflows from any system.'],
  ['Schedule', 'Core', '#555555', 'Run workflows on a timetable.'],
  ['Code', 'Core', '#555555', 'JavaScript or Python when you need it.'],
].map(([name, cat, color, desc]) => ({ name, cat, color, desc }))

export const monogram = (name) =>
  name
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

export const integrationByName = (name) => integrations.find((i) => i.name === name)
