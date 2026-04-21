import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('draw') // draw -> fade

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fade'), 1800)
    const t2 = setTimeout(() => onComplete(), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
          style={{ background: '#FAFAFA' }}
        >
          {/* Animated paw SVG */}
          <motion.svg
            width="120" height="120" viewBox="0 0 100 100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Toe beans */}
            {[
              { cx: 35, cy: 32, rx: 9, ry: 12, delay: 0 },
              { cx: 65, cy: 32, rx: 9, ry: 12, delay: 0.15 },
              { cx: 25, cy: 50, rx: 10, ry: 13, delay: 0.3 },
              { cx: 75, cy: 50, rx: 10, ry: 13, delay: 0.45 },
            ].map((p, i) => (
              <motion.ellipse
                key={i} cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry}
                fill="#FFB5D8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: p.delay, duration: 0.4, type: 'spring', stiffness: 200 }}
                style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
              />
            ))}
            {/* Main pad */}
            <motion.ellipse
              cx="50" cy="72" rx="22" ry="18"
              fill="#FFB5D8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: 'spring', stiffness: 150 }}
              style={{ transformOrigin: '50px 72px' }}
            />
          </motion.svg>

          <motion.h1
            className="font-pacifico text-4xl mt-6"
            style={{ color: '#FFB5D8' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Pfoten Paradies
          </motion.h1>
          <motion.p
            className="font-nunito text-gray-400 mt-2 text-sm tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            Ihr Liebling in den besten Händen
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
