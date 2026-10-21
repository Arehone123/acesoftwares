import { partners } from '../data.js'

export default function Partners() {
  return (
    <section className="section" id="partners">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Partners</span>
          <h2>Built with partners we trust</h2>
          <p>We work with specialist partners so your automations run on solid platforms and reliable infrastructure.</p>
        </div>
        <div className="partners">
          {partners.map((p) => (
            <a key={p.name} className="partner" href={p.url} target="_blank" rel="noopener noreferrer">
              <span className="partner__mark">{p.name.charAt(0).toUpperCase()}</span>
              <div>
                <span className="partner__role">{p.role}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <span className="partner__link">{p.url.replace(/^https?:\/\//, '')} ↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
