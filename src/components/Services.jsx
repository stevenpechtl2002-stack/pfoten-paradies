import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const services = [
  { icon: '🚿', title: 'Waschen & Föhnen', desc: 'Sanfte Reinigung mit Naturprodukten', price: 'ab 29€', color: '#B5EAD7', textColor: '#5ab89a' },
  { icon: '✂️', title: 'Scheren & Stylen', desc: 'Rassengerechter Schnitt nach Wunsch', price: 'ab 39€', color: '#FFB5D8', textColor: '#e07fa0' },
  { icon: '💅', title: 'Krallen schneiden', desc: 'Professionelle Krallenpflege', price: 'ab 15€', color: '#C5B5EA', textColor: '#9b85c4' },
  { icon: '👂', title: 'Ohren reinigen', desc: 'Sanfte Ohrenreinigung', price: 'ab 12€', color: '#FFDAC1', textColor: '#d4924d' },
  { icon: '✨', title: 'Vollpflege Paket', desc: 'Das komplette Rundum-Paket', price: 'ab 69€', color: '#FFB5D8', textColor: '#e07fa0' },
  { icon: '🐶', title: 'Welpen Erstschnitt', desc: 'Behutsamer erster Friseurbesuch', price: 'ab 25€', color: '#B5EAD7', textColor: '#5ab89a' },
]

const CONTAINER = 560
const CENTER = 280
const RADIUS = 195
const CARD = 154

export default function Services() {
  const wheelRef = useRef(null)
  const counterRefs = useRef([])
  const rafRef = useRef(null)
  const angleRef = useRef(0)

  useEffect(() => {
    const tick = () => {
      angleRef.current += 0.014
      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${angleRef.current}deg)`
      }
      counterRefs.current.forEach(el => {
        if (el) el.style.transform = `rotate(${-angleRef.current}deg)`
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const cardPositions = services.map((_, i) => {
    const angle = (i / services.length) * 2 * Math.PI
    return {
      x: CENTER + RADIUS * Math.sin(angle),
      y: CENTER - RADIUS * Math.cos(angle),
    }
  })

  return (
    <section id="leistungen" className="py-24 overflow-hidden" style={{ background: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <span className="inline-block font-nunito text-xs font-700 tracking-[0.25em] uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{ background: '#B5EAD720', color: '#8dd5bb' }}>Leistungen</span>
          <h2 className="font-pacifico text-3xl md:text-5xl text-gray-900">Alles für Ihren Liebling</h2>
          <p className="font-nunito text-gray-400 mt-3 text-sm">Drehen Sie das Rad und entdecken Sie unsere Leistungen</p>
        </motion.div>
      </div>

      {/* ── Ferris Wheel (desktop) ── */}
      <div className="hidden md:flex justify-center items-center"
        style={{ height: CONTAINER + 40 }}>
        <div style={{ position: 'relative', width: CONTAINER, height: CONTAINER }}>

          {/* Outer ring */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: RADIUS * 2 + CARD, height: RADIUS * 2 + CARD,
            borderRadius: '50%', border: '1px dashed rgba(255,181,216,0.25)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }} />

          {/* Track ring */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: RADIUS * 2, height: RADIUS * 2,
            borderRadius: '50%', border: '1.5px solid rgba(255,181,216,0.35)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }} />

          {/* Rotating wheel (spokes + cards) */}
          <div ref={wheelRef} style={{ position: 'absolute', inset: 0 }}>
            {/* Spokes */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {cardPositions.map((p, i) => (
                <line key={i} x1={CENTER} y1={CENTER} x2={p.x} y2={p.y}
                  stroke="rgba(255,181,216,0.3)" strokeWidth="1.5" />
              ))}
            </svg>

            {/* Cards */}
            {services.map((s, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: cardPositions[i].x,
                top: cardPositions[i].y,
                width: CARD,
                height: CARD,
                transform: 'translate(-50%, -50%)',
              }}>
                <div ref={el => counterRefs.current[i] = el}
                  style={{ width: '100%', height: '100%' }}>
                  <div style={{
                    width: '100%', height: '100%',
                    background: 'white',
                    borderRadius: 24,
                    padding: 18,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                    border: `1.5px solid ${s.color}50`,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    textAlign: 'center', gap: 8,
                    cursor: 'default'
                  }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                      background: s.color + '30',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20
                    }}>{s.icon}</div>
                    <p className="font-nunito font-800 text-gray-800" style={{ fontSize: 12, lineHeight: 1.3 }}>{s.title}</p>
                    <p className="font-pacifico" style={{ color: s.textColor, fontSize: 15 }}>{s.price}</p>
                    <a href="#buchen" className="font-nunito font-700 text-white"
                      style={{
                        fontSize: 11, padding: '5px 12px', borderRadius: 10,
                        background: s.textColor
                      }}>
                      Buchen
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center hub */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 72, height: 72, borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(135deg, #FFB5D8, #C5B5EA)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, boxShadow: '0 4px 20px rgba(255,181,216,0.55)',
            zIndex: 10
          }}>
            🐾
          </div>
        </div>
      </div>

      {/* ── Mobile grid ── */}
      <div className="md:hidden grid grid-cols-2 gap-4 px-6 mt-2">
        {services.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
            className="bg-white rounded-3xl p-5 flex flex-col gap-3"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: `1.5px solid ${s.color}40` }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              {s.icon}
            </div>
            <p className="font-nunito font-800 text-gray-800 text-sm">{s.title}</p>
            <p className="font-pacifico text-sm" style={{ color: s.textColor }}>{s.price}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <motion.a href="#buchen"
          className="font-nunito font-700 text-sm px-7 py-3.5 rounded-2xl text-white"
          style={{ background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)', boxShadow: '0 6px 24px rgba(255,181,216,0.4)' }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          Alle Pakete ansehen →
        </motion.a>
      </div>
    </section>
  )
}
