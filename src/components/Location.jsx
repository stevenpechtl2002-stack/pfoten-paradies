import { motion } from 'framer-motion'

export default function Location() {
  return (
    <section className="py-24" style={{ background:'white' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        <motion.div className="text-center mb-14"
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <span className="inline-block font-nunito text-xs font-700 tracking-[0.25em] uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{ background:'#B5EAD720', color:'#8dd5bb' }}>
            Unser Salon
          </span>
          <h2 className="font-pacifico text-3xl md:text-4xl text-gray-900 mt-2">
            Besuchen Sie uns in Berlin 📍
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* Map placeholder */}
          <motion.div
            className="rounded-3xl overflow-hidden relative"
            style={{ height:380, background:'linear-gradient(135deg,#FFB5D815,#C5B5EA15)', boxShadow:'0 8px 40px rgba(0,0,0,0.07)' }}
            initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <iframe
              title="Pfoten Paradies Standort"
              src="https://www.openstreetmap.org/export/embed.html?bbox=13.38,52.52,13.42,52.54&layer=mapnik&marker=52.530,13.400"
              className="w-full h-full border-0"
              style={{ borderRadius:24 }}
            />
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <div className="glass rounded-3xl p-8 flex flex-col gap-6">

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background:'linear-gradient(135deg,#FFB5D8,#C5B5EA)' }}>
                  🐾
                </div>
                <div>
                  <h3 className="font-pacifico text-xl text-gray-900">Pfoten Paradies Berlin</h3>
                  <p className="font-nunito text-gray-400 text-sm">Berlin-Mitte</p>
                </div>
              </div>

              <div className="space-y-4 font-nunito text-sm">
                {[
                  { icon:'📍', label:'Adresse', value:'Musterstraße 1, 10115 Berlin' },
                  { icon:'📞', label:'Telefon', value:'030 123456', href:'tel:030123456' },
                  { icon:'✉️', label:'E-Mail', value:'info@pfoten-paradies.de', href:'mailto:info@pfoten-paradies.de' },
                ].map(({icon,label,value,href}) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-base mt-0.5">{icon}</span>
                    <div>
                      <p className="font-600 text-gray-400 text-xs uppercase tracking-wide mb-0.5">{label}</p>
                      {href
                        ? <a href={href} className="font-600 text-gray-700 hover:text-rosa transition-colors">{value}</a>
                        : <p className="font-600 text-gray-700">{value}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Opening hours */}
              <div className="border-t border-gray-100 pt-5">
                <p className="font-nunito font-700 text-gray-700 text-sm mb-3">Öffnungszeiten</p>
                <div className="space-y-2">
                  {[
                    { days:'Mo – Fr', time:'09:00 – 18:00', open:true },
                    { days:'Samstag', time:'09:00 – 15:00', open:true },
                    { days:'Sonntag', time:'Geschlossen', open:false },
                  ].map(({days,time,open}) => (
                    <div key={days} className="flex justify-between items-center">
                      <span className="font-nunito text-gray-500 text-sm">{days}</span>
                      <span className={`font-nunito font-700 text-sm ${open ? 'text-gray-800' : 'text-gray-300'}`}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today open badge */}
              <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background:'#B5EAD730' }}>
                <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow:'0 0 6px #4ade80' }} />
                <span className="font-nunito font-700 text-green-700 text-sm">Heute geöffnet · bis 18:00 Uhr</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
