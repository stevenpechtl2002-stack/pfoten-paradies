import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Preise', href: '#preise' },
  { label: 'Bewertungen', href: '#bewertungen' },
  { label: 'Kontakt', href: '#buchen' },
]

// Animated roller coaster: cart rides a sine wave from left to right, loops
function RollerCoaster() {
  const cartRef = useRef(null)
  const rafRef = useRef(null)
  const tRef = useRef(0)
  const W = 72, H = 28, AMP = 9, FREQ = 2

  useEffect(() => {
    const tick = () => {
      tRef.current += 0.012
      const t = tRef.current
      const x = ((t % 1) * W)
      const y = H / 2 - AMP * Math.sin(t * FREQ * 2 * Math.PI)
      if (cartRef.current) {
        cartRef.current.setAttribute('cx', x)
        cartRef.current.setAttribute('cy', y)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Build the wave path: one full sine wave across the width
  const pathPoints = Array.from({ length: 81 }, (_, i) => {
    const x = (i / 80) * W
    const y = H / 2 - AMP * Math.sin((i / 80) * FREQ * 2 * Math.PI)
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ')

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      {/* Track */}
      <path d={pathPoints} fill="none" stroke="#FFB5D8" strokeWidth="2.2" strokeLinecap="round" />
      {/* Support lines (decorative) */}
      {[12, 24, 36, 48, 60].map(x => {
        const y = H / 2 - AMP * Math.sin((x / W) * FREQ * 2 * Math.PI)
        return <line key={x} x1={x} y1={y + 2} x2={x} y2={H + 2} stroke="rgba(255,181,216,0.35)" strokeWidth="1.2" />
      })}
      {/* Cart */}
      <circle ref={cartRef} cx="0" cy={H / 2} r="4.5" fill="url(#cartGrad)" />
      <defs>
        <radialGradient id="cartGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#C5B5EA" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
      style={{ height: 72 }}
      animate={{
        background: scrolled ? 'rgba(250,250,250,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        boxShadow: scrolled ? '0 2px 30px rgba(255,181,216,0.2)' : 'none',
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-3 group">
        <RollerCoaster />
        <span className="font-pacifico text-xl" style={{ color: scrolled ? '#333' : '#1a1025' }}>
          Hundesalon Fellraum
        </span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <motion.a
            key={l.href}
            href={l.href}
            className="font-nunito font-600 text-sm tracking-wide relative group"
            style={{ color: scrolled ? '#555' : '#333' }}
            whileHover={{ y: -1 }}
          >
            {l.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rosa group-hover:w-full transition-all duration-300 rounded-full" />
          </motion.a>
        ))}
        <motion.a
          href="#buchen"
          className="font-nunito font-700 text-sm px-5 py-2.5 rounded-full text-white"
          style={{ background: 'linear-gradient(135deg, #FFB5D8, #C5B5EA)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Termin buchen 🐾
        </motion.a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-0.5 w-6 rounded-full"
            style={{ background: scrolled ? '#333' : '#555' }}
            animate={{
              rotate: open && i === 0 ? 45 : open && i === 2 ? -45 : 0,
              y: open && i === 0 ? 8 : open && i === 2 ? -8 : 0,
              opacity: open && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 glass py-6 px-6 flex flex-col gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-nunito font-600 text-gray-700 text-lg"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#buchen"
              className="font-nunito font-700 text-center py-3 rounded-full text-white"
              style={{ background: 'linear-gradient(135deg, #FFB5D8, #C5B5EA)' }}
              onClick={() => setOpen(false)}
            >
              Termin buchen 🐾
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
