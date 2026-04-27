import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label-gold mb-6 tracking-[0.45em]">404 — Page Not Found</p>
          <h1
            className="font-display text-gold-gradient mb-6"
            style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 300, lineHeight: 1 }}
          >
            Lost?
          </h1>
          <p className="text-ink-muted font-sans font-light text-lg leading-relaxed mb-10">
            The page you're looking for doesn't exist. Perhaps we can point you in the right direction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-gold">
              <span>Return Home</span>
            </Link>
            <Link to="/reservations" className="btn-outline-gold">
              <span>Book a Table</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
