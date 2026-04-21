import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sizes = [
  { id:'xs', label:'XS', sub:'bis 5 kg', example:'Chihuahua, Yorkshire' },
  { id:'s',  label:'S',  sub:'5–10 kg',  example:'Beagle, Cocker Spaniel' },
  { id:'m',  label:'M',  sub:'10–20 kg', example:'Labrador, Golden Retriever' },
  { id:'l',  label:'L',  sub:'20–35 kg', example:'Husky, Dalmatiner' },
  { id:'xl', label:'XL', sub:'35 kg+',   example:'Bernhardiner, Neufundländer' },
]

const prices = {
  xs: [
    { name:'Waschen & Föhnen', price:29, icon:'🚿' },
    { name:'Scheren & Stylen', price:39, icon:'✂️' },
    { name:'Vollpflege', price:59, icon:'✨', highlight:true },
    { name:'Krallen + Ohren', price:22, icon:'💅' },
    { name:'Welpen Erstschnitt', price:25, icon:'🐶' },
  ],
  s: [
    { name:'Waschen & Föhnen', price:35, icon:'🚿' },
    { name:'Scheren & Stylen', price:49, icon:'✂️' },
    { name:'Vollpflege', price:69, icon:'✨', highlight:true },
    { name:'Krallen + Ohren', price:22, icon:'💅' },
    { name:'Welpen Erstschnitt', price:32, icon:'🐶' },
  ],
  m: [
    { name:'Waschen & Föhnen', price:45, icon:'🚿' },
    { name:'Scheren & Stylen', price:59, icon:'✂️' },
    { name:'Vollpflege', price:85, icon:'✨', highlight:true },
    { name:'Krallen + Ohren', price:27, icon:'💅' },
    { name:'Welpen Erstschnitt', price:45, icon:'🐶' },
  ],
  l: [
    { name:'Waschen & Föhnen', price:55, icon:'🚿' },
    { name:'Scheren & Stylen', price:75, icon:'✂️' },
    { name:'Vollpflege', price:109, icon:'✨', highlight:true },
    { name:'Krallen + Ohren', price:32, icon:'💅' },
    { name:'Welpen Erstschnitt', price:60, icon:'🐶' },
  ],
  xl: [
    { name:'Waschen & Föhnen', price:70, icon:'🚿' },
    { name:'Scheren & Stylen', price:95, icon:'✂️' },
    { name:'Vollpflege', price:139, icon:'✨', highlight:true },
    { name:'Krallen + Ohren', price:38, icon:'💅' },
    { name:'Welpen Erstschnitt', price:79, icon:'🐶' },
  ],
}

export default function Pricing() {
  const [active, setActive] = useState('s')
  const current = sizes.find(s => s.id === active)

  return (
    <section id="preise" className="py-24" style={{ background:'#FAFAFA' }}>
      <div className="max-w-4xl mx-auto px-8 md:px-16">

        <motion.div className="text-center mb-12"
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <span className="inline-block font-nunito text-xs font-700 tracking-[0.25em] uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{ background:'#C5B5EA18', color:'#a99bd4' }}>
            Preisliste
          </span>
          <h2 className="font-pacifico text-3xl md:text-4xl text-gray-900 mt-2">
            Faire Preise nach Größe 🐾
          </h2>
          <p className="font-nunito text-gray-400 mt-3 text-sm">Wählen Sie die Größe Ihres Hundes</p>
        </motion.div>

        {/* Size selector */}
        <motion.div className="flex justify-center gap-2 mb-10 flex-wrap"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.15 }}>
          {sizes.map(size => (
            <motion.button key={size.id} onClick={() => setActive(size.id)}
              className="relative px-5 py-3 rounded-2xl font-nunito font-700 text-sm transition-all duration-200"
              style={active === size.id
                ? { background:'linear-gradient(135deg,#FFB5D8,#C5B5EA)', color:'white', boxShadow:'0 6px 20px rgba(255,181,216,0.4)' }
                : { background:'white', color:'#888', border:'1.5px solid #eee' }}
              whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}>
              <span className="block text-base">{size.label}</span>
              <span className="block text-xs font-400 mt-0.5 opacity-80">{size.sub}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Breed hint */}
        <motion.p className="text-center font-nunito text-gray-400 text-sm mb-8"
          key={active} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.3 }}>
          z.B. {current.example}
        </motion.p>

        {/* Price list */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            className="bg-white rounded-3xl overflow-hidden"
            style={{ boxShadow:'0 4px 30px rgba(0,0,0,0.06)' }}
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-12 }} transition={{ duration:0.35 }}>

            {prices[active].map((item, i) => (
              <motion.div key={item.name}
                className={`flex items-center justify-between px-6 py-5 ${i < prices[active].length-1 ? 'border-b border-gray-50' : ''} ${item.highlight ? 'relative overflow-hidden' : ''}`}
                style={item.highlight ? { background:'linear-gradient(135deg, #FFB5D808, #C5B5EA08)' } : {}}
                initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                transition={{ delay: i*0.06 }}>

                {item.highlight && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <span className="font-nunito font-700 text-xs px-2.5 py-1 rounded-full text-white"
                      style={{ background:'linear-gradient(135deg,#FFB5D8,#C5B5EA)' }}>
                      Beliebt
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: item.highlight ? 'linear-gradient(135deg,#FFB5D820,#C5B5EA20)' : '#f9f9f9' }}>
                    {item.icon}
                  </div>
                  <span className={`font-nunito font-${item.highlight ? '800' : '600'} text-gray-800`}>
                    {item.name}
                  </span>
                </div>
                <span className="font-pacifico text-xl ml-8" style={{ color:'#FFB5D8' }}>
                  ab {item.price}€
                </span>
              </motion.div>
            ))}

            {/* Bottom CTA */}
            <div className="px-6 py-5 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-nunito text-gray-400 text-sm">Preise inkl. MwSt. · Individuelle Beratung auf Anfrage</p>
              <motion.a href="#buchen"
                className="font-nunito font-700 text-sm px-6 py-3 rounded-2xl text-white whitespace-nowrap"
                style={{ background:'linear-gradient(135deg,#FFB5D8,#C5B5EA)', boxShadow:'0 4px 16px rgba(255,181,216,0.4)' }}
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
                Jetzt buchen →
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
