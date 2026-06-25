import { useState } from 'react'

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
  {
    id: 1,
    name: "Tony's Pizza",
    cuisine: 'Pizza',
    priceRange: '$',
    distance: '2 blocks away',
    rating: 4.1,
    location: '215 E 68th St, New York, NY 10065',
    hours: '10 AM - 8 PM',
    menu: ['Cheese slice', 'Pepperoni slice', 'Garlic knots', 'Sicilian slice'],
    tags: ['cheap', 'quick'],
    description: 'A no-frills pizza counter serving giant dollar slices right around the corner from campus. Cash only, always fresh.',
    reviews: [
      { name: 'Marcus Rivera',   rating: 4, text: 'I come here between every class. Two slices fill me up and I still have money left for the train. The pepperoni is always fresh out of the oven around noon.' },
      { name: 'Aaliyah Thompson', rating: 4, text: 'Super fast service. I grabbed a slice and was back in class within 10 minutes. Nothing fancy but exactly what you need when you are running late and hungry.' },
    ],
  },
  {
    id: 2,
    name: 'Lucia Pizzeria',
    cuisine: 'Pizza',
    priceRange: '$$$',
    distance: '4 blocks away',
    rating: 4.6,
    location: '341 E 71st St, New York, NY 10021',
    hours: '11 AM - 10 PM',
    menu: ['Margherita pizza', 'Truffle mushroom pizza', 'Burrata appetizer', 'Tiramisu'],
    tags: ['sit-down', 'date night'],
    description: 'A proper Neapolitan pizzeria with a wood-fired oven and imported ingredients. Worth every penny when you want something special.',
    reviews: [
      { name: 'Vanessa Cruz', rating: 5, text: 'The margherita here is genuinely one of the best pizzas I have had in New York. The crust is perfectly charred and the San Marzano tomatoes make all the difference. Not a dollar slice spot but absolutely worth it for a treat.' },
      { name: 'Daniel Park',  rating: 4, text: 'Came here for a birthday dinner and it was perfect. The truffle mushroom pizza is rich and satisfying. Pricier than what I usually spend near campus but the quality is on a completely different level.' },
    ],
  },
  {
    id: 3,
    name: 'Lexington Halal Cart',
    cuisine: 'Halal',
    priceRange: '$',
    distance: '1 block away',
    rating: 4.4,
    location: '695 Lexington Ave, New York, NY 10065',
    hours: '11 AM - 9 PM',
    menu: ['Chicken over rice', 'Lamb gyro', 'Falafel platter', 'Combo platter'],
    tags: ['good portions', 'lunch'],
    description: 'A beloved street cart known for massive portions of chicken over rice with that famous white sauce. Always a line, always worth it.',
    reviews: [
      { name: 'Priya Nair',      rating: 5, text: 'Honestly the best deal near Hunter. The chicken over rice is loaded and the white sauce is amazing. I have been coming here three times a week since freshman year.' },
      { name: 'DeShawn Williams', rating: 4, text: 'Line moves fast even when it looks long. The lamb gyro is underrated — most people sleep on it. Portions are huge, I usually save half for dinner.' },
    ],
  },
  {
    id: 4,
    name: 'Al Medina Kitchen',
    cuisine: 'Halal',
    priceRange: '$$',
    distance: '3 blocks away',
    rating: 4.3,
    location: '172 E 70th St, New York, NY 10021',
    hours: '10 AM - 10 PM',
    menu: ['Lamb shawarma plate', 'Mixed grill', 'Hummus and pita', 'Baklava'],
    tags: ['sit-down', 'filling'],
    description: 'A sit-down halal restaurant with a full menu of Middle Eastern grills and mezze. A big step up from the cart when you have more time.',
    reviews: [
      { name: 'Omar Hassan',   rating: 5, text: 'The mixed grill here is incredible — the lamb is perfectly spiced and the portions are generous. It is a bit more than the cart but the experience is completely different. I come here when I want to actually sit and eat properly.' },
      { name: 'Samira Khalil', rating: 4, text: 'Really solid halal restaurant. The hummus is house-made and you can taste the difference. The shawarma plate comes with rice, salad, and bread so you genuinely leave full. Great for a longer lunch break.' },
    ],
  },
  {
    id: 5,
    name: 'Corner Cup Coffee',
    cuisine: 'Coffee',
    priceRange: '$',
    distance: '2 blocks away',
    rating: 3.8,
    location: '228 E 68th St, New York, NY 10065',
    hours: '6 AM - 5 PM',
    menu: ['Drip coffee', 'Bagel with cream cheese', 'Croissant', 'Iced coffee'],
    tags: ['cheap', 'quick', 'breakfast'],
    description: 'A no-frills bodega-style coffee counter. Grab a solid cup and a bagel before an early morning class without spending more than four dollars.',
    reviews: [
      { name: 'Tyrone Jackson', rating: 4, text: 'Best cheap coffee near campus, full stop. The drip coffee is hot and strong and a large is only two dollars. I stop here every single morning before my 8 AM and it has never let me down.' },
      { name: 'Grace Lee',      rating: 3, text: 'Nothing fancy here but it does the job. The bagels are always fresh in the morning and the coffee is strong enough to actually wake you up. Perfect when you are in a rush and on a tight budget.' },
    ],
  },
  {
    id: 6,
    name: 'Park Brew Coffee',
    cuisine: 'Coffee',
    priceRange: '$$',
    distance: '5 blocks away',
    rating: 4.2,
    location: '320 E 72nd St, New York, NY 10021',
    hours: '7 AM - 7 PM',
    menu: ['Iced latte', 'Pour over', 'Matcha latte', 'Avocado toast', 'Muffin'],
    tags: ['study', 'wifi', 'cozy'],
    description: 'A proper neighborhood coffee shop with good wifi, plenty of seating, and specialty drinks. The go-to spot for studying between classes.',
    reviews: [
      { name: 'Sofia Castillo', rating: 4, text: 'One of the few spots near campus where you can sit for more than an hour without feeling rushed. The iced latte is solid. Good wifi too, which is a huge plus for me before finals.' },
      { name: 'James Okafor',  rating: 4, text: 'The matcha latte here is genuinely great and the pour over is worth the wait. A bit more expensive than a bodega coffee but when I need to actually focus and study this is where I come. Always a good vibe.' },
    ],
  },
  {
    id: 7,
    name: 'Hunter Deli & Grill',
    cuisine: 'Sandwiches',
    priceRange: '$',
    distance: '1 block away',
    rating: 4.0,
    location: '158 E 68th St, New York, NY 10065',
    hours: '6 AM - 7 PM',
    menu: ['Egg and cheese', 'BLT', 'Tuna hero', 'Turkey and swiss'],
    tags: ['breakfast', 'quick', 'cheap'],
    description: 'A classic New York deli that has been feeding Hunter students for years. Fast, cheap, and reliable — especially for breakfast heroes.',
    reviews: [
      { name: 'Keisha Brown', rating: 4, text: 'The egg and cheese on a roll is the best breakfast sandwich near campus, period. They make it fast and wrap it well so it stays warm. Perfect before an 8 AM class.' },
      { name: 'Liam Chen',   rating: 4, text: 'Solid deli with everything you need. The BLT is crispy and generous and the price is very fair. Staff is fast and efficient even during the morning rush. One of my most visited spots near school.' },
    ],
  },
  {
    id: 8,
    name: 'The Crafted Sub',
    cuisine: 'Sandwiches',
    priceRange: '$$$',
    distance: '4 blocks away',
    rating: 4.5,
    location: '289 E 71st St, New York, NY 10021',
    hours: '10 AM - 8 PM',
    menu: ['Truffle turkey sub', 'Roast beef and brie', 'Lobster roll', 'House-made chips'],
    tags: ['gourmet', 'treat yourself'],
    description: 'An upscale sandwich shop using premium ingredients and house-baked bread. Each sandwich is made to order and it shows.',
    reviews: [
      { name: 'Natalie Wong', rating: 5, text: 'The roast beef and brie sandwich completely changed what I thought a sandwich could be. The bread is baked fresh daily and everything is sourced carefully. Yes it is expensive but I have never once regretted ordering here.' },
      { name: 'Marcus Allen', rating: 4, text: 'The truffle turkey sub is incredible. It is definitely a splurge for a student budget but when I want to treat myself after a tough week this is my first stop. The house-made chips alone are worth the trip.' },
    ],
  },
  {
    id: 9,
    name: 'Boba Express',
    cuisine: 'Bubble Tea',
    priceRange: '$',
    distance: '2 blocks away',
    rating: 4.0,
    location: '197 E 68th St, New York, NY 10065',
    hours: '10 AM - 9 PM',
    menu: ['Classic milk tea', 'Brown sugar boba', 'Fruit tea', 'Matcha milk tea'],
    tags: ['quick', 'drinks', 'cheap'],
    description: 'A no-frills boba window with fast service and low prices. Great for a quick drink between classes without waiting long or spending much.',
    reviews: [
      { name: 'Jenny Liu',     rating: 4, text: 'The brown sugar boba is really good for the price — I was surprised at how solid it was. The line moves fast which is the most important thing when you only have 15 minutes between classes. Will definitely be back.' },
      { name: 'Andre Williams', rating: 4, text: 'Cheapest boba near campus and honestly not bad at all. The classic milk tea is always consistent and the pearls are fresh. Nothing fancy but when you just want a quick drink this is the spot.' },
    ],
  },
  {
    id: 10,
    name: 'Boba Uptown',
    cuisine: 'Bubble Tea',
    priceRange: '$$',
    distance: '5 blocks away',
    rating: 4.5,
    location: '410 E 72nd St, New York, NY 10021',
    hours: '11 AM - 10 PM',
    menu: ['Taro milk tea', 'Mango slush', 'Jasmine green tea', 'Tiger sugar latte'],
    tags: ['hangout', 'premium'],
    description: 'A stylish boba cafe with premium loose-leaf teas, fully customizable sweetness and ice levels, and a cozy space to hang out after class.',
    reviews: [
      { name: 'Yuna Park',    rating: 5, text: 'The taro milk tea here is hands down the best in the neighborhood. You can customize exactly how sweet you want it and the pearls are always perfectly chewy. Perfect place to decompress after a long lecture.' },
      { name: 'Carlos Mendez', rating: 4, text: 'A big step up from the usual boba spots. The tiger sugar latte is incredible and the atmosphere is really nice for just hanging out. We came here after finals and stayed for two hours. Great vibe and the drinks are consistently excellent.' },
    ],
  },
  {
    id: 11,
    name: 'Campus Bowl Bar',
    cuisine: 'Quick Lunch',
    priceRange: '$',
    distance: '2 blocks away',
    rating: 3.9,
    location: '144 E 68th St, New York, NY 10065',
    hours: '10 AM - 7 PM',
    menu: ['Rice bowl', 'Grain bowl', 'Chicken bowl', 'Veggie bowl'],
    tags: ['quick', 'lunch', 'healthy'],
    description: 'A fast build-your-own bowl counter aimed at students. Simple, fresh ingredients and quick assembly — perfect for a lunch you can eat on the way back to class.',
    reviews: [
      { name: 'Destiny Moore', rating: 4, text: 'Really appreciate having a healthy fast option so close to campus. The chicken bowl is filling and the price is fair. Nothing fancy but it is way better than eating chips from the vending machine between classes.' },
      { name: 'Noah Garrett',  rating: 3, text: 'The food is fresh and I like that it is quick. The portions could be a little bigger for the price but overall it is a solid option when I want something lighter. The veggie bowl is surprisingly good.' },
    ],
  },
  {
    id: 12,
    name: 'Green Bowl Co.',
    cuisine: 'Quick Lunch',
    priceRange: '$$$',
    distance: '3 blocks away',
    rating: 4.4,
    location: '234 E 70th St, New York, NY 10021',
    hours: '9 AM - 8 PM',
    menu: ['Salmon poke bowl', 'Acai bowl', 'Kale and quinoa salad', 'Avocado chicken bowl'],
    tags: ['healthy', 'premium', 'lunch'],
    description: 'A premium bowl restaurant with high-quality proteins, fresh seasonal toppings, and house-made sauces. The healthiest sit-down option near campus.',
    reviews: [
      { name: 'Fatima Hassan', rating: 5, text: 'The salmon poke bowl is worth every dollar. The fish is always fresh and the portion is generous. It is the most I spend on lunch near campus but it keeps me full and energized through afternoon classes. Absolutely no regrets.' },
      { name: 'Ryan Torres',   rating: 4, text: 'The acai bowl is incredible — it comes loaded with fresh fruit, granola, and honey. Perfect after a workout at the gym nearby. Pricier than most options around here but the quality is noticeably better than the competition.' },
    ],
  },
  {
    id: 13,
    name: 'Noodle House 68',
    cuisine: 'Chinese',
    priceRange: '$',
    distance: '3 blocks away',
    rating: 4.3,
    location: '312 E 68th St, New York, NY 10065',
    hours: '11 AM - 9 PM',
    menu: ['Beef noodle soup', 'Dan dan noodles', 'Pork dumplings', 'Scallion pancake'],
    tags: ['filling', 'quick', 'cheap'],
    description: 'A tiny but beloved noodle shop packed with Hunter students at lunch. Rich broths, handmade dumplings, and prices that will not hurt your wallet.',
    reviews: [
      { name: 'Mei Lin',      rating: 5, text: 'The beef noodle soup is incredible — the broth has clearly been cooking for hours. On a cold day between classes this place is a lifesaver. Portions are generous and prices are very fair for the area.' },
      { name: 'Tyler Brooks', rating: 4, text: 'Dan dan noodles are spicy in the best way. The place is small so it can get tight during peak lunch hours but the food comes out fast. Definitely one of my top spots near campus.' },
    ],
  },
  {
    id: 14,
    name: 'Jade Garden Bistro',
    cuisine: 'Chinese',
    priceRange: '$$$',
    distance: '5 blocks away',
    rating: 4.5,
    location: '403 E 72nd St, New York, NY 10021',
    hours: '12 PM - 10 PM',
    menu: ['Peking duck', 'Mapo tofu', 'Dim sum basket', 'Shrimp fried rice'],
    tags: ['sit-down', 'dinner', 'treat yourself'],
    description: 'An upscale Chinese bistro with refined takes on classic dishes. The dim sum and Peking duck are local favorites — perfect for a celebration dinner.',
    reviews: [
      { name: 'Michelle Zhang', rating: 5, text: 'The Peking duck here is one of the best things I have eaten in this city. The skin is perfectly crispy and the pancakes are fresh. It is a splurge but absolutely justified for a special occasion. Ambiance is also really lovely.' },
      { name: 'Kevin Wu',       rating: 4, text: 'Came here for a group dinner after finishing a major project and it was the perfect choice. The mapo tofu is rich and numbing in the best way and the dim sum is genuinely excellent. Service was attentive and the atmosphere is really nice.' },
    ],
  },
  {
    id: 15,
    name: 'Taco Loco UES',
    cuisine: 'Mexican',
    priceRange: '$',
    distance: '4 blocks away',
    rating: 4.2,
    location: '187 E 71st St, New York, NY 10021',
    hours: '10 AM - 10 PM',
    menu: ['Street tacos', 'Burrito bowl', 'Quesadilla', 'Horchata'],
    tags: ['cheap', 'filling', 'quick'],
    description: 'A fast casual taco counter with authentic street-style tacos and giant burrito bowls that keep you full through your next class.',
    reviews: [
      { name: 'Isabella Reyes', rating: 5, text: 'Three street tacos for under six dollars — I cannot believe more people do not know about this place. The al pastor is perfectly seasoned and the salsa bar lets you customize everything. My go-to spot on a tight week.' },
      { name: 'Jordan Kim',     rating: 4, text: 'The burrito bowl is massive, I always end up with leftovers for dinner. Super fast service and the staff is always friendly even when the line gets long around noon. The horchata is also really good.' },
    ],
  },
  {
    id: 16,
    name: 'Casa Azul Cantina',
    cuisine: 'Mexican',
    priceRange: '$$$',
    distance: '5 blocks away',
    rating: 4.6,
    location: '356 E 72nd St, New York, NY 10021',
    hours: '11 AM - 11 PM',
    menu: ['Carne asada plate', 'Lobster tacos', 'Guacamole tableside', 'Churros'],
    tags: ['sit-down', 'dinner', 'margaritas'],
    description: 'A vibrant upscale Mexican cantina with bold flavors and tableside guacamole. The best spot near campus for a celebratory dinner.',
    reviews: [
      { name: 'Sofia Ramirez',   rating: 5, text: 'The lobster tacos are absolutely unreal and the tableside guacamole is a whole experience on its own. Yes it is expensive for a student budget but for a birthday or end-of-semester dinner this place is perfect. The vibe is also incredible.' },
      { name: 'Andre Thompson', rating: 4, text: 'Came here with a group after finals and had such a great time. The carne asada plate is huge and perfectly seasoned. Pricier than most spots near campus but for a special night out it is hard to beat.' },
    ],
  },
  {
    id: 17,
    name: 'Roll & Go Sushi',
    cuisine: 'Sushi',
    priceRange: '$$',
    distance: '3 blocks away',
    rating: 4.1,
    location: '265 E 70th St, New York, NY 10021',
    hours: '11 AM - 9 PM',
    menu: ['California roll', 'Spicy tuna roll', 'Edamame', 'Miso soup'],
    tags: ['quick', 'lunch', 'sushi'],
    description: 'A casual grab-and-go sushi counter with fresh rolls made throughout the day. Affordable enough for a regular lunch and fast enough for a class break.',
    reviews: [
      { name: 'Hannah Kim',  rating: 4, text: 'Finally a sushi spot that does not break the bank near campus. The spicy tuna roll is solid and the fish always tastes fresh. I come here at least once a week when I want something that feels a little more special than a sandwich.' },
      { name: 'Marcus Lee', rating: 4, text: 'Great value for sushi this close to campus. The California roll is a classic and they make it well. Service is fast which matters when you only have 20 minutes between classes. A reliable go-to for me.' },
    ],
  },
  {
    id: 18,
    name: 'Sakura Sushi Bar',
    cuisine: 'Sushi',
    priceRange: '$$$',
    distance: '5 blocks away',
    rating: 4.7,
    location: '445 E 72nd St, New York, NY 10021',
    hours: '12 PM - 9 PM',
    menu: ['Omakase set', 'Spicy tuna roll', 'Salmon sashimi', 'Wagyu nigiri'],
    tags: ['sit-down', 'premium', 'treat yourself'],
    description: 'The finest sushi experience near Hunter — a proper omakase bar with chef-selected cuts and premium fish flown in fresh. Worth saving up for.',
    reviews: [
      { name: 'Amanda Nguyen', rating: 5, text: 'Best sushi I have had outside of midtown and way less crowded. The omakase is a true experience — every piece is perfectly prepared and the chef explains each one. Yes it is pricey but for a graduation dinner or birthday it is absolutely perfect.' },
      { name: 'Rafael Ortega', rating: 5, text: 'Came here after finals week and it was the best meal I have had near campus by a wide margin. The wagyu nigiri alone is worth the trip. The atmosphere is elegant without being stuffy. Save up for this one — you will not regret it.' },
    ],
  },
  {
    id: 19,
    name: 'Sugar Rush Stand',
    cuisine: 'Dessert',
    priceRange: '$',
    distance: '1 block away',
    rating: 4.2,
    location: '131 E 68th St, New York, NY 10065',
    hours: '11 AM - 9 PM',
    menu: ['Soft serve cone', 'Brownie', 'Rice crispy treat', 'Chocolate chip cookie'],
    tags: ['cheap', 'quick', 'dessert'],
    description: 'A cheerful dessert window right next to campus serving soft serve and baked goods for just a few dollars. The perfect after-class pick-me-up.',
    reviews: [
      { name: 'Aisha Roberts', rating: 4, text: 'The soft serve is creamy and cheap and the cookies are baked fresh daily. I stop here whenever I need a little mood boost after a tough class. Nothing fancy but it always hits the spot and the price is perfect for a student budget.' },
      { name: 'Chris Patel',   rating: 4, text: 'Best cheap dessert option right near campus. The brownie is fudgy and rich and only costs two dollars. I come here between afternoon classes pretty regularly. Staff is always friendly and the line moves fast.' },
    ],
  },
  {
    id: 20,
    name: 'Scoops & Co.',
    cuisine: 'Dessert',
    priceRange: '$$',
    distance: '4 blocks away',
    rating: 4.6,
    location: '278 E 71st St, New York, NY 10021',
    hours: '12 PM - 10 PM',
    menu: ['Rotating soft serve', 'Loaded sundae', 'Milkshake', 'Cookie ice cream sandwich'],
    tags: ['hangout', 'premium dessert'],
    description: 'A stylish dessert shop with rotating weekly soft serve flavors and loaded sundaes. The best dessert spot near Hunter, full stop.',
    reviews: [
      { name: 'Brianna Scott', rating: 5, text: 'This place makes me actually look forward to finishing class. The soft serve flavors rotate weekly and they are always creative — last week was brown butter and it was unreal. The cookie ice cream sandwich is dangerous, I always get one.' },
      { name: 'Kevin Patel',   rating: 4, text: 'Great spot for a post-class treat with friends. The milkshakes are thick and generous and the vibe is really chill. It does get busy on Friday evenings so go a little earlier if you can. One of my favorite spots near campus.' },
    ],
  },
]

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
