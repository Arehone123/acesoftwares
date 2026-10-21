import { apps, partners, CONTACT_EMAIL } from '../data.js'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__about">
          <Logo />
          <p>An automation agency building business operating systems and n8n workflows.</p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <div>
          <h5>Products</h5>
          <ul>
            {apps.map((a) => (
              <li key={a.id}><a href="#products">{a.name}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href="#workflows">Workflows</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#roi">ROI calculator</a></li>
            <li><a href="#process">How we work</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5>Partners</h5>
          <ul>
            {partners.map((p) => (
              <li key={p.name}>
                <a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer__base">
        <span>© {new Date().getFullYear()} AceSoftwares. All rights reserved.</span>
        <span>n8n and Sovrinn are trademarks of their respective owners.</span>
      </div>
    </footer>
  )
}
