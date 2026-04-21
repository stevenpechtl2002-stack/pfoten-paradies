import { motion } from 'framer-motion'

const photos = [
  { url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80', likes: 234 },
  { url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80', likes: 189 },
  { url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&q=80', likes: 312 },
  { url: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&q=80', likes: 156 },
  { url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&q=80', likes: 278 },
  { url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80', likes: 341 },
]

export default function Instagram() {
  return (
    <section className="py-24" style={{ background: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block font-nunito text-sm font-700 tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full" style={{ background: '#FFB5D820', color: '#FFB5D8' }}>
            Instagram
          </span>
          <h2 className="font-pacifico text-4xl md:text-5xl text-gray-800 mt-2">
            @pfoten.paradies 📸
          </h2>
          <p className="font-nunito text-gray-500 mt-3">
            Folgen Sie uns für tägliche Fellnasen-Momente
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/pfoten.paradies"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-3xl group aspect-square block"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={photo.url}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  className="opacity-0 group-hover:opacity-100 text-center text-white"
                  initial={false}
                >
                  <svg className="w-10 h-10 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <p className="font-nunito font-700 text-sm">❤️ {photo.likes}</p>
                </motion.div>
              </div>

              {/* Corner badge on first */}
              {i === 0 && (
                <div className="absolute top-3 left-3 glass-pink rounded-xl px-3 py-1">
                  <span className="font-nunito font-700 text-xs" style={{ color: '#FFB5D8' }}>NEU</span>
                </div>
              )}
            </motion.a>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://instagram.com/pfoten.paradies"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-nunito font-700 px-8 py-3 rounded-full border-2 text-gray-700 hover:text-white transition-all duration-300 hover:border-rosa"
            style={{ borderColor: '#FFB5D8' }}
            whileHover={{ background: 'linear-gradient(135deg, #FFB5D8, #C5B5EA)', scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @pfoten.paradies folgen
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
