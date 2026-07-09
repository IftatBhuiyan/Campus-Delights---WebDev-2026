import { useState } from 'react'

// Legacy standalone page from early Food Spots design.
// The live app uses FoodSpotsHero + FoodList + FoodDetailModal in App.jsx with API data.

// ─── COLORS ──────────────────────────────────────────────────────────────────
const green      = '#4a7c59'
const greenLight = '#e8f5ee'
const greenText  = '#6ee4a8'
const cream      = '#fffaf1'
const border     = '#eadfc9'
const darkBrown  = '#1f1a14'
const midBrown   = '#5f4b38'
const lightBrown = '#9a7d62'
const white      = '#ffffff'

// ─── DATA ─────────────────────────────────────────────────────────────────────
const foodSpots = [
  { name: 'Mariella Pizza', cuisine: 'Pizza', priceRange: '$', location: '965 Lexington Ave, New York, NY 10021', reviews: [{ name: 'Alex K.', rating: 5, text: 'Classic NY slice, perfect for a quick class break.' }, { name: 'Jordan M.', rating: 4, text: 'Grandma slice is the best in the area.' }] },
  { name: 'Teri and Yaki (Cart)', cuisine: 'Asian Fusion', priceRange: '$', location: '68th St & Lexington Ave, New York, NY 10065', reviews: [{ name: 'Sam P.', rating: 5, text: 'The rice bowls are affordable and huge portions.' }, { name: 'Casey R.', rating: 4, text: 'Long lines but worth it.' }] },
  { name: 'Hunter Delicatessen', cuisine: 'Sandwiches', priceRange: '$', location: '966 Lexington Ave, New York, NY 10021', reviews: [{ name: 'Taylor S.', rating: 5, text: 'Reliable bacon egg and cheese.' }, { name: 'Morgan L.', rating: 4, text: 'Staff is always super fast.' }] },
  { name: 'Gourmet Bagel', cuisine: 'Bagels', priceRange: '$', location: '874 Lexington Ave, New York, NY 10065', reviews: [{ name: 'Riley B.', rating: 5, text: 'Best bagels near the 68th st subway entrance.' }, { name: 'Jamie T.', rating: 4, text: 'Quick coffee and good service.' }] },
  { name: 'Le Pain Quotidien', cuisine: 'Bakery', priceRange: '$$', location: '861 Lexington Ave, New York, NY 10065', reviews: [{ name: 'Quinn D.', rating: 4, text: 'A bit pricey but good for studying.' }, { name: 'Jamie A.', rating: 4, text: 'Love the atmosphere for meetings.' }] },
  { name: 'Oath Pizza', cuisine: 'Pizza', priceRange: '$$', location: '1142 3rd Ave, New York, NY 10065', reviews: [{ name: 'Casey W.', rating: 5, text: 'Love the customizable options here.' }, { name: 'Alex B.', rating: 4, text: 'Great for a quick bite after class.' }] },
  { name: 'Shanghai', cuisine: 'Chinese', priceRange: '$$', location: '1388 2nd Ave, New York, NY 10021', reviews: [{ name: 'Leo V.', rating: 5, text: 'Best dumplings in the neighborhood.' }, { name: 'Mia R.', rating: 4, text: 'Good dinner spot with friends.' }] },
  { name: 'Tony’s Di Napoli', cuisine: 'Italian', priceRange: '$$$', location: '1081 3rd Ave, New York, NY 10021', reviews: [{ name: 'Sarah J.', rating: 5, text: 'Family style portions are huge!' }, { name: 'Tom H.', rating: 5, text: 'Great for celebrating with family.' }] },
  { name: 'J.G. Melon', cuisine: 'American', priceRange: '$$', location: '1291 3rd Ave, New York, NY 10021', reviews: [{ name: 'Dan P.', rating: 5, text: 'Best burger in NYC, hands down.' }, { name: 'Emma W.', rating: 4, text: 'Classic vibe, definitely an institution.' }] },
  { name: 'Bondi Sushi', cuisine: 'Sushi', priceRange: '$$$', location: '1140 3rd Ave, New York, NY 10065', reviews: [{ name: 'Ben K.', rating: 5, text: 'Fresh sushi, great for a treat yourself lunch.' }, { name: 'Chloe N.', rating: 4, text: 'Modern spot, very clean.' }] },
  { name: 'Dos Toros Taqueria', cuisine: 'Mexican', priceRange: '$$', location: '1111 Lexington Ave, New York, NY 10075', reviews: [{ name: 'Chris M.', rating: 4, text: 'Reliable and consistent bowls.' }, { name: 'Patty L.', rating: 4, text: 'Good quick lunch option.' }] },
  { name: 'Sweetgreen', cuisine: 'Healthy', priceRange: '$$', location: '1095 Lexington Ave, New York, NY 10075', reviews: [{ name: 'Ava G.', rating: 5, text: 'My go-to for a healthy salad.' }, { name: 'Noah F.', rating: 4, text: 'The app ordering makes it so fast.' }] },
  { name: 'Dig', cuisine: 'Healthy', priceRange: '$$', location: '1100 Lexington Ave, New York, NY 10075', reviews: [{ name: 'Sophia C.', rating: 5, text: 'The roasted chicken is top tier.' }, { name: 'Ian R.', rating: 4, text: 'Healthy and filling, perfect for dinner.' }] },
  { name: 'Joe’s Coffee', cuisine: 'Coffee', priceRange: '$$', location: '1105 Lexington Ave, New York, NY 10075', reviews: [{ name: 'Grace T.', rating: 5, text: 'Best iced latte in the area.' }, { name: 'Kevin B.', rating: 4, text: 'Solid roast.' }] },
  { name: 'Chipotle Mexican Grill', cuisine: 'Mexican', priceRange: '$', location: '906 3rd Ave, New York, NY 10022', reviews: [{ name: 'Rachel H.', rating: 3, text: 'It’s Chipotle, you know what you’re getting.' }, { name: 'Greg S.', rating: 4, text: 'Always a solid quick choice.' }] },
  { name: 'Phoenix Park', cuisine: 'Pub Food', priceRange: '$$', location: '206 E 67th St, New York, NY 10065', reviews: [{ name: 'Tyler B.', rating: 4, text: 'Good spot for watching the game.' }, { name: 'Amanda K.', rating: 4, text: 'Nice happy hour specials.' }] },
  { name: 'Bella Blu', cuisine: 'Italian', priceRange: '$$$', location: '967 Lexington Ave, New York, NY 10021', reviews: [{ name: 'Victoria E.', rating: 5, text: 'Great pasta and wine.' }, { name: 'Mark D.', rating: 5, text: 'Lovely atmosphere.' }] },
  { name: 'PJ Bernstein', cuisine: 'Deli', priceRange: '$$', location: '1215 3rd Ave, New York, NY 10021', reviews: [{ name: 'Steve W.', rating: 5, text: 'Classic NYC deli vibes.' }, { name: 'Linda F.', rating: 4, text: 'Matzo ball soup is amazing.' }] },
  { name: 'Brasserie Cognac', cuisine: 'French', priceRange: '$$$', location: '963 Lexington Ave, New York, NY 10021', reviews: [{ name: 'Elena R.', rating: 5, text: 'Fantastic French bistro vibe.' }, { name: 'Alex M.', rating: 4, text: 'Steak frites were on point.' }] },
  { name: 'Corrado Bread and Pastry', cuisine: 'Bakery', priceRange: '$$', location: '960 Lexington Ave, New York, NY 10021', reviews: [{ name: 'John P.', rating: 5, text: 'Best croissants near the campus.' }, { name: 'Sarah O.', rating: 4, text: 'Very cozy place to sit for a bit.' }] }
];

