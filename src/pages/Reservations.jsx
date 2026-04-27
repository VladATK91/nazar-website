import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Users, Clock, CheckCircle, ChevronDown, ArrowRight } from 'lucide-react'
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

const tabs = [
  { id: 'table', label: 'Reserve a Table' },
  { id: 'private', label: 'Private Hire Enquiry' },
]

const times = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30',
]

const occasions = [
  'Birthday Celebration',
  'Anniversary',
  'Romantic Dinner',
  'Business Dinner',
  'Family Gathering',
  'Casual Dining',
  'Other',
]

const privateTypes = [
  'Wedding Reception',
  'Birthday Party',
  'Corporate Event',
  'Anniversary Celebration',
  'Engagement Party',
  'Christmas / New Year',
  'Other Private Event',
]

function SelectWrapper({ children }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
    </div>
  )
}

function SuccessState({ type, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-8"
    >
      <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={28} className="text-gold" />
      </div>
      <h3 className="font-display text-gold text-3xl font-light mb-3">
        {type === 'table' ? 'Reservation Received' : 'Enquiry Sent'}
      </h3>
      <p className="text-ink-muted font-sans font-light text-sm max-w-sm mx-auto leading-relaxed mb-8">
        {type === 'table'
          ? 'Thank you for your reservation request. Our team will be in touch shortly to confirm your booking. We look forward to welcoming you.'
          : 'Thank you for your private hire enquiry. Our events team will contact you within 24 hours to discuss your occasion in detail.'}
      </p>
      <button onClick={onReset} className="btn-outline-gold">
        <span>Make Another {type === 'table' ? 'Reservation' : 'Enquiry'}</span>
      </button>
    </motion.div>
  )
}

