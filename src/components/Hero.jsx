import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const IMG = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=90'

export default function Hero() {
  const [ready, setReady] = useState(false)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 50, damping: 30 })
  const py = useSpring(rawY, { stiffness: 50, damping: 30 })

  useEffect(() => {
    setReady(true)
    const h = (e) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 16)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 10)
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [rawX, rawY])

  const stagger = (delay) => ({
    initial: { opacity: 0, y: 32 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="home"
      style={{ background: 'linear-gradient(160deg, #fff 60%, #FFF5FA 100%)' }}>

      {/* Decorative ring — top right */}
      <motion.div className="absolute pointer-events-none"
        style={{ right: '3%', top: '8%', width: '52vw', height: '52vw', maxWidth: 680, maxHeight: 680 }}
        initial={{ opacity: 0, scale: 0.7 }} animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
        <div className="w-full h-full rounded-full"
          style={{ border: '1.5px solid rgba(255,181,216,0.25)', position: 'absolute' }} />
        <div className="w-[88%] h-[88%] rounded-full absolute top-[6%] left-[6%]"
          style={{ border: '1px solid rgba(197,181,234,0.2)' }} />
        {/* Fill arc */}
        <div className="w-full h-full rounded-full absolute"
          style={{ background: 'radial-gradient(ellipse at 60% 40%, #FFB5D818 0%, transparent 70%)' }} />
      </motion.div>

      {/* Floating dot accent */}
      <motion.div className="absolute w-3 h-3 rounded-full pointer-events-none"
        style={{ right: '46%', top: '18%', background: '#FFB5D8' }}
        animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute w-2 h-2 rounded-full pointer-events-none"
        style={{ right: '38%', top: '72%', background: '#C5B5EA' }}
        animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-28 grid md:grid-cols-[1fr_1fr] gap-8 items-center">

        {/* ── LEFT ── */}
        <div className="flex flex-col gap-7">

          {/* Tag */}
          <motion.div {...stagger(0.15)} className="flex items-center gap-3 w-fit">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: '#FFB5D818', border: '1px solid #FFB5D840' }}>
              <span className="text-sm">🐾</span>
              <span className="font-nunito font-700 text-xs tracking-[0.2em] uppercase" style={{ color: '#FFB5D8' }}>
                Premium Hundesalon · Berlin
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-pacifico text-gray-900 leading-[1.0]"
              style={{ fontSize: 'clamp(2.6rem, 5.8vw, 6.2rem)' }}
              initial={{ opacity: 0, y: 80 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              Ihr Hund<br />
              <span style={{
                background: 'linear-gradient(135deg, #FFB5D8, #C5B5EA)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                verdient
              </span>{' '}
              <span style={{ color: '#222' }}>das Beste.</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p {...stagger(0.45)}
            className="font-nunito text-gray-500 leading-[1.75] max-w-[420px]"
            style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}>
            Professionelles Grooming mit Liebe und Geduld — für alle Rassen und Größen. Seit 2015 Berlins Lieblingsadresse für Hunde.
          </motion.p>

          {/* Google badge */}
          <motion.div {...stagger(0.55)} className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 bg-white rounded-2xl px-4 py-2.5"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #f0f0f0' }}>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="flex text-yellow-400" style={{ fontSize: 13 }}>★★★★★</div>
              <span className="font-nunito font-800 text-gray-800 text-sm">4.9</span>
              <span className="font-nunito text-gray-400 text-xs">· 387 Bewertungen</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl" style={{ background: '#B5EAD730' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" style={{ boxShadow: '0 0 5px #22c55e' }} />
              <span className="font-nunito font-700 text-xs text-green-700">Heute geöffnet</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div {...stagger(0.65)} className="flex flex-wrap gap-3">
            <motion.a href="#buchen"
              className="font-nunito font-800 text-sm px-7 py-4 rounded-2xl text-white"
              style={{ background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)', boxShadow: '0 8px 28px rgba(255,181,216,0.45)' }}
              whileHover={{ scale: 1.04, boxShadow: '0 14px 40px rgba(255,181,216,0.6)' }}
              whileTap={{ scale: 0.97 }}>
              Termin buchen →
            </motion.a>
            <motion.a href="tel:030123456"
              className="font-nunito font-700 text-sm px-6 py-4 rounded-2xl text-gray-700 flex items-center gap-2"
              style={{ background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', border: '1px solid #f0f0f0' }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.97 }}>
              <span>📞</span> 030 123456
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div {...stagger(0.78)} className="flex items-center gap-6 pt-1">
            {[{ n: '500+', l: 'Hunde gepflegt' }, { n: '8 J.', l: 'Erfahrung' }, { n: '6', l: 'Leistungen' }].map(({ n, l }, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-pacifico text-[1.6rem] text-gray-800">{n}</span>
                <span className="font-nunito text-gray-400 text-xs tracking-wide">{l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Photo ── */}
        <div className="relative flex items-center justify-center md:justify-end">
          <motion.div style={{ x: px, y: py }}
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={ready ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative">

            {/* Photo */}
            <div className="relative rounded-[2.5rem] overflow-hidden"
              style={{
                width: 'clamp(280px, 38vw, 500px)',
                height: 'clamp(360px, 50vw, 640px)',
                boxShadow: '0 32px 80px rgba(255,181,216,0.25), 0 8px 24px rgba(0,0,0,0.08)',
              }}>
              <img src={IMG} alt="Glücklicher Hund nach dem Grooming"
                className="w-full h-full object-cover" />
              {/* subtle bottom fade */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to bottom, transparent 60%, rgba(255,181,216,0.15) 100%)'
              }} />
            </div>

            {/* Badge: Seit 2015 */}
            <motion.div className="absolute glass rounded-2xl px-4 py-3 shadow-lg"
              style={{ bottom: '14%', left: '-13%' }}
              initial={{ opacity: 0, x: -20 }} animate={ready ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}>
              <p className="font-pacifico text-base" style={{ color: '#FFB5D8' }}>❤️ Seit 2015</p>
              <p className="font-nunito text-gray-400 text-xs font-600">Vertrauen seit Tag 1</p>
            </motion.div>

            {/* Badge: Nächster Termin */}
            <motion.div className="absolute glass rounded-2xl px-4 py-3 shadow-lg"
              style={{ top: '7%', right: '-10%' }}
              initial={{ opacity: 0, x: 20 }} animate={ready ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.05, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}>
              <p className="font-nunito font-800 text-gray-800 text-sm">📅 Nächster Termin</p>
              <p className="font-nunito font-700 text-xs" style={{ color: '#FFB5D8' }}>Morgen verfügbar</p>
            </motion.div>

          </motion.div>
        </div>

      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: 60 }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
