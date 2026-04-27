import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram, Facebook, ExternalLink, Star } from 'lucide-react'
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

/* ─── TripAdvisor reviews ─── */
const reviews = [
  {
    author: 'James T.',
    type: 'Couples',
    date: 'April 2026',
    rating: 5,
    title: 'A true hidden gem',
    text: 'Better than any competing Turkish restaurant I have visited. Personalised greeting and incredibly efficient service from Levent, Maria, and Ozz. The food was fresh, authentic, and beautifully presented. Finished with a complimentary shot — an absolute treat.',
  },
  {
    author: 'Sophie M.',
    type: 'Friends',
    date: 'February 2026',
    rating: 5,
    title: 'Fantastic!',
    text: 'A delicious meal with plentiful portions and excellent value for money for a group of four at lunch. Ozzy and his team were friendly, attentive, and nothing was too much trouble. We will most certainly return.',
  },
  {
    author: 'Richard C.',
    type: 'Solo',
    date: 'February 2026',
    rating: 5,
    title: 'A Fabulous Lunch',
    text: 'Excellent food, exceptional service, and very reasonable pricing. Ozzy\'s warm welcome and consistent professionalism makes every visit feel special. One of Bedford\'s finest.',
  },
  {
    author: 'Priya K.',
    type: 'Friends',
    date: 'September 2025',
    rating: 5,
    title: 'Authentic Turkish Experience',
    text: 'Absolutely delicious and freshly prepared meals — the içli köfte was extraordinary. Staff were very attentive and friendly throughout. A genuine taste of Turkey in the heart of Bedfordshire.',
  },
]

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={11} className="fill-gold text-gold" />
      ))}
    </div>
  )
}

/* ─── Gallery ─── */
const gallery = [
  { src: IMAGES.kebabGrill,   caption: 'Charcoal Grill'      },
  { src: IMAGES.mezze,        caption: 'Mezze Selection'      },
  { src: IMAGES.heroInterior, caption: 'The Dining Room'      },
  { src: IMAGES.cocktails,    caption: 'Bar & Cocktails'      },
  { src: IMAGES.dish,         caption: 'Mixed Grill Platter'  },
  { src: IMAGES.privateRoom,  caption: 'Private Dining'       },
]

