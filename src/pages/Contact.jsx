import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, CheckCircle, ArrowRight, Car, Train, ParkingSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IMAGES } from '../assets/images'

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const hours = [
  { day: 'Monday', hours: '12:00 – 22:00' },
  { day: 'Tuesday', hours: '12:00 – 22:00' },
  { day: 'Wednesday', hours: '12:00 – 22:00' },
  { day: 'Thursday', hours: '12:00 – 22:00' },
  { day: 'Friday', hours: '12:00 – 23:00' },
  { day: 'Saturday', hours: '12:00 – 23:00' },
  { day: 'Sunday', hours: '12:00 – 22:00' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long' })

  function handleChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch('https://formspree.io/f/REPLACE_WITH_YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Contact: ${form.subject || 'Website enquiry'}` }),
      })
      if (res.ok) setSubmitted(true)
      else alert('Something went wrong. Please try again or call us directly.')
    } catch {
      // Fallback: open mail client
      window.location.href = `mailto:info@nazarkitchen.com?subject=${encodeURIComponent(form.subject || 'Website enquiry')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    }
  }

  return (
    <main>
      {/* ── Header ── */}
      <section className="relative page-header-pt pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.chefKitchen}
            alt="Nazar contact"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 to-[#0A0A0A]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="label-gold mb-4">We'd Love to Hear from You</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="heading-xl text-gold-gradient mb-4">Contact &<br />Directions</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ink-muted font-sans font-light max-w-lg leading-relaxed">
              Find us in the heart of Bedford town centre on the High Street. Whether by car, train, or on foot — we're easy to reach and always delighted to welcome you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Contact info + form ── */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Left: Contact details */}
            <div>
              {/* Address */}
              <Reveal>
                <div className="mb-10">
                  <p className="label-gold mb-4">Address</p>
                  <div className="flex gap-4">
                    <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-display text-ink text-2xl font-light mb-1">17 High Street</p>
                      <p className="text-ink-muted font-sans font-light">Bedford, MK40 1RN</p>
                      <p className="text-ink-muted font-sans font-light text-sm mt-1">Bedfordshire, England</p>
                      <a
                        href="https://maps.google.com/?q=17+High+Street+Bedford+MK40+1RN"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gold text-xs font-sans font-semibold tracking-wider uppercase mt-3 hover:underline"
                      >
                        Open in Google Maps
                        <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="gold-line-full mb-10" />

              {/* Opening Hours */}
              <Reveal delay={0.1}>
                <div className="mb-10">
                  <p className="label-gold mb-4">Opening Hours</p>
                  <div className="space-y-2">
                    {hours.map(({ day, hours: h }) => {
                      const isToday = day === today
                      return (
                        <div
                          key={day}
                          className={`flex justify-between items-center py-2.5 border-b border-gold-border ${isToday ? 'text-ink' : ''}`}
                        >
                          <span className={`font-sans text-sm font-light ${isToday ? 'text-gold font-medium' : 'text-ink-muted'}`}>
                            {day}
                            {isToday && <span className="ml-2 text-[0.55rem] border border-gold px-1.5 py-0.5 tracking-wider uppercase font-semibold">Today</span>}
                          </span>
                          <span className={`font-display text-lg font-light ${isToday ? 'text-gold' : 'text-ink'}`}>{h}</span>
                        </div>
                      )
                    })}
                  </div>
                  <p className="text-ink-faint text-xs font-sans mt-3">
                    Kitchen closes 30 minutes before closing time.
                  </p>
                </div>
              </Reveal>

              <div className="gold-line-full mb-10" />

              {/* Social */}
              <Reveal delay={0.2}>
                <div>
                  <p className="label-gold mb-4">Follow Us</p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/nazarturkishkitchen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-ink-muted hover:text-gold transition-colors group"
                    >
                      <div className="w-9 h-9 border border-gold-border group-hover:border-gold flex items-center justify-center transition-colors">
                        <Instagram size={15} className="text-gold" />
                      </div>
                      <span className="text-xs font-sans tracking-wider uppercase">Instagram</span>
                    </a>
                    <a
                      href="https://www.facebook.com/NazarBedford/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-ink-muted hover:text-gold transition-colors group"
                    >
                      <div className="w-9 h-9 border border-gold-border group-hover:border-gold flex items-center justify-center transition-colors">
                        <Facebook size={15} className="text-gold" />
                      </div>
                      <span className="text-xs font-sans tracking-wider uppercase">Facebook</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Contact form */}
            <Reveal delay={0.2}>
              <div>
                <p className="label-gold mb-6">Send Us a Message</p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 px-8 border border-gold-border"
                  >
                    <div className="w-14 h-14 border border-gold rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={24} className="text-gold" />
                    </div>
                    <h3 className="font-display text-gold text-2xl font-light mb-3">Message Sent</h3>
                    <p className="text-ink-muted font-sans font-light text-sm leading-relaxed mb-6">
                      Thank you for getting in touch. We'll respond as soon as possible.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn-outline-gold">
                      <span>Send Another Message</span>
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label-gold block mb-2 text-[0.6rem]">Name *</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="label-gold block mb-2 text-[0.6rem]">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label-gold block mb-2 text-[0.6rem]">Subject</label>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="label-gold block mb-2 text-[0.6rem]">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Your message..."
                        className="form-input resize-none"
                      />
                    </div>
                    <button type="submit" className="btn-gold w-full justify-center">
                      <span>Send Message</span>
                      <ArrowRight size={14} />
                    </button>
                  </form>
                )}

                <div className="mt-6 pt-6 border-t border-gold-border">
                  <p className="text-ink-muted text-xs font-sans leading-relaxed">
                    For reservations, please use our{' '}
                    <Link to="/reservations" className="text-gold hover:underline">booking form</Link>.
                    For same-day enquiries, we recommend calling during opening hours.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="section-label-group mb-8">
              <span className="label-gold">Find Us</span>
            </div>
          </Reveal>

          <div className="relative border border-gold-border overflow-hidden" style={{ height: '480px' }}>
            <iframe
              title="Nazar Turkish Kitchen + Bar Location"
              src="https://maps.google.com/maps?q=17+High+Street,+Bedford,+MK40+1RN,+United+Kingdom&output=embed&z=17"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 right-4">
              <a
                href="https://maps.google.com/?q=17+High+Street+Bedford+MK40+1RN"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs px-4 py-2"
              >
                <span>Open in Maps</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Directions & Parking ── */}
      <section className="section-py bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="section-label-group mb-8">
              <span className="label-gold">Getting Here</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-lg text-ink mb-12">
              Directions &<br />
              <em className="text-gold-gradient not-italic">Parking</em>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {/* By Car */}
            <Reveal delay={0.1}>
              <div className="card-dark p-7">
                <Car size={20} className="text-gold mb-4" />
                <h3 className="font-display text-gold text-xl font-light mb-3">By Car</h3>
                <div className="space-y-3 text-ink-muted text-sm font-sans font-light leading-relaxed">
                  <p>
                    <strong className="text-ink font-medium">From the A421 (M1/A1):</strong><br />
                    Follow signs into Bedford town centre. Take St John's Street and turn onto the High Street. Nazar is on the right at number 17.
                  </p>
                  <p>
                    <strong className="text-ink font-medium">Postcode for sat nav:</strong><br />
                    <span className="font-mono text-gold">MK40 1RN</span>
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Parking */}
            <Reveal delay={0.15}>
              <div className="card-dark p-7">
                <ParkingSquare size={20} className="text-gold mb-4" />
                <h3 className="font-display text-gold text-xl font-light mb-3">Parking</h3>
                <div className="space-y-3 text-ink-muted text-sm font-sans font-light leading-relaxed">
                  <p>
                    <strong className="text-ink font-medium">Nearest Car Parks:</strong>
                  </p>
                  <ul className="space-y-2">
                    <li className="flex gap-2"><div className="w-1 h-1 bg-gold rounded-full mt-2 shrink-0" /> <span>Lurke Street Multi-Storey — 3 min walk (Bedford Borough Council)</span></li>
                    <li className="flex gap-2"><div className="w-1 h-1 bg-gold rounded-full mt-2 shrink-0" /> <span>St Peter's Street — 5 min walk</span></li>
                    <li className="flex gap-2"><div className="w-1 h-1 bg-gold rounded-full mt-2 shrink-0" /> <span>Riverside NCP — 8 min walk</span></li>
                  </ul>
                  <p>Evening parking from £1 in most town centre car parks after 18:00.</p>
                </div>
              </div>
            </Reveal>

            {/* By Train */}
            <Reveal delay={0.2}>
              <div className="card-dark p-7">
                <Train size={20} className="text-gold mb-4" />
                <h3 className="font-display text-gold text-xl font-light mb-3">By Train</h3>
                <div className="space-y-3 text-ink-muted text-sm font-sans font-light leading-relaxed">
                  <p>
                    <strong className="text-ink font-medium">Bedford Station:</strong><br />
                    A 12-minute walk from Bedford Train Station via the town centre. Taxis available at the station rank.
                  </p>
                  <p>
                    <strong className="text-ink font-medium">From London St Pancras:</strong><br />
                    35–45 minutes by Thameslink direct to Bedford.
                  </p>
                  <p>
                    <strong className="text-ink font-medium">From Milton Keynes:</strong><br />
                    20–25 minutes by Thameslink.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 border-t border-gold-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <h2 className="font-display text-ink text-4xl font-light mb-4">
              Ready to Visit?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-ink-muted font-sans font-light mb-8">
              Reserve your table online or simply walk in — we'd love to welcome you.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/reservations" className="btn-gold inline-flex">
              <span>Book a Table</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
