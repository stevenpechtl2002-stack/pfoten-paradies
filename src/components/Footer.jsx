import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const PAW_POSITIONS = [
  { x: 5, y: 20, rot: -20, delay: 0 },
  { x: 12, y: 60, rot: 15, delay: 0.3 },
  { x: 20, y: 30, rot: -10, delay: 0.6 },
  { x: 30, y: 70, rot: 25, delay: 0.9 },
  { x: 40, y: 15, rot: -15, delay: 1.2 },
  { x: 50, y: 55, rot: 10, delay: 1.5 },
  { x: 60, y: 25, rot: -20, delay: 1.8 },
  { x: 70, y: 75, rot: 18, delay: 2.1 },
  { x: 80, y: 40, rot: -8, delay: 2.4 },
  { x: 90, y: 80, rot: 22, delay: 2.7 },
  { x: 95, y: 10, rot: -12, delay: 3.0 },
]

function PawPrint({ x, y, rot, delay }) {
  return (
    <motion.div
      className="absolute opacity-0"
      style={{ left: `${x}%`, top: `${y}%`, rotate: rot }}
      animate={{ opacity: [0, 0.3, 0.15, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity, repeatDelay: 8 }}
    >
      <svg width="20" height="20" viewBox="0 0 100 100">
        <ellipse cx="50" cy="72" rx="22" ry="18" fill="#FFB5D8" />
        <ellipse cx="25" cy="50" rx="10" ry="13" fill="#FFB5D8" />
        <ellipse cx="75" cy="50" rx="10" ry="13" fill="#FFB5D8" />
        <ellipse cx="35" cy="32" rx="9" ry="12" fill="#FFB5D8" />
        <ellipse cx="65" cy="32" rx="9" ry="12" fill="#FFB5D8" />
      </svg>
    </motion.div>
  )
}

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 overflow-hidden" style={{ background: 'linear-gradient(135deg, #2d2d3a 0%, #1a1a25 100%)' }}>
      {/* Animated paw prints */}
      {PAW_POSITIONS.map((p, i) => (
        <PawPrint key={i} {...p} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <svg width="36" height="36" viewBox="0 0 100 100">
                <ellipse cx="50" cy="72" rx="22" ry="18" fill="#FFB5D8" />
                <ellipse cx="25" cy="50" rx="10" ry="13" fill="#FFB5D8" />
                <ellipse cx="75" cy="50" rx="10" ry="13" fill="#FFB5D8" />
                <ellipse cx="35" cy="32" rx="9" ry="12" fill="#FFB5D8" />
                <ellipse cx="65" cy="32" rx="9" ry="12" fill="#FFB5D8" />
              </svg>
              <h3 className="font-pacifico text-2xl" style={{ color: '#FFB5D8' }}>Pfoten Paradies</h3>
            </div>
            <p className="font-nunito text-gray-400 leading-relaxed mb-6">
              Ihr Liebling in den besten Händen. Professionelle Hundepflege mit Liebe und Leidenschaft seit 2015.
            </p>
            <div className="flex gap-3">
              {['Instagram', 'Facebook', 'TikTok'].map((s) => (
                <motion.a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-nunito font-700"
                  style={{ background: 'rgba(255,181,216,0.15)', color: '#FFB5D8' }}
                  whileHover={{ background: 'rgba(255,181,216,0.3)', scale: 1.1 }}
                >
                  {s[0]}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-nunito font-800 text-white mb-4 text-sm tracking-widest uppercase">Kontakt</h4>
            <div className="space-y-3 font-nunito text-gray-400 text-sm">
              <p className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>Musterstraße 1<br />10115 Berlin</span>
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:030123456" className="hover:text-rosa transition-colors">030 123456</a>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:info@pfoten-paradies.de" className="hover:text-rosa transition-colors">info@pfoten-paradies.de</a>
              </p>
              <p className="flex items-center gap-2">
                <span>📸</span>
                <a href="#" className="hover:text-rosa transition-colors">@pfoten.paradies</a>
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-nunito font-800 text-white mb-4 text-sm tracking-widest uppercase">Öffnungszeiten</h4>
            <div className="space-y-2 font-nunito text-gray-400 text-sm">
              {[
                { day: 'Montag – Freitag', time: '09:00 – 18:00' },
                { day: 'Samstag', time: '09:00 – 15:00' },
                { day: 'Sonntag', time: 'Geschlossen' },
              ].map(({ day, time }) => (
                <div key={day} className="flex justify-between gap-4">
                  <span>{day}</span>
                  <span className={time === 'Geschlossen' ? 'text-gray-600' : 'text-white font-600'}>{time}</span>
                </div>
              ))}
            </div>

            <motion.a
              href="#buchen"
              className="inline-block mt-6 font-nunito font-700 text-sm px-5 py-2.5 rounded-xl text-white"
              style={{ background: 'linear-gradient(135deg, #FFB5D8, #C5B5EA)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Jetzt buchen 🐾
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-nunito text-gray-600 text-xs">
            © 2024 Pfoten Paradies. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            {['Impressum', 'Datenschutz', 'AGB'].map((l) => (
              <a key={l} href="#" className="font-nunito text-gray-600 text-xs hover:text-gray-400 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
