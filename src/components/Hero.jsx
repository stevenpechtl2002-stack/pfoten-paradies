import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Hero() {
  const [ready, setReady] = useState(false)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 60, damping: 28 })
  const py = useSpring(rawY, { stiffness: 60, damping: 28 })

  useEffect(() => {
    setReady(true)
    const h = (e) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 14)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 8)
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [rawX, rawY])

  const stagger = (delay) => ({
    initial: { opacity: 0, y: 28 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0a0a0f' }}>

      {/* ── VIDEO: fills right half, bleeds to screen edge ── */}
      <motion.div
        className="absolute top-0 right-0 h-full"
        style={{ width: '58%', x: px, y: py }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 1.2 }}>

        <video
          src="/hund.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ display: 'block' }}
        />

        {/* Gradient mask: fades video into background on left edge */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to right, #0a0a0f 0%, rgba(10,10,15,0.85) 15%, rgba(10,10,15,0.3) 35%, transparent 60%)'
        }} />
        {/* Top fade */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(10,10,15,0.5) 0%, transparent 20%, transparent 80%, rgba(10,10,15,0.7) 100%)'
        }} />
      </motion.div>

      {/* Ambient glow pulled from video palette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 70% at 75% 50%, rgba(120,90,60,0.18) 0%, transparent 70%)'
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 40% 50% at 15% 50%, rgba(255,181,216,0.06) 0%, transparent 70%)'
      }} />

      {/* ── CONTENT ── */}
      <div className="relative max-w-7xl mx-auto px-8 md:px-16 py-24 w-full">
        <div className="max-w-xl">

          {/* Tag badge */}
          <motion.div {...stagger(0.1)} className="mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="text-sm">🐾</span>
              <span className="font-nunito font-700 text-white/60 text-xs tracking-[0.25em] uppercase">Premium Hundesalon · Berlin</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-pacifico text-white leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(3rem, 5.5vw, 6.5rem)' }}
            initial={{ opacity: 0, y: 50 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            Pfoten<br />
            <span style={{
              background: 'linear-gradient(135deg, #FFB5D8, #C5B5EA)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 24px rgba(255,181,216,0.4))'
            }}>Paradies</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p {...stagger(0.42)}
            className="font-nunito text-white/55 font-300 mb-7 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', maxWidth: '38ch' }}>
            Ihr Liebling in den besten Händen — professionell, liebevoll, stressfrei.
          </motion.p>

          {/* Trust chips */}
          <motion.div {...stagger(0.52)} className="flex flex-wrap gap-2 mb-8">
            {['IHK-zertifiziert', 'Naturprodukte', 'Alle Rassen'].map(chip => (
              <span key={chip} className="font-nunito font-600 text-xs px-3.5 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                {chip}
              </span>
            ))}
          </motion.div>

          {/* Google badge + open */}
          <motion.div {...stagger(0.62)} className="flex flex-wrap items-center gap-3 mb-9">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="flex text-yellow-400 text-sm">★★★★★</div>
              <span className="font-nunito font-800 text-white text-sm">4.9</span>
              <span className="font-nunito text-white/50 text-xs">· 387 Bewertungen</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl"
              style={{ background: 'rgba(181,234,215,0.1)', border: '1px solid rgba(181,234,215,0.18)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px #4ade80' }} />
              <span className="font-nunito font-700 text-green-300 text-xs">Heute geöffnet</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div {...stagger(0.75)} className="flex flex-wrap gap-3">
            <motion.a href="#buchen"
              className="font-nunito font-800 text-sm px-8 py-4 rounded-2xl text-white"
              style={{ background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)', boxShadow: '0 8px 32px rgba(255,181,216,0.4)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 14px 48px rgba(255,181,216,0.6)' }}
              whileTap={{ scale: 0.97 }}>
              Termin buchen →
            </motion.a>
            <motion.a href="tel:030123456"
              className="font-nunito font-700 text-sm px-7 py-4 rounded-2xl text-white flex items-center gap-2"
              style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.13)' }}
              whileTap={{ scale: 0.97 }}>
              <span>📞</span> 030 123456
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div {...stagger(0.9)} className="flex gap-8 mt-10 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {[
              { num: '500+', label: 'Zufriedene Hunde' },
              { num: '8 J.', label: 'Erfahrung' },
              { num: '4.9★', label: 'Google Rating' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="font-pacifico text-2xl" style={{
                  background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>{num}</p>
                <p className="font-nunito text-white/35 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Floating badges over video */}
      <motion.div
        className="absolute hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl"
        style={{
          right: '6%', top: '22%',
          background: 'rgba(10,10,15,0.75)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.8 }}>
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="flex items-center gap-2">
          <span className="text-xl">✂️</span>
          <div>
            <p className="font-nunito font-800 text-white text-xs">Profi-Styling</p>
            <p className="font-nunito text-white/45 text-xs">Alle Rassen</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl"
        style={{
          right: '10%', bottom: '20%',
          background: 'rgba(255,181,216,0.12)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,181,216,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.15, duration: 0.8 }}>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
          className="flex items-center gap-2">
          <span className="text-xl">🌿</span>
          <div>
            <p className="font-nunito font-800 text-white text-xs">Naturprodukte</p>
            <p className="font-nunito text-white/45 text-xs">Sanft & sicher</p>
          </div>
        </motion.div>
      </motion.div>

    </section>
  )
}
