import { useState } from 'react'
import { apps } from '../data.js'
import AppPreview from './AppPreview.jsx'

export default function Products({ onPick }) {
  const [activeId, setActiveId] = useState(apps[0].id)
  const app = apps.find((a) => a.id === activeId)

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Our products</span>
          <h2>
            Eight operating systems.
            <br />
            One automation backbone.
          </h2>
          <p>
            Each product is a full web app for a part of your business, with n8n workflows running behind
            it. Pick one below to see an example of what it looks like.
          </p>
        </div>

        <div className="tabs" role="tablist" aria-label="Products">
          {apps.map((a) => (
            <button
              key={a.id}
              role="tab"
              aria-selected={a.id === activeId}
              className={`tab ${a.id === activeId ? 'is-active' : ''}`}
              style={{ '--app': a.color }}
              onClick={() => setActiveId(a.id)}
            >
              <span className="tab__icon">{a.icon}</span>
              {a.name}
            </button>
          ))}
        </div>

        <div className="showcase">
          <AppPreview app={app} />
          <div className="showcase__info" style={{ '--app': app.color }}>
            <span className="showcase__tag">{app.tagline}</span>
            <h3>{app.name}</h3>
            <p>{app.desc}</p>
            <ul className="checks">
              {app.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <div className="showcase__saved">
              <b>~{app.hoursSaved} hrs</b>
              <span>saved per month for a typical team</span>
            </div>
            <button
              className="btn btn--primary btn--block"
              onClick={() => onPick('Apps — Growth', `I'm interested in ${app.name}.`)}
            >
              Get {app.name}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
