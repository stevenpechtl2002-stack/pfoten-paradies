import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sizes = ['Klein (bis 10kg)', 'Mittel (10-25kg)', 'Groß (25kg+)']
const services = ['Waschen & Föhnen', 'Scheren & Stylen', 'Vollpflege Paket', 'Krallen schneiden', 'Welpen Erstschnitt', 'Basic Paket (29€)', 'Standard Paket (59€)', 'Premium Paket (89€)']

export default function Booking() {
  const [form, setForm] = useState({ name: '', phone: '', breed: '', size: '', date: '', service: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState('')

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputCls = (field) => `w-full font-nunito text-gray-800 text-sm px-4 py-3.5 rounded-2xl outline-none transition-all duration-200 ${
    focused === field
      ? 'ring-2 ring-rosa shadow-lg bg-white'
      : 'bg-white/70 ring-1 ring-gray-200'
  }`

  return (
    <section id="buchen" className="py-24" style={{ background: 'linear-gradient(135deg, #FFB5D815, #C5B5EA15)' }}>
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block font-nunito text-sm font-700 tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full" style={{ background: '#FFB5D820', color: '#FFB5D8' }}>
            Termin buchen
          </span>
          <h2 className="font-pacifico text-4xl md:text-5xl text-gray-800 mt-2">
            Ihren Wunschtermin sichern 📅
          </h2>
          <p className="font-nunito text-gray-500 mt-4">
            Füllen Sie das Formular aus und wir melden uns innerhalb von 24h bei Ihnen
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-4xl p-12 text-center"
            >
              <motion.div
                className="text-7xl mb-4"
                animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                🐾
              </motion.div>
              <h3 className="font-pacifico text-3xl text-gray-800 mb-2">Perfekt!</h3>
              <p className="font-nunito text-gray-600">
                Vielen Dank, <strong>{form.name}</strong>! Wir freuen uns auf <strong>{form.breed || 'Ihren Liebling'}</strong> und melden uns bald bei Ihnen.
              </p>
              <motion.button
                onClick={() => setSubmitted(false)}
                className="mt-8 font-nunito font-700 px-6 py-3 rounded-2xl text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Weiteren Termin anfragen
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="glass rounded-4xl p-8 space-y-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Name */}
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <label className="block font-nunito font-700 text-gray-600 text-xs uppercase tracking-wider mb-1.5 ml-1">
                    Ihr Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Max Mustermann"
                    value={form.name}
                    onChange={set('name')}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    className={inputCls('name')}
                  />
                </motion.div>

                {/* Phone */}
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <label className="block font-nunito font-700 text-gray-600 text-xs uppercase tracking-wider mb-1.5 ml-1">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="030 123456"
                    value={form.phone}
                    onChange={set('phone')}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused('')}
                    className={inputCls('phone')}
                  />
                </motion.div>
              </div>

              {/* Breed */}
              <div>
                <label className="block font-nunito font-700 text-gray-600 text-xs uppercase tracking-wider mb-1.5 ml-1">
                  Hunderasse
                </label>
                <input
                  type="text"
                  placeholder="z.B. Golden Retriever, Pudel, Labrador..."
                  value={form.breed}
                  onChange={set('breed')}
                  onFocus={() => setFocused('breed')}
                  onBlur={() => setFocused('')}
                  className={inputCls('breed')}
                />
              </div>

              {/* Size */}
              <div>
                <label className="block font-nunito font-700 text-gray-600 text-xs uppercase tracking-wider mb-2 ml-1">
                  Größe Ihres Hundes
                </label>
                <div className="flex gap-3 flex-wrap">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, size: s }))}
                      className="font-nunito text-sm px-4 py-2.5 rounded-xl transition-all duration-200 font-600"
                      style={form.size === s
                        ? { background: '#FFB5D8', color: 'white' }
                        : { background: 'white', color: '#888', border: '1px solid #eee' }
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block font-nunito font-700 text-gray-600 text-xs uppercase tracking-wider mb-1.5 ml-1">
                  Gewünschte Leistung
                </label>
                <select
                  value={form.service}
                  onChange={set('service')}
                  onFocus={() => setFocused('service')}
                  onBlur={() => setFocused('')}
                  className={inputCls('service')}
                >
                  <option value="">Bitte wählen...</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block font-nunito font-700 text-gray-600 text-xs uppercase tracking-wider mb-1.5 ml-1">
                  Wunschtermin
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={set('date')}
                  onFocus={() => setFocused('date')}
                  onBlur={() => setFocused('')}
                  min={new Date().toISOString().split('T')[0]}
                  className={inputCls('date')}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="w-full py-4 rounded-2xl font-nunito font-800 text-white text-base tracking-wide relative overflow-hidden pulse-glow"
                style={{ background: 'linear-gradient(135deg, #FFB5D8, #C5B5EA)' }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 40px rgba(255,181,216,0.6)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Termin anfragen 🐾</span>
              </motion.button>

              <p className="text-center font-nunito text-gray-400 text-xs">
                Wir melden uns innerhalb von 24 Stunden • Keine Anzahlung erforderlich
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