// ─── EMOJI MAP (add a new cuisine here if you add one to the data) ─────────────
const cuisineEmoji = {
  'Pizza':       '🍕',
  'Halal':       '🥙',
  'Coffee':      '☕',
  'Sandwiches':  '🥪',
  'Bubble Tea':  '🧋',
  'Quick Lunch': '🥗',
  'Chinese':     '🍜',
  'Mexican':     '🌮',
  'Sushi':       '🍣',
  'Dessert':     '🍦',
}

// ─── HELPER: checks if a spot is open right now based on its hours string ──────
const isOpen = (hoursString) => {
  if (!hoursString) return false
  try {
    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    const parts = hoursString.split('-')
    if (parts.length < 2) return false
    const parseTime = (str) => {
      const clean = str.trim().toUpperCase()
      const isPM = clean.includes('PM')
      const isAM = clean.includes('AM')
      const nums = clean.replace(/[AMP\s]/g, '').split(':')
      let h = parseInt(nums[0])
      let m = nums[1] ? parseInt(nums[1]) : 0
      if (isPM && h !== 12) h += 12
      if (isAM && h === 12) h = 0
      return h * 60 + m
    }
    return currentMinutes >= parseTime(parts[0]) && currentMinutes <= parseTime(parts[1])
  } catch {
    return false
  }
}

