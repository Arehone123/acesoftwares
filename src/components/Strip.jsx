const tools = [
  'WhatsApp',
  'Microsoft 365',
  'Google Workspace',
  'Sage',
  'Xero',
  'Slack',
  'OpenAI / Claude',
  'PostgreSQL',
  'REST APIs',
  '+ 400 n8n integrations',
]

export default function Strip() {
  return (
    <section className="strip">
      <div className="container strip__inner">
        <span className="strip__label">Connects with the tools you already use</span>
        <div className="marquee">
          <ul>
            {[...tools, ...tools].map((t, i) => (
              <li key={i} aria-hidden={i >= tools.length}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
