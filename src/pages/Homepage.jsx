import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, ArrowRight, Award, Users, Clock, Flame } from 'lucide-react'

import { IMAGES } from '../assets/images'
import ThreeScrollScene from '../components/ThreeScrollScene'

/* ─── Helpers ─── */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function RevealLeft({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ParallaxImage({ src, alt, speed = 0.15, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`])
  const ySpring = useSpring(y, { stiffness: 55, damping: 22 })
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ y: ySpring }}
        className="w-full h-full object-cover scale-125" loading="lazy" />
    </div>
  )
}

function Stars({ count = 5, size = 13 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} className="fill-gold text-gold" />
      ))}
    </div>
  )
}

/* ─── Data ─── */
const stats = [
  { icon: Star,  value: '4.5★', label: 'TripAdvisor Rating' },
  { icon: Users, value: '1,376+', label: 'Verified Reviews' },
  { icon: Award, value: '#3',   label: 'Restaurant in Bedford' },
  { icon: Clock, value: '7 Days', label: 'A Week' },
]

const dishes = [
  { name: 'Mixed Grill Platter', description: 'Chicken shish, lamb shish and Adana kebab charcoal-grilled to perfection. The definitive Nazar experience.', tag: 'Signature',     image: IMAGES.kebabGrill },
  { name: 'Mixed Mezze Board',   description: 'House-made hummus, baba ganoush, sigara börek, stuffed vine leaves and warm herb butter bread.', tag: 'Sharing',       image: IMAGES.mezze },
  { name: 'Chicken Shish',       description: 'Marinated chicken pieces grilled over charcoal, served with fragrant rice and fresh salad.', tag: 'Grills',        image: IMAGES.dish },
  { name: 'Lamb Chops',          description: 'Prime lamb cutlets marinated overnight and charcoal-grilled. Beautifully charred, irresistibly tender.', tag: 'Chef\'s Special', image: IMAGES.lambShish },
  { name: 'Cocktail Bar',        description: 'Pornstar Martinis, Espresso Martinis, Aperol Spritz, frozen Daiquiris and signature Turkish Raki.', tag: 'Bar',          image: IMAGES.cocktails },
  { name: 'Grilled Sea Bass',    description: 'Whole sea bass charcoal-grilled with seasonal vegetables, herbs and fresh lemon.', tag: 'Seafood',      image: IMAGES.fish },
]

const reviews = [
  { author: 'James T.',   date: 'April 2026',     rating: 5, text: 'A true hidden gem. Better than any competing Turkish restaurant I\'ve visited. The food was fresh, authentic, and the service from Levent, Maria, and Ozz was exemplary. Left with a complimentary shot and a huge smile.' },
  { author: 'Sophie M.',  date: 'February 2026',  rating: 5, text: 'Fantastic from start to finish. Plentiful portions, excellent value, and Ozzy and his team couldn\'t have been more attentive. We\'ll be back without question.' },
  { author: 'Richard C.', date: 'February 2026',  rating: 5, text: 'A fabulous lunch — excellent food, exceptional service, and very reasonable pricing. Ozzy\'s warm welcome makes every visit feel truly special.' },
  { author: 'Priya K.',   date: 'September 2025', rating: 5, text: 'The içli köfte was extraordinary — freshly prepared, beautifully spiced. Staff were attentive throughout. A genuine taste of Turkey in Bedford.' },
]

export default function Homepage() {
  return (
    <main>

      {/* ══════════════════════
          THREE.JS SCROLLYTELLING
      ══════════════════════ */}
      <ThreeScrollScene />

      {/* ══════════════════════
          STATS BAR
      ══════════════════════ */}
      <section className="relative bg-[#0D0D0D] border-y border-gold-border py-7 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-muted to-transparent opacity-40" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center gap-1.5 py-1">
                  <Icon size={16} className="text-gold mb-1" />
                  <span className="font-display text-gold text-2xl font-light">{value}</span>
                  <span className="label-gold text-[0.58rem]">{label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
          STORY
      ══════════════════════ */}
      <section className="section-py overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

            {/* Image column */}
            <RevealLeft className="relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={IMAGES.heroInterior2} alt="Nazar dining room" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Floating stat card — desktop only */}
              <motion.div
                className="hidden sm:block absolute -bottom-6 -right-4 lg:-right-8 bg-[#0D0D0D] border border-gold-border p-6 w-44"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="font-display text-gold text-4xl font-light mb-1">10+</p>
                <p className="label-gold text-[0.58rem]">Years of Passion</p>
              </motion.div>
              {/* Second accent card — desktop only */}
              <motion.div
                className="hidden sm:block absolute -top-5 -left-4 lg:-left-8 bg-[#0D0D0D] border border-gold-border p-5 w-40"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="font-display text-gold text-3xl font-light mb-1">Halal</p>
                <p className="label-gold text-[0.58rem]">Certified Kitchen</p>
              </motion.div>
            </RevealLeft>

            {/* Text column */}
            <div className="order-1 lg:order-2">
              <Reveal>
                <div className="section-label-group"><span className="label-gold">Our Story</span></div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="heading-lg text-ink mb-6">
                  Where Turkish Tradition<br />
                  <em className="text-gold-gradient not-italic">Meets Modern Craft</em>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-ink-muted font-sans font-light leading-relaxed mb-5">
                  Nazar Turkish Kitchen + Bar brings the soul of Turkish hospitality to the heart of Bedford. Named after the ancient evil-eye charm — a symbol of protection, warmth, and good fortune — we are a celebration of authentic flavours passed through generations.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-ink-muted font-sans font-light leading-relaxed mb-8">
                  Every dish is prepared fresh daily using the finest seasonal ingredients, traditional techniques, and recipes that honour our culinary heritage. From charcoal-grilled kebabs to delicate house-made mezze, every plate tells a story of craftsmanship and genuine care.
                </p>
              </Reveal>
              <Reveal delay={0.35}><div className="gold-line-full mb-8" /></Reveal>
              <Reveal delay={0.4}>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { value: 'Fresh', label: 'Daily Preparation' },
                    { value: 'Halal', label: 'Certified Meat' },
                    { value: '2024', label: "Travellers' Choice" },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <p className="font-display text-gold text-2xl font-light">{value}</p>
                      <p className="label-gold text-[0.58rem] mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.5}>
                <Link to="/menu" className="btn-outline-gold mt-8 inline-flex">
                  <span>Discover Our Menu</span>
                  <ArrowRight size={14} />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
          SIGNATURE DISHES SCROLL
      ══════════════════════ */}
      <section className="section-py bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10">
          <Reveal>
            <div className="section-label-group"><span className="label-gold">From the Kitchen</span></div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-lg text-ink max-w-lg">
              Dishes That Define<br />
              <em className="text-gold-gradient not-italic">Our Craft</em>
            </h2>
          </Reveal>
        </div>

        <div
          className="flex gap-5 px-6 lg:px-10 overflow-x-auto pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dishes.map((dish, i) => (
            <motion.article
              key={dish.name}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="snap-start shrink-0 w-72 lg:w-80 card-dark overflow-hidden group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="label-gold bg-black/70 backdrop-blur-sm px-3 py-1 text-[0.57rem]">
                    {dish.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-gold text-xl font-light mb-2">{dish.name}</h3>
                <p className="text-ink-muted text-xs font-sans font-light leading-relaxed">{dish.description}</p>
              </div>
            </motion.article>
          ))}

          {/* View all card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            viewport={{ once: true }}
            className="snap-start shrink-0 w-64 border border-gold-border flex flex-col items-center justify-center gap-5 p-8 text-center"
          >
            <Flame size={22} className="text-gold" />
            <p className="font-display text-gold text-2xl font-light">Full Menu</p>
            <Link to="/menu" className="btn-gold text-[0.65rem] px-6 py-3">
              <span>Explore</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════
          PARALLAX QUOTE BANNER
      ══════════════════════ */}
      <section className="relative h-[58vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <ParallaxImage src={IMAGES.kebabGrill} alt="Charcoal grill" speed={0.18} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <Reveal>
            <p className="label-gold mb-5 tracking-[0.4em]">Travellers' Choice 2025</p>
          </Reveal>
          <Reveal delay={0.15}>
            <blockquote
              className="font-display text-ink font-light leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)' }}
            >
              "Better than any competing<br />
              <span className="text-gold-gradient">Turkish restaurant I've visited."</span>
            </blockquote>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-ink-muted text-sm font-sans mt-5">James T. · TripAdvisor · ★★★★★</p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════
          REVIEWS
      ══════════════════════ */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Reveal><div className="section-label-group"><span className="label-gold">Guest Experiences</span></div></Reveal>
              <Reveal delay={0.1}><h2 className="heading-lg text-ink">What Our Guests<br /><em className="text-gold-gradient not-italic">Are Saying</em></h2></Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="font-display text-gold text-4xl font-light">4.5</p>
                  <Stars size={11} />
                  <p className="text-ink-muted text-[0.65rem] font-sans mt-1">1,376 reviews</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="card-dark p-6 flex flex-col gap-4"
              >
                <Stars count={review.rating} size={11} />
                <p className="text-ink-muted font-sans font-light text-sm leading-relaxed flex-1 italic">
                  "{review.text}"
                </p>
                <div className="border-t border-gold-border pt-4">
                  <p className="text-ink text-xs font-sans font-semibold">{review.author}</p>
                  <p className="text-ink-faint text-[0.65rem] font-sans mt-0.5">{review.date} · TripAdvisor</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="text-center mt-10">
              <a
                href="https://www.tripadvisor.co.uk/Restaurant_Review-g190737-d6651299-Reviews-Nazar_Turkish_Kitchen_Bar-Bedford_Bedfordshire_England.html"
                target="_blank" rel="noopener noreferrer"
                className="btn-outline-gold inline-flex"
              >
                <span>Read All Reviews on TripAdvisor</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════
          SPLIT: HOURS + PRIVATE HIRE
      ══════════════════════ */}
      <section className="section-py bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Opening hours */}
            <div>
              <Reveal><div className="section-label-group"><span className="label-gold">When to Visit</span></div></Reveal>
              <Reveal delay={0.1}><h2 className="heading-lg text-ink mb-10">Opening<br /><em className="text-gold-gradient not-italic">Hours</em></h2></Reveal>
              <div className="space-y-0">
                {[
                  { day: 'Monday – Thursday', hours: '12:00 – 22:00', highlight: false },
                  { day: 'Friday',            hours: '12:00 – 23:00', highlight: true  },
                  { day: 'Saturday',          hours: '12:00 – 23:00', highlight: true  },
                  { day: 'Sunday',            hours: '12:00 – 22:00', highlight: false },
                ].map(({ day, hours, highlight }, i) => (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    viewport={{ once: true }}
                    className={`flex justify-between items-center py-5 border-b border-gold-border ${highlight ? 'bg-gold-muted -mx-3 px-3' : ''}`}
                  >
                    <span className="text-ink-muted font-sans text-sm">{day}</span>
                    <span className={`font-display text-xl font-light ${highlight ? 'text-gold' : 'text-ink'}`}>{hours}</span>
                  </motion.div>
                ))}
              </div>
              <Reveal delay={0.4}>
                <p className="text-ink-faint text-xs font-sans mt-4 leading-relaxed">
                  Kitchen closes 30 minutes before closing time. Walk-ins welcome subject to availability.
                </p>
              </Reveal>
            </div>

            {/* Private hire */}
            <Reveal delay={0.2}>
              <div className="relative border border-gold-border p-8 lg:p-10 overflow-hidden">
                <div className="absolute inset-0">
                  <img src={IMAGES.privateRoom} alt="Private dining" className="w-full h-full object-cover opacity-8" style={{ opacity: 0.07 }} loading="lazy" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-gold-muted via-transparent to-transparent" />
                <div className="relative z-10">
                  <p className="label-gold mb-4">Private Events & Hire</p>
                  <h3 className="heading-md text-ink mb-4">Host Your Event<br />at Nazar</h3>
                  <p className="text-ink-muted font-sans font-light text-sm leading-relaxed mb-7">
                    From intimate dinners to grand celebrations, our private hire spaces offer a truly unforgettable setting. Bespoke menus, dedicated service, and an atmosphere unlike anywhere else in Bedford.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Weddings & Anniversaries',
                      'Corporate Dining & Events',
                      'Birthday Celebrations',
                      'Bespoke Set Menus · from £59/person',
                      'Up to 120 Guests',
                    ].map(item => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-gold rounded-full shrink-0" />
                        <span className="text-ink-muted text-sm font-sans font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/reservations" className="btn-gold inline-flex">
                    <span>Enquire Now</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════
          BOTTOM CTA
      ══════════════════════ */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <ParallaxImage src={IMAGES.heroAmbience} alt="Nazar restaurant" speed={0.12} className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <Reveal><p className="label-gold mb-5 tracking-[0.4em]">17 High Street, Bedford, MK40 1RN</p></Reveal>
          <Reveal delay={0.12}>
            <h2 className="font-display font-light text-ink leading-tight mb-6"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
              Your Table<br />
              <span className="text-gold-gradient">Awaits You</span>
            </h2>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="text-ink-muted font-sans font-light text-lg mb-10 leading-relaxed">
              Join us for an unforgettable dining experience.<br className="hidden md:block" />
              Book online or simply walk in — we're open seven days a week.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/reservations" className="btn-gold"><span>Reserve a Table</span></Link>
              <Link to="/contact"      className="btn-outline-gold"><span>Get Directions</span></Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  )
}
