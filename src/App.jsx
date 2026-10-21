import { Route, Routes } from 'react-router-dom'
import { Footer, Nav, ScrollToTop } from './components/Chrome.jsx'
import Home from './pages/Home.jsx'
import { Product, ProductsIndex } from './pages/Products.jsx'
import { WorkflowDetail, WorkflowsIndex } from './pages/Workflows.jsx'
import Integrations from './pages/Integrations.jsx'
import Solution from './pages/Solution.jsx'
import Pricing from './pages/Pricing.jsx'
import { Contact, NotFound } from './pages/Contact.jsx'
import Events from './pages/Events.jsx'
import Stories from './pages/Stories.jsx'
import { Announcement, RevealOnScroll, SupportChip } from './components/Motion.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <RevealOnScroll />
      <Announcement />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsIndex />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/workflows" element={<WorkflowsIndex />} />
          <Route path="/workflows/:slug" element={<WorkflowDetail />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/solutions/:id" element={<Solution />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/events" element={<Events />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <SupportChip />
    </>
  )
}
