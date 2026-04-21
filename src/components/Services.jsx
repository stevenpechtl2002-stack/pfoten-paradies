import { useRef } from 'react'
import { motion } from 'framer-motion'

const services = [
  { icon: '🚿', title: 'Waschen & Föhnen', desc: 'Sanfte Reinigung mit hochwertigen Naturprodukten', price: 'ab 29€', color: '#B5EAD7' },
  { icon: '✂️', title: 'Scheren & Stylen', desc: 'Rassengerechter Schnitt nach Ihren Wünschen', price: 'ab 39€', color: '#FFB5D8' },
  { icon: '💅', title: 'Krallen schneiden', desc: 'Professionelle Krallenpflege — sanft und sicher', price: 'ab 15€', color: '#C5B5EA' },
  { icon: '👂', title: 'Ohren reinigen', desc: 'Sanfte Ohrenreinigung für mehr Wohlbefinden', price: 'ab 12€', color: '#FFDAC1' },
  { icon: '✨', title: 'Vollpflege Paket', desc: 'Das komplette Rundum-Paket für Ihren Liebling', price: 'ab 69€', color: '#FFB5D8' },
  { icon: '🐶', title: 'Welpen Erstschnitt', desc: 'Behutsamer erster Friseurbesuch', price: 'ab 25€', color: '#B5EAD7' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

function ServiceCard({ service }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(700px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(8px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateZ(0)'
  }

  return (
    <motion.div variants={item}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="min-w-[270px] bg-white rounded-3xl p-7 flex flex-col gap-4 transition-[box-shadow] duration-300 hover:shadow-2xl"
      style={{ transition: 'transform 0.18s ease, box-shadow 0.3s ease', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', transformStyle: 'preserve-3d' }}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
        style={{ background: service.color + '40' }}>
        {service.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-nunito font-800 text-gray-800 mb-1">{service.title}</h3>
        <p className="font-nunito text-gray-400 text-sm leading-relaxed">{service.desc}</p>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <span className="font-pacifico text-xl" style={{ color: service.color === '#FFDAC1' ? '#f0aa80' : service.color }}>{service.price}</span>
        <motion.a href="#buchen"
          className="text-xs font-nunito font-700 px-4 py-2 rounded-xl text-white"
          style={{ background: service.color }}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
          Buchen
        </motion.a>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const dragRef = useRef(null)

  return (
    <section id="leistungen" className="py-24" style={{ background: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 mb-12">
        <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <div>
            <span className="inline-block font-nunito text-xs font-700 tracking-[0.25em] uppercase mb-3 px-4 py-1.5 rounded-full"
              style={{ background: '#B5EAD720', color: '#8dd5bb' }}>Leistungen</span>
            <h2 className="font-pacifico text-3xl md:text-5xl text-gray-900">Alles für Ihren Liebling</h2>
          </div>
          <motion.a href="#buchen"
            className="font-nunito font-700 text-sm px-6 py-3 rounded-2xl text-gray-600 self-start md:self-auto whitespace-nowrap"
            style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            whileHover={{ scale: 1.04 }}>
            Alle Pakete ansehen →
          </motion.a>
        </motion.div>
      </div>

      {/* Draggable horizontal scroll */}
      <motion.div
        ref={dragRef}
        className="flex gap-5 px-8 md:px-16 pb-4 overflow-x-auto hide-scrollbar select-none"
        variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
        style={{ cursor: 'grab' }}
        onMouseDown={(e) => {
          const el = dragRef.current
          el.style.cursor = 'grabbing'
          let startX = e.pageX - el.offsetLeft
          let scrollLeft = el.scrollLeft
          const onMove = (e2) => { el.scrollLeft = scrollLeft - (e2.pageX - el.offsetLeft - startX) }
          const onUp = () => { el.style.cursor = 'grab'; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
          window.addEventListener('mousemove', onMove)
          window.addEventListener('mouseup', onUp)
        }}>
        {services.map((s, i) => <ServiceCard key={i} service={s} />)}
        <div className="min-w-4" />
      </motion.div>

      <motion.p className="text-center font-nunito text-gray-300 text-sm mt-5"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        ← Ziehen zum Entdecken →
      </motion.p>
    </section>
  )
}
