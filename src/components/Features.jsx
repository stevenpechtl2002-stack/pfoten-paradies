import { motion } from 'framer-motion'

const items = [
  { icon: '🏆', title: 'Zertifizierte Experten', desc: 'Alle Mitarbeiter sind IHK-zertifizierte Hundefriseure mit jahrelanger Erfahrung.' },
  { icon: '🌿', title: 'Naturbasierte Produkte', desc: 'Nur tierfreundliche, hypoallergene Shampoos und Pflegemittel – sanft zur Haut.' },
  { icon: '❤️', title: 'Stress-freie Atmosphäre', desc: 'Ruhige Umgebung, keine Zwingerhaltung – Ihr Hund fühlt sich bei uns wohl.' },
  { icon: '✂️', title: 'Alle Rassen & Größen', desc: 'Von Chihuahua bis Bernhardiner – wir haben Erfahrung mit jeder Rasse.' },
  { icon: '📅', title: 'Flexible Termine', desc: 'Online-Buchung, schnelle Bestätigung, Erinnerungs-SMS inklusive.' },
  { icon: '📍', title: 'Zentral in Berlin-Mitte', desc: 'Direkt am S-Bahnhof, gut mit Bus & Bahn erreichbar, Parkplätze vorhanden.' },
]

export default function Features() {
  return (
    <section className="py-20" style={{ background: 'white' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        <motion.div className="text-center mb-14"
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <span className="inline-block font-nunito text-xs font-700 tracking-[0.25em] uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{ background:'#FFB5D818', color:'#FFB5D8' }}>
            Warum Pfoten Paradies?
          </span>
          <h2 className="font-pacifico text-3xl md:text-4xl text-gray-900 mt-2">
            Das macht uns besonders ✨
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div key={i}
              className="group flex gap-4 p-6 rounded-3xl bg-white border border-gray-100 hover:border-rosa transition-all duration-300"
              style={{ boxShadow:'0 2px 16px rgba(0,0,0,0.04)' }}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i*0.08, duration:0.5 }}
              whileHover={{ y:-4, boxShadow:'0 12px 40px rgba(255,181,216,0.18)' }}>

              <div className="w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background:'linear-gradient(135deg, #FFB5D820, #C5B5EA20)' }}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-nunito font-800 text-gray-800 mb-1">{item.title}</h3>
                <p className="font-nunito text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