export default function Reservations() {
  const [activeTab, setActiveTab] = useState('table')
  const [tableSuccess, setTableSuccess] = useState(false)
  const [privateSuccess, setPrivateSuccess] = useState(false)

  const [tableForm, setTableForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', occasion: '', notes: '',
  })

  const [privateForm, setPrivateForm] = useState({
    name: '', email: '', phone: '', date: '', eventType: '', guests: '',
    budget: '', notes: '', menu: 'set_menu',
  })

  function handleTableChange(e) {
    setTableForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  function handlePrivateChange(e) {
    setPrivateForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  async function handleTableSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch('https://formspree.io/f/REPLACE_WITH_YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...tableForm,
          _subject: `Table Reservation — ${tableForm.date} at ${tableForm.time} for ${tableForm.guests} guest(s)`,
        }),
      })
      if (res.ok) { setTableSuccess(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }
      else alert('Something went wrong. Please try again or call us directly.')
    } catch {
      window.location.href = `mailto:info@nazarkitchen.com?subject=${encodeURIComponent(`Table Reservation — ${tableForm.date}`)}&body=${encodeURIComponent(`Name: ${tableForm.name}\nEmail: ${tableForm.email}\nPhone: ${tableForm.phone}\nDate: ${tableForm.date}\nTime: ${tableForm.time}\nGuests: ${tableForm.guests}\nOccasion: ${tableForm.occasion}\nNotes: ${tableForm.notes}`)}`
    }
  }

  async function handlePrivateSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch('https://formspree.io/f/REPLACE_WITH_YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...privateForm,
          _subject: `Private Hire Enquiry — ${privateForm.eventType} on ${privateForm.date} for ${privateForm.guests} guests`,
        }),
      })
      if (res.ok) { setPrivateSuccess(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }
      else alert('Something went wrong. Please try again or call us directly.')
    } catch {
      window.location.href = `mailto:info@nazarkitchen.com?subject=${encodeURIComponent(`Private Hire — ${privateForm.eventType}`)}&body=${encodeURIComponent(`Name: ${privateForm.name}\nEmail: ${privateForm.email}\nPhone: ${privateForm.phone}\nDate: ${privateForm.date}\nEvent: ${privateForm.eventType}\nGuests: ${privateForm.guests}\nMenu: ${privateForm.menu}\nBudget: ${privateForm.budget}\nNotes: ${privateForm.notes}`)}`
    }
  }

  return (
    <main>
      {/* ── Header ── */}
      <section className="relative page-header-pt pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.privateRoom}
            alt="Private dining at Nazar"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 to-[#0A0A0A]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="label-gold mb-4">17 High Street, Bedford</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="heading-xl text-gold-gradient mb-4">Reservations &<br />Private Hire</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ink-muted font-sans font-light max-w-lg leading-relaxed">
              Book your table or enquire about hosting a private event at Nazar. We welcome walk-ins subject to availability — reservations are recommended for larger groups.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Info cards ── */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Clock, title: 'Opening Hours', lines: ['Mon–Thu: 12:00 – 22:00', 'Fri–Sat: 12:00 – 23:00', 'Sunday: 12:00 – 22:00'] },
              { icon: Users, title: 'Group Bookings', lines: ['Parties of 6+: reservation required', 'Groups of 10+: please call us', 'Private hire from 20 guests'] },
              { icon: Calendar, title: 'Good to Know', lines: ['Walk-ins always welcome', '10% service charge applies', 'All meats are Halal certified'] },
            ].map(({ icon: Icon, title, lines }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="card-dark p-6">
                  <Icon size={18} className="text-gold mb-4" />
                  <h3 className="font-display text-gold text-lg font-light mb-3">{title}</h3>
                  {lines.map(l => (
                    <p key={l} className="text-ink-muted text-xs font-sans font-light mb-1">{l}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab Nav ── */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">

          {/* Tab buttons */}
          <div className="flex mb-10 border border-gold-border">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 font-sans text-xs font-semibold letter-spacing-wider uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gold text-[#0A0A0A]'
                    : 'text-ink-muted hover:text-gold'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {activeTab === 'table' && (
              <motion.div
                key="table"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
              >
                {tableSuccess ? (
                  <SuccessState type="table" onReset={() => { setTableSuccess(false); setTableForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', occasion: '', notes: '' }) }} />
                ) : (
                  <form onSubmit={handleTableSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label-gold block mb-2 text-[0.6rem]">Full Name *</label>
                        <input
                          name="name"
                          value={tableForm.name}
                          onChange={handleTableChange}
                          required
                          placeholder="Your full name"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="label-gold block mb-2 text-[0.6rem]">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={tableForm.email}
                          onChange={handleTableChange}
                          required
                          placeholder="your@email.com"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label-gold block mb-2 text-[0.6rem]">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={tableForm.phone}
                          onChange={handleTableChange}
                          required
                          placeholder="07700 900000"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="label-gold block mb-2 text-[0.6rem]">Number of Guests *</label>
                        <SelectWrapper>
                          <select
                            name="guests"
                            value={tableForm.guests}
                            onChange={handleTableChange}
                            required
                            className="form-select"
                          >
                            {[1,2,3,4,5,6,7,8,9,10].map(n => (
                              <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                            ))}
                            <option value="10+">10+ guests</option>
                          </select>
                        </SelectWrapper>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label-gold block mb-2 text-[0.6rem]">Preferred Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={tableForm.date}
                          onChange={handleTableChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="form-input"
                          style={{ colorScheme: 'dark' }}
                        />
                      </div>
                      <div>
                        <label className="label-gold block mb-2 text-[0.6rem]">Preferred Time *</label>
                        <SelectWrapper>
                          <select
                            name="time"
                            value={tableForm.time}
                            onChange={handleTableChange}
                            required
                            className="form-select"
                          >
                            <option value="">Select a time</option>
                            {times.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </SelectWrapper>
                      </div>
                    </div>

                    <div>
                      <label className="label-gold block mb-2 text-[0.6rem]">Occasion</label>
                      <SelectWrapper>
                        <select
                          name="occasion"
                          value={tableForm.occasion}
                          onChange={handleTableChange}
                          className="form-select"
                        >
                          <option value="">Select occasion (optional)</option>
                          {occasions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </SelectWrapper>
                    </div>

                    <div>
                      <label className="label-gold block mb-2 text-[0.6rem]">Special Requests or Dietary Requirements</label>
                      <textarea
                        name="notes"
                        value={tableForm.notes}
                        onChange={handleTableChange}
                        rows={4}
                        placeholder="Allergies, high chairs, accessibility needs, celebrations..."
                        className="form-input resize-none"
                      />
                    </div>

                    <p className="text-ink-faint text-xs font-sans leading-relaxed">
                      Reservations are held for 15 minutes. For same-day bookings or groups of 10+, please call us directly. A 10% service charge will be added to your bill.
                    </p>

                    <button type="submit" className="btn-gold w-full justify-center">
                      <span>Request Reservation</span>
                      <ArrowRight size={14} />
                    </button>
                  </form>
                )}
              </motion.div>
            )}

            {activeTab === 'private' && (
              <motion.div
                key="private"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                {privateSuccess ? (
                  <SuccessState type="private" onReset={() => { setPrivateSuccess(false); setPrivateForm({ name: '', email: '', phone: '', date: '', eventType: '', guests: '', budget: '', notes: '', menu: 'set_menu' }) }} />
                ) : (
                  <>
                    {/* Private hire intro */}
                    <div className="mb-8 p-6 border border-gold-border bg-gold-muted">
                      <p className="label-gold mb-3">Private Event Spaces</p>
                      <p className="text-ink-muted font-sans font-light text-sm leading-relaxed mb-4">
                        Nazar offers exclusive private hire for intimate dinners, large celebrations, and corporate events. Our team will work with you to create a bespoke experience — from custom menus to dedicated service.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-xs font-sans text-ink-muted">
                        <div className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> From 20 to 120 guests</div>
                        <div className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Bespoke menus available</div>
                        <div className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Dedicated events team</div>
                        <div className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Set menu from £59/person</div>
                      </div>
                    </div>

                    <form onSubmit={handlePrivateSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="label-gold block mb-2 text-[0.6rem]">Full Name *</label>
                          <input
                            name="name"
                            value={privateForm.name}
                            onChange={handlePrivateChange}
                            required
                            placeholder="Your full name"
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="label-gold block mb-2 text-[0.6rem]">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={privateForm.email}
                            onChange={handlePrivateChange}
                            required
                            placeholder="your@email.com"
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="label-gold block mb-2 text-[0.6rem]">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={privateForm.phone}
                            onChange={handlePrivateChange}
                            required
                            placeholder="07700 900000"
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="label-gold block mb-2 text-[0.6rem]">Event Date *</label>
                          <input
                            type="date"
                            name="date"
                            value={privateForm.date}
                            onChange={handlePrivateChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="form-input"
                            style={{ colorScheme: 'dark' }}
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="label-gold block mb-2 text-[0.6rem]">Type of Event *</label>
                          <SelectWrapper>
                            <select
                              name="eventType"
                              value={privateForm.eventType}
                              onChange={handlePrivateChange}
                              required
                              className="form-select"
                            >
                              <option value="">Select event type</option>
                              {privateTypes.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </SelectWrapper>
                        </div>
                        <div>
                          <label className="label-gold block mb-2 text-[0.6rem]">Approximate Guest Count *</label>
                          <input
                            type="number"
                            name="guests"
                            value={privateForm.guests}
                            onChange={handlePrivateChange}
                            required
                            min="1"
                            placeholder="e.g. 40"
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label-gold block mb-2 text-[0.6rem]">Menu Preference</label>
                        <SelectWrapper>
                          <select
                            name="menu"
                            value={privateForm.menu}
                            onChange={handlePrivateChange}
                            className="form-select"
                          >
                            <option value="set_menu">Set Menu (£59/person — 3 courses)</option>
                            <option value="bespoke">Bespoke Menu (discuss with our team)</option>
                            <option value="buffet">Buffet Style</option>
                            <option value="undecided">Not yet decided</option>
                          </select>
                        </SelectWrapper>
                      </div>

                      <div>
                        <label className="label-gold block mb-2 text-[0.6rem]">Approximate Budget (optional)</label>
                        <SelectWrapper>
                          <select
                            name="budget"
                            value={privateForm.budget}
                            onChange={handlePrivateChange}
                            className="form-select"
                          >
                            <option value="">Prefer not to say</option>
                            <option value="under_500">Under £500</option>
                            <option value="500_1500">£500 – £1,500</option>
                            <option value="1500_3000">£1,500 – £3,000</option>
                            <option value="3000_5000">£3,000 – £5,000</option>
                            <option value="5000_plus">£5,000+</option>
                          </select>
                        </SelectWrapper>
                      </div>

                      <div>
                        <label className="label-gold block mb-2 text-[0.6rem]">Additional Details</label>
                        <textarea
                          name="notes"
                          value={privateForm.notes}
                          onChange={handlePrivateChange}
                          rows={5}
                          placeholder="Tell us about your event — any specific requirements, allergies, entertainment, decorations, or questions..."
                          className="form-input resize-none"
                        />
                      </div>

                      <p className="text-ink-faint text-xs font-sans leading-relaxed">
                        Our events team will contact you within 24 hours of receiving your enquiry. For urgent enquiries, please call us during opening hours.
                      </p>

                      <button type="submit" className="btn-gold w-full justify-center">
                        <span>Send Private Hire Enquiry</span>
                        <ArrowRight size={14} />
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}
