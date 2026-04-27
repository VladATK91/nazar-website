import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { stiffness: 220, damping: 26 }
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  const isHovering = useRef(false)
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const onEnter = () => {
      isHovering.current = true
      ringRef.current?.classList.add('cursor-hover')
    }
    const onLeave = () => {
      isHovering.current = false
      ringRef.current?.classList.remove('cursor-hover')
    }

    window.addEventListener('mousemove', move)

    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Use MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a:not([data-cursor]), button:not([data-cursor])').forEach(el => {
        el.setAttribute('data-cursor', 'true')
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Outer ring — spring lag */}
      <motion.div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            border: '1px solid rgba(212,175,122,0.6)',
            borderRadius: '50%',
            transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease',
          }}
          className="cursor-ring-inner"
        />
      </motion.div>

      {/* Inner dot — instant */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            background: '#D4AF7A',
            borderRadius: '50%',
          }}
        />
      </motion.div>

      <style>{`
        body { cursor: none; }
        a, button, [role="button"] { cursor: none; }
        .cursor-ring.cursor-hover .cursor-ring-inner {
          width: 60px !important;
          height: 60px !important;
          background: rgba(212,175,122,0.06);
          border-color: rgba(212,175,122,0.9);
        }
      `}</style>
    </>
  )
}
