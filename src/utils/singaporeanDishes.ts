import { SingaporeanDish } from '../types/food'

// HPB-referenced nutritional data for common Singaporean dishes
export const singaporeanDishes: SingaporeanDish[] = [
  {
    name: 'Chicken Rice',
    keywords: ['chicken', 'rice', 'poultry', 'roast', 'steamed', 'hainanese'],
    genericMappings: ['rice dish', 'chicken dish', 'poultry dish', 'steamed chicken', 'roasted chicken'],
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
    keywords: ['noodle', 'soup', 'curry', 'coconut', 'seafood', 'shrimp', 'prawn', 'spicy'],
    genericMappings: ['noodle soup', 'curry soup', 'seafood noodles', 'spicy soup', 'coconut soup'],
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
    keywords: ['rice', 'coconut', 'egg', 'peanut', 'anchovy', 'sambal', 'fried'],
    genericMappings: ['rice dish', 'coconut rice', 'fried rice', 'rice with egg', 'rice plate'],
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
    keywords: ['pork', 'soup', 'rib', 'meat', 'broth', 'bone', 'herbal'],
    genericMappings: ['pork soup', 'meat soup', 'rib soup', 'bone broth', 'herbal soup'],
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
    keywords: ['noodle', 'fried', 'seafood', 'shrimp', 'cockle', 'egg', 'flat noodles'],
    genericMappings: ['fried noodles', 'stir fried noodles', 'seafood noodles', 'flat noodles', 'wok noodles'],
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
    name: 'Wanton Mee',
    keywords: ['noodle', 'wonton', 'dumpling', 'char siew', 'pork', 'egg noodles'],
    genericMappings: ['noodle dish', 'dumpling noodles', 'wonton noodles', 'egg noodles', 'pork noodles'],
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
    name: 'Roti Prata',
    keywords: ['bread', 'flatbread', 'pancake', 'dough', 'pastry', 'indian'],
    genericMappings: ['flatbread', 'pancake', 'bread', 'indian bread', 'fried bread'],
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
    name: 'Fish Soup',
    keywords: ['fish', 'soup', 'seafood', 'broth', 'clear soup', 'sliced fish'],
    genericMappings: ['fish soup', 'seafood soup', 'clear soup', 'fish broth', 'fish dish'],
    calories: 280,
    protein: 28,
    carbs: 18,
    fat: 10,
    sodium: 980,
    fiber: 2,
    sugar: 3,
    servingSize: '1 bowl (400g)'
  },
  {
    name: 'Hokkien Mee',
    keywords: ['noodle', 'prawn', 'seafood', 'fried', 'egg', 'thick noodles'],
    genericMappings: ['fried noodles', 'seafood noodles', 'prawn noodles', 'thick noodles', 'stir fried noodles'],
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
    name: 'Mee Rebus',
    keywords: ['noodle', 'gravy', 'yellow noodles', 'potato', 'egg', 'sweet'],
    genericMappings: ['noodle soup', 'gravy noodles', 'yellow noodles', 'sweet noodles', 'noodle dish'],
    calories: 498,
    protein: 18,
    carbs: 72,
    fat: 16,
    sodium: 1240,
    fiber: 4,
    sugar: 12,
    servingSize: '1 bowl (400g)'
  },
  {
    name: 'Mee Siam',
    keywords: ['noodle', 'spicy', 'sour', 'vermicelli', 'tamarind', 'thin noodles'],
    genericMappings: ['noodle soup', 'spicy noodles', 'sour noodles', 'vermicelli', 'thin noodles'],
    calories: 452,
    protein: 16,
    carbs: 68,
    fat: 14,
    sodium: 1180,
    fiber: 3,
    sugar: 8,
    servingSize: '1 bowl (350g)'
  },
  {
    name: 'Nasi Goreng',
    keywords: ['rice', 'fried', 'egg', 'chicken', 'shrimp', 'malay'],
    genericMappings: ['fried rice', 'rice dish', 'rice with egg', 'chicken rice', 'shrimp rice'],
    calories: 568,
    protein: 20,
    carbs: 78,
    fat: 20,
    sodium: 1320,
    fiber: 3,
    sugar: 6,
    servingSize: '1 plate (400g)'
  },
  {
    name: 'Carrot Cake (Chai Tow Kway)',
    keywords: ['radish', 'cake', 'fried', 'egg', 'white', 'black', 'turnip'],
    genericMappings: ['radish cake', 'turnip cake', 'fried cake', 'egg dish', 'savory cake'],
    calories: 387,
    protein: 12,
    carbs: 52,
    fat: 16,
    sodium: 980,
    fiber: 2,
    sugar: 3,
    servingSize: '1 plate (250g)'
  }
]

export interface EnhancedPrediction {
  originalPrediction: string
  enhancedDish: SingaporeanDish | null
  confidence: number
  mappingReason: 'keyword_match' | 'generic_mapping' | 'no_match'
}

export const enhancePrediction = (predictions: Array<{ className: string; probability: number }>): EnhancedPrediction => {
  const topPrediction = predictions[0]
  const predictionText = predictions.map(p => p.className).join(' ').toLowerCase()
  
  // Step 1: Try keyword matching (highest priority)
  for (const dish of singaporeanDishes) {
    const matchCount = dish.keywords.filter(keyword => 
      predictionText.includes(keyword.toLowerCase())
    ).length
    
    if (matchCount >= 2) {
      return {
        originalPrediction: topPrediction.className,
        enhancedDish: dish,
        confidence: Math.min(topPrediction.probability * 1.2, 1.0), // Boost confidence for strong matches
        mappingReason: 'keyword_match'
      }
    }
  }
  
  // Step 2: Try generic mapping
  for (const dish of singaporeanDishes) {
    const hasGenericMatch = dish.genericMappings.some(mapping => 
      predictionText.includes(mapping.toLowerCase())
    )
    
    if (hasGenericMatch) {
      return {
        originalPrediction: topPrediction.className,
        enhancedDish: dish,
        confidence: topPrediction.probability * 0.9, // Slightly lower confidence for generic matches
        mappingReason: 'generic_mapping'
      }
    }
  }
  
  // Step 3: Try single keyword match (lower priority)
  for (const dish of singaporeanDishes) {
    const hasMatch = dish.keywords.some(keyword => 
      predictionText.includes(keyword.toLowerCase())
    )
    
    if (hasMatch) {
      return {
        originalPrediction: topPrediction.className,
        enhancedDish: dish,
        confidence: topPrediction.probability * 0.8, // Lower confidence for weak matches
        mappingReason: 'keyword_match'
      }
    }
  }
  
  // Step 4: No match found
  return {
    originalPrediction: topPrediction.className,
    enhancedDish: null,
    confidence: topPrediction.probability,
    mappingReason: 'no_match'
  }
}

export const getDishByName = (name: string): SingaporeanDish | null => {
  return singaporeanDishes.find(dish => 
    dish.name.toLowerCase() === name.toLowerCase()
  ) || null
}

export const getAllDishNames = (): string[] => {
  return singaporeanDishes.map(dish => dish.name).sort()
}
