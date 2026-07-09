require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const FoodSpot = require('../models/FoodSpot');

const sampleData = [
  {
    name: "Tony's Pizza",
    cuisine: 'Pizza',
    priceRange: '$',
    distance: '2 blocks away',
    location: '215 E 68th St, New York, NY 10065',
    hours: '10 AM - 8 PM',
    menu: ['Cheese slice', 'Pepperoni slice', 'Garlic knots', 'Sicilian slice'],
    tags: ['cheap', 'quick'],
    description: 'A no-frills pizza counter serving giant dollar slices right around the corner from campus. Cash only, always fresh.',
    reviews: [
      { name: 'Marcus Rivera', rating: 4, text: 'I come here between every class. Two slices fill me up and I still have money left for the train. The pepperoni is always fresh out of the oven around noon.' },
      { name: 'Aaliyah Thompson', rating: 4, text: 'Super fast service. I grabbed a slice and was back in class within 10 minutes. Nothing fancy but exactly what you need when you are running late and hungry.' }
    ]
  },
  {
    name: 'Lucia Pizzeria',
    cuisine: 'Pizza',
    priceRange: '$$$',
    distance: '4 blocks away',
    location: '341 E 71st St, New York, NY 10021',
    hours: '11 AM - 10 PM',
    menu: ['Margherita pizza', 'Truffle mushroom pizza', 'Burrata appetizer', 'Tiramisu'],
    tags: ['sit-down', 'date night'],
    description: 'A proper Neapolitan pizzeria with a wood-fired oven and imported ingredients. Worth every penny when you want something special.',
    reviews: [
      { name: 'Vanessa Cruz', rating: 5, text: 'The margherita here is genuinely one of the best pizzas I have had in New York. The crust is perfectly charred and the San Marzano tomatoes make all the difference. Not a dollar slice spot but absolutely worth it for a treat.' },
      { name: 'Daniel Park', rating: 4, text: 'Came here for a birthday dinner and it was perfect. The truffle mushroom pizza is rich and satisfying. Pricier than what I usually spend near campus but the quality is on a completely different level.' }
    ]
  },
  {
    name: 'Lexington Halal Cart',
    cuisine: 'Halal',
    priceRange: '$',
    distance: '1 block away',
    location: '695 Lexington Ave, New York, NY 10065',
    hours: '11 AM - 9 PM',
    menu: ['Chicken over rice', 'Lamb gyro', 'Falafel platter', 'Combo platter'],
    tags: ['good portions', 'lunch'],
    description: 'A beloved street cart known for massive portions of chicken over rice with that famous white sauce. Always a line, always worth it.',
    reviews: [
      { name: 'Priya Nair', rating: 5, text: 'Honestly the best deal near Hunter. The chicken over rice is loaded and the white sauce is amazing. I have been coming here three times a week since freshman year.' },
      { name: 'DeShawn Williams', rating: 4, text: 'Line moves fast even when it looks long. The lamb gyro is underrated — most people sleep on it. Portions are huge, I usually save half for dinner.' }
    ]
  },
  {
    name: 'Al Medina Kitchen',
    cuisine: 'Halal',
    priceRange: '$$',
    distance: '3 blocks away',
    location: '172 E 70th St, New York, NY 10021',
    hours: '10 AM - 10 PM',
    menu: ['Lamb shawarma plate', 'Mixed grill', 'Hummus and pita', 'Baklava'],
    tags: ['sit-down', 'filling'],
    description: 'A sit-down halal restaurant with a full menu of Middle Eastern grills and mezze. A big step up from the cart when you have more time.',
    reviews: [
      { name: 'Omar Hassan', rating: 5, text: 'The mixed grill here is incredible — the lamb is perfectly spiced and the portions are generous. It is a bit more than the cart but the experience is completely different. I come here when I want to actually sit and eat properly.' },
      { name: 'Samira Khalil', rating: 4, text: 'Really solid halal restaurant. The hummus is house-made and you can taste the difference. The shawarma plate comes with rice, salad, and bread so you genuinely leave full. Great for a longer lunch break.' }
    ]
  },
  {
    name: 'Corner Cup Coffee',
    cuisine: 'Coffee',
    priceRange: '$',
    distance: '2 blocks away',
    location: '228 E 68th St, New York, NY 10065',
    hours: '6 AM - 5 PM',
    menu: ['Drip coffee', 'Bagel with cream cheese', 'Croissant', 'Iced coffee'],
    tags: ['cheap', 'quick', 'breakfast'],
    description: 'A no-frills bodega-style coffee counter. Grab a solid cup and a bagel before an early morning class without spending more than four dollars.',
    reviews: [
      { name: 'Tyrone Jackson', rating: 4, text: 'Best cheap coffee near campus, full stop. The drip coffee is hot and strong and a large is only two dollars. I stop here every single morning before my 8 AM and it has never let me down.' },
      { name: 'Grace Lee', rating: 3, text: 'Nothing fancy here but it does the job. The bagels are always fresh in the morning and the coffee is strong enough to actually wake you up. Perfect when you are in a rush and on a tight budget.' }
    ]
  },
  {
    name: 'Park Brew Coffee',
    cuisine: 'Coffee',
    priceRange: '$$',
    distance: '5 blocks away',
    location: '320 E 72nd St, New York, NY 10021',
    hours: '7 AM - 7 PM',
    menu: ['Iced latte', 'Pour over', 'Matcha latte', 'Avocado toast', 'Muffin'],
    tags: ['study', 'wifi', 'cozy'],
    description: 'A proper neighborhood coffee shop with good wifi, plenty of seating, and specialty drinks. The go-to spot for studying between classes.',
    reviews: [
      { name: 'Sofia Castillo', rating: 4, text: 'One of the few spots near campus where you can sit for more than an hour without feeling rushed. The iced latte is solid. Good wifi too, which is a huge plus for me before finals.' },
      { name: 'James Okafor', rating: 4, text: 'The matcha latte here is genuinely great and the pour over is worth the wait. A bit more expensive than a bodega coffee but when I need to actually focus and study this is where I come. Always a good vibe.' }
    ]
  },
  {
    name: 'Hunter Deli & Grill',
    cuisine: 'Sandwiches',
    priceRange: '$',
    distance: '1 block away',
    location: '158 E 68th St, New York, NY 10065',
    hours: '6 AM - 7 PM',
    menu: ['Egg and cheese', 'BLT', 'Tuna hero', 'Turkey and swiss'],
    tags: ['breakfast', 'quick', 'cheap'],
    description: 'A classic New York deli that has been feeding Hunter students for years. Fast, cheap, and reliable — especially for breakfast heroes.',
    reviews: [
      { name: 'Keisha Brown', rating: 4, text: 'The egg and cheese on a roll is the best breakfast sandwich near campus, period. They make it fast and wrap it well so it stays warm. Perfect before an 8 AM class.' },
      { name: 'Liam Chen', rating: 4, text: 'Solid deli with everything you need. The BLT is crispy and generous and the price is very fair. Staff is fast and efficient even during the morning rush. One of my most visited spots near school.' }
    ]
  },
  {
    name: 'The Crafted Sub',
    cuisine: 'Sandwiches',
    priceRange: '$$$',
    distance: '4 blocks away',
    location: '289 E 71st St, New York, NY 10021',
    hours: '10 AM - 8 PM',
    menu: ['Truffle turkey sub', 'Roast beef and brie', 'Lobster roll', 'House-made chips'],
    tags: ['gourmet', 'treat yourself'],
    description: 'An upscale sandwich shop using premium ingredients and house-baked bread. Each sandwich is made to order and it shows.',
    reviews: [
      { name: 'Natalie Wong', rating: 5, text: 'The roast beef and brie sandwich completely changed what I thought a sandwich could be. The bread is baked fresh daily and everything is sourced carefully. Yes it is expensive but I have never once regretted ordering here.' },
      { name: 'Marcus Allen', rating: 4, text: 'The truffle turkey sub is incredible. It is definitely a splurge for a student budget but when I want to treat myself after a tough week this is my first stop. The house-made chips alone are worth the trip.' }
    ]
  },
  {
    name: 'Boba Express',
    cuisine: 'Bubble Tea',
    priceRange: '$',
    distance: '2 blocks away',
    location: '197 E 68th St, New York, NY 10065',
    hours: '10 AM - 9 PM',
    menu: ['Classic milk tea', 'Brown sugar boba', 'Fruit tea', 'Matcha milk tea'],
    tags: ['quick', 'drinks', 'cheap'],
    description: 'A no-frills boba window with fast service and low prices. Great for a quick drink between classes without waiting long or spending much.',
    reviews: [
      { name: 'Jenny Liu', rating: 4, text: 'The brown sugar boba is really good for the price — I was surprised at how solid it was. The line moves fast which is the most important thing when you only have 15 minutes between classes. Will definitely be back.' },
      { name: 'Andre Williams', rating: 4, text: 'Cheapest boba near campus and honestly not bad at all. The classic milk tea is always consistent and the pearls are fresh. Nothing fancy but when you just want a quick drink this is the spot.' }
    ]
  },
  {
    name: 'Boba Uptown',
    cuisine: 'Bubble Tea',
    priceRange: '$$',
    distance: '5 blocks away',
    location: '410 E 72nd St, New York, NY 10021',
    hours: '11 AM - 10 PM',
    menu: ['Taro milk tea', 'Mango slush', 'Jasmine green tea', 'Tiger sugar latte'],
    tags: ['hangout', 'premium'],
    description: 'A stylish boba cafe with premium loose-leaf teas, fully customizable sweetness and ice levels, and a cozy space to hang out after class.',
    reviews: [
      { name: 'Yuna Park', rating: 5, text: 'The taro milk tea here is hands down the best in the neighborhood. You can customize exactly how sweet you want it and the pearls are always perfectly chewy. Perfect place to decompress after a long lecture.' },
      { name: 'Carlos Mendez', rating: 4, text: 'A big step up from the usual boba spots. The tiger sugar latte is incredible and the atmosphere is really nice for just hanging out. We came here after finals and stayed for two hours. Great vibe and the drinks are consistently excellent.' }
    ]
  },
  {
    name: 'Campus Bowl Bar',
    cuisine: 'Quick Lunch',
    priceRange: '$',
    distance: '2 blocks away',
    location: '144 E 68th St, New York, NY 10065',
    hours: '10 AM - 7 PM',
    menu: ['Rice bowl', 'Grain bowl', 'Chicken bowl', 'Veggie bowl'],
    tags: ['quick', 'lunch', 'healthy'],
    description: 'A fast build-your-own bowl counter aimed at students. Simple, fresh ingredients and quick assembly — perfect for a lunch you can eat on the way back to class.',
    reviews: [
      { name: 'Destiny Moore', rating: 4, text: 'Really appreciate having a healthy fast option so close to campus. The chicken bowl is filling and the price is fair. Nothing fancy but it is way better than eating chips from the vending machine between classes.' },
      { name: 'Noah Garrett', rating: 3, text: 'The food is fresh and I like that it is quick. The portions could be a little bigger for the price but overall it is a solid option when I want something lighter. The veggie bowl is surprisingly good.' }
    ]
  },
  {
    name: 'Green Bowl Co.',
    cuisine: 'Quick Lunch',
    priceRange: '$$$',
    distance: '3 blocks away',
    location: '234 E 70th St, New York, NY 10021',
    hours: '9 AM - 8 PM',
    menu: ['Salmon poke bowl', 'Acai bowl', 'Kale and quinoa salad', 'Avocado chicken bowl'],
    tags: ['healthy', 'premium', 'lunch'],
    description: 'A premium bowl restaurant with high-quality proteins, fresh seasonal toppings, and house-made sauces. The healthiest sit-down option near campus.',
    reviews: [
      { name: 'Fatima Hassan', rating: 5, text: 'The salmon poke bowl is worth every dollar. The fish is always fresh and the portion is generous. It is the most I spend on lunch near campus but it keeps me full and energized through afternoon classes. Absolutely no regrets.' },
      { name: 'Ryan Torres', rating: 4, text: 'The acai bowl is incredible — it comes loaded with fresh fruit, granola, and honey. Perfect after a workout at the gym nearby. Pricier than most options around here but the quality is noticeably better than the competition.' }
    ]
  },
  {
    name: 'Noodle House 68',
    cuisine: 'Chinese',
    priceRange: '$',
    distance: '3 blocks away',
    location: '312 E 68th St, New York, NY 10065',
    hours: '11 AM - 9 PM',
    menu: ['Beef noodle soup', 'Dan dan noodles', 'Pork dumplings', 'Scallion pancake'],
    tags: ['filling', 'quick', 'cheap'],
    description: 'A tiny but beloved noodle shop packed with Hunter students at lunch. Rich broths, handmade dumplings, and prices that will not hurt your wallet.',
    reviews: [
      { name: 'Mei Lin', rating: 5, text: 'The beef noodle soup is incredible — the broth has clearly been cooking for hours. On a cold day between classes this place is a lifesaver. Portions are generous and prices are very fair for the area.' },
      { name: 'Tyler Brooks', rating: 4, text: 'Dan dan noodles are spicy in the best way. The place is small so it can get tight during peak lunch hours but the food comes out fast. Definitely one of my top spots near campus.' }
    ]
  },
  {
    name: 'Jade Garden Bistro',
    cuisine: 'Chinese',
    priceRange: '$$$',
    distance: '5 blocks away',
    location: '403 E 72nd St, New York, NY 10021',
    hours: '12 PM - 10 PM',
    menu: ['Peking duck', 'Mapo tofu', 'Dim sum basket', 'Shrimp fried rice'],
    tags: ['sit-down', 'dinner', 'treat yourself'],
    description: 'An upscale Chinese bistro with refined takes on classic dishes. The dim sum and Peking duck are local favorites — perfect for a celebration dinner.',
    reviews: [
      { name: 'Michelle Zhang', rating: 5, text: 'The Peking duck here is one of the best things I have eaten in this city. The skin is perfectly crispy and the pancakes are fresh. It is a splurge but absolutely justified for a special occasion. Ambiance is also really lovely.' },
      { name: 'Kevin Wu', rating: 4, text: 'Came here for a group dinner after finishing a major project and it was the perfect choice. The mapo tofu is rich and numbing in the best way and the dim sum is genuinely excellent. Service was attentive and the atmosphere is really nice.' }
    ]
  },
  {
    name: 'Taco Loco UES',
    cuisine: 'Mexican',
    priceRange: '$',
    distance: '4 blocks away',
    location: '187 E 71st St, New York, NY 10021',
    hours: '10 AM - 10 PM',
    menu: ['Street tacos', 'Burrito bowl', 'Quesadilla', 'Horchata'],
    tags: ['cheap', 'filling', 'quick'],
    description: 'A fast casual taco counter with authentic street-style tacos and giant burrito bowls that keep you full through your next class.',
    reviews: [
      { name: 'Isabella Reyes', rating: 5, text: 'Three street tacos for under six dollars — I cannot believe more people do not know about this place. The al pastor is perfectly seasoned and the salsa bar lets you customize everything. My go-to spot on a tight week.' },
      { name: 'Jordan Kim', rating: 4, text: 'The burrito bowl is massive, I always end up with leftovers for dinner. Super fast service and the staff is always friendly even when the line gets long around noon. The horchata is also really good.' }
    ]
  },
  {
    name: 'Casa Azul Cantina',
    cuisine: 'Mexican',
    priceRange: '$$$',
    distance: '5 blocks away',
    location: '356 E 72nd St, New York, NY 10021',
    hours: '11 AM - 11 PM',
    menu: ['Carne asada plate', 'Lobster tacos', 'Guacamole tableside', 'Churros'],
    tags: ['sit-down', 'dinner', 'margaritas'],
    description: 'A vibrant upscale Mexican cantina with bold flavors and tableside guacamole. The best spot near campus for a celebratory dinner.',
    reviews: [
      { name: 'Sofia Ramirez', rating: 5, text: 'The lobster tacos are absolutely unreal and the tableside guacamole is a whole experience on its own. Yes it is expensive for a student budget but for a birthday or end-of-semester dinner this place is perfect. The vibe is also incredible.' },
      { name: 'Andre Thompson', rating: 4, text: 'Came here with a group after finals and had such a great time. The carne asada plate is huge and perfectly seasoned. Pricier than most spots near campus but for a special night out it is hard to beat.' }
    ]
  },
  {
    name: 'Roll & Go Sushi',
    cuisine: 'Sushi',
    priceRange: '$$',
    distance: '3 blocks away',
    location: '265 E 70th St, New York, NY 10021',
    hours: '11 AM - 9 PM',
    menu: ['California roll', 'Spicy tuna roll', 'Edamame', 'Miso soup'],
    tags: ['quick', 'lunch', 'sushi'],
    description: 'A casual grab-and-go sushi counter with fresh rolls made throughout the day. Affordable enough for a regular lunch and fast enough for a class break.',
    reviews: [
      { name: 'Hannah Kim', rating: 4, text: 'Finally a sushi spot that does not break the bank near campus. The spicy tuna roll is solid and the fish always tastes fresh. I come here at least once a week when I want something that feels a little more special than a sandwich.' },
      { name: 'Marcus Lee', rating: 4, text: 'Great value for sushi this close to campus. The California roll is a classic and they make it well. Service is fast which matters when you only have 20 minutes between classes. A reliable go-to for me.' }
    ]
  },
  {
    name: 'Sakura Sushi Bar',
    cuisine: 'Sushi',
    priceRange: '$$$',
    distance: '5 blocks away',
    location: '445 E 72nd St, New York, NY 10021',
    hours: '12 PM - 9 PM',
    menu: ['Omakase set', 'Spicy tuna roll', 'Salmon sashimi', 'Wagyu nigiri'],
    tags: ['sit-down', 'premium', 'treat yourself'],
    description: 'The finest sushi experience near Hunter — a proper omakase bar with chef-selected cuts and premium fish flown in fresh. Worth saving up for.',
    reviews: [
      { name: 'Amanda Nguyen', rating: 5, text: 'Best sushi I have had outside of midtown and way less crowded. The omakase is a true experience — every piece is perfectly prepared and the chef explains each one. Yes it is pricey but for a graduation dinner or birthday it is absolutely perfect.' },
      { name: 'Rafael Ortega', rating: 5, text: 'Came here after finals week and it was the best meal I have had near campus by a wide margin. The wagyu nigiri alone is worth the trip. The atmosphere is elegant without being stuffy. Save up for this one — you will not regret it.' }
    ]
  },
  {
    name: 'Sugar Rush Stand',
    cuisine: 'Dessert',
    priceRange: '$',
    distance: '1 block away',
    location: '131 E 68th St, New York, NY 10065',
    hours: '11 AM - 9 PM',
    menu: ['Soft serve cone', 'Brownie', 'Rice crispy treat', 'Chocolate chip cookie'],
    tags: ['cheap', 'quick', 'dessert'],
    description: 'A cheerful dessert window right next to campus serving soft serve and baked goods for just a few dollars. The perfect after-class pick-me-up.',
    reviews: [
      { name: 'Aisha Roberts', rating: 4, text: 'The soft serve is creamy and cheap and the cookies are baked fresh daily. I stop here whenever I need a little mood boost after a tough class. Nothing fancy but it always hits the spot and the price is perfect for a student budget.' },
      { name: 'Chris Patel', rating: 4, text: 'Best cheap dessert option right near campus. The brownie is fudgy and rich and only costs two dollars. I come here between afternoon classes pretty regularly. Staff is always friendly and the line moves fast.' }
    ]
  },
  {
    name: 'Scoops & Co.',
    cuisine: 'Dessert',
    priceRange: '$$',
    distance: '4 blocks away',
    location: '278 E 71st St, New York, NY 10021',
    hours: '12 PM - 10 PM',
    menu: ['Rotating soft serve', 'Loaded sundae', 'Milkshake', 'Cookie ice cream sandwich'],
    tags: ['hangout', 'premium dessert'],
    description: 'A stylish dessert shop with rotating weekly soft serve flavors and loaded sundaes. The best dessert spot near Hunter, full stop.',
    reviews: [
      { name: 'Brianna Scott', rating: 5, text: 'This place makes me actually look forward to finishing class. The soft serve flavors rotate weekly and they are always creative — last week was brown butter and it was unreal. The cookie ice cream sandwich is dangerous, I always get one.' },
      { name: 'Kevin Patel', rating: 4, text: 'Great spot for a post-class treat with friends. The milkshakes are thick and generous and the vibe is really chill. It does get busy on Friday evenings so go a little earlier if you can. One of my favorite spots near campus.' }
    ]
  }
];

const withCalculatedRatings = sampleData.map((spot) => {
  if (!spot.reviews || spot.reviews.length === 0) return { ...spot, rating: 0 };
  const total = spot.reviews.reduce((sum, review) => sum + review.rating, 0);
  return { ...spot, rating: Math.round((total / spot.reviews.length) * 10) / 10 };
});

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await FoodSpot.deleteMany({});
  await FoodSpot.insertMany(withCalculatedRatings);
  console.log(`Database seeded with ${withCalculatedRatings.length} food spots`);
  process.exit();
};

seedDB();