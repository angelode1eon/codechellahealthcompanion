import { SingaporeanDish } from '../types/food'

// HPB-referenced nutritional data for common Singaporean dishes
export const singaporeanDishes: SingaporeanDish[] = [
  {
    name: 'Chicken Rice',
    keywords: ['chicken', 'rice', 'poultry', 'roast', 'steamed'],
    calories: 607,
    protein: 25,
    carbs: 85,
    fat: 15,
    sodium: 820,
    fiber: 2,
    sugar: 3,
    servingSize: '1 plate (400g)'
  },
  {
    name: 'Laksa',
    keywords: ['noodle', 'soup', 'curry', 'coconut', 'seafood', 'shrimp', 'prawn'],
    calories: 569,
    protein: 20,
    carbs: 65,
    fat: 25,
    sodium: 1580,
    fiber: 4,
    sugar: 8,
    servingSize: '1 bowl (550g)'
  },
  {
    name: 'Nasi Lemak',
    keywords: ['rice', 'coconut', 'egg', 'peanut', 'anchovy', 'sambal'],
    calories: 644,
    protein: 15,
    carbs: 78,
    fat: 30,
    sodium: 920,
    fiber: 3,
    sugar: 5,
    servingSize: '1 plate (350g)'
  },
  {
    name: 'Bak Kut Teh',
    keywords: ['pork', 'soup', 'rib', 'meat', 'broth', 'bone'],
    calories: 385,
    protein: 35,
    carbs: 12,
    fat: 22,
    sodium: 1450,
    fiber: 1,
    sugar: 2,
    servingSize: '1 bowl (450g)'
  },
  {
    name: 'Char Kway Teow',
    keywords: ['noodle', 'fried', 'seafood', 'shrimp', 'cockle', 'egg'],
    calories: 744,
    protein: 22,
    carbs: 92,
    fat: 32,
    sodium: 1680,
    fiber: 3,
    sugar: 6,
    servingSize: '1 plate (400g)'
  },
  {
    name: 'Hokkien Mee',
    keywords: ['noodle', 'prawn', 'seafood', 'fried', 'egg'],
    calories: 632,
    protein: 28,
    carbs: 75,
    fat: 26,
    sodium: 1520,
    fiber: 4,
    sugar: 5,
    servingSize: '1 plate (450g)'
  },
  {
    name: 'Satay',
    keywords: ['meat', 'skewer', 'chicken', 'beef', 'pork', 'grilled', 'barbecue'],
    calories: 450,
    protein: 32,
    carbs: 18,
    fat: 28,
    sodium: 680,
    fiber: 2,
    sugar: 12,
    servingSize: '10 sticks (200g)'
  },
  {
    name: 'Roti Prata',
    keywords: ['bread', 'flatbread', 'pancake', 'dough', 'pastry'],
    calories: 343,
    protein: 8,
    carbs: 48,
    fat: 14,
    sodium: 520,
    fiber: 2,
    sugar: 4,
    servingSize: '1 piece (120g)'
  },
  {
    name: 'Chilli Crab',
    keywords: ['crab', 'seafood', 'shellfish', 'sauce', 'chili'],
    calories: 512,
    protein: 38,
    carbs: 22,
    fat: 30,
    sodium: 1820,
    fiber: 2,
    sugar: 15,
    servingSize: '1 serving (300g)'
  },
  {
    name: 'Mee Goreng',
    keywords: ['noodle', 'fried', 'egg', 'tomato', 'potato'],
    calories: 558,
    protein: 18,
    carbs: 72,
    fat: 22,
    sodium: 1340,
    fiber: 5,
    sugar: 8,
    servingSize: '1 plate (400g)'
  },
  {
    name: 'Fish Head Curry',
    keywords: ['fish', 'curry', 'head', 'soup', 'vegetable'],
    calories: 420,
    protein: 32,
    carbs: 28,
    fat: 20,
    sodium: 1280,
    fiber: 4,
    sugar: 6,
    servingSize: '1 serving (400g)'
  },
  {
    name: 'Bak Chor Mee',
    keywords: ['noodle', 'minced', 'pork', 'meat', 'dumpling'],
    calories: 478,
    protein: 24,
    carbs: 62,
    fat: 16,
    sodium: 1420,
    fiber: 3,
    sugar: 4,
    servingSize: '1 bowl (350g)'
  },
  {
    name: 'Wonton Mee',
    keywords: ['noodle', 'wonton', 'dumpling', 'char siew', 'pork'],
    calories: 495,
    protein: 22,
    carbs: 68,
    fat: 15,
    sodium: 1380,
    fiber: 3,
    sugar: 5,
    servingSize: '1 bowl (350g)'
  },
  {
    name: 'Carrot Cake (Chai Tow Kway)',
    keywords: ['radish', 'cake', 'fried', 'egg', 'white', 'black'],
    calories: 387,
    protein: 12,
    carbs: 52,
    fat: 16,
    sodium: 980,
    fiber: 2,
    sugar: 3,
    servingSize: '1 plate (250g)'
  },
  {
    name: 'Kaya Toast',
    keywords: ['toast', 'bread', 'kaya', 'coconut', 'jam', 'egg'],
    calories: 342,
    protein: 10,
    carbs: 42,
    fat: 16,
    sodium: 420,
    fiber: 1,
    sugar: 18,
    servingSize: '2 slices with eggs (150g)'
  }
]

export const matchSingaporeanDish = (predictions: string[]): SingaporeanDish | null => {
  const predictionText = predictions.join(' ').toLowerCase()
  
  for (const dish of singaporeanDishes) {
    const matchCount = dish.keywords.filter(keyword => 
      predictionText.includes(keyword.toLowerCase())
    ).length
    
    if (matchCount >= 2) {
      return dish
    }
  }
  
  for (const dish of singaporeanDishes) {
    const hasMatch = dish.keywords.some(keyword => 
      predictionText.includes(keyword.toLowerCase())
    )
    
    if (hasMatch) {
      return dish
    }
  }
  
  return null
}
