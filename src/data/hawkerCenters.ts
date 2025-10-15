import { HawkerCenter } from '../types/location'

export const SINGAPORE_HAWKER_CENTERS: HawkerCenter[] = [
  {
    id: 'amoy-food-centre',
    name: 'Amoy Food Centre',
    latitude: 1.2797,
    longitude: 103.8454,
    address: '7 Maxwell Rd, Singapore 069111',
    healthierOptions: [
      {
        dishName: 'Fish Soup',
        stallName: 'Ah Chiang Fish Soup',
        calories: 280,
        protein: 28,
        carbs: 25,
        fat: 8,
        saturatedFat: 2,
        sodium: 650,
        fiber: 3,
        sugar: 4,
        healthBenefits: ['High protein', 'Low fat', 'Rich in omega-3'],
        conditionFriendly: ['diabetes', 'high-cholesterol', 'heart-disease', 'obesity'],
        alternativeTo: 'Laksa'
      },
      {
        dishName: 'Yong Tau Foo (Soup)',
        stallName: 'Heng Heng Yong Tau Foo',
        calories: 320,
        protein: 18,
        carbs: 35,
        fat: 10,
        saturatedFat: 3,
        sodium: 580,
        fiber: 6,
        sugar: 5,
        healthBenefits: ['High fiber', 'Vegetable-rich', 'Moderate protein'],
        conditionFriendly: ['diabetes', 'hypertension', 'obesity'],
        alternativeTo: 'Fried Carrot Cake'
      },
      {
        dishName: 'Steamed Chicken Rice',
        stallName: 'Tian Tian Chicken Rice',
        calories: 450,
        protein: 32,
        carbs: 55,
        fat: 12,
        saturatedFat: 3,
        sodium: 720,
        fiber: 2,
        sugar: 3,
        healthBenefits: ['Lean protein', 'Balanced meal', 'Lower fat than roasted'],
        conditionFriendly: ['diabetes', 'high-cholesterol', 'heart-disease'],
        alternativeTo: 'Roasted Chicken Rice'
      }
    ]
  },
  {
    id: 'maxwell-food-centre',
    name: 'Maxwell Food Centre',
    latitude: 1.2808,
    longitude: 103.8440,
    address: '1 Kadayanallur St, Singapore 069184',
    healthierOptions: [
      {
        dishName: 'Thunder Tea Rice',
        stallName: 'Zhen Shan Mei Thunder Tea Rice',
        calories: 380,
        protein: 15,
        carbs: 52,
        fat: 12,
        saturatedFat: 2,
        sodium: 450,
        fiber: 8,
        sugar: 6,
        healthBenefits: ['Very high fiber', 'Vegetable-rich', 'Low sodium'],
        conditionFriendly: ['diabetes', 'hypertension', 'high-cholesterol', 'obesity'],
        alternativeTo: 'Char Kway Teow'
      },
      {
        dishName: 'Porridge with Fish',
        stallName: 'Zhen Zhen Porridge',
        calories: 290,
        protein: 22,
        carbs: 38,
        fat: 6,
        saturatedFat: 1,
        sodium: 520,
        fiber: 2,
        sugar: 2,
        healthBenefits: ['Easy to digest', 'Low fat', 'Gentle on stomach'],
        conditionFriendly: ['diabetes', 'kidney-disease', 'heart-disease', 'obesity'],
        alternativeTo: 'Fried Rice'
      },
      {
        dishName: 'Grilled Fish with Brown Rice',
        stallName: 'Healthy Choice Stall',
        calories: 420,
        protein: 35,
        carbs: 45,
        fat: 10,
        saturatedFat: 2,
        sodium: 480,
        fiber: 5,
        sugar: 3,
        healthBenefits: ['Omega-3 rich', 'Whole grain', 'Low saturated fat'],
        conditionFriendly: ['diabetes', 'hypertension', 'high-cholesterol', 'heart-disease'],
        alternativeTo: 'Nasi Lemak'
      }
    ]
  },
  {
    id: 'chinatown-complex',
    name: 'Chinatown Complex Food Centre',
    latitude: 1.2833,
    longitude: 103.8437,
    address: '335 Smith St, Singapore 050335',
    healthierOptions: [
      {
        dishName: 'Vegetarian Bee Hoon',
        stallName: 'Lian He Ben Ji Claypot Rice',
        calories: 340,
        protein: 12,
        carbs: 58,
        fat: 8,
        saturatedFat: 1,
        sodium: 420,
        fiber: 7,
        sugar: 5,
        healthBenefits: ['Plant-based', 'High fiber', 'Low saturated fat'],
        conditionFriendly: ['diabetes', 'hypertension', 'high-cholesterol', 'obesity'],
        alternativeTo: 'Hokkien Mee'
      },
      {
        dishName: 'Steamed Dumplings (6pcs)',
        stallName: 'Jin Ji Teochew Braised Duck',
        calories: 310,
        protein: 18,
        carbs: 42,
        fat: 9,
        saturatedFat: 2,
        sodium: 550,
        fiber: 3,
        sugar: 4,
        healthBenefits: ['Moderate calories', 'Steamed not fried', 'Good protein'],
        conditionFriendly: ['diabetes', 'high-cholesterol', 'obesity'],
        alternativeTo: 'Fried Dumplings'
      }
    ]
  },
  {
    id: 'old-airport-road',
    name: 'Old Airport Road Food Centre',
    latitude: 1.3089,
    longitude: 103.8843,
    address: '51 Old Airport Rd, Singapore 390051',
    healthierOptions: [
      {
        dishName: 'Sliced Fish Soup',
        stallName: 'Nam Sing Hokkien Fried Mee',
        calories: 295,
        protein: 30,
        carbs: 28,
        fat: 7,
        saturatedFat: 2,
        sodium: 680,
        fiber: 3,
        sugar: 4,
        healthBenefits: ['High protein', 'Low fat', 'Light meal'],
        conditionFriendly: ['diabetes', 'high-cholesterol', 'heart-disease', 'obesity'],
        alternativeTo: 'Fried Hokkien Mee'
      },
      {
        dishName: 'Mixed Vegetable Rice',
        stallName: 'Chuan Kee Boneless Braised Duck',
        calories: 380,
        protein: 16,
        carbs: 52,
        fat: 12,
        saturatedFat: 3,
        sodium: 620,
        fiber: 8,
        sugar: 6,
        healthBenefits: ['Vegetable-rich', 'High fiber', 'Balanced meal'],
        conditionFriendly: ['diabetes', 'hypertension', 'obesity'],
        alternativeTo: 'Char Siew Rice'
      }
    ]
  },
  {
    id: 'tiong-bahru-market',
    name: 'Tiong Bahru Market',
    latitude: 1.2859,
    longitude: 103.8278,
    address: '30 Seng Poh Rd, Singapore 168898',
    healthierOptions: [
      {
        dishName: 'Chwee Kueh (4pcs)',
        stallName: 'Jian Bo Shui Kueh',
        calories: 260,
        protein: 8,
        carbs: 48,
        fat: 5,
        saturatedFat: 1,
        sodium: 380,
        fiber: 2,
        sugar: 3,
        healthBenefits: ['Low fat', 'Light breakfast', 'Low sodium'],
        conditionFriendly: ['diabetes', 'hypertension', 'high-cholesterol', 'obesity'],
        alternativeTo: 'Fried Carrot Cake'
      },
      {
        dishName: 'Lor Mee (Less Gravy)',
        stallName: 'Tiong Bahru Lor Mee',
        calories: 420,
        protein: 22,
        carbs: 58,
        fat: 12,
        saturatedFat: 3,
        sodium: 720,
        fiber: 4,
        sugar: 8,
        healthBenefits: ['Good protein', 'Filling meal', 'Request less gravy'],
        conditionFriendly: ['diabetes', 'obesity'],
        alternativeTo: 'Regular Lor Mee'
      }
    ]
  },
  {
    id: 'golden-mile-complex',
    name: 'Golden Mile Food Centre',
    latitude: 1.3030,
    longitude: 103.8640,
    address: '505 Beach Rd, Singapore 199583',
    healthierOptions: [
      {
        dishName: 'Thai Papaya Salad',
        stallName: 'Nakhon Kitchen',
        calories: 180,
        protein: 8,
        carbs: 28,
        fat: 5,
        saturatedFat: 1,
        sodium: 420,
        fiber: 6,
        sugar: 12,
        healthBenefits: ['Very low calories', 'High fiber', 'Fresh vegetables'],
        conditionFriendly: ['diabetes', 'hypertension', 'high-cholesterol', 'obesity'],
        alternativeTo: 'Pad Thai'
      },
      {
        dishName: 'Tom Yum Soup',
        stallName: 'Thai Tantric',
        calories: 220,
        protein: 18,
        carbs: 15,
        fat: 10,
        saturatedFat: 2,
        sodium: 680,
        fiber: 3,
        sugar: 6,
        healthBenefits: ['Low calories', 'Spicy metabolism boost', 'Good protein'],
        conditionFriendly: ['diabetes', 'high-cholesterol', 'obesity'],
        alternativeTo: 'Green Curry'
      }
    ]
  },
  {
    id: 'tekka-centre',
    name: 'Tekka Centre',
    latitude: 1.3066,
    longitude: 103.8519,
    address: '665 Buffalo Rd, Singapore 210665',
    healthierOptions: [
      {
        dishName: 'Thosai with Sambar',
        stallName: 'Selvi\'s',
        calories: 310,
        protein: 12,
        carbs: 52,
        fat: 7,
        saturatedFat: 1,
        sodium: 480,
        fiber: 6,
        sugar: 5,
        healthBenefits: ['Fermented food', 'High fiber', 'Low fat'],
        conditionFriendly: ['diabetes', 'hypertension', 'high-cholesterol', 'obesity'],
        alternativeTo: 'Prata with Curry'
      },
      {
        dishName: 'Tandoori Chicken with Salad',
        stallName: 'Allauddin\'s Briyani',
        calories: 380,
        protein: 38,
        carbs: 22,
        fat: 16,
        saturatedFat: 4,
        sodium: 620,
        fiber: 4,
        sugar: 6,
        healthBenefits: ['Very high protein', 'Grilled not fried', 'Vegetable-rich'],
        conditionFriendly: ['diabetes', 'obesity'],
        alternativeTo: 'Briyani'
      }
    ]
  },
  {
    id: 'east-coast-lagoon',
    name: 'East Coast Lagoon Food Village',
    latitude: 1.3008,
    longitude: 103.9145,
    address: '1220 East Coast Parkway, Singapore 468960',
    healthierOptions: [
      {
        dishName: 'BBQ Stingray (Small)',
        stallName: 'BBQ Seafood',
        calories: 340,
        protein: 32,
        carbs: 8,
        fat: 20,
        saturatedFat: 5,
        sodium: 580,
        fiber: 2,
        sugar: 4,
        healthBenefits: ['High protein', 'Omega-3 rich', 'Grilled seafood'],
        conditionFriendly: ['diabetes', 'obesity'],
        alternativeTo: 'Fried Seafood'
      },
      {
        dishName: 'Satay (Chicken, 10 sticks)',
        stallName: 'Haron Satay',
        calories: 420,
        protein: 35,
        carbs: 18,
        fat: 24,
        saturatedFat: 8,
        sodium: 680,
        fiber: 2,
        sugar: 8,
        healthBenefits: ['High protein', 'Grilled meat', 'Skip peanut sauce'],
        conditionFriendly: ['diabetes'],
        alternativeTo: 'Fried Chicken Wings'
      }
    ]
  }
]
