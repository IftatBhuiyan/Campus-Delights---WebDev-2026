require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const FoodSpot = require('../models/FoodSpot');

const sampleData = [
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

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await FoodSpot.deleteMany({});
  await FoodSpot.insertMany(sampleData);
  console.log(`Database seeded with ${sampleData.length} food spots`);
  process.exit();
};

seedDB();