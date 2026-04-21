import { motion } from 'framer-motion'

const photos = [
  { url:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80', likes:234 },
  { url:'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80', likes:189 },
  { url:'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&q=80', likes:312 },
  { url:'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&q=80', likes:156 },
  { url:'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&q=80', likes:278 },
  { url:'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80', likes:341 },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
}
const item = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
}

export default function Instagram() {
  return (
    <section className="py-24" style={{ background: 'white' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <div>
            <span className="inline-block font-nunito text-xs font-700 tracking-[0.25em] uppercase mb-3 px-4 py-1.5 rounded-full"
              style={{ background: '#FFB5D818', color: '#FFB5D8' }}>Instagram</span>
            <h2 className="font-pacifico text-3xl md:text-5xl text-gray-900 mt-2">@hundesalon.fellraum</h2>
          </div>
          <motion.a href="https://instagram.com/hundesalon.fellraum" target="_blank" rel="noopener noreferrer"
            className="font-nunito font-700 text-sm px-6 py-3 rounded-2xl text-gray-600 self-start whitespace-nowrap flex items-center gap-2"
            style={{ background: '#f8f8f8', border: '1px solid #eee' }}
            whileHover={{ scale: 1.04, background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)', color: 'white', border: '1px solid transparent' }}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Folgen
          </motion.a>
        </motion.div>

        <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4"
          variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          {photos.map((p, i) => (
            <motion.a key={i} variants={item}
              href="https://instagram.com/hundesalon.fellraum" target="_blank" rel="noopener noreferrer"
              className="relative overflow-hidden rounded-3xl group aspect-square block"
              whileHover={{ scale: 1.02 }}>
              <img src={p.url} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                  <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  <p className="font-nunito font-700 text-sm">❤️ {p.likes}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
