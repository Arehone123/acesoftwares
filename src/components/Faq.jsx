import { faqs } from '../data.js'

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container container--narrow">
        <div className="section__head">
          <span className="eyebrow">FAQ</span>
          <h2>Questions we get a lot</h2>
        </div>
        <div className="faq">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
