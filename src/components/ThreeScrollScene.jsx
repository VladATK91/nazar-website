/**
 * FrameScrollScene — scroll-scrubbed frame sequence
 *
 * Optimised for smoothness:
 * - Native scroll listener (no Framer Motion overhead during scroll)
 * - React state updates ONLY when crossing thresholds (not every tick)
 * - DPR-aware canvas for sharp Retina rendering
 * - rAF loop decoupled from scroll events
 */

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const TOTAL_FRAMES = 98
const frameUrl = n => `/frames/frame-${String(n).padStart(4, '0')}.jpg`

export default function ThreeScrollScene() {
  const containerRef  = useRef(null)
  const canvasRef     = useRef(null)
  const framesRef     = useRef([])
  const targetRef     = useRef(0)
  const drawnRef      = useRef(-1)
  const rafRef        = useRef(null)

  /* React state — updated ONLY on threshold crossings, never per-tick */
  const scrolledRef   = useRef(false)
  const overlayRef    = useRef(null)
  const [loaded,   setLoaded]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  /* ── Preload all frames ── */
  useEffect(() => {
    const images = Array.from({ length: TOTAL_FRAMES }, () => new Image())
    let done = 0
    images.forEach((img, i) => {
      img.onload = img.onerror = () => {
        done++
        setProgress(done / TOTAL_FRAMES)
        if (done === TOTAL_FRAMES) { framesRef.current = images; setLoaded(true) }
      }
      img.src = frameUrl(i + 1)
    })
  }, [])

  /* ── Canvas + scroll logic ── */
  useEffect(() => {
    if (!loaded) return

    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    /* DPR-aware resize */
    function resize() {
      const dpr      = window.devicePixelRatio || 1
      canvas.width   = Math.round(window.innerWidth  * dpr)
      canvas.height  = Math.round(window.innerHeight * dpr)
      canvas.style.width  = window.innerWidth  + 'px'
      canvas.style.height = window.innerHeight + 'px'
      drawnRef.current = -1
    }
    resize()
    window.addEventListener('resize', resize)

    /* Native scroll listener — no React/Framer overhead per tick */
    function onScroll() {
      const el = containerRef.current
      if (!el) return
      const scrollRange = el.offsetHeight - window.innerHeight
      const scrollTop   = window.scrollY - el.offsetTop
      const v           = Math.max(0, Math.min(1, scrollTop / scrollRange))

      targetRef.current = Math.round(v * (TOTAL_FRAMES - 1))

      /* Fade-out overlay: last ~1-2 frames only (98.5% → 100%) */
      if (overlayRef.current) {
        overlayRef.current.style.opacity = Math.max(0, (v - 0.985) / 0.015)
      }

      /* Only trigger re-render when threshold actually changes */
      const crossed = v > 0.06
      if (crossed !== scrolledRef.current) {
        scrolledRef.current = crossed
        setScrolled(crossed)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // sync on mount

    /* rAF draw loop — only repaints when frame index changes */
    function loop() {
      rafRef.current = requestAnimationFrame(loop)
      const t = targetRef.current
      if (t === drawnRef.current) return

      const img = framesRef.current[t]
      if (!img?.complete || img.naturalWidth === 0) return

      const pw = canvas.width, ph = canvas.height
      const scale = Math.max(pw / img.naturalWidth, ph / img.naturalHeight)
      const ox = (pw - img.naturalWidth  * scale) / 2
      const oy = (ph - img.naturalHeight * scale) / 2
      ctx.clearRect(0, 0, pw, ph)
      ctx.drawImage(img, ox, oy, img.naturalWidth * scale, img.naturalHeight * scale)
      drawnRef.current = t
    }
    loop()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
    }
  }, [loaded])

  return (
    <section ref={containerRef} style={{ height: '300vh' }} className="relative">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-black"
        style={{ willChange: 'transform' }}
      >

        {/* ── Loading screen ── */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black gap-8 z-20">
            <img
              src="/nazar-logo-gold.png"
              alt="Nazar"
              style={{ height: '5rem', filter: 'brightness(0) invert(1)', opacity: 0.55 }}
            />
            <div style={{ width: 160, height: 1, background: '#1c1a16' }}>
              <div style={{
                height: '100%', width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, #B8924A, #E8D5AC)',
                transition: 'width 0.12s linear',
              }} />
            </div>
          </div>
        )}

        {/* ── Frame canvas — GPU composited, DPR-sharp ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{
            opacity:    loaded ? 1 : 0,
            transition: 'opacity 0.7s ease',
            willChange: 'contents',
          }}
        />

        {/* ── Fade-out overlay — driven directly by scroll, no React state ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: 0, zIndex: 8 }}
        />

        {/* ── Welcome text — centre of hero ── */}
        <motion.div
          animate={{ opacity: scrolled ? 0 : loaded ? 1 : 0, y: scrolled ? -20 : 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 flex flex-col items-center pointer-events-none z-10 hero-welcome"
        >
          <p style={{
            fontFamily:    '"Montserrat", sans-serif',
            fontWeight:    300,
            fontSize:      'clamp(0.60rem, 2.5vw, 0.88rem)',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.90)',
            marginBottom:  '0.8rem',
            textShadow:    '0 2px 20px rgba(0,0,0,0.8)',
          }}>
            Welcome to
          </p>
          <h1 style={{
            fontFamily:    '"Cormorant Garamond", Georgia, serif',
            fontWeight:    300,
            fontSize:      'clamp(3.8rem, 14vw, 9.5rem)',
            lineHeight:    0.90,
            letterSpacing: '0.10em',
            background:    'linear-gradient(160deg, #E8D5AC 0%, #D4AF7A 40%, #C9A96E 70%, #B8924A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:      'text',
            textShadow:          'none',
            marginBottom:  '0',
            textAlign:     'center',
          }}>
            NAZAR
          </h1>
        </motion.div>

        {/* ── Bottom bar — TripAdvisor + CTAs ── */}
        <motion.div
          animate={{ opacity: scrolled ? 0 : loaded ? 1 : 0, y: scrolled ? 14 : 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.50) 60%, transparent 100%)',
            paddingBottom: '3rem',
            paddingTop:    '7rem',
          }}
        >
          <div className="max-w-7xl mx-auto px-5 lg:px-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 sm:gap-8">

            {/* TripAdvisor badge */}
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                {[1,2,3,4].map(s => (
                  <svg key={s} width="15" height="15" viewBox="0 0 24 24" fill="#00AA6C">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="hstar">
                      <stop offset="50%" stopColor="#00AA6C"/>
                      <stop offset="50%" stopColor="#555" stopOpacity="0.4"/>
                    </linearGradient>
                  </defs>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#hstar)"/>
                </svg>
              </div>

              <p style={{
                fontFamily: '"Montserrat", sans-serif', fontWeight: 700,
                fontSize: 'clamp(0.60rem, 1.1vw, 0.74rem)',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: '#ffffff', marginBottom: '0.35rem',
              }}>
                Travellers' Choice 2025
              </p>
              <p style={{
                fontFamily: '"Montserrat", sans-serif', fontWeight: 300,
                fontSize: 'clamp(0.70rem, 1.2vw, 0.82rem)',
                color: 'rgba(230,224,212,0.82)', lineHeight: 1.5,
              }}>
                Ranked <strong style={{ color: '#fff', fontWeight: 600 }}>#3</strong> of 382 restaurants in Bedford
                &nbsp;·&nbsp;
                <strong style={{ color: '#fff', fontWeight: 600 }}>4.5&thinsp;/&thinsp;5</strong> from 1,376 reviews
              </p>
            </div>

            {/* CTAs */}
            <div className="pointer-events-auto flex flex-wrap gap-3" style={{ flexShrink: 0 }}>
              <Link to="/reservations" className="btn-gold"><span>Reserve a Table</span></Link>
              <Link to="/menu"         className="btn-outline-gold"><span>View Menu</span></Link>
            </div>
          </div>
        </motion.div>

        {/* ── Scroll cue ── */}
        <motion.div
          animate={{ opacity: scrolled ? 0 : loaded ? 0.55 : 0 }}
          transition={{ duration: 0.9 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-10"
        >
          <span style={{
            fontFamily: '"Montserrat", sans-serif', fontWeight: 600,
            fontSize: '0.46rem', letterSpacing: '0.58em',
            textTransform: 'uppercase', color: 'rgba(212,175,122,0.72)',
          }}>
            Scroll
          </span>
          <motion.div
            animate={{ scaleY: [1, 0.08, 1], opacity: [0.55, 0.08, 0.55] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 1, height: 38,
              background: 'linear-gradient(to bottom, #D4AF7A, transparent)',
              transformOrigin: 'top',
            }}
          />
        </motion.div>

      </div>
    </section>
  )
}
