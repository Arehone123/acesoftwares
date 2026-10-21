// Turns our Flow column format ([[label, icon, sub], ...] per column) into importable n8n workflow JSON.
import { brandForStep } from './logos.js'

const BRAND_NODES = {
  WhatsApp: 'n8n-nodes-base.whatsApp',
  Slack: 'n8n-nodes-base.slack',
  Gmail: 'n8n-nodes-base.gmail',
  Jira: 'n8n-nodes-base.jira',
  PagerDuty: 'n8n-nodes-base.pagerDuty',
  Xero: 'n8n-nodes-base.xero',
  'Twilio SMS': 'n8n-nodes-base.twilio',
  'Microsoft Teams': 'n8n-nodes-base.microsoftTeams',
  Outlook: 'n8n-nodes-base.microsoftOutlook',
  'Microsoft Excel 365': 'n8n-nodes-base.microsoftExcel',
  SharePoint: 'n8n-nodes-base.microsoftSharePoint',
  HubSpot: 'n8n-nodes-base.hubspot',
  Zendesk: 'n8n-nodes-base.zendesk',
  PostgreSQL: 'n8n-nodes-base.postgres',
  Supabase: 'n8n-nodes-base.supabase',
  Grafana: 'n8n-nodes-base.grafana',
}

const ICON_NODES = {
  clock: 'n8n-nodes-base.scheduleTrigger',
  webhook: 'n8n-nodes-base.webhook',
  code: 'n8n-nodes-base.code',
  js: 'n8n-nodes-base.code',
  chart: 'n8n-nodes-base.code',
  bot: '@n8n/n8n-nodes-langchain.agent',
  if: 'n8n-nodes-base.if',
  filter: 'n8n-nodes-base.filter',
  globe: 'n8n-nodes-base.httpRequest',
  mail: 'n8n-nodes-base.emailSend',
  send: 'n8n-nodes-base.twilio',
  db: 'n8n-nodes-base.postgres',
  sheet: 'n8n-nodes-base.googleSheets',
  calendar: 'n8n-nodes-base.googleCalendar',
  ocr: 'n8n-nodes-base.extractFromFile',
  file: 'n8n-nodes-base.extractFromFile',
  upload: 'n8n-nodes-base.microsoftSharePoint',
  search: '@n8n/n8n-nodes-langchain.vectorStoreInMemory',
}

const TRIGGERS = new Set(['n8n-nodes-base.scheduleTrigger', 'n8n-nodes-base.webhook'])

function nodeType(label, icon, sub, isFirst) {
  const brand = brandForStep(sub, label)
  let type = (brand && BRAND_NODES[brand]) || ICON_NODES[icon] || 'n8n-nodes-base.noOp'
  if (isFirst && !TRIGGERS.has(type)) {
    // Brand-specific triggers where n8n has them; otherwise a webhook.
    if (type === 'n8n-nodes-base.whatsApp') type = 'n8n-nodes-base.whatsAppTrigger'
    else if (type === 'n8n-nodes-base.microsoftOutlook') type = 'n8n-nodes-base.microsoftOutlookTrigger'
    else if (type === 'n8n-nodes-base.emailSend') type = 'n8n-nodes-base.emailReadImap'
    else type = 'n8n-nodes-base.webhook'
  }
  return type
}

export function toN8nWorkflow(name, columns) {
  const nodes = []
  const names = new Set()
  const grid = columns.map((col, ci) =>
    col.map(([label, icon, sub], ri) => {
      let n = label
      for (let k = 2; names.has(n); k++) n = `${label} ${k}`
      names.add(n)
      let type = nodeType(label, icon, sub, ci === 0)
      const nextCount = columns[ci + 1]?.length || 0
      if (type === 'n8n-nodes-base.if' && nextCount > 2) type = 'n8n-nodes-base.switch'
      const y = (ri - (col.length - 1) / 2) * 200
      const node = {
        parameters: {},
        id: `${ci}-${ri}-${n.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        name: n,
        type,
        typeVersion: 1,
        position: [ci * 260, y],
        notes: sub,
      }
      nodes.push(node)
      return node
    })
  )

  const connections = {}
  grid.forEach((col, ci) => {
    const next = grid[ci + 1]
    if (!next) return
    col.forEach((node) => {
      const branching = node.type === 'n8n-nodes-base.if' || node.type === 'n8n-nodes-base.switch'
      connections[node.name] = {
        main: branching
          ? next.map((t) => [{ node: t.name, type: 'main', index: 0 }])
          : [next.map((t) => ({ node: t.name, type: 'main', index: 0 }))],
      }
    })
  })

  return { name, nodes, connections, settings: {}, meta: { templateCredsSetupCompleted: false, instanceId: 'acesoftwares-demo' } }
}
