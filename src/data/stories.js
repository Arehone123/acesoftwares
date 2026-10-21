// ---------------------------------------------------------------
// Companies using n8n (published by n8n — NOT AceSoftwares clients).
// Figures and short quotes are taken from n8n's official case studies; each links to its source.
// Checked October 2026 at https://n8n.io/case-studies/
// ---------------------------------------------------------------
export const n8nStories = [
  {
    company: 'Vodafone',
    logo: 'Vodafone',
    stat: '£2.2M',
    statLabel: 'saved on threat intelligence',
    quote: 'It did everything that we wanted, all in one tool.',
    person: 'Claire Van Hinsbergh, Engineering Manager',
    url: 'https://n8n.io/case-studies/vodafone/',
  },
  {
    company: 'Delivery Hero',
    stat: '200 hrs',
    statLabel: 'saved every month with a single IT ops workflow',
    summary: 'Account-lockout recovery was automated across Okta, Jira and Google, cutting the average lockout from 35 to 20 minutes.',
    url: 'https://n8n.io/case-studies/delivery-hero/',
  },
  {
    company: 'Trendyol',
    stat: '700',
    statLabel: 'active workflows in under a year',
    quote: 'We feel more confident trying new ideas and doing things faster.',
    person: 'Hüseyin Ulaş, Head of Engineering',
    url: 'https://n8n.io/case-studies/trendyol/',
  },
  {
    company: 'StepStone',
    stat: '3,000',
    statLabel: 'employees, grown from 4 early adopters',
    quote: 'That’s where people get their aha moments.',
    person: 'Luka Pilic, Tech Lead, Marketplace Management',
    url: 'https://n8n.io/case-studies/stepstone/',
    video: 'VNGXVn56AyQ',
  },
  {
    company: 'Huel',
    stat: 'AI-first',
    statLabel: 'culture built at scale',
    quote: 'n8n was the big unlock.',
    person: 'Ollie Scheers, Chief Technology Officer',
    url: 'https://n8n.io/case-studies/huel/',
  },
  {
    company: 'Icatu Seguros',
    stat: '200 hrs',
    statLabel: 'saved every month',
    summary: 'Faster development with n8n let the insurer launch its solution ahead of the rest of its market.',
    person: 'Luiza Vidal Vilardi, Product Owner',
    url: 'https://n8n.io/case-studies/icatu-seguros/',
  },
  {
    company: 'Seguros Bolívar',
    stat: 'Org-wide',
    statLabel: 'AI put to work across the business',
    summary: 'The insurer uses n8n to support its people and free teams to focus on the work that creates value for customers.',
    person: 'Germán Sánchez, VP',
    url: 'https://n8n.io/case-studies/seguros-bolivar/',
  },
  {
    company: 'Mercedes-Benz',
    logo: 'Mercedes',
    stat: 'AI agents',
    statLabel: 'scaled with n8n',
    summary: 'Presented at n8n Business Lab, April 2026: how Mercedes-Benz scales AI agents with n8n.',
    url: 'https://www.youtube.com/watch?v=auj9ajsiI9s',
    video: 'auj9ajsiI9s',
  },
]

// ---------------------------------------------------------------
// AceSoftwares client testimonials.
// Paste each client's REAL words (with their permission) into `quote`, plus the person's name and role.
// Cards only appear on the site once `quote` is filled in; until then the client is listed by name only.
// ---------------------------------------------------------------
export const clients = [
  { name: 'Aristar', quote: '', person: '', role: '', hoursSaved: null },
  { name: 'Open Communications', quote: '', person: '', role: '', hoursSaved: null },
  { name: 'Enactus', quote: '', person: '', role: '', hoursSaved: null },
  { name: 'CEI UWC', quote: '', person: '', role: '', hoursSaved: null },
  { name: 'PPECB', quote: '', person: '', role: '', hoursSaved: null },
  { name: 'The Data Science Academy SA', quote: '', person: '', role: '', hoursSaved: null },
  { name: 'TradeOn SA', quote: '', person: '', role: '', hoursSaved: null },
]

export const clientTestimonials = clients.filter((c) => c.quote.trim())
