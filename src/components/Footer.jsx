import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations & Private Hire' },
  { to: '/media', label: 'Media' },
  { to: '/contact', label: 'Contact & Directions' },
]

export default function Footer() {
  return (
    <footer className="bg-[#060606] border-t border-gold-border">
      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="/nazar-logo-gold.png"
              alt="Nazar Turkish Kitchen + Bar"
              className="w-auto object-contain mb-6"
              style={{ filter: 'brightness(0) invert(1)', height: '7.5rem' }}
            />
            <p className="text-ink-muted text-sm leading-relaxed mb-6 font-sans font-light">
              Authentic Turkish cuisine crafted with passion, tradition, and the finest fresh ingredients.
              Bedford's most celebrated dining experience.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/nazarturkishkitchen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-gold-border flex items-center justify-center text-ink-muted hover:text-gold hover:border-gold transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/NazarBedford/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 border border-gold-border flex items-center justify-center text-ink-muted hover:text-gold hover:border-gold transition-colors"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="label-gold mb-5">Navigate</p>
            <ul className="space-y-3">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-ink-muted text-sm hover:text-gold transition-colors font-sans font-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <p className="label-gold mb-5">Opening Hours</p>
            <ul className="space-y-2 text-sm font-sans font-light">
              <li className="flex justify-between gap-4">
                <span className="text-ink-muted">Mon – Thu</span>
                <span className="text-ink">12:00 – 22:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-ink-muted">Friday</span>
                <span className="text-ink">12:00 – 23:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-ink-muted">Saturday</span>
                <span className="text-ink">12:00 – 23:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-ink-muted">Sunday</span>
                <span className="text-ink">12:00 – 22:00</span>
              </li>
            </ul>
            <div className="mt-5 pt-5 border-t border-gold-border">
              <p className="text-xs text-ink-muted font-sans">
                Kitchen closes 30 minutes before closing time.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="label-gold mb-5">Visit Us</p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
                <a
                  href="https://maps.google.com/?q=17+High+Street+Bedford+MK40+1RN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted text-sm hover:text-gold transition-colors font-sans font-light leading-relaxed"
                >
                  17 High Street<br />Bedford, MK40 1RN
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={15} className="text-gold shrink-0 mt-0.5" />
                <span className="text-ink-muted text-sm font-sans font-light">
                  Open 7 days a week
                </span>
              </li>
            </ul>

            <Link to="/reservations" className="btn-gold mt-6 text-xs w-full justify-center">
              <span>Book a Table</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-faint text-xs font-sans">
            © {new Date().getFullYear()} Nazar Turkish Kitchen + Bar Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-ink-faint text-xs font-sans">17 High Street, Bedford, MK40 1RN</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    </footer>
  )
}
