import { Link, Navigate, useParams } from 'react-router-dom'
import Flow from '../components/Flow.jsx'
import Icon from '../components/Icon.jsx'
import { BrowserMock, CtaBand, SectionHead, WorkflowCard } from '../components/Blocks.jsx'
import { apps, appById } from '../data/apps.js'
import { workflows } from '../data/workflows.js'
import { RETAINER_RATE } from '../data/site.js'
import { Video } from '../components/Media.jsx'
import { videoFor } from '../data/videos.js'

export function ProductsIndex() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container hero__copy">
          <span className="tag">PRODUCTS</span>
          <h1>{apps.length} operating systems.<br />One automation backbone.</h1>
          <p className="lead">Each Ace OS product is a complete web app for one part of your business, with n8n workflows doing the repetitive work behind it.</p>
        </div>
      </section>
      <section className="section section--flush">
        <div className="container prodlist">
          {apps.map((a) => (
            <Link key={a.id} to={`/products/${a.id}`} className="prodrow" style={{ '--app': a.color }}>
              <div className="prodrow__copy">
                <span className="prod__icon"><Icon name={a.icon} size={24} /></span>
                <h2>{a.name}</h2>
                <p className="muted">{a.desc}</p>
                <span className="ulink">Explore {a.name}</span>
              </div>
              <div className="prodrow__mock"><BrowserMock app={a} /></div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export function Product() {
  const { id } = useParams()
  const app = appById(id)
  if (!app) return <Navigate to="/products" replace />
  const related = workflows.filter((w) => w.app === app.id)
  const others = apps.filter((a) => a.id !== app.id)

  return (
    <div style={{ '--app': app.color }}>
      <section className="hero hero--page">
        <div className="container hero__copy">
          <span className="tag tag--app"><Icon name={app.icon} size={13} /> {app.name.toUpperCase()}</span>
          <h1>{app.headline}</h1>
          <p className="lead">{app.desc}</p>
          <div className="btns btns--center">
            <Link to="/contact" state={{ interest: 'Apps — Growth', message: `I'd like a demo of ${app.name}.` }} className="btn btn--accent">BOOK A DEMO</Link>
            {app.priceNote
              ? <Link to="/solutions/mining-ops" className="btn btn--grey">{app.priceNote.toUpperCase()}</Link>
              : <Link to="/pricing" className="btn btn--grey">FROM R{RETAINER_RATE}/HOUR</Link>}
          </div>
        </div>
        <div className="container container--mid">
          <BrowserMock app={app} />
          <p className="hero__hint mono-label">EXAMPLE SCREEN · {app.preview.url.toUpperCase()}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={`What ${app.name} does`} />
          <div className="feat4">
            {app.features.map(([icon, title, text]) => (
              <div key={title} className="feat">
                <span className="feat__icon"><Icon name={icon} size={20} /></span>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <div className="panel">
            <div className="panel__tabs"><span className="ptab is-active">THE WORKFLOW BEHIND IT</span></div>
            <div className="panel__body">
              <div className="panel__copy">
                <h3>Automation that runs underneath {app.name}</h3>
                <p>{app.name} ships with n8n workflows that move data in and out automatically, so the screens stay current without anyone typing.</p>
                <div className="panel__saved"><b>~{app.hoursSaved} hrs</b> saved per month, typical team</div>
              </div>
              <div className="panel__canvas dots-dark"><Flow columns={app.flow} /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__copy">
            <span className="tag">WATCH</span>
            <h2>See what n8n does for teams like yours</h2>
            <p className="muted">{app.name} is built on n8n. This video from n8n’s channel shows the kind of work it takes off people’s plates.</p>
          </div>
          <Video v={videoFor[app.id]} big />
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead title={`Workflows for ${app.name}`} sub="Add these to your product. Priced on the hours they save." />
            <div className="wfgrid">{related.map((w) => <WorkflowCard key={w.slug} w={w} />)}</div>
          </div>
        </section>
      )}

      <section className="section section--grey">
        <div className="container">
          <div className="duo">
            <div className="duo__card">
              {app.priceNote ? (
                <>
                  <span className="tag">PER OPERATION</span>
                  <div className="duo__big">Pilot<span> first</span></div>
                  <p>{app.name} is licensed per operation. We start with a 12-week paid pilot at one operation, measured against agreed targets.</p>
                  <Link to="/solutions/mining-ops" className="ulink">See the mining solution</Link>
                </>
              ) : (
                <>
                  <span className="tag">RETAINER</span>
                  <div className="duo__big">R{RETAINER_RATE}<span>/hour</span></div>
                  <p>Hosting, monitoring, fixes and new features for {app.name}, billed monthly on the hours you choose.</p>
                  <Link to="/pricing" className="ulink">See plans</Link>
                </>
              )}
            </div>
            <div className="duo__card duo__card--dark">
              <span className="tag tag--accent">GET STARTED</span>
              <div className="duo__big">Free<span> audit</span></div>
              <p>We’ll map how your team works today and show you what {app.name} would look like for you.</p>
              <Link to="/contact" state={{ message: `Interested in ${app.name}.` }} className="ulink">Book an audit</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Other products" />
          <div className="prodgrid prodgrid--small">
            {others.map((a) => (
              <Link key={a.id} to={`/products/${a.id}`} className="prod" style={{ '--app': a.color }}>
                <span className="prod__icon"><Icon name={a.icon} size={20} /></span>
                <h3>{a.name}</h3>
                <p>{a.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
