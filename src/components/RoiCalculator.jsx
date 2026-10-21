import { useState } from 'react'
import { workflows, FEE_SHARE, formatR } from '../data.js'

const WEEKS_PER_MONTH = 52 / 12

function Slider({ label, value, onChange, min, max, step = 1, format = (v) => v }) {
  return (
    <label className="slider">
      <span className="slider__label">
        {label}
        <output>{format(value)}</output>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--pct': `${((value - min) / (max - min)) * 100}%` }}
      />
    </label>
  )
}

export default function RoiCalculator({ onPick }) {
  const [process, setProcess] = useState(workflows[1].title)
  const [people, setPeople] = useState(3)
  const [hours, setHours] = useState(6)
  const [rate, setRate] = useState(250)
  const [auto, setAuto] = useState(80)

  // Hours spent/week × people × automatable share → hours saved per month
  const hoursSaved = people * hours * (auto / 100) * WEEKS_PER_MONTH
  const value = hoursSaved * rate
  const fee = value * FEE_SHARE
  const net = value - fee
  const fte = hoursSaved / 160

  const share = Math.round(FEE_SHARE * 100)

  return (
    <section className="section section--alt" id="roi">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">ROI calculator</span>
          <h2>What would one workflow save you?</h2>
          <p>Enter the numbers for one manual process. The estimate updates as you type.</p>
        </div>

        <div className="roi">
          <div className="roi__inputs">
            <label className="slider">
              <span className="slider__label">Which process?</span>
              <select value={process} onChange={(e) => setProcess(e.target.value)}>
                {workflows.map((w) => <option key={w.title}>{w.title}</option>)}
                <option>Something else</option>
              </select>
            </label>
            <Slider label="People doing this task" value={people} onChange={setPeople} min={1} max={50} />
            <Slider label="Hours each spends on it per week" value={hours} onChange={setHours} min={1} max={40} />
            <Slider label="Average cost per staff hour" value={rate} onChange={setRate} min={80} max={1200} step={10} format={formatR} />
            <Slider label="Share of the task we can automate" value={auto} onChange={setAuto} min={20} max={95} step={5} format={(v) => `${v}%`} />
          </div>

          <div className="roi__results">
            <div className="roi__big">
              <small>Hours saved per month</small>
              <strong>{Math.round(hoursSaved).toLocaleString('en-ZA')}</strong>
            </div>
            <div className="roi__row"><span>Value of those hours</span><b>{formatR(value)}</b></div>
            <div className="roi__row"><span>Our fee ({share}% of value saved)</span><b>{formatR(fee)}</b></div>
            <div className="roi__row roi__row--net"><span>Your net saving / month</span><b>{formatR(net)}</b></div>
            <div className="roi__row"><span>Net saving / year</span><b>{formatR(net * 12)}</b></div>
            <div className="roi__bar" aria-hidden="true">
              <div className="roi__keep" style={{ width: `${100 - share}%` }} />
              <div className="roi__fee" style={{ width: `${share}%` }} />
            </div>
            <div className="roi__legend">
              <span><i className="k" /> You keep</span>
              <span><i className="f" /> Our fee</span>
            </div>
            <p className="roi__equiv">
              That's like adding <b>{fte.toFixed(1)}</b> full-time {fte >= 0.95 && fte < 1.05 ? 'person' : 'people'} to your team.
            </p>
            <button
              className="btn btn--primary btn--block"
              onClick={() =>
                onPick(
                  'Workflows — pay per hour saved',
                  `Process: ${process}. ${people} people × ${hours} hrs/week at ${formatR(rate)}/hr. Estimated ${Math.round(hoursSaved)} hrs saved per month.`
                )
              }
            >
              Get this workflow built
            </button>
          </div>
        </div>
        <p className="roi__fine">
          This is an estimate. The final saving is agreed during your free audit and measured from n8n
          execution logs.
        </p>
      </div>
    </section>
  )
}
