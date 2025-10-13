import { HawkerTip } from '../types/healthhub'

export const hawkerHealthTips: HawkerTip[] = [
  {
    id: 'chicken-rice',
    dishName: 'Chicken Rice',
    category: 'rice',
    image: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg',
    unhealthyVersion: {
      calories: 607,
      sodium: 820,
      description: 'Regular chicken rice with skin, oily rice, dark soy sauce'
    },
    healthierTips: [
      'Ask for "no skin" on your chicken - saves 100+ calories! 🐔',
      'Request for plain rice instead of oily rice - cut 150 calories leh',
      'Go easy on the dark soy sauce - very salty one',
      'Add extra cucumber slices for more fiber',
      'Skip the chicken fat rice if can - healthier mah'
    ],
    healthierVersion: {
      calories: 400,
      sodium: 450,
      description: 'Skinless chicken, plain rice, less sauce'
    },
    caloriesSaved: 207,
    sodiumReduced: 370,
    difficulty: 'easy',
    popularAt: ['Tian Tian', 'Boon Tong Kee', 'Chatterbox']
  },
  {
    id: 'char-kway-teow',
    dishName: 'Char Kway Teow',
    category: 'noodles',
    image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg',
    unhealthyVersion: {
      calories: 744,
      sodium: 1680,
      description: 'Regular CKT with lard, cockles, lots of oil'
    },
    healthierTips: [
      'Ask uncle to "少油" (less oil) - can save 200 calories!',
      'Request "no lard" - healthier for heart',
      'Add more bean sprouts and chives for fiber',
      'Share half portion with friend - shiok and healthy',
      'Skip the sweet sauce - already got enough flavor'
    ],
    healthierVersion: {
      calories: 500,
      sodium: 1100,
      description: 'Less oil, no lard, more vegetables'
    },
    caloriesSaved: 244,
    sodiumReduced: 580,
    difficulty: 'medium',
    popularAt: ['Hill Street', 'Outram Park', 'Bedok']
  },
  {
    id: 'laksa',
    dishName: 'Laksa',
    category: 'soup',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg',
    unhealthyVersion: {
      calories: 569,
      sodium: 1580,
      description: 'Full coconut milk, thick noodles, lots of gravy'
    },
    healthierTips: [
      'Ask for "少椰浆" (less coconut milk) - still shiok what',
      'Request bee hoon instead of thick noodles - lighter',
      'Don\'t drink all the soup - very high sodium',
      'Add extra tau pok for protein without too much fat',
      'Share with kakis if portion too big'
    ],
    healthierVersion: {
      calories: 420,
      sodium: 1100,
      description: 'Less coconut milk, thin noodles, moderate gravy'
    },
    caloriesSaved: 149,
    sodiumReduced: 480,
    difficulty: 'easy',
    popularAt: ['328 Katong', 'Sungei Road', 'Roxy Square']
  },
  {
    id: 'nasi-lemak',
    dishName: 'Nasi Lemak',
    category: 'rice',
    image: 'https://images.pexels.com/photos/8753527/pexels-photo-8753527.jpeg',
    unhealthyVersion: {
      calories: 644,
      sodium: 920,
      description: 'Full coconut rice, fried chicken wing, lots of sambal'
    },
    healthierTips: [
      'Choose otah or egg instead of fried chicken - less oily',
      'Ask for half portion of rice - still filling one',
      'Go easy on the sambal - shiok but salty',
      'Add more ikan bilis for protein and calcium',
      'Skip the extra curry if got - very rich already'
    ],
    healthierVersion: {
      calories: 450,
      sodium: 600,
      description: 'Half rice, grilled protein, moderate sambal'
    },
    caloriesSaved: 194,
    sodiumReduced: 320,
    difficulty: 'easy',
    popularAt: ['Changi Village', 'Adam Road', 'Selera Rasa']
  },
  {
    id: 'hokkien-mee',
    dishName: 'Hokkien Mee',
    category: 'noodles',
    image: 'https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg',
    unhealthyVersion: {
      calories: 632,
      sodium: 1520,
      description: 'Regular portion with pork lard, lots of gravy'
    },
    healthierTips: [
      'Request "no lard" - uncle will understand one',
      'Ask for more sotong and prawns - good protein',
      'Add kangkong or bean sprouts for fiber',
      'Share the sambal chili - very shiok but salty',
      'Don\'t finish all the gravy - save some sodium lah'
    ],
    healthierVersion: {
      calories: 480,
      sodium: 1000,
      description: 'No lard, more seafood, extra vegetables'
    },
    caloriesSaved: 152,
    sodiumReduced: 520,
    difficulty: 'easy',
    popularAt: ['Geylang Lorong 29', 'Toa Payoh', 'Tiong Bahru']
  },
  {
    id: 'bak-chor-mee',
    dishName: 'Bak Chor Mee',
    category: 'noodles',
    image: 'https://images.pexels.com/photos/8753659/pexels-photo-8753659.jpeg',
    unhealthyVersion: {
      calories: 478,
      sodium: 1420,
      description: 'Regular minced pork, lots of vinegar and sauce'
    },
    healthierTips: [
      'Choose mee kia (thin noodles) - less carbs',
      'Ask for lean minced meat - less fat',
      'Request "少醋" (less vinegar) - reduce sodium',
      'Add more vegetables and mushrooms',
      'Skip the fried wonton - save calories'
    ],
    healthierVersion: {
      calories: 380,
      sodium: 950,
      description: 'Lean meat, thin noodles, less sauce'
    },
    caloriesSaved: 98,
    sodiumReduced: 470,
    difficulty: 'easy',
    popularAt: ['Tai Hwa', 'Hill Street', 'Bedok 85']
  },
  {
    id: 'roti-prata',
    dishName: 'Roti Prata',
    category: 'snacks',
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
    unhealthyVersion: {
      calories: 343,
      sodium: 520,
      description: 'Regular prata with curry, ghee'
    },
    healthierTips: [
      'Order plain prata instead of egg or cheese - lighter',
      'Share one prata with friend - enough already',
      'Dip in curry instead of pouring - control portion',
      'Try thosai as alternative - less oily',
      'Skip the sugar prata - breakfast not dessert leh'
    ],
    healthierVersion: {
      calories: 240,
      sodium: 380,
      description: 'Plain prata, moderate curry dipping'
    },
    caloriesSaved: 103,
    sodiumReduced: 140,
    difficulty: 'easy',
    popularAt: ['Springleaf', 'Casuarina Curry', 'Mr Prata']
  },
  {
    id: 'kopi',
    dishName: 'Kopi & Drinks',
    category: 'drinks',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    unhealthyVersion: {
      calories: 180,
      sodium: 45,
      description: 'Kopi with condensed milk and sugar'
    },
    healthierTips: [
      'Order "kopi-o kosong" - no sugar, no milk, pure coffee',
      'Try "kopi-c kosong" - evaporated milk, no sugar',
      'Ask for "siew dai" (less sweet) - still nice what',
      'Drink plain water also can - free and healthy',
      'Avoid bubble tea everyday - treat yourself once in a while only'
    ],
    healthierVersion: {
      calories: 20,
      sodium: 10,
      description: 'Kopi-o kosong or plain water'
    },
    caloriesSaved: 160,
    sodiumReduced: 35,
    difficulty: 'easy',
    popularAt: ['Any kopitiam', 'Ya Kun', 'Toast Box']
  },
  {
    id: 'economic-rice',
    dishName: 'Economic Rice (Cai Png)',
    category: 'rice',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    unhealthyVersion: {
      calories: 650,
      sodium: 1200,
      description: 'Fried items, curry, lots of gravy'
    },
    healthierTips: [
      'Choose 2 veg 1 meat - balanced and cheaper',
      'Pick steamed or braised dishes - less oil',
      'Avoid fried items like luncheon meat - very oily',
      'Ask for "少饭" (less rice) - auntie will give discount maybe',
      'Choose clear soup dishes over curry - less sodium'
    ],
    healthierVersion: {
      calories: 450,
      sodium: 750,
      description: 'Steamed dishes, more vegetables, less rice'
    },
    caloriesSaved: 200,
    sodiumReduced: 450,
    difficulty: 'easy',
    popularAt: ['Every hawker center', 'Kopitiam food courts']
  },
  {
    id: 'yong-tau-foo',
    dishName: 'Yong Tau Foo',
    category: 'soup',
    image: 'https://images.pexels.com/photos/5409011/pexels-photo-5409011.jpeg',
    unhealthyVersion: {
      calories: 420,
      sodium: 1100,
      description: 'Fried items, lots of noodles, thick soup'
    },
    healthierTips: [
      'Choose soup version - healthier than dry',
      'Pick more vegetables and tofu - good protein',
      'Avoid fried items - steamed better',
      'Request bee hoon instead of yellow noodles',
      'Don\'t drink all the soup - save sodium'
    ],
    healthierVersion: {
      calories: 280,
      sodium: 650,
      description: 'Soup version, steamed items, more vegetables'
    },
    caloriesSaved: 140,
    sodiumReduced: 450,
    difficulty: 'easy',
    popularAt: ['Chinatown', 'Ang Mo Kio', 'Jurong East']
  }
]

export const getHawkerTipsByCategory = (category: string): HawkerTip[] => {
  return hawkerHealthTips.filter(tip => tip.category === category)
}

export const searchHawkerTips = (query: string): HawkerTip[] => {
  const lowerQuery = query.toLowerCase()
  return hawkerHealthTips.filter(tip => 
    tip.dishName.toLowerCase().includes(lowerQuery) ||
    tip.popularAt.some(place => place.toLowerCase().includes(lowerQuery))
  )
}

export const getRandomHawkerTip = (): HawkerTip => {
  return hawkerHealthTips[Math.floor(Math.random() * hawkerHealthTips.length)]
}
