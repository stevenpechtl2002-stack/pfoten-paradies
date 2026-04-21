import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Services from './components/Services'
import About from './components/About'
import BeforeAfter from './components/BeforeAfter'
import Reviews from './components/Reviews'
import Pricing from './components/Pricing'
import Location from './components/Location'
import Booking from './components/Booking'
import Instagram from './components/Instagram'
import Footer from './components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <div className="font-nunito">
          <Navbar />
          <main>
            <Hero />
            <Features />
            <Services />
            <About />
            <BeforeAfter />
            <Pricing />
            <Reviews />
            <Location />
            <Booking />
            <Instagram />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}
