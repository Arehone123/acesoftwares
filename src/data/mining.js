// Content for the Mining solution page (MinePulse + ShaftPulse).
// Client-specific details from proposals (client names, sites, prices) are deliberately NOT published here.

export const compare = [
  ['Who reports', 'Residents of host communities and labour-sending areas', 'Miners, supervisors, artisans, control room'],
  ['Who fixes', 'The department that owns the issue', 'The department that owns the issue'],
  ['Main risk it reduces', 'Protests, blockades, loss of social licence', 'Production delays, safety stoppages, equipment downtime'],
  ['Channels', 'USSD, WhatsApp, app, field intake by Stakeholder Relations', 'Offline app underground, station and lamp-room kiosks, control room'],
  ['Headline cost lever', 'One protected production day ≈ R45m at 20 kg/day', 'One protected production hour ≈ R1.9m at 20 kg/day'],
]

export const mineSteps = [
  ['phone', 'Report', 'A resident reports by USSD (any phone, no data), WhatsApp or app, in six languages. Field officers log verbal reports from meetings and open days.'],
  ['send', 'Acknowledge in seconds', 'The resident gets a reference number by SMS straight away, not days later.'],
  ['users', 'Cluster', 'Reports about the same issue in the same community join one case: 40 dust reports become one case with 40 voices.'],
  ['bell', 'Alert the owner', 'When a cluster crosses its threshold (for example 25 for dust, 1 for any human-rights concern), the owner department and Stakeholder Relations are alerted.'],
  ['calendar', 'Commit', 'The owner acts now or commits to a date, a plain-language reason and an interim measure. Every grievant gets the SMS.'],
  ['alert', 'Escalate', 'A missed date escalates automatically, up to the general manager and the executive responsible for corporate affairs.'],
  ['ok', 'Close with evidence', 'Close-out needs a photo or letter and the grievant’s rating. A repeat within 30 days reopens the case.'],
]

export const shaftSteps = [
  ['phone', 'Log offline', 'Anyone logs an issue on the offline app underground; it sends at the station, shaft bank or lamp room. Radio calls go in the same register.'],
  ['map', 'Pin & route', 'The issue is pinned to its level and working place and routed to the owning department: Mining, Engineering, Ventilation, Stores and more.'],
  ['shield', 'Safety first', 'If a crew has withdrawn from a dangerous working place, the HOD, section manager and safety representative are told immediately.'],
  ['wallet', 'Price the delay', 'Issues that stop production carry kilograms per day at risk, priced at the gold price, for the morning meeting.'],
  ['refresh', 'Commit or hand off', 'The owner commits a time, sends a team, or hands off; on a handoff, one clock pauses and the other department’s starts.'],
  ['alert', 'Escalate', 'Missed commitments go to the HOD and section manager, then the mine manager, then the general manager.'],
  ['ok', 'Sign off', 'The reporting team signs off the fix, and any work order waiting on it is released automatically.'],
]

export const compliance = [
  ['Your grievance procedure', 'Acknowledge, resolve and report within set times', 'MinePulse automates each step and produces the action log and trend reports'],
  ['MPRDA Social & Labour Plans, Mining Charter III', 'Annual SLP and Charter reports to the regulator', 'Community feedback per SLP project becomes a report annexure'],
  ['UN Guiding Principles (Principle 31)', 'Grievance mechanisms that are accessible, predictable, transparent and a source of learning', 'A self-assessment report maps live figures to each criterion'],
  ['Mine Health and Safety Act', 'Hazard identification and control; inspectors may issue Section 54 instructions', 'ShaftPulse keeps a live hazard register and flags overdue safety items before an inspection'],
  ['Tailings standards (GISTM-aligned)', 'Tailings governance and community impact', 'Dust and seepage complaints are linked to specific facilities as evidence'],
  ['POPIA', 'Lawful handling and protection of personal information', 'Role-based access, anonymous reporting and an audit trail on every record'],
]

