import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Elements that fade/slide in as they scroll into view. Siblings are staggered.
const REVEAL = [
  '.shead', '.wfcard', '.prod', '.feat', '.tier', '.step', '.pillcard', '.partner', '.duo__card', '.inttile',
  '.metric', '.metrics__intro', '.pillar', '.faq__item', '.panel', '.split__copy', '.split__canvas', '.ctaband',
  '.bigtile', '.catcard', '.prodrow', '.offer', '.support__card', '.stat', '.split3__card', '.keep', '.roi__in',
  '.roi__out', '.cform', '.evformat', '.story', '.video', '.race__lane', '.ticker-box', '.money__chart', '.wembed',
  '.testimonial', '.transform__step', '.transform__scene', '.aitier', '.captable', '.capnotes > div', '.aiest__in', '.aiest__out',
].join(',')

/** Watches the page and animates matching elements in on scroll. Re-runs on every route change. */
export function RevealOnScroll() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (reduced()) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target) }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
    const t = setTimeout(() => {
      document.querySelectorAll(REVEAL).forEach((el) => {
        if (el.classList.contains('rv')) return
        const idx = [...el.parentElement.children].indexOf(el)
        el.style.setProperty('--rv-delay', `${Math.min(idx, 8) * 70}ms`)
        el.classList.add('rv')
        io.observe(el)
      })
    }, 30)
    return () => { clearTimeout(t); io.disconnect() }
  }, [pathname])
  return null
}

/** Counts from 0 to `to` when scrolled into view. */
export function CountUp({ to, prefix = '', suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(reduced() ? to : 0)
  useEffect(() => {
    if (reduced()) return
    const el = ref.current
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration)
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to, duration])
  return <span ref={ref}>{prefix}{val.toLocaleString('en-ZA').replace(/[  ]/g, ',')}{suffix}</span>
}

/** Cycles through words with a slide-up animation. */
export function Rotator({ words, interval = 2200 }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduced()) return
    const t = setInterval(() => setI((x) => (x + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words.length, interval])
  return (
    <span className="rotator" aria-live="polite">
      <span key={i} className="rotator__word">{words[i]}</span>
    </span>
  )
}

/** Infinite horizontal ticker. */
export function Marquee({ children, speed = 40, reverse = false }) {
  return (
    <div className="marquee">
      <div className={`marquee__track ${reverse ? 'marquee__track--rev' : ''}`} style={{ animationDuration: `${speed}s` }}>
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

/** Card that tilts toward the cursor and shows a spotlight. */
export function Tilt({ as: Tag = 'div', className = '', children, ...rest }) {
  const onMove = (e) => {
    if (reduced()) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    e.currentTarget.style.setProperty('--rx', `${(0.5 - y) * 7}deg`)
    e.currentTarget.style.setProperty('--ry', `${(x - 0.5) * 9}deg`)
    e.currentTarget.style.setProperty('--mx', `${x * 100}%`)
    e.currentTarget.style.setProperty('--my', `${y * 100}%`)
  }
  const onLeave = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
  }
  return <Tag className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>{children}</Tag>
}

/** Thin bar above the nav. */
export function Announcement() {
  return (
    <Link to="/events" className="announce">
      <span className="announce__dot" />
      <span><b>Free n8n workshops in Cape Town</b> · sponsored by n8n, free for everyone</span>
      <span className="announce__go">Register <Icon name="arrow" size={13} /></span>
    </Link>
  )
}

/** Floating "24/7" support chip that sits on the bottom-left of every page. */
export function SupportChip() {
  return (
    <Link to="/contact" className="supchip" aria-label="24/7 support — contact us">
      <span className="supchip__pulse" />
      <Icon name="phone" size={15} />
      <span className="supchip__text">24/7 support</span>
    </Link>
  )
}
