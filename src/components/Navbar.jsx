import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Preise', href: '#preise' },
  { label: 'Bewertungen', href: '#bewertungen' },
  { label: 'Kontakt', href: '#buchen' },
]

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
      <a href="#" className="flex items-center gap-2 group">
        <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}>
          <svg width="32" height="32" viewBox="0 0 100 100">
            <ellipse cx="50" cy="72" rx="22" ry="18" fill="#FFB5D8" />
            <ellipse cx="25" cy="50" rx="10" ry="13" fill="#FFB5D8" />
            <ellipse cx="75" cy="50" rx="10" ry="13" fill="#FFB5D8" />
            <ellipse cx="35" cy="32" rx="9" ry="12" fill="#FFB5D8" />
            <ellipse cx="65" cy="32" rx="9" ry="12" fill="#FFB5D8" />
          </svg>
        </motion.div>
        <span className="font-pacifico text-xl" style={{ color: scrolled ? '#333' : 'white' }}>
          Pfoten Paradies
        </span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <motion.a
            key={l.href}
            href={l.href}
            className="font-nunito font-600 text-sm tracking-wide relative group"
            style={{ color: scrolled ? '#555' : 'rgba(255,255,255,0.9)' }}
            whileHover={{ y: -1 }}
          >
            {l.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rosa group-hover:w-full transition-all duration-300 rounded-full" />
          </motion.a>
        ))}
        <motion.a
          href="#buchen"
          className="font-nunito font-700 text-sm px-5 py-2.5 rounded-full text-white glow-btn pulse-glow"
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
            style={{ background: scrolled ? '#333' : 'white' }}
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