// Industry examples — figures as reported by each source; strength shows how much weight to give them.
export const proof = [
  ['BHP · Escondida, Chile', 'AI recommendations for concentrator and desalination water and energy use', '3+ gigalitres of water and 118 GWh of energy saved since FY2022', 'Company filing (SEC)', 'https://www.sec.gov/Archives/edgar/data/811809/000119312524210297/d812514d20f.htm'],
  ['Rio Tinto · Pilbara, Australia', 'Autonomous haul trucks', '~700 more operating hours per truck; 15% lower load-and-haul unit costs', 'Company release', 'https://www.riotinto.com/news/releases/AHS-one-billion-tonne-milestone'],
  ['Underground equipment study', 'Sensors + machine learning predict equipment failures', '8% lower maintenance cost; 10% higher equipment availability', 'Peer-reviewed', 'https://doaj.org/article/cfdf6f703caf4fb6a03ee1095742cda0'],
  ['Smart dust monitoring research', 'IoT sensors + ML predict dust and trigger suppression', 'Suppression starts before limits are exceeded', 'Peer-reviewed', 'https://www.nature.com/articles/s41598-024-58021-x'],
  ['Fortescue · Pilbara, Australia', 'Autonomous haul fleet', '30% productivity improvement', 'Trade press', 'https://www.e-mj.com/features/optimizing-autonomous-haulage/'],
  ['Caterpillar Driver Safety System', 'Camera detects driver fatigue and micro-sleeps', 'Average 80% fall in fatigue and distraction events', 'Vendor figures', 'https://www.aggbusiness.com/feature/cat-driver-safety-system-operators-fatigue-busting-friend'],
]

export const stakes = [
  ['R9.5m', 'a day: the reported cost of one Section 54 safety stoppage at a South African gold mine', 'https://www.miningmx.com/news/gold/28431-anglogold-labour-court-ruling-lands-blow-fair-section-54s/'],
  ['US$20m', 'a week: what company–community conflict can cost a large mining project in delays', 'https://www.mining.com/?p=783373'],
  ['35%', 'of surveyed South African mining companies used advanced technology in 2021–2023', 'https://www.dailymaverick.co.za/article/2026-07-27-leader-to-laggard-sa-mining-is-falling-behind-in-the-global-technology-race/'],
]

export const roadmap = [
  ['clipboard', 'SLP promise tracker', 'Reads published Social & Labour Plans, extracts every commitment with budget and deadline, and matches community complaints to the promise they concern.', 'Pilot'],
  ['temp', 'Dust forecaster', 'Predicts which community will be hit by tailings dust 24–72 hours ahead, schedules suppression and warns residents by SMS.', 'Scale phase'],
  ['phone', 'Voice reporting underground', 'Speech in home languages (and Fanakalo, never as the default) becomes a structured work order, offline on the phone.', 'Scale phase'],
  ['gauge', 'Social licence early warning', 'Scores each community’s weekly risk of protest from complaint velocity, topic mix and missed commitments.', 'After 6–12 months of data'],
  ['search', 'Blast & seismic claims triage', 'Lines up cracked-house complaints with blast logs and seismic readings, and classifies crack photos.', 'After 6–12 months of data'],
]

export const pilotTargets = [
  ['Community acknowledgement time', 'Under 1 hour'],
  ['Community cases resolved within 30 days', 'At least 80%'],
  ['Commitments kept by owner departments', 'At least 75%'],
  ['Production hours lost to blockers on pilot levels', 'Measurable fall, verified by Mining and Finance'],
  ['Overdue safety items on pilot levels', 'Down every month'],
  ['Grievant satisfaction', 'At least 3.5 out of 5'],
]

export const pilotPhases = [
  ['Weeks 1–2', 'Set up', 'Agree scope, targets and data access; configure departments, levels, communities and escalation ladders.'],
  ['Weeks 3–6', 'Go live', 'Launch both apps at one operation: its host communities in MinePulse, two underground levels plus surface in ShaftPulse.'],
  ['Weeks 7–12', 'Measure', 'Track every target against the baseline; switch on the first AI capability.'],
  ['Gate', 'Scale decision', 'Roll out only if the agreed targets are met.'],
]

export const guardrails = [
  'Pay and HR questions are logged as service requests only. Formal employee grievances stay in the procedures agreed with recognised unions.',
  'A stop-work record never replaces an employee’s legal right to leave a dangerous working place.',
  'AI outputs guide decisions and engagement; they are never used to profile individual residents, workers or community leaders.',
  'Neither platform replaces your existing systems: cases sync to your grievance register, and work orders can be pushed to your maintenance system.',
]
