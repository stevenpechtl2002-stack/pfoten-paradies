import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function PawCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 400, damping: 30 })
  const springY = useSpring(cursorY, { stiffness: 400, damping: 30 })
  const trailX = useSpring(cursorX, { stiffness: 100, damping: 25 })
  const trailY = useSpring(cursorY, { stiffness: 100, damping: 25 })
  const isHovering = useRef(false)
  const scaleRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const enterLink = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        isHovering.current = true
        if (scaleRef.current) scaleRef.current.style.transform = 'translate(-50%,-50%) scale(1.5)'
      }
    }
    const leaveLink = () => {
      isHovering.current = false
      if (scaleRef.current) scaleRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', enterLink)
    window.addEventListener('mouseout', leaveLink)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', enterLink)
      window.removeEventListener('mouseout', leaveLink)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main paw cursor */}
      <motion.div
        ref={scaleRef}
        className="paw-cursor"
        style={{ x: springX, y: springY, transition: 'transform 0.15s ease' }}
      >
        <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
          <ellipse cx="50" cy="72" rx="22" ry="18" fill="#FFB5D8" />
          <ellipse cx="25" cy="50" rx="10" ry="13" fill="#FFB5D8" />
          <ellipse cx="75" cy="50" rx="10" ry="13" fill="#FFB5D8" />
          <ellipse cx="35" cy="32" rx="9" ry="12" fill="#FFB5D8" />
          <ellipse cx="65" cy="32" rx="9" ry="12" fill="#FFB5D8" />
        </svg>
      </motion.div>
      {/* Trail dot */}
      <motion.div
        ref={trailRef}
        className="paw-cursor"
        style={{ x: trailX, y: trailY }}
      >
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: 'rgba(255,181,216,0.4)',
          marginLeft: -4, marginTop: -4
        }} />
      </motion.div>
    </>
  )
}
