import { useEffect, useRef } from 'react'

const PAW_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100">
  <ellipse cx="50" cy="72" rx="22" ry="18" fill="rgba(255,181,216,0.5)"/>
  <ellipse cx="25" cy="50" rx="10" ry="13" fill="rgba(255,181,216,0.5)"/>
  <ellipse cx="75" cy="50" rx="10" ry="13" fill="rgba(255,181,216,0.5)"/>
  <ellipse cx="35" cy="32" rx="9" ry="12" fill="rgba(255,181,216,0.5)"/>
  <ellipse cx="65" cy="32" rx="9" ry="12" fill="rgba(255,181,216,0.5)"/>
</svg>`

export default function FloatingParticles({ count = 12 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.innerHTML = ''

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      el.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        bottom: -40px;
        opacity: 0;
        animation: particleFloat ${8 + Math.random() * 10}s ${Math.random() * 10}s linear infinite;
        pointer-events: none;
      `
      el.innerHTML = PAW_SVG
      container.appendChild(el)
    }
  }, [count])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
