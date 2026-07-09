import { useState, useEffect, useRef } from 'react'

// ─── COLORS (change these to update the whole page) ───────────────────────────
const cream      = '#faf6f0'
const creamLight = '#f5ede0'
const dark       = '#33281f'
const brown      = '#5f4b38'
const accent     = '#9b3a1a'
const border     = '#eadfc9'
const white      = '#ffffff'

// ─── DATA (edit text here to update content on the page) ──────────────────────
const stats = [
  { number: '20+', label: 'Food spots listed' },
  { number: '10',  label: 'Cuisine types' },
  { number: '40+', label: 'Student reviews' },
  { number: '5',   label: 'Blocks max distance' },
]

const teamMembers = [
  { name: 'Iftat Bhuiyan', role: 'Project Lead',                  emoji: '🛠️' },
  { name: 'Mahrub',        role: 'Backend Development',            emoji: '⚙️' },
  { name: 'Raissa Santos', role: 'Food Spots Feature & Frontend',  emoji: '🍽️' },
  { name: 'Katherin',     role: 'Frontend & Submission Form',      emoji: '🎨' },
]

const cards = [
  { emoji: '🔍', title: 'What it does',  body: 'Campus Delights lets you browse food spots near Hunter, filter by price and cuisine, check if they\'re open right now, read real student reviews, and leave your own — all in one place.' },
  { emoji: '💸', title: 'Why we made it', body: 'Hunter students are always moving between classes. We wanted a fast way to find something cheap and close without spending the whole lunch break deciding. This is that tool.' },
  { emoji: '🤝', title: 'Who built it',  body: 'This is a class project built by a team of Hunter CS students for Web Development 2026. Every page, feature, and review was designed with our fellow students in mind.' },
]

const steps = [
  { step: '1', title: 'Browse the spots',    body: 'Go to the Food Spots page to see all 20 locations near Hunter, sorted by default or filtered however you like.',       emoji: '👀' },
  { step: '2', title: 'Filter to what fits', body: 'Use the search bar, price filter, cuisine chips, and "Open now" toggle to narrow it down to exactly what you need.',    emoji: '⚡' },
  { step: '3', title: 'Click and decide',    body: 'Tap any card to see the full address, hours, menu, and student reviews — then head out knowing exactly what to expect.', emoji: '✅' },
]

const faqs = [
  { q: 'Are these real restaurants?',          a: 'The spots listed are based on real locations near Hunter College. As the project grows, real verified places will replace the sample data.' },
  { q: 'Can I suggest a new food spot?',       a: 'Yes! Head to the Contact page and use the suggestion form to tell us about a place you think should be on the list.' },
  { q: 'How do I know if a place is open?',    a: 'Each card on the Food Spots page shows a live Open or Closed badge based on the spot\'s listed hours and your current time.' },
  { q: 'Can I leave a review?',                a: 'Absolutely. Click any food spot card and scroll to the bottom of the detail panel to find the review form. Your review shows up immediately.' },
  { q: 'Is this only for Hunter students?',    a: 'It was built with Hunter students in mind but anyone near the Upper East Side can use it to find a good bite to eat.' },
]

// ─── FADE IN ANIMATION (fades content in when you scroll to it) ───────────────
const FadeIn = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// ─── FAQ ITEM (expands and collapses when clicked) ────────────────────────────
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: `1px solid ${border}`, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', font: 'inherit', gap: '16px' }}
      >
        <span style={{ fontWeight: '700', fontSize: '1rem', color: dark }}>{q}</span>
        <span style={{ fontSize: '1.2rem', color: accent, transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.25s ease', flexShrink: 0 }}>+</span>
      </button>
      <div style={{ maxHeight: open ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <p style={{ margin: '0 0 18px', fontSize: '0.95rem', color: brown, lineHeight: '1.65' }}>{a}</p>
      </div>
    </div>
  )
}

// ─── SECTION LABEL (the small uppercase text above each section heading) ──────
const Label = ({ text }) => (
  <p style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, marginBottom: '10px' }}>
    {text}
  </p>
)

// ─── SECTION HEADING ──────────────────────────────────────────────────────────
const Heading = ({ text }) => (
  <h2 style={{ margin: '0 0 40px', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: '800', color: dark }}>
    {text}
  </h2>
)

// ─── CARD (white box with hover effect used in What/Why and Team sections) ────
const Card = ({ children }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        background: white,
        border: `1px solid ${border}`,
        borderRadius: '14px',
        padding: '28px 24px',
        boxSizing: 'border-box',
        transition: 'box-shadow 0.2s, transform 0.2s',
        boxShadow: hovered ? '0 8px 24px rgba(51,40,31,0.1)' : 'none',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      {children}
    </div>
  )
}

