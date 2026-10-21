import { useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Strip from './components/Strip.jsx'
import Products from './components/Products.jsx'
import Workflows from './components/Workflows.jsx'
import Pricing from './components/Pricing.jsx'
import RoiCalculator from './components/RoiCalculator.jsx'
import Partners from './components/Partners.jsx'
import Process from './components/Process.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  // Shared so pricing buttons and the ROI calculator can pre-fill the contact form
  const [interest, setInterest] = useState('Not sure yet — audit me')
  const [message, setMessage] = useState('')

  const pick = (value, prefill = '') => {
    setInterest(value)
    if (prefill) setMessage(prefill)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Strip />
        <Products onPick={pick} />
        <Workflows />
        <Pricing onPick={pick} />
        <RoiCalculator onPick={pick} />
        <Partners />
        <Process />
        <Faq />
        <Contact
          interest={interest}
          setInterest={setInterest}
          message={message}
          setMessage={setMessage}
        />
      </main>
      <Footer />
    </>
  )
}
