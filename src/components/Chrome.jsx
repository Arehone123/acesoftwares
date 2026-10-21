import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'
import { apps } from '../data/apps.js'
import { solutions } from '../data/solutions.js'
import { partners, CONTACT_EMAIL } from '../data/site.js'

export function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label="AceSoftwares home">
      <svg className="logo__mark" viewBox="0 0 40 20" aria-hidden="true">
        <circle cx="5" cy="10" r="4" />
        <path d="M9 10 H 15" />
        <rect x="15" y="4" width="12" height="12" rx="3" />
        <path d="M27 10 H 31" />
        <circle cx="35" cy="10" r="4" />
      </svg>
      <span>acesoftwares</span>
    </Link>
  )
}

const menus = {
  PRODUCTS: apps.map((a) => ({ to: `/products/${a.id}`, icon: a.icon, title: a.name, text: a.tagline })),
  SOLUTIONS: [
    ...solutions.map((s) => ({ to: `/solutions/${s.id}`, icon: s.id === 'it-ops' ? 'server' : s.id === 'finance-ops' ? 'wallet' : 'pickaxe', title: s.nav, text: s.title })),
    { to: '/workflows', icon: 'workflow', title: 'Workflow library', text: 'Ready-to-deploy automations' },
    { to: '/integrations', icon: 'zap', title: 'Integrations', text: 'Tools we connect to' },
  ],
}

export function Nav() {
  const [menu, setMenu] = useState(null)
  const [mobile, setMobile] = useState(false)
  const loc = useLocation()
  const ref = useRef(null)

  useEffect(() => { setMenu(null); setMobile(false) }, [loc.pathname])
  useEffect(() => {
    const close = (e) => { if (!ref.current?.contains(e.target)) setMenu(null) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  return (
    <header className="nav" ref={ref}>
      <div className={`nav__bar ${menu ? 'has-menu' : ''}`}>
        <Logo />
        <nav className={`nav__links ${mobile ? 'is-open' : ''}`} aria-label="Main">
          {Object.keys(menus).map((k) => (
            <div key={k} className="nav__group">
              <button
                type="button"
                className={`nav__link ${menu === k ? 'is-active' : ''}`}
                aria-expanded={menu === k}
                onClick={() => setMenu(menu === k ? null : k)}
              >
                {k} <Icon name="chevron" size={14} />
              </button>
              {mobile && menu === k && (
                <div className="nav__mobile-sub">
                  {menus[k].map((m) => <Link key={m.to} to={m.to}>{m.title}</Link>)}
                </div>
              )}
            </div>
          ))}
          <NavLink to="/workflows" className="nav__link">WORKFLOWS</NavLink>
          <NavLink to="/integrations" className="nav__link">INTEGRATIONS</NavLink>
          <NavLink to="/pricing" className="nav__link">PRICING</NavLink>
          <Link to="/contact" className="btn btn--accent nav__mobile-cta">BOOK AN AUDIT</Link>
        </nav>
        <div className="nav__right">
          <NavLink to="/contact" className="nav__link nav__hide-sm">CONTACT</NavLink>
          <Link to="/contact" className="btn btn--accent btn--sm nav__hide-sm">BOOK AN AUDIT</Link>
          <button type="button" className="nav__burger" aria-label={mobile ? 'Close menu' : 'Open menu'} onClick={() => setMobile(!mobile)}>
            <Icon name={mobile ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </div>
      {menu && !mobile && (
        <div className={`nav__menu nav__menu--${menu === 'PRODUCTS' ? 'grid4' : 'grid3'}`}>
          {menus[menu].map((m) => (
            <Link key={m.to} to={m.to} className="nav__item">
              <Icon name={m.icon} size={18} />
              <b>{m.title}</b>
              <span>{m.text}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo light />
          <p>An automation agency building business operating systems and n8n workflows.</p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <div className="footer__cols">
          <div>
            <h5>PRODUCTS</h5>
            {apps.map((a) => <Link key={a.id} to={`/products/${a.id}`}>{a.name.toUpperCase()}</Link>)}
          </div>
          <div>
            <h5>SOLUTIONS</h5>
            {solutions.map((s) => <Link key={s.id} to={`/solutions/${s.id}`}>{s.nav.toUpperCase()}</Link>)}
            <Link to="/workflows">WORKFLOW LIBRARY</Link>
            <Link to="/integrations">INTEGRATIONS</Link>
          </div>
          <div>
            <h5>COMPANY</h5>
            <Link to="/pricing">PRICING</Link>
            <Link to="/contact">CONTACT</Link>
            <Link to="/contact">BOOK AN AUDIT</Link>
            {partners.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">{p.name.toUpperCase()} ↗</a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer__base">
        <span>© {new Date().getFullYear()} AceSoftwares. All rights reserved.</span>
        <span>n8n and Sovrinn are trademarks of their respective owners.</span>
      </div>
    </footer>
  )
}

export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
