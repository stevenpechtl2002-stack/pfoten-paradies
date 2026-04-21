import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sizes = ['Klein (bis 10kg)', 'Mittel (10–25kg)', 'Groß (25kg+)']
const serviceList = ['Waschen & Föhnen', 'Scheren & Stylen', 'Vollpflege Paket', 'Krallen schneiden', 'Ohren reinigen', 'Welpen Erstschnitt']

const fieldVariant = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] } })
}

export default function Booking() {
  const [form, setForm] = useState({ name:'', phone:'', breed:'', size:'', date:'', service:'' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState('')
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const inputCls = (f) =>
    `w-full font-nunito text-gray-800 text-sm px-4 py-3.5 rounded-2xl outline-none transition-all duration-200 ${
      focused === f ? 'ring-2 ring-rosa shadow-md bg-white' : 'bg-white ring-1 ring-gray-150'
    }`

  return (
    <section id="buchen" className="py-24"
      style={{ background: 'linear-gradient(160deg, #fff 0%, #FFF5FA 100%)' }}>
      <div className="max-w-2xl mx-auto px-8 md:px-16">

        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <span className="inline-block font-nunito text-xs font-700 tracking-[0.25em] uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{ background: '#FFB5D818', color: '#FFB5D8' }}>Termin buchen</span>
          <h2 className="font-pacifico text-3xl md:text-5xl text-gray-900 mt-2">Ihren Wunschtermin sichern</h2>
          <p className="font-nunito text-gray-400 mt-4">Wir melden uns innerhalb von 24h bei Ihnen</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="ok"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="bg-white rounded-4xl p-14 text-center"
              style={{ boxShadow: '0 8px 48px rgba(255,181,216,0.2)' }}>
              <motion.div className="text-6xl mb-4"
                animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.25, 1] }}
                transition={{ duration: 0.8 }}>🐾</motion.div>
              <h3 className="font-pacifico text-3xl text-gray-800 mb-3">Perfekt!</h3>
              <p className="font-nunito text-gray-500">
                Danke, <strong>{form.name}</strong>! Wir freuen uns auf <strong>{form.breed || 'Ihren Liebling'}</strong> und melden uns bald.
              </p>
              <motion.button onClick={() => setSubmitted(false)}
                className="mt-8 font-nunito font-700 px-6 py-3 rounded-2xl text-sm text-gray-500 bg-gray-100"
                whileHover={{ bg: '#eee', scale: 1.04 }}>
                Weiteren Termin anfragen
              </motion.button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-white rounded-4xl p-8 space-y-5"
              style={{ boxShadow: '0 8px 48px rgba(0,0,0,0.06)' }}>

              <motion.div className="grid sm:grid-cols-2 gap-5" initial="hidden" whileInView="show" viewport={{ once: true }}>
                {[
                  { k:'name', label:'Ihr Name', placeholder:'Max Mustermann', type:'text', required:true, i:0 },
                  { k:'phone', label:'Telefon', placeholder:'030 123456', type:'tel', required:true, i:1 },
                ].map(({ k, label, placeholder, type, required, i }) => (
                  <motion.div key={k} custom={i} variants={fieldVariant}>
                    <label className="block font-nunito font-700 text-gray-500 text-xs uppercase tracking-wider mb-1.5 ml-1">{label}</label>
                    <input type={type} required={required} placeholder={placeholder}
                      value={form[k]} onChange={set(k)}
                      onFocus={() => setFocused(k)} onBlur={() => setFocused('')}
                      className={inputCls(k)} />
                  </motion.div>
                ))}
              </motion.div>

              {[
                { k:'breed', label:'Hunderasse', placeholder:'z.B. Golden Retriever, Pudel...', i:2 },
              ].map(({ k, label, placeholder, i }) => (
                <motion.div key={k} custom={i} variants={fieldVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  <label className="block font-nunito font-700 text-gray-500 text-xs uppercase tracking-wider mb-1.5 ml-1">{label}</label>
                  <input type="text" placeholder={placeholder}
                    value={form[k]} onChange={set(k)}
                    onFocus={() => setFocused(k)} onBlur={() => setFocused('')}
                    className={inputCls(k)} />
                </motion.div>
              ))}

              <motion.div custom={3} variants={fieldVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <label className="block font-nunito font-700 text-gray-500 text-xs uppercase tracking-wider mb-2 ml-1">Größe</label>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map(s => (
                    <motion.button key={s} type="button" onClick={() => setForm(f => ({ ...f, size: s }))}
                      className="font-nunito text-sm px-4 py-2.5 rounded-xl font-600 transition-all duration-200"
                      style={form.size === s
                        ? { background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)', color: 'white' }
                        : { background: '#f8f8f8', color: '#888' }}
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                      {s}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div custom={4} variants={fieldVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <label className="block font-nunito font-700 text-gray-500 text-xs uppercase tracking-wider mb-1.5 ml-1">Leistung</label>
                <select value={form.service} onChange={set('service')}
                  onFocus={() => setFocused('service')} onBlur={() => setFocused('')}
                  className={inputCls('service')}>
                  <option value="">Bitte wählen...</option>
                  {serviceList.map(s => <option key={s}>{s}</option>)}
                </select>
              </motion.div>

              <motion.div custom={5} variants={fieldVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <label className="block font-nunito font-700 text-gray-500 text-xs uppercase tracking-wider mb-1.5 ml-1">Wunschtermin</label>
                <input type="date" value={form.date} onChange={set('date')}
                  onFocus={() => setFocused('date')} onBlur={() => setFocused('')}
                  min={new Date().toISOString().split('T')[0]}
                  className={inputCls('date')} />
              </motion.div>

              <motion.button type="submit"
                className="w-full py-4 rounded-2xl font-nunito font-800 text-white text-sm tracking-wide"
                style={{ background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)', boxShadow: '0 8px 28px rgba(255,181,216,0.4)' }}
                whileHover={{ scale: 1.02, boxShadow: '0 14px 40px rgba(255,181,216,0.6)' }}
                whileTap={{ scale: 0.98 }}>
                Termin anfragen 🐾
              </motion.button>

              <p className="text-center font-nunito text-gray-300 text-xs">
                Keine Anzahlung · Kostenlose Stornierung bis 24h vorher
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