// ─── MAIN ABOUT PAGE ──────────────────────────────────────────────────────────
const AboutPage = () => {
  const [statsVisible, setStatsVisible] = useState([false, false, false, false])
  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stats.forEach((_, i) => {
            setTimeout(() => {
              setStatsVisible((prev) => {
                const next = [...prev]
                next[i] = true
                return next
              })
            }, i * 120)
          })
        }
      },
      { threshold: 0.2 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', background: cream, color: dark, minHeight: '100vh', paddingTop: '64px' }}>

      {/* HERO */}
      <section style={{ padding: 'clamp(60px, 10vw, 100px) 6% clamp(48px, 8vw, 80px)', background: cream, borderBottom: `1px solid ${border}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-60px', fontSize: '14rem', opacity: 0.05, userSelect: 'none', pointerEvents: 'none' }}>🍽️</div>
        <div style={{ maxWidth: '760px', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'transparent', color: accent, fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.04em', padding: '5px 13px', borderRadius: '999px', border: `1.5px solid ${accent}`, marginBottom: '20px' }}>
            About
          </div>
          <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: '900', lineHeight: '1.05', color: dark }}>
            Built by Hunter students,<br />
            <span style={{ color: accent }}>for Hunter students.</span>
          </h1>
          <p style={{ margin: '0 0 32px', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: brown, lineHeight: '1.65', maxWidth: '540px' }}>
            Campus Delights started because we were tired of wandering around Lexington Ave trying to decide where to eat with 15 minutes before class. So we built the thing we wished already existed.
          </p>
          <a href="#food-spots" style={{ display: 'inline-block', background: accent, color: white, fontWeight: '700', fontSize: '0.95rem', padding: '13px 28px', borderRadius: '999px', textDecoration: 'none' }}>
            Explore Food Spots →
          </a>
        </div>
      </section>

      {/* STATS BAR */}
      <section ref={statsRef} style={{ background: dark, padding: '40px 6%' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '24px' }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', opacity: statsVisible[i] ? 1 : 0, transform: statsVisible[i] ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s` }}>
              <div style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: '900', color: '#f5c842', lineHeight: 1 }}>{s.number}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE BUILT AND WHY */}
      <section style={{ padding: 'clamp(48px, 8vw, 80px) 6%', background: cream }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeIn>
            <Label text="The idea" />
            <Heading text="What we built and why" />
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {cards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1}>
                <Card>
                  <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{card.emoji}</div>
                  <h3 style={{ margin: '0 0 10px', fontSize: '1.05rem', fontWeight: '800', color: dark }}>{card.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.93rem', color: brown, lineHeight: '1.65' }}>{card.body}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: 'clamp(48px, 8vw, 80px) 6%', background: creamLight }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <FadeIn>
            <Label text="How it works" />
            <Heading text="Find food in 3 steps" />
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {steps.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.12}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '28px 0', borderBottom: i < 2 ? `1px solid ${border}` : 'none' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: accent, color: white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1rem', flexShrink: 0 }}>
                    {item.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: dark }}>{item.title}</h3>
                      <span style={{ fontSize: '1.1rem' }}>{item.emoji}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.93rem', color: brown, lineHeight: '1.65' }}>{item.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: 'clamp(48px, 8vw, 80px) 6%', background: cream }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeIn>
            <Label text="The team" />
            <Heading text="Who made this" />
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {teamMembers.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <Card>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{member.emoji}</div>
                    <div style={{ fontWeight: '800', fontSize: '1rem', color: dark, marginBottom: '4px' }}>{member.name}</div>
                    <div style={{ fontSize: '0.82rem', color: accent, fontWeight: '600' }}>{member.role}</div>
                    <div style={{ marginTop: '10px', fontSize: '0.75rem', color: brown, background: creamLight, padding: '4px 10px', borderRadius: '999px', display: 'inline-block' }}>
                      Hunter College CS
                    </div>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(48px, 8vw, 80px) 6%', background: creamLight }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <FadeIn>
            <Label text="FAQ" />
            <Heading text="Common questions" />
          </FadeIn>
          <div style={{ background: white, borderRadius: '14px', padding: '0 24px', border: `1px solid ${border}` }}>
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: 'clamp(60px, 10vw, 100px) 6%', background: dark, textAlign: 'center' }}>
        <FadeIn>
          <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🍕🥙☕🧋🍜🌮</div>
          <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: '900', color: white }}>
            Ready to find your next meal?
          </h2>
          <p style={{ margin: '0 auto 32px', fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', maxWidth: '420px', lineHeight: '1.6' }}>
            20 spots, 10 cuisines, all within 5 blocks of Hunter. Open, affordable, and student-approved.
          </p>
          <a href="#food-spots" style={{ display: 'inline-block', background: accent, color: white, fontWeight: '800', fontSize: '1rem', padding: '14px 32px', borderRadius: '999px', textDecoration: 'none' }}>
            Browse Food Spots →
          </a>
        </FadeIn>
      </section>

    </div>
  )
}

export default AboutPage
