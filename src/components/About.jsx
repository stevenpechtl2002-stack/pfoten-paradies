import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const stats = [
  { value: 500, suffix: '+', label: 'Glückliche Hunde', icon: '🐶' },
  { value: 8, suffix: '', label: 'Jahre Erfahrung', icon: '🏆' },
  { value: 4.9, suffix: '★', label: 'Bewertung', icon: '⭐' },
]

function CountUp({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0)
  const isFloat = !Number.isInteger(target)

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const step = target / 60
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target, isFloat])

  return (
    <span className="font-pacifico text-4xl md:text-5xl" style={{ color: '#FFB5D8' }}>
      {isFloat ? count.toFixed(1) : count}{suffix}
    </span>
  )
}

export default function About() {
  const imgRef = useRef(null)
  const sectionRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="ueber-uns" className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block font-nunito text-sm font-700 tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full" style={{ background: '#B5EAD720', color: '#8dd5bb' }}>
              Über uns
            </span>
            <h2 className="font-pacifico text-4xl md:text-5xl text-gray-800 leading-tight mb-6">
              Mit Herz & Leidenschaft 💕
            </h2>
            <div className="space-y-4 font-nunito text-gray-600 leading-relaxed">
              <p>
                Willkommen im <strong className="text-gray-800">Pfoten Paradies</strong> — dem Ort, wo jeder Hund wie ein König behandelt wird. Seit 2015 verwöhnen wir Vierbeiner aller Rassen und Größen mit professioneller Pflege und unbedingter Liebe.
              </p>
              <p>
                Unser erfahrenes Team aus zertifizierten Hundepflegern weiß, dass jedes Tier einzigartig ist. Wir nehmen uns Zeit, Ihren Liebling kennenzulernen und eine entspannte Atmosphäre zu schaffen, damit der Friseurbesuch zum Erlebnis wird.
              </p>
              <p>
                Wir verwenden ausschließlich tierfreundliche, naturbasierte Pflegeprodukte — für strahlendes Fell und glückliche Pfoten.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-2xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <CountUp target={s.value} suffix={s.suffix} isVisible={statsVisible} />
                  <p className="font-nunito text-gray-500 text-xs mt-1 font-600">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-4xl overflow-hidden" style={{ height: 520 }}>
              <motion.img
                ref={imgRef}
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
                alt="Happy dog after grooming"
                className="w-full h-full object-cover"
                style={{ y: imgY }}
              />
              <div className="absolute inset-0 rounded-4xl" style={{
                background: 'linear-gradient(to top, rgba(255,181,216,0.15) 0%, transparent 60%)'
              }} />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 glass-pink rounded-3xl px-6 py-4 shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="text-3xl mb-1">❤️</div>
              <p className="font-pacifico text-xl" style={{ color: '#FFB5D8' }}>Seit 2015</p>
              <p className="font-nunito text-gray-500 text-xs font-600">Mit Liebe dabei</p>
            </motion.div>

            {/* Second badge */}
            <motion.div
              className="absolute -top-4 -right-4 glass rounded-2xl px-5 py-3 shadow-lg"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <p className="font-nunito font-700 text-gray-800">4.9 ⭐</p>
              <p className="font-nunito text-gray-400 text-xs">500+ Bewertungen</p>
            </motion.div>

            {/* Decorative blob */}
            <div
              className="absolute -z-10 -bottom-10 -right-10 w-72 h-72 rounded-full opacity-30"
              style={{ background: '#C5B5EA', filter: 'blur(60px)' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