// ─── HELPER: renders filled/empty stars for a rating ──────────────────────────
const Stars = ({ rating }) => {
  const filled = Math.round(rating)
  return (
    <span style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
      {'★'.repeat(filled)}
      <span style={{ opacity: 0.25 }}>{'★'.repeat(5 - filled)}</span>
    </span>
  )
}

// ─── OPEN / CLOSED BADGE ──────────────────────────────────────────────────────
const OpenBadge = ({ hours }) => {
  const open = isOpen(hours)
  return (
    <span style={{
      padding: '2px 9px',
      borderRadius: '999px',
      fontSize: '0.72rem',
      fontWeight: '700',
      background: open ? '#d4edda' : '#f8d7da',
      color:      open ? '#1a6632' : '#842029',
      border:     open ? '1px solid #a3d9b1' : '1px solid #f1aeb5',
    }}>
      {open ? '● Open' : '● Closed'}
    </span>
  )
}

// ─── FOOD CARD (shown in the grid) ────────────────────────────────────────────
const FoodCard = ({ spot, isSelected, onSelect }) => {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '16px',
    border: isSelected ? `2px solid ${green}` : `1px solid ${border}`,
    borderRadius: '12px',
    background: isSelected ? greenLight : white,
    cursor: 'pointer',
    textAlign: 'left',
    font: 'inherit',
    color: darkBrown,
    transition: 'border-color 0.15s',
    boxShadow: isSelected ? '0 2px 12px rgba(74,124,89,0.15)' : '0 1px 4px rgba(0,0,0,0.05)',
  }

  return (
    <button type="button" style={cardStyle} onClick={() => onSelect(spot)}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '1.5rem' }}>{cuisineEmoji[spot.cuisine] || '🍽️'}</div>
          <div style={{ fontWeight: '700', fontSize: '1rem', marginTop: '4px' }}>{spot.name}</div>
          <div style={{ fontSize: '0.8rem', color: lightBrown }}>{spot.cuisine}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: '800', fontSize: '1rem' }}>{spot.rating.toFixed(1)}</div>
          <Stars rating={spot.rating} />
        </div>
      </div>

      <p style={{ margin: 0, fontSize: '0.87rem', color: midBrown, lineHeight: '1.45' }}>
        {spot.description}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ color: green, fontWeight: '700', fontSize: '0.9rem' }}>{spot.priceRange}</span>
          <span style={{ color: '#ccc' }}>•</span>
          <span style={{ fontSize: '0.82rem', color: lightBrown }}>{spot.distance}</span>
        </div>
        <span style={{ fontSize: '0.78rem', color: lightBrown }}>
          💬 {spot.reviews.length} {spot.reviews.length === 1 ? 'review' : 'reviews'}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {spot.tags.map((tag) => (
            <span key={tag} style={{ padding: '3px 8px', borderRadius: '999px', background: '#f1e4d0', color: midBrown, fontSize: '0.75rem' }}>
              {tag}
            </span>
          ))}
        </div>
        <OpenBadge hours={spot.hours} />
      </div>

    </button>
  )
}

