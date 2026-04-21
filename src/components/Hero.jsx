import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Hero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const rafRef = useRef(null)
  const targetTime = useRef(0)
  const currentTime = useRef(0)
  const [ready, setReady] = useState(false)
  const [duration, setDuration] = useState(0)

  // Mouse parallax for overlay content
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 50, damping: 30 })
  const py = useSpring(rawY, { stiffness: 50, damping: 30 })

  // ── Scroll → video time ──────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onLoaded = () => {
      setDuration(video.duration)
      video.pause()
      video.currentTime = 0
      currentTime.current = 0
      targetTime.current = 0
    }

    video.addEventListener('loadedmetadata', onLoaded)
    if (video.readyState >= 1) onLoaded()

    return () => video.removeEventListener('loadedmetadata', onLoaded)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !duration) return

    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      // Scroll range: section top → section bottom - viewport
      const rect = section.getBoundingClientRect()
      const totalScroll = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll))
      targetTime.current = progress * duration
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [duration])

  // 60fps lerp loop
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      const diff = Math.abs(targetTime.current - currentTime.current)
      if (diff > 0.016) {
        currentTime.current = lerp(currentTime.current, targetTime.current, 0.12)
        video.currentTime = currentTime.current
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    setReady(true)
    const h = (e) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 14)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 10)
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
    // Tall section — scroll distance = video playback range
    <section ref={sectionRef} className="relative" style={{ height: '500vh' }} id="home">

      {/* Sticky fullscreen */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── VIDEO ── */}
        <video
          ref={videoRef}
          src="/hund.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted
          preload="auto"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.55) 100%)'
        }} />

        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
        }} />

        {/* ── CONTENT ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ x: px, y: py }}
        >
          {/* Tag */}
          <motion.div {...stagger(0.15)} className="mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span className="text-sm">🐾</span>
              <span className="font-nunito font-700 text-white text-xs tracking-[0.25em] uppercase">Premium Hundesalon · Berlin</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-pacifico text-white leading-[1.0] mb-5"
            style={{ fontSize: 'clamp(3rem, 8vw, 9rem)', textShadow: '0 4px 40px rgba(0,0,0,0.3)' }}
            initial={{ opacity: 0, y: 60 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            Pfoten<br />
            <span style={{
              background: 'linear-gradient(135deg, #FFB5D8, #C5B5EA)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 20px rgba(255,181,216,0.5))'
            }}>Paradies</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p {...stagger(0.5)}
            className="font-nunito text-white/80 font-300 mb-8 max-w-lg"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', letterSpacing: '0.05em' }}>
            Ihr Liebling in den besten Händen
          </motion.p>

          {/* Google badge */}
          <motion.div {...stagger(0.62)} className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="flex text-yellow-400 text-sm">★★★★★</div>
              <span className="font-nunito font-800 text-white text-sm">4.9</span>
              <span className="font-nunito text-white/60 text-xs">· 387 Bewertungen</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl"
              style={{ background: 'rgba(181,234,215,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(181,234,215,0.3)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px #4ade80' }} />
              <span className="font-nunito font-700 text-green-300 text-xs">Heute geöffnet</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div {...stagger(0.75)} className="flex flex-wrap gap-3 justify-center">
            <motion.a href="#leistungen"
              className="font-nunito font-800 text-sm px-8 py-4 rounded-2xl text-white"
              style={{ background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)', boxShadow: '0 8px 32px rgba(255,181,216,0.5)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 14px 48px rgba(255,181,216,0.7)' }}
              whileTap={{ scale: 0.97 }}>
              Termin buchen →
            </motion.a>
            <motion.a href="tel:030123456"
              className="font-nunito font-700 text-sm px-7 py-4 rounded-2xl text-white flex items-center gap-2"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.25)' }}
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.97 }}>
              <span>📞</span> 030 123456
            </motion.a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}>
            <span className="font-nunito text-white/40 text-xs tracking-[0.3em] uppercase">Scrollen</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
