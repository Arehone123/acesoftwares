// Official brand logos from Simple Icons (CC0, https://simpleicons.org).
// Logos are trademarks of their owners and are shown only to indicate that we integrate with them.
import {
  siAirtable, siClaude, siGithub, siGmail, siGooglecalendar, siGoogledrive, siGooglegemini, siGooglesheets,
  siGrafana, siHubspot, siJira, siMongodb, siMysql, siN8n, siNotion, siOpenai, siPagerduty, siPostgresql,
  siPrometheus, siQuickbooks, siSage, siSalesforce, siSlack, siStripe, siSupabase, siTelegram, siTwilio,
  siWhatsapp, siXero, siZendesk, siZoho, siVodafone, siMercedes, siYoutube,
} from 'simple-icons'

export const SIMPLE_ICONS = {
  WhatsApp: siWhatsapp,
  Slack: siSlack,
  Gmail: siGmail,
  Telegram: siTelegram,
  'Twilio SMS': siTwilio,
  Sage: siSage,
  Xero: siXero,
  QuickBooks: siQuickbooks,
  Stripe: siStripe,
  'Google Sheets': siGooglesheets,
  'Google Drive': siGoogledrive,
  'Google Calendar': siGooglecalendar,
  Notion: siNotion,
  Airtable: siAirtable,
  HubSpot: siHubspot,
  Salesforce: siSalesforce,
  'Zoho CRM': siZoho,
  Zendesk: siZendesk,
  OpenAI: siOpenai,
  'Anthropic Claude': siClaude,
  'Google Gemini': siGooglegemini,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  Supabase: siSupabase,
  MongoDB: siMongodb,
  Jira: siJira,
  GitHub: siGithub,
  PagerDuty: siPagerduty,
  Prometheus: siPrometheus,
  Grafana: siGrafana,
  n8n: siN8n,
  Vodafone: siVodafone,
  Mercedes: siMercedes,
  YouTube: siYoutube,
}

// Brands NOT available in Simple Icons (Microsoft asked for its logos to be removed; Paystack, Pipedrive
// and Sovrinn were never added). Download the official SVG from each company's brand/press page, save it in
// /public/logos/ and uncomment the line — the site picks it up everywhere automatically.
export const LOGO_FILES = {
  // 'Microsoft Teams': '/logos/microsoft-teams.svg',
  // Outlook: '/logos/outlook.svg',
  // 'Microsoft Excel 365': '/logos/excel.svg',
  // SharePoint: '/logos/sharepoint.svg',
  // 'Microsoft 365': '/logos/microsoft-365.svg',
  // Paystack: '/logos/paystack.svg',
  // Pipedrive: '/logos/pipedrive.svg',
  // Sovrinn: '/logos/sovrinn.svg',
}

// n8n core nodes (not brands) — shown with a matching icon.
export const CORE_ICONS = {
  'HTTP Request': 'globe',
  Webhook: 'webhook',
  Schedule: 'clock',
  Code: 'js',
  'Vector store': 'db',
}

// Words in workflow step labels that mean a step runs in a given tool.
const KEYWORDS = [
  [/\bwhatsapp\b/i, 'WhatsApp'], [/\bslack\b/i, 'Slack'], [/\bgmail\b/i, 'Gmail'], [/\bjira\b/i, 'Jira'],
  [/\bpagerduty\b/i, 'PagerDuty'], [/\bsage\b/i, 'Sage'], [/\bxero\b/i, 'Xero'], [/\btwilio\b/i, 'Twilio SMS'],
  [/\bprometheus\b/i, 'Prometheus'], [/\bgrafana\b/i, 'Grafana'], [/\bhubspot\b/i, 'HubSpot'],
  [/\bzendesk\b/i, 'Zendesk'], [/\bsupabase\b/i, 'Supabase'], [/\bpostgres/i, 'PostgreSQL'],
  [/\bteams\b/i, 'Microsoft Teams'], [/\boutlook\b/i, 'Outlook'], [/\bsharepoint\b/i, 'SharePoint'],
  [/\bexcel\b/i, 'Microsoft Excel 365'], [/\bmicrosoft 365\b/i, 'Microsoft 365'], [/\bsms\b/i, 'Twilio SMS'],
]

export const hasLogo = (name) => Boolean(LOGO_FILES[name] || SIMPLE_ICONS[name])

/** The brand a workflow step belongs to, if it has a logo we can show. */
export const brandForStep = (...texts) => {
  const t = texts.filter(Boolean).join(' ')
  const hit = KEYWORDS.find(([re, name]) => re.test(t) && hasLogo(name))
  return hit ? hit[1] : null
}
