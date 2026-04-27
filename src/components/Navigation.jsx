import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/media', label: 'Media' },
  { to: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-gold-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/nazar-logo-gold.png"
              alt="Nazar Turkish Kitchen + Bar"
              className="w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)', height: 'clamp(3.8rem, 8vw, 7.5rem)' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Reserve CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/reservations" className="btn-gold">
              <span>Reserve a Table</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-ink-muted hover:text-gold transition-colors flex items-center justify-center"
            style={{ width: 48, height: 48, touchAction: 'manipulation' }}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-[#0D0D0D] border-l border-gold-border z-50 flex flex-col p-8"
            >
              <button
                className="self-end text-ink-muted hover:text-gold mb-10"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>

              <img
                src="/nazar-logo-gold.png"
                alt="Nazar"
                className="w-auto object-contain mb-10"
                style={{ filter: 'brightness(0) invert(1)', height: '6rem' }}
              />

              <nav className="flex flex-col gap-6">
                {links.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) => `nav-link text-base ${isActive ? 'active' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto">
                <Link
                  to="/reservations"
                  className="btn-gold w-full justify-center"
                  onClick={() => setOpen(false)}
                >
                  <span>Reserve a Table</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