export default function Media() {
  return (
    <main>
      {/* ── Header ── */}
      <section className="relative page-header-pt pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.heroAmbience}
            alt="Nazar media"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 to-[#0A0A0A]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="label-gold mb-4">Stay Connected</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="heading-xl text-gold-gradient mb-4">Media &<br />What's On</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ink-muted font-sans font-light max-w-lg leading-relaxed">
              Follow us for the latest specials, events, and behind-the-scenes moments from the kitchen. Join our community of food lovers across Bedford and beyond.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Social Channels ── */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Instagram */}
            <Reveal>
              <a
                href="https://www.instagram.com/nazarturkishkitchen"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 border border-gold-border hover:border-gold transition-all duration-300 hover:bg-white/[0.02]"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 flex items-center justify-center border border-gold-border group-hover:border-gold transition-colors">
                    <Instagram size={22} className="text-gold" />
                  </div>
                  <ExternalLink size={16} className="text-ink-faint group-hover:text-gold transition-colors mt-1" />
                </div>
                <p className="label-gold mb-2">Instagram</p>
                <h3 className="font-display text-ink text-2xl font-light mb-2">@nazarturkishkitchen</h3>
                <p className="text-ink-muted font-sans font-light text-sm leading-relaxed">
                  Daily specials, beautiful dishes, and moments from our kitchen. Follow for food inspiration and exclusive offers.
                </p>
                <div className="mt-6 flex items-center gap-2 text-gold text-xs font-sans font-semibold tracking-wider uppercase">
                  Follow on Instagram
                  <ExternalLink size={12} />
                </div>
              </a>
            </Reveal>

            {/* Facebook */}
            <Reveal delay={0.1}>
              <a
                href="https://www.facebook.com/NazarBedford/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 border border-gold-border hover:border-gold transition-all duration-300 hover:bg-white/[0.02]"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 flex items-center justify-center border border-gold-border group-hover:border-gold transition-colors">
                    <Facebook size={22} className="text-gold" />
                  </div>
                  <ExternalLink size={16} className="text-ink-faint group-hover:text-gold transition-colors mt-1" />
                </div>
                <p className="label-gold mb-2">Facebook</p>
                <h3 className="font-display text-ink text-2xl font-light mb-2">Nazar Bedford</h3>
                <p className="text-ink-muted font-sans font-light text-sm leading-relaxed">
                  Events, promotions, and community updates. Stay in the loop with everything happening at Nazar.
                </p>
                <div className="mt-6 flex items-center gap-2 text-gold text-xs font-sans font-semibold tracking-wider uppercase">
                  Follow on Facebook
                  <ExternalLink size={12} />
                </div>
              </a>
            </Reveal>
          </div>

          {/* Instagram Embed Section */}
          <Reveal>
            <div className="mb-6">
              <div className="section-label-group">
                <span className="label-gold">Latest from Instagram</span>
              </div>
              <p className="text-ink-muted font-sans font-light text-sm">
                Follow{' '}
                <a
                  href="https://www.instagram.com/nazarturkishkitchen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  @nazarturkishkitchen
                </a>{' '}
                to see our latest posts and daily specials.
              </p>
            </div>
          </Reveal>

          {/* Instagram embed placeholder — replace with actual embed if IG Basic Display API is set up */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-20">
            {[...Array(6)].map((_, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <a
                  href="https://www.instagram.com/nazarturkishkitchen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative aspect-square overflow-hidden border border-gold-border hover:border-gold transition-colors"
                >
                  <img
                    src={[IMAGES.dish, IMAGES.mezze, IMAGES.cocktails, IMAGES.kebabGrill, IMAGES.lambShish, IMAGES.baklava][i % 6]}
                    alt="Nazar Instagram post"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <Instagram size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Gallery ── */}
      <section className="section-py bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="section-label-group mb-8">
              <span className="label-gold">Gallery</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-lg text-ink mb-12">
              Inside <em className="text-gold-gradient not-italic">Nazar</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden ${i === 0 || i === 3 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <span className="label-gold text-[0.6rem]">{img.caption}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="text-center mt-10">
              <a
                href="https://www.tripadvisor.co.uk/Restaurant_Review-g190737-d6651299-Reviews-Nazar_Turkish_Kitchen_Bar-Bedford_Bedfordshire_England.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold inline-flex"
              >
                <span>View More on TripAdvisor</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TripAdvisor Reviews ── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
            <div>
              <Reveal>
                <div className="section-label-group">
                  <span className="label-gold">TripAdvisor</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="heading-lg text-ink">
                  Guest <em className="text-gold-gradient not-italic">Reviews</em>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="flex flex-col items-center lg:items-end gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-display text-gold text-5xl font-light">4.5</span>
                  <div>
                    <Stars />
                    <p className="text-ink-muted text-xs font-sans mt-1">out of 5</p>
                  </div>
                </div>
                <p className="label-gold text-[0.6rem]">1,376 Reviews · #3 in Bedford</p>
                <p className="text-gold text-xs font-sans">Travellers' Choice 2025</p>
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-dark p-6 flex flex-col gap-3"
              >
                <Stars count={review.rating} />
                <h4 className="font-display text-gold text-lg font-light">{review.title}</h4>
                <p className="text-ink-muted font-sans font-light text-sm leading-relaxed flex-1 italic">
                  "{review.text}"
                </p>
                <div className="border-t border-gold-border pt-3">
                  <p className="text-ink text-xs font-sans font-medium">{review.author}</p>
                  <p className="text-ink-faint text-[0.65rem] font-sans mt-0.5">
                    {review.type} · {review.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="text-center mt-10">
              <a
                href="https://www.tripadvisor.co.uk/UserReviewEdit-g190737-d6651299-Nazar_Turkish_Kitchen_Bar-Bedford_Bedfordshire_England.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex"
              >
                <span>Leave a Review</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
