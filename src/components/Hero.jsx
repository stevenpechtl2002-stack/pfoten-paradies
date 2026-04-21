import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

const DOG_IMG = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=90'

export default function Hero() {
  const containerRef = useRef(null)
  const [ready, setReady] = useState(false)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 55, damping: 28 })
  const py = useSpring(rawY, { stiffness: 55, damping: 28 })

  useEffect(() => {
    setReady(true)
    const h = (e) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 18)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 12)
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [rawX, rawY])

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const fadeOut = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const slideUp = useTransform(scrollYProgress, [0, 0.4], ['0%', '-8%'])

  return (
    <section ref={containerRef} className="relative h-[180vh]" id="home">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#FAFAFA' }}>

        {/* Soft blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{ position:'absolute', top:'-15%', right:'-8%', width:'60vw', height:'80vh',
            background:'radial-gradient(ellipse, #FFB5D828 0%, transparent 68%)',
            borderRadius:'60% 40% 55% 45% / 50% 60% 40% 50%' }} />
          <div style={{ position:'absolute', bottom:'-10%', left:'-10%', width:'45vw', height:'55vh',
            background:'radial-gradient(ellipse, #C5B5EA22 0%, transparent 68%)',
            borderRadius:'45% 55% 40% 60% / 60% 40% 60% 40%' }} />
        </div>

        <motion.div className="relative h-full flex items-center" style={{ opacity: fadeOut, y: slideUp }}>
          <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid md:grid-cols-[1fr_1.05fr] gap-12 items-center">

            {/* ── LEFT ── */}
            <div className="flex flex-col gap-6 z-10">

              {/* Google review badge */}
              <motion.div className="flex items-center gap-3 w-fit"
                initial={{ opacity:0, y:-16 }} animate={ready?{opacity:1,y:0}:{}}
                transition={{ delay:0.1, duration:0.6 }}>
                <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <div className="flex text-yellow-400 text-sm">{'★★★★★'}</div>
                  <span className="font-nunito font-700 text-gray-700 text-sm">4.9</span>
                  <span className="font-nunito text-gray-400 text-xs">(387 Bewertungen)</span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity:0, y:40 }} animate={ready?{opacity:1,y:0}:{}}
                transition={{ delay:0.2, duration:0.8, type:'spring', stiffness:80, damping:18 }}>
                <h1 className="font-pacifico leading-[0.95] text-gray-900"
                  style={{ fontSize:'clamp(2.8rem, 6.5vw, 7rem)' }}>
                  Sanfte Pflege<br />
                  <span style={{
                    background:'linear-gradient(135deg, #FFB5D8 0%, #C5B5EA 55%, #B5EAD7 100%)',
                    WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent'
                  }}>für Ihren Liebling</span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p className="font-nunito text-gray-500 leading-relaxed max-w-md"
                style={{ fontSize:'clamp(0.95rem, 1.3vw, 1.15rem)' }}
                initial={{ opacity:0, y:20 }} animate={ready?{opacity:1,y:0}:{}}
                transition={{ delay:0.4, duration:0.7 }}>
                Professionelles Grooming mit Herz — in Berlin-Mitte. Wir pflegen Ihren Hund mit Liebe, Geduld und premium Produkten.
              </motion.p>

              {/* Trust chips */}
              <motion.div className="flex flex-wrap gap-2"
                initial={{ opacity:0 }} animate={ready?{opacity:1}:{}}
                transition={{ delay:0.55, duration:0.6 }}>
                {['✅ Zertifizierte Fachkräfte','🌿 Naturprodukte','🐾 Alle Rassen'].map(t => (
                  <span key={t} className="font-nunito text-xs font-600 px-3 py-1.5 rounded-full bg-white text-gray-600 shadow-sm border border-gray-100">{t}</span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div className="flex flex-wrap gap-3"
                initial={{ opacity:0, y:16 }} animate={ready?{opacity:1,y:0}:{}}
                transition={{ delay:0.65, duration:0.6 }}>
                <motion.a href="#buchen"
                  className="font-nunito font-800 text-sm px-7 py-4 rounded-2xl text-white"
                  style={{ background:'linear-gradient(135deg,#FFB5D8,#C5B5EA)', boxShadow:'0 8px 28px rgba(255,181,216,0.4)' }}
                  whileHover={{ scale:1.04, boxShadow:'0 12px 40px rgba(255,181,216,0.6)' }}
                  whileTap={{ scale:0.97 }}>
                  Termin buchen →
                </motion.a>
                <motion.a href="tel:030123456"
                  className="font-nunito font-700 text-sm px-7 py-4 rounded-2xl text-gray-700 flex items-center gap-2"
                  style={{ background:'white', boxShadow:'0 4px 16px rgba(0,0,0,0.07)' }}
                  whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
                  <span>📞</span> 030 123456
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div className="flex items-center gap-8 pt-1"
                initial={{ opacity:0 }} animate={ready?{opacity:1}:{}}
                transition={{ delay:0.8, duration:0.6 }}>
                {[{n:'500+',l:'Hunde gepflegt'},{n:'8 J.',l:'Erfahrung'},{n:'3 Min.',l:'vom S-Bahnhof'}].map(({n,l},i)=>(
                  <div key={i} className="flex flex-col">
                    <span className="font-pacifico text-2xl text-gray-800">{n}</span>
                    <span className="font-nunito text-gray-400 text-xs tracking-wide">{l}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Photo ── */}
            <div className="relative flex items-center justify-center">
              <motion.div style={{ x:px, y:py }}
                initial={{ opacity:0, scale:0.85, rotate:-3 }}
                animate={ready?{opacity:1,scale:1,rotate:0}:{}}
                transition={{ delay:0.25, duration:1.1, type:'spring', stiffness:65, damping:15 }}>

                {/* Main blob image */}
                <div style={{
                  width:'clamp(290px, 40vw, 530px)', height:'clamp(350px, 48vw, 640px)',
                  borderRadius:'62% 38% 56% 44% / 46% 60% 40% 54%',
                  overflow:'hidden',
                  boxShadow:'0 32px 80px rgba(255,181,216,0.3), 0 8px 24px rgba(0,0,0,0.07)',
                }}>
                  <img src={DOG_IMG} alt="Hund nach dem Grooming"
                    className="w-full h-full object-cover" style={{ transform:'scale(1.06)' }} />
                </div>

                {/* Badge: Seit 2015 */}
                <motion.div className="absolute glass rounded-2xl px-4 py-3 shadow-md"
                  style={{ bottom:'14%', left:'-12%' }}
                  animate={{ y:[0,-7,0] }} transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}>
                  <p className="font-pacifico text-base" style={{ color:'#FFB5D8' }}>❤️ Seit 2015</p>
                  <p className="font-nunito text-gray-400 text-xs font-600">Berlins Lieblingsgroomer</p>
                </motion.div>

                {/* Badge: Open today */}
                <motion.div className="absolute glass rounded-2xl px-4 py-2.5 shadow-md flex items-center gap-2"
                  style={{ top:'10%', right:'-8%' }}
                  animate={{ y:[0,-5,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut', delay:1.5 }}>
                  <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow:'0 0 6px #4ade80' }} />
                  <p className="font-nunito font-700 text-gray-700 text-sm">Heute geöffnet</p>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          style={{ opacity: fadeOut }}
          animate={{ y:[0,7,0] }} transition={{ repeat:Infinity, duration:2, ease:'easeInOut' }}>
          <span className="font-nunito text-gray-300 text-xs tracking-[0.3em] uppercase">Scrollen</span>
          <div className="w-px h-7 bg-gradient-to-b from-gray-200 to-transparent" />
        </motion.div>

      </div>
    </section>
  )
}