// ─── DETAIL PANEL (shown below the grid when a card is clicked) ───────────────
const DetailPanel = ({ spot, onClose, onAddReview }) => {
  const [name,      setName]      = useState('')
  const [rating,    setRating]    = useState('5')
  const [comment,   setComment]   = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!name.trim() || !comment.trim()) {
      alert('Please fill out your name and a comment!')
      return
    }
    onAddReview(spot.id, { name, rating: Number(rating), text: comment })
    setName('')
    setRating('5')
    setComment('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputStyle = {
    padding: '9px 12px',
    borderRadius: '8px',
    border: `1px solid ${border}`,
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    color: darkBrown,
    background: white,
    outline: 'none',
    width: '100%',
  }

  const infoCardStyle = {
    background: cream,
    border: `1px solid ${border}`,
    borderRadius: '10px',
    padding: '12px 14px',
  }

  return (
    <div style={{ background: white, border: `1px solid ${border}`, borderRadius: '16px', padding: '28px', marginTop: '24px', position: 'relative' }}>

      <button
        type="button"
        onClick={onClose}
        style={{ position: 'absolute', top: '16px', right: '16px', background: '#f1e4d0', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem', color: midBrown }}
      >✕</button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <span style={{ fontSize: '2rem' }}>{cuisineEmoji[spot.cuisine] || '🍽️'}</span>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: darkBrown }}>{spot.name}</h2>
          <div style={{ fontSize: '0.88rem', color: lightBrown }}>{spot.cuisine}</div>
        </div>
      </div>

      <p style={{ color: midBrown, marginBottom: '20px', maxWidth: '600px' }}>{spot.description}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginBottom: '20px' }}>
        {[
          { label: '📍 Location', value: spot.location },
          { label: '🕐 Hours',    value: spot.hours },
          { label: '💰 Price',    value: spot.priceRange },
          { label: '⭐ Rating',   value: `${spot.rating} / 5` },
        ].map(({ label, value }) => (
          <div key={label} style={infoCardStyle}>
            <div style={{ fontSize: '0.72rem', color: lightBrown, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontWeight: '600', fontSize: '0.92rem', color: darkBrown }}>{value}</div>
          </div>
        ))}
      </div>

      <h3 style={{ margin: '0 0 10px', fontSize: '0.95rem', color: darkBrown }}>🍽️ Menu</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        {spot.menu.map((item) => (
          <span key={item} style={{ padding: '5px 12px', background: '#f1e4d0', borderRadius: '8px', fontSize: '0.85rem', color: midBrown }}>
            {item}
          </span>
        ))}
      </div>

      <h3 style={{ margin: '0 0 10px', fontSize: '0.95rem', color: darkBrown }}>💬 Student Reviews</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {spot.reviews.length > 0 ? (
          spot.reviews.map((review, i) => (
            <div key={i} style={infoCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '0.9rem', color: darkBrown }}>{review.name}</strong>
                <Stars rating={review.rating} />
              </div>
              <p style={{ margin: 0, fontSize: '0.87rem', color: midBrown }}>{review.text}</p>
            </div>
          ))
        ) : (
          <p style={{ color: lightBrown }}>No reviews yet. Be the first!</p>
        )}
      </div>

      <div style={{ background: cream, border: `1px solid ${border}`, borderRadius: '12px', padding: '18px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '0.95rem', color: darkBrown }}>✏️ Leave a Review</h3>

        {submitted && (
          <div style={{ background: '#d4edda', color: '#1a6632', borderRadius: '8px', padding: '8px 12px', marginBottom: '12px', fontSize: '0.88rem', fontWeight: '700' }}>
            ✓ Review submitted — thanks!
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <select value={rating} onChange={(e) => setRating(e.target.value)} style={inputStyle}>
            <option value="5">⭐⭐⭐⭐⭐ — 5/5</option>
            <option value="4">⭐⭐⭐⭐ — 4/5</option>
            <option value="3">⭐⭐⭐ — 3/5</option>
            <option value="2">⭐⭐ — 2/5</option>
            <option value="1">⭐ — 1/5</option>
          </select>
          <textarea
            rows="3"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          <button
            type="button"
            onClick={handleSubmit}
            style={{ padding: '10px 20px', background: green, color: white, border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', alignSelf: 'flex-start' }}
          >
            Submit Review
          </button>
        </div>
      </div>

    </div>
  )
}

// ─── MAIN PAGE COMPONENT ──────────────────────────────────────────────────────
const FoodSpotsPage = () => {
  const [spots,         setSpots]         = useState(foodSpots)
  const [selectedSpot,  setSelectedSpot]  = useState(null)
  const [searchQuery,   setSearchQuery]   = useState('')
  const [priceFilter,   setPriceFilter]   = useState('')
  const [sortBy,        setSortBy]        = useState('default')
  const [cuisineFilter, setCuisineFilter] = useState('')
  const [openNowOnly,   setOpenNowOnly]   = useState(false)

  const allCuisines = [...new Set(foodSpots.map((s) => s.cuisine))]

  const addReview = (spotId, newReview) => {
    const updated = spots.map((s) => {
      if (s.id === spotId) return { ...s, reviews: [...s.reviews, newReview] }
      return s
    })
    setSpots(updated)
    if (selectedSpot?.id === spotId) {
      setSelectedSpot(updated.find((s) => s.id === spotId))
    }
  }

  const filtered = spots.filter((s) => {
    const matchSearch  = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    const matchPrice   = priceFilter === '' || s.priceRange === priceFilter
    const matchCuisine = cuisineFilter === '' || s.cuisine === cuisineFilter
    const matchOpen    = !openNowOnly || isOpen(s.hours)
    return matchSearch && matchPrice && matchCuisine && matchOpen
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating-desc')   return b.rating - a.rating
    if (sortBy === 'rating-asc')    return a.rating - b.rating
    if (sortBy === 'distance-asc')  return parseInt(a.distance) - parseInt(b.distance)
    if (sortBy === 'price-asc')     return a.priceRange.length - b.priceRange.length
    if (sortBy === 'price-desc')    return b.priceRange.length - a.priceRange.length
    return 0
  })

  const hasFilters = searchQuery || priceFilter || cuisineFilter || openNowOnly

  const clearAll = () => {
    setSearchQuery('')
    setPriceFilter('')
    setCuisineFilter('')
    setOpenNowOnly(false)
  }

  const inputStyle = {
    padding: '9px 12px',
    borderRadius: '8px',
    border: `1px solid ${border}`,
    fontSize: '0.88rem',
    background: white,
    color: darkBrown,
    outline: 'none',
    fontFamily: 'inherit',
    cursor: 'pointer',
  }

  const totalReviews  = spots.reduce((acc, s) => acc + s.reviews.length, 0)
  const budgetCount   = spots.filter((s) => s.priceRange === '$').length
  const avgRating     = (spots.reduce((acc, s) => acc + s.rating, 0) / spots.length).toFixed(1)

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', background: cream, minHeight: '100vh', color: darkBrown }}>

      {/* ── NAVBAR ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 6%', height: '62px', background: 'rgba(255,250,241,0.92)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${border}` }}>
        <a href="#home" style={{ fontWeight: '800', fontSize: '1.1rem', color: darkBrown, textDecoration: 'none' }}>
          🍽️ Campus Delights
        </a>
        <div style={{ display: 'flex', gap: '28px' }}>
          <a href="#home"  style={{ textDecoration: 'none', fontSize: '0.9rem', fontWeight: '700', color: midBrown }}>Home</a>
          <a href="#spots" style={{ textDecoration: 'none', fontSize: '0.9rem', fontWeight: '700', color: green, borderBottom: `2px solid ${green}`, paddingBottom: '2px' }}>Food Spots</a>
          <a href="#about" style={{ textDecoration: 'none', fontSize: '0.9rem', fontWeight: '700', color: midBrown }}>About</a>
        </div>
      </nav>

      {/* ── HERO SECTION with background image ── */}
      <div
        id="home"
        style={{
          position: 'relative',
          minHeight: '420px',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(20,12,5,0.82) 40%, rgba(20,12,5,0.45) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 1, padding: '60px 6%', maxWidth: '680px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(74,124,89,0.85)', color: '#d4edda', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '999px', marginBottom: '18px' }}>
            📍 Hunter College, Upper East Side
          </div>
          <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: '800', color: white, lineHeight: '1.1' }}>
            Hungry between classes?<br />
            <span style={{ color: greenText }}>We have got you covered.</span>
          </h1>
          <p style={{ margin: '0 0 28px', fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6', maxWidth: '480px' }}>
            {spots.length} student-approved food spots within walking distance of Hunter — rated, reviewed, and filtered so you can eat well on any budget.
          </p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { emoji: '💰', label: 'Budget-friendly picks' },
              { emoji: '⚡', label: 'Quick options available' },
              { emoji: '⭐', label: 'Student reviewed' },
            ].map(({ emoji, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ fontSize: '1.1rem' }}>{emoji}</span>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ background: darkBrown, padding: '18px 6%' }}>
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {[
            { num: `${spots.length}+`, label: 'Food spots' },
            { num: budgetCount,        label: 'Under $10 options' },
            { num: totalReviews,       label: 'Student reviews' },
            { num: avgRating,          label: 'Avg rating' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: greenText }}>{num}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div id="spots" style={{ padding: '32px 6% 20px', borderBottom: `1px solid ${border}` }}>
        <h2 style={{ margin: '0 0 20px', fontSize: '1.25rem', fontWeight: '800', color: darkBrown }}>Browse all spots</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by name or cuisine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ ...inputStyle, flex: '1', minWidth: '180px', cursor: 'text' }}
          />
          <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} style={inputStyle}>
            <option value="">All prices</option>
            <option value="$">$ — Cheap</option>
            <option value="$$">$$ — Moderate</option>
            <option value="$$$">$$$ — Pricier</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={inputStyle}>
            <option value="default">Sort: Default</option>
            <option value="rating-desc">⭐ Highest rated</option>
            <option value="rating-asc">Rating: low to high</option>
            <option value="distance-asc">📍 Closest first</option>
            <option value="price-asc">💰 Price: low to high</option>
            <option value="price-desc">💰 Price: high to low</option>
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: midBrown, cursor: 'pointer', padding: '9px 12px', border: openNowOnly ? `1px solid ${green}` : `1px solid ${border}`, borderRadius: '8px', background: openNowOnly ? greenLight : white, fontWeight: openNowOnly ? '700' : '400' }}>
            <input type="checkbox" checked={openNowOnly} onChange={(e) => setOpenNowOnly(e.target.checked)} style={{ accentColor: green, width: '14px', height: '14px' }} />
            Open now
          </label>
          {hasFilters && (
            <button type="button" onClick={clearAll} style={{ padding: '9px 14px', background: '#f1e4d0', color: midBrown, border: `1px solid ${border}`, borderRadius: '8px', fontSize: '0.88rem', fontWeight: '700', cursor: 'pointer' }}>
              ✕ Clear
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.78rem', color: lightBrown }}>Cuisine:</span>
          {['', ...allCuisines].map((c) => {
            const active = cuisineFilter === c
            return (
              <button
                key={c || 'all'}
                type="button"
                onClick={() => setCuisineFilter(c)}
                style={{ padding: '4px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer', border: active ? `1px solid ${green}` : `1px solid ${border}`, background: active ? green : white, color: active ? white : midBrown, transition: 'all 0.12s' }}
              >
                {c === '' ? 'All' : `${cuisineEmoji[c] || ''} ${c}`}
              </button>
            )
          })}
        </div>

        <div style={{ fontSize: '0.82rem', color: lightBrown }}>
          Showing <strong style={{ color: green }}>{sorted.length}</strong> of {spots.length} spots
          {hasFilters && ' (filtered)'}
        </div>
      </div>

      {/* ── GRID ── */}
      <div style={{ padding: '24px 6%' }}>
        {sorted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: lightBrown }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔍</div>
            <p style={{ fontSize: '1rem', fontWeight: '600' }}>No spots match your filters.</p>
            <button type="button" onClick={clearAll} style={{ marginTop: '10px', padding: '8px 18px', background: green, color: white, border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
            {sorted.map((spot) => (
              <FoodCard
                key={spot.id}
                spot={spot}
                isSelected={selectedSpot?.id === spot.id}
                onSelect={(s) => setSelectedSpot(selectedSpot?.id === s.id ? null : s)}
              />
            ))}
          </div>
        )}

        {selectedSpot && (
          <DetailPanel
            spot={selectedSpot}
            onClose={() => setSelectedSpot(null)}
            onAddReview={addReview}
          />
        )}
      </div>

      {/* ── FOOTER / ABOUT ── */}
      <footer id="about" style={{ background: darkBrown, padding: '32px 6%', marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1.1rem', color: white, marginBottom: '8px' }}>🍽️ Campus Delights</div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', maxWidth: '320px', lineHeight: '1.6', margin: 0 }}>
              A student-built guide to eating well near Hunter College. Built as a class project to help students find quick, affordable food between classes.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Navigate</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[['#home', 'Home'], ['#spots', 'Food Spots'], ['#about', 'About']].map(([href, label]) => (
                <a key={href} href={href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', textDecoration: 'none', fontWeight: '600' }}>{label}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '24px', paddingTop: '16px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.28)' }}>
          Campus Delights · Hunter College · Web Development 2026
        </div>
      </footer>

    </div>
  )
}

export default FoodSpotsPage
