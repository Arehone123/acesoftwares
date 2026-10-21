import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'

const links = [
  ['#products', 'Products'],
  ['#workflows', 'Workflows'],
  ['#pricing', 'Pricing'],
  ['#roi', 'ROI calculator'],
  ['#partners', 'Partners'],
  ['#faq', 'FAQ'],
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`} id="top">
      <div className="container nav__inner">
        <Logo />
        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#contact" className="btn btn--primary nav__mobile-cta" onClick={() => setOpen(false)}>
            Book a free audit
          </a>
        </nav>
        <div className="nav__cta">
          <a href="#contact" className="btn btn--primary btn--sm nav__desktop-cta">
            Book a free audit
          </a>
          <button
            className={`nav__toggle ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
