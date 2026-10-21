import { useEffect, useState } from 'react'
import { RETAINER_RATE } from '../data.js'

const nodes = [
  { x: 2, y: 16, icon: '⏱', title: 'Schedule', sub: 'Every 30 min', kind: 'trigger' },
  { x: 38, y: 16, icon: '🌐', title: 'Scrape tenders', sub: 'Public portals' },
  { x: 38, y: 64, icon: '✦', title: 'AI summarise', sub: 'Fit score + risks', kind: 'ai' },
  { x: 72, y: 40, icon: 'B', title: 'Bid OS', sub: 'Create bid' },
  { x: 72, y: 72, icon: '✉', title: 'WhatsApp', sub: 'Notify team', kind: 'out' },
]

// Coordinates in the 560×340 SVG viewBox, matching the node positions above
const edges = [
  'M128 80 C 170 80, 170 80, 212 80',
  'M128 80 C 170 80, 170 242, 212 242',
  'M342 80 C 372 80, 372 160, 402 160',
  'M342 242 C 372 242, 372 268, 402 268',
]

export default function Hero() {
  // Small live counter so the canvas feels like a running workflow
  const [runs, setRuns] = useState(14)
  useEffect(() => {
    const t = setInterval(() => setRuns((r) => r + 1), 3500)
    return () => clearInterval(t)
  }, [])
  const hours = (runs * 0.46).toFixed(1)

  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="pill">
            <span className="pill__dot" /> Automation agency · Built on n8n
          </span>
          <h1>
            Your business, <span className="grad">running on autopilot.</span>
          </h1>
          <p className="lead">
            AceSoftwares builds the operating systems and n8n workflows that take repetitive work off your
            team. You pay a monthly retainer for our apps, and for workflows you pay according to the hours
            we save you.
          </p>
          <div className="hero__actions">
            <a href="#roi" className="btn btn--primary">Calculate your savings</a>
            <a href="#products" className="btn btn--ghost">Explore our products →</a>
          </div>
          <ul className="hero__facts">
            <li><strong>8</strong> business OS products</li>
            <li><strong>R{RETAINER_RATE}</strong> / hour retainer</li>
            <li><strong>Pay per</strong> hour saved</li>
          </ul>
        </div>

        <div className="canvas" aria-label="Example automation workflow">
          <div className="canvas__bar">
            <span className="dot r" />
            <span className="dot y" />
            <span className="dot g" />
            <span className="canvas__title">workflow · tender-radar</span>
            <span className="canvas__status">
              <span className="live" /> Active
            </span>
          </div>
          <div className="canvas__body">
            <svg className="canvas__edges" viewBox="0 0 560 340" preserveAspectRatio="none" aria-hidden="true">
              {edges.map((d, i) => (
                <path key={i} className="edge" d={d} style={{ animationDelay: `${i * 0.3}s` }} />
              ))}
            </svg>
            {nodes.map((n, i) => (
              <div
                key={n.title}
                className={`node ${n.kind ? 'node--' + n.kind : ''}`}
                style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * 0.12}s` }}
              >
                <span className="node__icon">{n.icon}</span>
                <div>
                  <b>{n.title}</b>
                  <small>{n.sub}</small>
                </div>
              </div>
            ))}
            <div className="canvas__toast">
              <span className="tick">✓</span> {runs} tenders processed · <b>{hours} hrs saved</b> this week
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
