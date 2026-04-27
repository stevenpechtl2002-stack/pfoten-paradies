import { motion } from 'framer-motion'

const items = [
  { icon: '🏆', title: 'Zertifizierte Experten', desc: 'IHK-zertifizierte Hundefriseure mit jahrelanger Erfahrung für alle Rassen.' },
  { icon: '🌿', title: 'Naturprodukte', desc: 'Hypoallergene, tierfreundliche Shampoos und Pflegemittel — sanft zur Haut.' },
  { icon: '❤️', title: 'Stressfreie Umgebung', desc: 'Ruhige Atmosphäre, kein Zwinger — Ihr Hund fühlt sich bei uns wohl.' },
  { icon: '✂️', title: 'Alle Rassen & Größen', desc: 'Von XS bis XL — wir haben Erfahrung mit jeder Rasse und jedem Fell.' },
  { icon: '📅', title: 'Einfache Buchung', desc: 'Online buchen in 30 Sekunden, Bestätigung per SMS, kein Warten.' },
  { icon: '📍', title: 'Zentral in Köln', desc: 'Deutz-Mülheimer Str. 183, 51063 Köln — gut erreichbar, Parkplätze direkt vor der Tür.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } }
}
const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Features() {
  return (
    <section className="py-24" style={{ background: 'white' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <span className="inline-block font-nunito text-xs font-700 tracking-[0.25em] uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{ background: '#FFB5D818', color: '#FFB5D8' }}>Warum wir?</span>
          <h2 className="font-pacifico text-3xl md:text-5xl text-gray-900 mt-2">Das macht uns besonders</h2>
          <p className="font-nunito text-gray-400 mt-4 max-w-lg mx-auto">Weil Ihr Hund mehr als nur eine Behandlung verdient — er verdient ein Erlebnis.</p>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          {items.map((item, i) => (
            <motion.div key={i} variants={card}
              className="group flex gap-4 p-6 rounded-3xl border border-transparent hover:border-rosa/30 transition-all duration-300"
              style={{ background: 'white', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(255,181,216,0.2)' }}>
              <motion.div className="w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: 'linear-gradient(135deg, #FFB5D820, #C5B5EA20)' }}
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}>
                {item.icon}
              </motion.div>
              <div>
                <h3 className="font-nunito font-800 text-gray-800 mb-1.5">{item.title}</h3>
                <p className="font-nunito text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
