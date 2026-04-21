import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const pairs = [
  {
    before: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
    name: 'Max',
    breed: 'Golden Retriever',
  },
  {
    before: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
    name: 'Luna',
    breed: 'Pudel',
  },
  {
    before: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80',
    name: 'Bello',
    breed: 'Labrador',
  },
]

function SliderCard({ pair, index }) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const update = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const p = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(5, Math.min(95, p)))
  }, [])

  const onMouseDown = (e) => { dragging.current = true; update(e.clientX) }
  const onMouseMove = (e) => { if (dragging.current) update(e.clientX) }
  const onMouseUp = () => { dragging.current = false }
  const onTouchStart = (e) => { dragging.current = true; update(e.touches[0].clientX) }
  const onTouchMove = (e) => { if (dragging.current) update(e.touches[0].clientX) }

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchend', onMouseUp)
    return () => {
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchend', onMouseUp)
    }
  }, [])

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
    >
      <div
        ref={containerRef}
        className="ba-container relative overflow-hidden select-none"
        style={{ height: 380, borderRadius: 24 }}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {/* After (full width, behind) */}
        <img
          src={pair.after}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {/* Label after */}
        <div className="absolute top-3 right-3 z-10 glass rounded-xl px-3 py-1">
          <span className="font-nunito font-700 text-xs" style={{ color: '#8dd5bb' }}>NACHHER ✨</span>
        </div>

        {/* Before (clipped left) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={pair.before}
            alt="Before"
            className="absolute inset-0 h-full object-cover"
            style={{ width: `${100 / (pos / 100)}%`, maxWidth: 'none' }}
            draggable={false}
          />
          {/* Label before */}
          <div className="absolute top-3 left-3 z-10 glass rounded-xl px-3 py-1">
            <span className="font-nunito font-700 text-xs text-gray-500">VORHER</span>
          </div>
        </div>

        {/* Drag handle */}
        <div
          className="ba-handle"
          style={{ left: `calc(${pos}% - 1.5px)` }}
        />
      </div>

      <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
        <div>
          <p className="font-nunito font-800 text-gray-800">{pair.name}</p>
          <p className="font-nunito text-gray-400 text-sm">{pair.breed}</p>
        </div>
        <span className="text-2xl">🐾</span>
      </div>
    </motion.div>
  )
}

export default function BeforeAfter() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(135deg, #FFB5D815 0%, #B5EAD715 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block font-nunito text-sm font-700 tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full" style={{ background: '#FFDAC120', color: '#f0aa80' }}>
            Transformationen
          </span>
          <h2 className="font-pacifico text-4xl md:text-5xl text-gray-800 mt-2">
            Vorher / Nachher 🪄
          </h2>
          <p className="font-nunito text-gray-500 mt-4 max-w-xl mx-auto">
            Ziehen Sie den Schieberegler und sehen Sie die zauberhafte Verwandlung
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pairs.map((pair, i) => (
            <SliderCard key={i} pair={pair} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
