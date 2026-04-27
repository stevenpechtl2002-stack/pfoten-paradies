import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const reviews = [
  { stars:5, text:'Mein Bello sieht aus wie ein Filmstar! Super freundlich und sehr professionell. Kommen immer wieder!', author:"Bello's Mama", dog:'Bello 🐕', avatar:'👩‍🦰' },
  { stars:5, text:'Max war noch nie so schön! Er war total entspannt. Das Team ist einfach fantastisch — absolute Empfehlung!', author:"Luna's Papa", dog:'Max 🐩', avatar:'👨‍🦱' },
  { stars:5, text:'Super freundliches Team und tolle Atmosphäre! Mia fühlt sich hier immer wohl. Wir kommen jeden Monat!', author:"Mia's Besitzerin", dog:'Mia 🦮', avatar:'👩‍🦳' },
  { stars:5, text:'Rocky sieht nach jedem Besuch traumhaft aus. Schnell, professionell, liebevoll. Immer wieder gerne!', author:"Rocky's Mama", dog:'Rocky 🐕', avatar:'👩' },
  { stars:5, text:'Beste Hundefriseurin Kölns! Coco liebt es hierher zu kommen. Toller Service, faire Preise!', author:"Coco's Papa", dog:'Coco 🐶', avatar:'👨‍🦳' },
  { stars:5, text:'Leo war beim ersten Besuch nervös — nach 10 Minuten war er total entspannt. Einfach toll!', author:"Leo's Familie", dog:'Leo 🐾', avatar:'👨‍👩‍👦' },
]

function Card({ r }) {
  return (
    <div className="min-w-[300px] max-w-[300px] mx-3 bg-white rounded-3xl p-6 flex flex-col gap-3"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
      <div className="flex gap-0.5">{Array(r.stars).fill(0).map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div>
      <p className="font-nunito text-gray-600 text-sm leading-relaxed flex-1 italic">"{r.text}"</p>
      <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
          style={{ background: '#FFB5D815' }}>{r.avatar}</div>
        <div>
          <p className="font-nunito font-700 text-gray-800 text-sm">{r.author}</p>
          <p className="font-nunito text-gray-400 text-xs">{r.dog}</p>
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let pos = 0, paused = false
    const total = el.scrollWidth / 2
    const tick = () => {
      if (!paused) { pos += 0.5; if (pos >= total) pos = 0; el.style.transform = `translateX(-${pos}px)` }
      raf = requestAnimationFrame(tick)
    }
    let raf = requestAnimationFrame(tick)
    el.addEventListener('mouseenter', () => paused = true)
    el.addEventListener('mouseleave', () => paused = false)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section id="bewertungen" className="py-24 overflow-hidden" style={{ background: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <div>
            <span className="inline-block font-nunito text-xs font-700 tracking-[0.25em] uppercase mb-3 px-4 py-1.5 rounded-full"
              style={{ background: '#FFB5D818', color: '#FFB5D8' }}>Bewertungen</span>
            <h2 className="font-pacifico text-3xl md:text-5xl text-gray-900 mt-2">Was Kunden sagen</h2>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white"
            style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <span className="font-pacifico text-3xl text-gray-900">4.9</span>
            <div>
              <div className="flex text-yellow-400 text-sm">★★★★★</div>
              <p className="font-nunito text-gray-400 text-xs">387 Google Bewertungen</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #FAFAFA, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #FAFAFA, transparent)' }} />
        <div className="overflow-hidden">
          <div ref={ref} className="flex py-2 will-change-transform" style={{ width: 'max-content' }}>
            {[...reviews, ...reviews].map((r, i) => <Card key={i} r={r} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
