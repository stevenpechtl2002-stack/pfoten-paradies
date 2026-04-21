import { motion } from 'framer-motion'

const services = [
  { icon: '🚿', title: 'Waschen & Föhnen', desc: 'Sanfte Reinigung mit hochwertigen Naturprodukten', price: 'ab 29€', color: '#B5EAD7', textColor: '#5ab89a' },
  { icon: '✂️', title: 'Scheren & Stylen', desc: 'Rassengerechter Schnitt nach Ihren Wünschen', price: 'ab 39€', color: '#FFB5D8', textColor: '#e07fa0' },
  { icon: '💅', title: 'Krallen schneiden', desc: 'Professionelle Krallenpflege — sanft und sicher', price: 'ab 15€', color: '#C5B5EA', textColor: '#9b85c4' },
  { icon: '👂', title: 'Ohren reinigen', desc: 'Sanfte Ohrenreinigung für mehr Wohlbefinden', price: 'ab 12€', color: '#FFDAC1', textColor: '#d4924d' },
  { icon: '✨', title: 'Vollpflege Paket', desc: 'Das komplette Rundum-Paket für Ihren Liebling', price: 'ab 69€', color: '#FFB5D8', textColor: '#e07fa0' },
  { icon: '🐶', title: 'Welpen Erstschnitt', desc: 'Behutsamer erster Friseurbesuch für Welpen', price: 'ab 25€', color: '#B5EAD7', textColor: '#5ab89a' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}
const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
}

export default function Services() {
  return (
    <section id="leistungen" className="py-24" style={{ background: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <span className="inline-block font-nunito text-xs font-700 tracking-[0.25em] uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{ background: '#B5EAD720', color: '#8dd5bb' }}>Leistungen</span>
          <h2 className="font-pacifico text-3xl md:text-5xl text-gray-900">Alles für Ihren Liebling</h2>
          <p className="font-nunito text-gray-400 mt-3 text-sm">Professionelle Pflege mit Herz — für jede Rasse und Größe</p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          {services.map((s, i) => (
            <motion.div key={i} variants={card}
              className="bg-white rounded-3xl p-7 flex flex-col gap-5"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: `1.5px solid ${s.color}40` }}
              whileHover={{ y: -6, boxShadow: `0 16px 48px ${s.color}40` }}
              transition={{ duration: 0.25 }}>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: s.color + '30' }}>
                {s.icon}
              </div>

              <div className="flex-1">
                <h3 className="font-nunito font-800 text-gray-800 mb-2">{s.title}</h3>
                <p className="font-nunito text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <span className="font-pacifico text-xl" style={{ color: s.textColor }}>{s.price}</span>
                <motion.a href="#buchen"
                  className="font-nunito font-700 text-xs px-4 py-2 rounded-xl text-white"
                  style={{ background: s.textColor }}
                  whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                  Buchen
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-10">
          <motion.a href="#buchen"
            className="font-nunito font-700 text-sm px-7 py-3.5 rounded-2xl text-white"
            style={{ background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)', boxShadow: '0 6px 24px rgba(255,181,216,0.4)' }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Alle Pakete ansehen →
          </motion.a>
        </div>

      </div>
    </section>
  )
}
