import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Icon from './Icon.jsx'

const S = 72 // square node size
const AGENT_W = 210
const GAP_X = 96
const ROW_H = 150
const PAD = 40

// Lay out columns of [label, icon, sub] into positioned nodes + edges in a fixed design space.
function layout(columns, { tools, plus }) {
  const nodes = []
  const edges = []
  const maxRows = Math.max(...columns.map((c) => c.length))
  const toolSpace = tools ? 120 : 0
  const H = PAD + maxRows * ROW_H + toolSpace
  const midY = PAD + (maxRows * ROW_H) / 2 - 30
  let x = PAD

  columns.forEach((col, ci) => {
    const isAgentCol = col.some(([, icon]) => icon === 'bot')
    const colW = isAgentCol && col.length === 1 ? AGENT_W : S
    col.forEach(([label, icon, sub], ri) => {
      const agent = icon === 'bot' && col.length === 1
      const w = agent ? AGENT_W : S
      const cy = midY + (ri - (col.length - 1) / 2) * ROW_H
      nodes.push({
        id: `${ci}-${ri}`, col: ci, label, icon, sub, agent,
        trigger: ci === 0,
        x: x + (colW - w) / 2, y: cy - S / 2, w, h: S,
      })
    })
    x += colW + GAP_X
  })

  for (let ci = 0; ci < columns.length - 1; ci++) {
    const from = nodes.filter((n) => n.col === ci)
    const to = nodes.filter((n) => n.col === ci + 1)
    from.forEach((a) => to.forEach((b) => edges.push({ a, b, col: ci })))
  }

  let plusNode = null
  if (plus) {
    const last = nodes.filter((n) => n.col === columns.length - 1)
    const cy = last.reduce((s, n) => s + n.y + n.h / 2, 0) / last.length
    plusNode = { x: x - GAP_X + 56, y: cy - 18 }
    if (last.length === 1) edges.push({ a: last[0], b: { x: plusNode.x, y: plusNode.y - 18, h: 72 }, col: columns.length - 1, plus: true })
    x = plusNode.x + 36 + GAP_X
  }

  return { nodes, edges, plusNode, W: x - GAP_X + PAD, H: H + 30 }
}

const edgePath = (a, b) => {
  const sx = a.x + a.w
  const sy = a.y + a.h / 2
  const tx = b.x
  const ty = b.y + b.h / 2
  const dx = Math.max(30, (tx - sx) * 0.5)
  return `M${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`
}

/**
 * Animated, clickable workflow canvas.
 * columns: [[ [label, icon, sub], ... ], ...]  — every node in column i connects to every node in column i+1.
 */
export default function Flow({ columns, theme = 'dark', tools = false, plus = true, animate = true, maxScale = 1, className = '' }) {
  const { nodes, edges, plusNode, W, H } = useMemo(() => layout(columns, { tools, plus }), [columns, tools, plus])
  const wrap = useRef(null)
  const [scale, setScale] = useState(1)
  const [step, setStep] = useState(-1)
  const [open, setOpen] = useState(null)
  const cols = columns.length

  useLayoutEffect(() => {
    const el = wrap.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(Math.min(maxScale, e.contentRect.width / W)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [W, maxScale])

  // Simulated execution: light up one column at a time, then loop.
  useEffect(() => {
    if (!animate) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setStep(cols); return }
    const t = setInterval(() => setStep((s) => (s >= cols + 2 ? -1 : s + 1)), 750)
    return () => clearInterval(t)
  }, [animate, cols])

  useEffect(() => setOpen(null), [columns])

  const openNode = nodes.find((n) => n.id === open)

  return (
    <div className={`flow flow--${theme} ${className}`} ref={wrap} style={{ height: H * scale }}>
      <div className="flow__stage" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        <svg className="flow__edges" width={W} height={H} aria-hidden="true">
          {edges.map((e, i) => {
            const d = edgePath(e.a, e.b)
            const live = step > e.col
            return (
              <g key={i}>
                <path d={d} className={`flow__edge ${live ? 'is-live' : ''}`} />
                {live && !e.plus && (
                  <circle r="4" className="flow__pulse">
                    <animateMotion dur="0.75s" repeatCount="1" path={d} fill="freeze" />
                  </circle>
                )}
              </g>
            )
          })}
          {tools && nodes.filter((n) => n.agent).map((n) =>
            [0, 1, 2, 3].map((k) => {
              const px = n.x + 30 + k * ((n.w - 60) / 3)
              return (
                <g key={n.id + k}>
                  <path d={`M${px} ${n.y + n.h + 6} V ${n.y + n.h + 82}`} className="flow__edge flow__edge--tool" />
                  <rect x={px - 5} y={n.y + n.h + 1} width="10" height="10" transform={`rotate(45 ${px} ${n.y + n.h + 6})`} className="flow__diamond" />
                </g>
              )
            })
          )}
        </svg>

        {nodes.map((n, i) => {
          const done = step >= n.col
          return (
            <button
              key={n.id}
              type="button"
              className={`flow__node ${n.agent ? 'flow__node--agent' : ''} ${n.trigger ? 'flow__node--trigger' : ''} ${done ? 'is-done' : ''} ${open === n.id ? 'is-open' : ''}`}
              style={{ left: n.x, top: n.y, width: n.w, height: n.h, animationDelay: `${i * 60}ms` }}
              onClick={() => setOpen(open === n.id ? null : n.id)}
              aria-label={`${n.label} — ${n.sub}`}
            >
              <span className="flow__port flow__port--in" />
              <span className="flow__port flow__port--out" />
              <Icon name={n.icon} size={n.agent ? 24 : 28} />
              {n.agent && <span className="flow__agent-label">{n.label}<small>{n.sub}</small></span>}
              {done && <span className="flow__check"><Icon name="check" size={11} strokeWidth={3} /></span>}
              {!n.agent && (
                <span className="flow__label">
                  {n.label}
                  <small>{n.sub}</small>
                </span>
              )}
            </button>
          )
        })}

        {tools && nodes.filter((n) => n.agent).map((n) =>
          [0, 1, 2, 3].map((k) => (
            <span key={n.id + 'p' + k} className="flow__toolplus" style={{ left: n.x + 30 + k * ((n.w - 60) / 3) - 14, top: n.y + n.h + 82 }}>+</span>
          ))
        )}

        {plusNode && <span className="flow__plus" style={{ left: plusNode.x, top: plusNode.y }}><Icon name="plus" size={18} /></span>}

        {openNode && (
          <div
            className="flow__pop"
            style={{ left: Math.min(openNode.x, W - 260), top: openNode.y + openNode.h + (openNode.agent ? 40 : 56) }}
            role="dialog"
          >
            <div className="flow__pop-head">
              <Icon name={openNode.icon} size={16} />
              <b>{openNode.label}</b>
              <button type="button" onClick={() => setOpen(null)} aria-label="Close"><Icon name="x" size={14} /></button>
            </div>
            <dl>
              <dt>Node</dt><dd>{openNode.sub}</dd>
              <dt>Step</dt><dd>{openNode.col + 1} of {cols}</dd>
              <dt>Status</dt><dd className="ok">{step >= openNode.col ? 'Succeeded' : 'Waiting'}</dd>
            </dl>
          </div>
        )}
      </div>
    </div>
  )
}
