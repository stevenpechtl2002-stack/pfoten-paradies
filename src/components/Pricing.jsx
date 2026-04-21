import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Basic',
    price: 29,
    color: '#B5EAD7',
    features: ['Waschen & Föhnen', 'Bürsten', 'Pfoten Check'],
    icon: '🌿',
    featured: false,
  },
  {
    name: 'Standard',
    price: 59,
    color: '#FFB5D8',
    features: ['Alles aus Basic', 'Scheren & Stylen', 'Krallen schneiden', 'Ohren reinigen'],
    icon: '✨',
    featured: true,
  },
  {
    name: 'Premium',
    price: 89,
    color: '#C5B5EA',
    features: ['Alles aus Standard', 'Parfum & Bandana', 'Foto-Shooting 📸', 'Express Service'],
    icon: '👑',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="preise" className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block font-nunito text-sm font-700 tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full" style={{ background: '#C5B5EA20', color: '#a99bd4' }}>
            Preispakete
          </span>
          <h2 className="font-pacifico text-4xl md:text-5xl text-gray-800 mt-2">
            Für jeden Liebling das Richtige 💝
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`relative rounded-4xl p-8 ${plan.featured ? 'shadow-2xl scale-105' : 'glass'}`}
              style={plan.featured ? {
                background: `linear-gradient(135deg, ${plan.color}30 0%, white 100%)`,
                border: `2px solid ${plan.color}80`,
              } : {}}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: plan.featured ? -4 : -6, transition: { duration: 0.2 } }}
            >
              {plan.featured && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-white text-xs font-nunito font-700 tracking-wide"
                  style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}99)` }}
                >
                  🌟 Beliebteste Wahl
                </div>
              )}

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                style={{ background: plan.color + '30' }}
              >
                {plan.icon}
              </div>

              <h3 className="font-pacifico text-2xl text-gray-800 mb-1">{plan.name}</h3>
              <p className="font-nunito text-gray-400 text-sm mb-5">Perfekt für jede Gelegenheit</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-pacifico text-5xl" style={{ color: plan.color === '#B5EAD7' ? '#8dd5bb' : plan.color === '#FFDAC1' ? '#f0aa80' : plan.color }}>
                  {plan.price}€
                </span>
                <span className="font-nunito text-gray-400 text-sm">/Besuch</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <motion.li
                    key={j}
                    className="flex items-center gap-3 font-nunito text-gray-700 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.06 + 0.3 }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                      style={{ background: plan.color }}
                    >
                      ✓
                    </span>
                    {f}
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="#buchen"
                className="block w-full text-center py-3.5 rounded-2xl font-nunito font-700 text-sm tracking-wide transition-all"
                style={plan.featured
                  ? { background: `linear-gradient(135deg, ${plan.color}, ${plan.color}aa)`, color: 'white' }
                  : { background: plan.color + '25', color: '#555' }
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Jetzt buchen →
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center font-nunito text-gray-400 text-sm mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Alle Preise zzgl. rassenspezifischer Zuschläge • Welpenrabatt auf Anfrage
        </motion.p>
      </div>
    </section>
  )
}
