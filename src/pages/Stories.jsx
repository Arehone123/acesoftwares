import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { CtaBand, Mono, SectionHead } from '../components/Blocks.jsx'
import { Marquee } from '../components/Motion.jsx'
import { BeforeAfter, PaybackChart, StoryCard, Video, VideoGrid } from '../components/Media.jsx'
import { clients, clientTestimonials, n8nStories } from '../data/stories.js'

/** Our clients: a name ticker, plus testimonial cards for every client whose words have been added. */
export function ClientsSection() {
  return (
    <section className="section section--flush">
      <div className="container">
        <SectionHead title={<>Trusted by teams <span className="hl">we work with</span></>} sub="Organisations across South Africa that run their work on AceSoftwares and n8n." />
      </div>
      <Marquee speed={30}>
        {clients.map((c) => (
          <span key={c.name} className="clientchip"><Mono name={c.name} /> {c.name}</span>
        ))}
      </Marquee>
      {clientTestimonials.length > 0 && (
        <div className="container testimonials">
          {clientTestimonials.map((c) => (
            <figure key={c.name} className="testimonial">
              <Icon name="chat" size={22} />
              <blockquote>“{c.quote}”</blockquote>
              <figcaption>
                <Mono name={c.name} size="lg" />
                <span><b>{c.person}</b>{c.role}, {c.name}</span>
                {c.hoursSaved && <em className="wfcard__hours">−{c.hoursSaved} hrs/month</em>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  )
}

export default function Stories() {
  return (
    <>
      <section className="hero hero--page hero--aurora">
        <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
        <div className="container hero__copy">
          <span className="tag tag--accent">STORIES</span>
          <h1>How n8n changes<br /><span className="grad-text">the way businesses work</span></h1>
          <p className="lead">From global brands to teams here at home: real numbers from organisations that replaced manual work with n8n.</p>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <SectionHead title="Companies running on n8n" sub="Published n8n customer stories. These companies use n8n directly; they are not AceSoftwares clients." />
          <div className="stories">{n8nStories.map((s) => <StoryCard key={s.company} s={s} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__copy">
            <h2>Hear it from the teams themselves</h2>
            <p className="muted">StepStone grew from four early adopters to 3,000 employees on n8n. Luka Pilic explains how.</p>
            <a className="ulink" href="https://n8n.io/case-studies/stepstone/" target="_blank" rel="noopener noreferrer">Read the StepStone case study</a>
          </div>
          <Video v="stepstone" big />
        </div>
      </section>

      <ClientsSection />

      <section className="section">
        <div className="container">
          <SectionHead title="The same job, before and after" sub="An example month of supplier invoices for a mid-sized finance team." />
          <BeforeAfter />
        </div>
      </section>

      <section className="section section--grey">
        <div className="container">
          <SectionHead title="When does it pay for itself?" sub="One process taking 160 staff hours a month at R250/hour, automated at 80%, including our fee." />
          <PaybackChart />
          <p className="center"><Link to="/pricing#roi" className="ulink">Run your own numbers</Link></p>
        </div>
      </section>

      <VideoGrid ids={['mercedes', 'peopleOps750', 'saved250k', 'howWeUseEngineer', 'howWeUseDesign', 'inTheLoop']} title="Watch: n8n in the real world" sub="Case studies and talks from n8n’s official channel." />
      <CtaBand title="Want to be our next story?" />
    </>
  )
}
