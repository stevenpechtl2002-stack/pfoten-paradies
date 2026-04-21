import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const stats = [
  { value: 500, suffix: '+', label: 'Glückliche Hunde', icon: '🐶' },
  { value: 8,   suffix: ' J.', label: 'Erfahrung', icon: '🏆' },
  { value: 4.9, suffix: '★', label: 'Bewertung', icon: '⭐' },
]

function CountUp({ target, suffix, run }) {
  const [val, setVal] = useState(0)
  const isFloat = !Number.isInteger(target)
  useEffect(() => {
    if (!run) return
    let v = 0
    const step = target / 55
    const t = setInterval(() => {
      v += step
      if (v >= target) { setVal(target); clearInterval(t) }
      else setVal(isFloat ? parseFloat(v.toFixed(1)) : Math.floor(v))
    }, 16)
    return () => clearInterval(t)
  }, [run, target, isFloat])
  return <span>{isFloat ? val.toFixed(1) : val}{suffix}</span>
}

export default function About() {
  const imgRef = useRef(null)
  const sectionRef = useRef(null)
  const [run, setRun] = useState(false)

  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRun(true) }, { threshold: 0.3 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="ueber-uns" className="py-24" style={{ background: 'white' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <motion.div className="flex flex-col gap-7"
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

          <div>
            <span className="inline-block font-nunito text-xs font-700 tracking-[0.25em] uppercase mb-3 px-4 py-1.5 rounded-full"
              style={{ background: '#B5EAD720', color: '#8dd5bb' }}>Über uns</span>
            <h2 className="font-pacifico text-3xl md:text-5xl text-gray-900 leading-tight mt-2">
              Mit Herz &<br />
              <span style={{ background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Leidenschaft
              </span>
            </h2>
          </div>

          <div className="space-y-4 font-nunito text-gray-500 leading-relaxed">
            <p>Willkommen im <strong className="text-gray-800">Pfoten Paradies</strong> — dem Ort, wo jeder Hund wie ein König behandelt wird. Seit 2015 pflegen wir Vierbeiner aller Rassen mit professionellem Know-how und echter Zuneigung.</p>
            <p>Unser Team aus zertifizierten Hundepflegern nimmt sich Zeit für jeden Hund. Wir schaffen eine entspannte Atmosphäre, damit der Friseurbesuch kein Stress wird — sondern ein Highlight der Woche.</p>
          </div>

          {/* Stats */}
          <motion.div className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            {stats.map((s, i) => (
              <div key={i} className="rounded-2xl p-4 text-center"
                style={{ background: 'linear-gradient(135deg, #FFB5D810, #C5B5EA10)', border: '1px solid #FFB5D820' }}>
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="font-pacifico text-2xl md:text-3xl" style={{ color: '#FFB5D8' }}>
                  <CountUp target={s.value} suffix={s.suffix} run={run} />
                </div>
                <p className="font-nunito text-gray-400 text-xs mt-1 font-600">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: Image */}
        <motion.div className="relative"
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

          <div className="rounded-[2.5rem] overflow-hidden relative" style={{ height: 520 }}>
            <motion.img ref={imgRef}
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80"
              alt="Hundesalon Team"
              className="w-full h-full object-cover"
              style={{ y: imgY, scale: 1.12 }} />
          </div>

          <motion.div className="absolute -bottom-6 -left-6 glass-pink rounded-3xl px-5 py-4 shadow-lg"
            animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
            <p className="font-pacifico text-lg" style={{ color: '#FFB5D8' }}>❤️ Seit 2015</p>
            <p className="font-nunito text-gray-500 text-xs font-600">Mit Liebe dabei</p>
          </motion.div>

          <motion.div className="absolute -top-4 -right-4 glass rounded-2xl px-5 py-3 shadow-md"
            animate={{ y: [0, -6, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}>
            <p className="font-nunito font-800 text-gray-800">4.9 ⭐</p>
            <p className="font-nunito text-gray-400 text-xs">387 Bewertungen</p>
          </motion.div>

          <div className="absolute -z-10 -bottom-10 -right-10 w-60 h-60 rounded-full opacity-25"
            style={{ background: '#C5B5EA', filter: 'blur(60px)' }} />
        </motion.div>

      </div>
    </section>
  )
}
