import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

const BG_IMAGE = 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1920&q=80'

const PFOTEN = 'PFOTEN'.split('')
const PARADIES = 'PARADIES'.split('')

export default function Hero() {
  const containerRef = useRef(null)

  // Mouse parallax on background
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const bgX = useSpring(rawX, { stiffness: 40, damping: 25 })
  const bgY = useSpring(rawY, { stiffness: 40, damping: 25 })

  useEffect(() => {
    const handler = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5)
      const ny = (e.clientY / window.innerHeight - 0.5)
      rawX.set(nx * -24)
      rawY.set(ny * -14)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [rawX, rawY])

  // Scroll transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const textOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0])
  const textY      = useTransform(scrollYProgress, [0, 0.4],  ['0%', '-12%'])
  const bgScale    = useTransform(scrollYProgress, [0, 1],    [1, 1.18])
  const overlayOp  = useTransform(scrollYProgress, [0, 0.5],  [0, 0.5])

  return (
    <section ref={containerRef} className="relative h-[200vh]" id="home">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Background image (parallax: scroll + mouse) ── */}
        <motion.div
          className="absolute inset-0"
          style={{ x: bgX, y: bgY, scale: bgScale }}
        >
          <img
            src={BG_IMAGE}
            alt="Hund beim Friseur"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(1.08)', transformOrigin: 'center' }}
          />
        </motion.div>

        {/* ── Gradient overlays ── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.55) 100%)',
        }} />
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)',
        }} />
        {/* Scroll darkness overlay */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: overlayOp }}
        />
        {/* Grain texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }} />

        {/* ── Hero content ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ opacity: textOpacity, y: textY }}
        >
          {/* Trust badge */}
          <motion.div
            className="mb-8 glass-pink rounded-full px-5 py-2 flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-sm">🏆</span>
            <span className="font-nunito font-700 text-white text-xs tracking-widest uppercase">
              Berlins beliebtester Hundesalon · Seit 2015
            </span>
          </motion.div>

          {/* Headline — background-clip photo through text */}
          <div className="text-center px-4 leading-none">
            {/* PFOTEN — letters stagger in */}
            <div className="flex justify-center">
              {PFOTEN.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-pacifico select-none inline-block"
                  style={{
                    fontSize: 'clamp(3.5rem, 13vw, 15vw)',
                    background: `url(${BG_IMAGE}) center/cover`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'brightness(1.4) saturate(1.3) contrast(1.1)',
                    backgroundPositionY: '30%',
                  }}
                  initial={{ opacity: 0, y: 60, rotate: -8 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    delay: 0.35 + i * 0.06,
                    duration: 0.7,
                    type: 'spring',
                    stiffness: 120,
                    damping: 14,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* PARADIES */}
            <div className="flex justify-center -mt-2 md:-mt-4">
              {PARADIES.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-pacifico select-none inline-block"
                  style={{
                    fontSize: 'clamp(2.8rem, 11vw, 13vw)',
                    background: `url(${BG_IMAGE}) center/cover`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'brightness(1.4) saturate(1.3) contrast(1.1)',
                    backgroundPositionY: '55%',
                  }}
                  initial={{ opacity: 0, y: 60, rotate: 8 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.055,
                    duration: 0.7,
                    type: 'spring',
                    stiffness: 110,
                    damping: 14,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Divider line */}
          <motion.div
            className="mt-6 flex items-center gap-4"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
          >
            <div className="h-px w-16 bg-white/30" />
            <svg width="18" height="18" viewBox="0 0 100 100" style={{ opacity: 0.7 }}>
              <ellipse cx="50" cy="72" rx="22" ry="18" fill="white"/>
              <ellipse cx="25" cy="50" rx="10" ry="13" fill="white"/>
              <ellipse cx="75" cy="50" rx="10" ry="13" fill="white"/>
              <ellipse cx="35" cy="32" rx="9" ry="12" fill="white"/>
              <ellipse cx="65" cy="32" rx="9" ry="12" fill="white"/>
            </svg>
            <div className="h-px w-16 bg-white/30" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="mt-4 font-nunito text-white/90 text-center text-base md:text-xl font-300 tracking-[0.25em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            Ihr Liebling in den besten Händen
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-9 flex flex-col sm:flex-row gap-3 items-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.7 }}
          >
            <MagnetButton href="#buchen" label="Termin buchen" primary />
            <MagnetButton href="#leistungen" label="Leistungen ansehen" />
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="absolute bottom-16 flex items-center gap-8 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            {[
              { val: '500+', label: 'Glückliche Hunde' },
              { val: '4.9★', label: 'Bewertung' },
              { val: '8 Jahre', label: 'Erfahrung' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p className="font-pacifico text-white text-xl md:text-2xl">{val}</p>
                <p className="font-nunito text-white/55 text-xs tracking-wider uppercase mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-6 flex flex-col items-center gap-1.5"
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

function MagnetButton({ href, label, primary }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 280, damping: 20 })
  const sy = useSpring(y, { stiffness: 280, damping: 20 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative font-nunito font-700 px-8 py-4 rounded-full text-sm tracking-widest uppercase overflow-hidden"
      style={{
        background: primary
          ? 'linear-gradient(135deg, #FFB5D8, #C5B5EA)'
          : 'rgba(255,255,255,0.12)',
        backdropFilter: primary ? undefined : 'blur(12px)',
        border: primary ? 'none' : '1px solid rgba(255,255,255,0.3)',
        color: 'white',
        x: sx, y: sy,
        boxShadow: primary ? '0 8px 32px rgba(255,181,216,0.45)' : undefined,
      }}
      whileHover={{
        boxShadow: primary
          ? '0 12px 48px rgba(255,181,216,0.65)'
          : '0 8px 32px rgba(255,255,255,0.15)',
        scale: 1.03,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {primary && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, #ff8ec3, #a99bd4)' }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.a>
  )
}
