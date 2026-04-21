import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const reviews = [
  { stars: 5, text: 'Mein Bello sieht aus wie ein Filmstar! Super freundlich und sehr professionell. Kommen immer wieder!', author: "Bello's Mama", dog: 'Bello 🐕', avatar: '👩‍🦰' },
  { stars: 5, text: 'Max war noch nie so schön! Er war entspannt und hat sogar Spaß gehabt. Das Team ist fantastisch.', author: "Luna's Papa", dog: 'Max 🐩', avatar: '👨‍🦱' },
  { stars: 5, text: 'Super freundliches Team und tolle Atmosphäre! Mia fühlt sich hier immer wohl. Absolute Empfehlung!', author: "Mia's Besitzer", dog: 'Mia 🦮', avatar: '👩‍🦳' },
  { stars: 5, text: 'Immer wieder gerne! Rocky sieht nach jedem Besuch traumhaft aus. Schnell, professionell, liebevoll.', author: "Rocky's Mama", dog: 'Rocky 🐈', avatar: '👩' },
  { stars: 5, text: 'Beste Hundefriseurin Berlins! Coco liebt es hierher zu kommen. Toller Service, faire Preise!', author: "Coco's Papa", dog: 'Coco 🐶', avatar: '👨‍🦳' },
  { stars: 5, text: 'Wir sind von Anfang an dabei. Das Pfoten Paradies ist unser Lieblingsort für Leo!', author: "Leo's Familie", dog: 'Leo 🐾', avatar: '👨‍👩‍👦' },
]

function ReviewCard({ review }) {
  return (
    <div className="min-w-[320px] max-w-[320px] glass rounded-3xl p-7 flex flex-col gap-4 mx-3">
      <div className="flex items-center gap-1">
        {Array.from({ length: review.stars }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">⭐</span>
        ))}
      </div>
      <p className="font-nunito text-gray-600 leading-relaxed text-sm italic flex-1">
        "{review.text}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{ background: '#FFB5D820' }}
        >
          {review.avatar}
        </div>
        <div>
          <p className="font-nunito font-700 text-gray-800 text-sm">{review.author}</p>
          <p className="font-nunito text-gray-400 text-xs">{review.dog}</p>
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let pos = 0
    let paused = false
    const speed = 0.5
    const total = track.scrollWidth / 2

    const tick = () => {
      if (!paused) {
        pos += speed
        if (pos >= total) pos = 0
        track.style.transform = `translateX(-${pos}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    let raf = requestAnimationFrame(tick)

    track.addEventListener('mouseenter', () => { paused = true })
    track.addEventListener('mouseleave', () => { paused = false })
    return () => cancelAnimationFrame(raf)
  }, [])

  const doubled = [...reviews, ...reviews]

  return (
    <section id="bewertungen" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block font-nunito text-sm font-700 tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full" style={{ background: '#FFB5D820', color: '#FFB5D8' }}>
            Bewertungen
          </span>
          <h2 className="font-pacifico text-4xl md:text-5xl text-gray-800 mt-2">
            Was unsere Kunden sagen 💬
          </h2>
          <p className="font-nunito text-gray-500 mt-4">
            Über 500 glückliche Hunde sprechen für sich
          </p>
        </motion.div>
      </div>

      {/* Scrolling carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #FAFAFA, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #FAFAFA, transparent)' }} />

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex py-4 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {doubled.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-nunito text-gray-500 mb-4">Möchten Sie auch eine Bewertung hinterlassen?</p>
        <motion.a
          href="#buchen"
          className="inline-block font-nunito font-700 px-8 py-3 rounded-full text-white"
          style={{ background: 'linear-gradient(135deg, #FFB5D8, #C5B5EA)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Termin buchen →
        </motion.a>
      </motion.div>
    </section>
  )
}
