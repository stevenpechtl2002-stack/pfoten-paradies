import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const services = [
  { icon: '🚿', title: 'Waschen & Föhnen', desc: 'Sanfte Reinigung mit hochwertigen Produkten', price: 'ab 29€', color: '#B5EAD7' },
  { icon: '✂️', title: 'Scheren & Stylen', desc: 'Rassengerechter Schnitt nach Ihren Wünschen', price: 'ab 39€', color: '#FFB5D8' },
  { icon: '💅', title: 'Krallen schneiden', desc: 'Professionelle Krallenpflege', price: 'ab 15€', color: '#C5B5EA' },
  { icon: '👂', title: 'Ohren reinigen', desc: 'Sanfte Ohrenreinigung für mehr Wohlbefinden', price: 'ab 12€', color: '#FFDAC1' },
  { icon: '✨', title: 'Vollpflege Paket', desc: 'Das komplette Rundum-Paket für Ihren Liebling', price: 'ab 69€', color: '#FFB5D8' },
  { icon: '🐶', title: 'Welpen Erstschnitt', desc: 'Behutsamer erster Friseurbesuch für Ihre Kleinen', price: 'ab 25€', color: '#B5EAD7' },
]

function ServiceCard({ service, index }) {
  const cardRef = useRef(null)

  const handleMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.04)`
  }
  const handleLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="min-w-[280px] md:min-w-[300px] glass rounded-3xl p-7 flex flex-col gap-4 group"
      style={{ transition: 'transform 0.2s ease', transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Icon bubble */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
        style={{ background: service.color + '60' }}
      >
        <motion.span
          whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.2 }}
          transition={{ duration: 0.4 }}
          className="block"
        >
          {service.icon}
        </motion.span>
      </div>

      <div className="flex-1">
        <h3 className="font-nunito font-800 text-lg text-gray-800 mb-1">{service.title}</h3>
        <p className="font-nunito text-gray-500 text-sm leading-relaxed">{service.desc}</p>
      </div>

      <div className="flex items-center justify-between">
        <span
          className="font-pacifico text-xl"
          style={{ color: service.color === '#FAFAFA' ? '#FFB5D8' : service.color }}
        >
          {service.price}
        </span>
        <motion.button
          className="text-xs font-nunito font-700 px-4 py-2 rounded-full text-white"
          style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)` }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buchen →
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '-30%'])

  return (
    <section ref={sectionRef} id="leistungen" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block font-nunito text-sm font-700 tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full" style={{ background: '#FFB5D820', color: '#FFB5D8' }}>
            Unsere Leistungen
          </span>
          <h2 className="font-pacifico text-4xl md:text-5xl text-gray-800 mt-2">
            Alles für Ihren Liebling ✨
          </h2>
          <p className="font-nunito text-gray-500 mt-4 text-lg max-w-xl mx-auto">
            Von der sanften Reinigung bis zum perfekten Styling — wir pflegen mit Liebe
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 px-6 md:px-12 pb-6 overflow-x-auto hide-scrollbar"
        style={{ cursor: 'grab' }}
        onMouseDown={(e) => {
          const el = scrollRef.current
          el.style.cursor = 'grabbing'
          const startX = e.pageX - el.offsetLeft
          const scrollLeft = el.scrollLeft
          const onMove = (e2) => { el.scrollLeft = scrollLeft - (e2.pageX - el.offsetLeft - startX) }
          const onUp = () => {
            el.style.cursor = 'grab'
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onUp)
          }
          window.addEventListener('mousemove', onMove)
          window.addEventListener('mouseup', onUp)
        }}
      >
        {services.map((s, i) => (
          <ServiceCard key={i} service={s} index={i} />
        ))}
        {/* Spacer */}
        <div className="min-w-8" />
      </div>

      {/* Drag hint */}
      <motion.p
        className="text-center font-nunito text-gray-400 text-sm mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        ← Ziehen zum Scrollen →
      </motion.p>
    </section>
  )
}
