import { SingaporeanDish } from '../types/food'

// Signature ingredient combinations for high-confidence matching
export const SIGNATURE_COMBINATIONS: Record<string, string[][]> = {
  'Chicken Rice': [
    ['chicken', 'rice', 'ginger'],
    ['chicken', 'rice', 'chili'],
    ['roasted', 'chicken', 'rice']
  ],
  'Laksa': [
    ['coconut', 'curry', 'noodle'],
    ['laksa', 'spicy', 'soup'],
    ['coconut', 'milk', 'seafood']
  ],
  'Nasi Lemak': [
    ['sambal', 'anchovies', 'rice'],
    ['coconut', 'rice', 'peanut'],
    ['nasi', 'lemak', 'egg']
  ],
  'Bak Kut Teh': [
    ['pork', 'rib', 'herbal'],
    ['bak', 'kut', 'teh'],
    ['pork', 'bone', 'soup']
  ],
  'Char Kway Teow': [
    ['flat', 'noodle', 'wok'],
    ['char', 'kway', 'teow'],
    ['cockle', 'noodle', 'dark']
  ],
  'Wanton Mee': [
    ['wonton', 'noodle', 'dumpling'],
    ['char', 'siew', 'noodle'],
    ['wanton', 'mee', 'pork']
  ],
  'Roti Prata': [
    ['roti', 'prata', 'flatbread'],
    ['indian', 'pancake', 'crispy'],
    ['prata', 'curry', 'dip']
  ],
  'Fish Soup': [
    ['fish', 'soup', 'clear'],
    ['sliced', 'fish', 'broth'],
    ['fish', 'tomato', 'soup']
  ],
  'Hokkien Mee': [
    ['hokkien', 'mee', 'prawn'],
    ['thick', 'noodle', 'seafood'],
    ['prawn', 'noodle', 'dark']
  ],
  'Mee Rebus': [
    ['mee', 'rebus', 'gravy'],
    ['yellow', 'noodle', 'sweet'],
    ['potato', 'gravy', 'noodle']
  ],
  'Mee Siam': [
    ['mee', 'siam', 'spicy'],
    ['vermicelli', 'tamarind', 'sour'],
    ['thin', 'noodle', 'spicy']
  ],
  'Nasi Goreng': [
    ['nasi', 'goreng', 'fried'],
    ['fried', 'rice', 'malay'],
    ['rice', 'egg', 'shrimp']
  ],
  'Carrot Cake': [
    ['chai', 'tow', 'kway'],
    ['radish', 'cake', 'fried'],
    ['carrot', 'cake', 'white']
  ]
}

// Local Singaporean dishes with accurate nutrition data
// This is the ONLY source of nutrition data in the app
export const singaporeanDishes: SingaporeanDish[] = [
  {
    name: 'Chicken Rice',
    keywords: [
      'chicken', 'rice', 'poultry', 'roast', 'steamed', 'hainanese',
      'chiken', 'chix', 'ayam', 'ginger', 'chili', 'soy', 'sesame',
      'white rice', 'fragrant rice', 'oily rice', 'roasted chicken',
      'steamed chicken', 'boiled chicken', 'chicken thigh', 'chicken breast'
    ],
    genericMappings: [
      'rice dish', 'chicken dish', 'poultry dish', 'steamed chicken',
      'roasted chicken', 'grilled chicken', 'rice plate', 'meat and rice',
      'asian rice', 'white rice', 'cooked chicken', 'chicken meat'
    ],
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
    keywords: [
      'noodle', 'soup', 'curry', 'coconut', 'seafood', 'shrimp', 'prawn',
      'spicy', 'laksa', 'lemak', 'gravy', 'vermicelli', 'thick noodle',
      'cockle', 'fish cake', 'tofu puff', 'bean sprout', 'laksa leaf',
      'curry soup', 'coconut milk', 'spicy soup', 'yellow noodle'
    ],
    genericMappings: [
      'noodle soup', 'curry soup', 'seafood noodles', 'spicy soup',
      'coconut soup', 'asian noodles', 'soup bowl', 'curry noodles',
      'thick soup', 'creamy soup', 'noodle dish', 'seafood soup'
    ],
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
    keywords: [
      'rice', 'coconut', 'egg', 'peanut', 'anchovy', 'sambal', 'fried',
      'nasi', 'lemak', 'ikan bilis', 'groundnut', 'cucumber', 'fried egg',
      'coconut rice', 'fragrant rice', 'spicy sauce', 'chili paste',
      'fried chicken', 'chicken wing', 'rendang', 'otah', 'luncheon meat'
    ],
    genericMappings: [
      'rice dish', 'coconut rice', 'fried rice', 'rice with egg',
      'rice plate', 'asian rice', 'rice meal', 'rice and egg',
      'breakfast rice', 'fragrant rice', 'spicy rice', 'rice with sauce'
    ],
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
    keywords: [
      'pork', 'soup', 'rib', 'meat', 'broth', 'bone', 'herbal',
      'bak', 'kut', 'teh', 'pork rib', 'spare rib', 'chinese herbs',
      'garlic', 'pepper', 'dark soy', 'meat soup', 'pork soup',
      'herbal soup', 'bone soup', 'chinese soup', 'medicinal soup'
    ],
    genericMappings: [
      'pork soup', 'meat soup', 'rib soup', 'bone broth', 'herbal soup',
      'chinese soup', 'clear soup', 'meat broth', 'pork broth',
      'soup bowl', 'asian soup', 'pork dish', 'meat dish'
    ],
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
    keywords: [
      'noodle', 'fried', 'seafood', 'shrimp', 'cockle', 'egg', 'flat noodles',
      'char', 'kway', 'teow', 'ckt', 'wok', 'dark sauce', 'soy sauce',
      'fish cake', 'bean sprout', 'chives', 'lard', 'chinese sausage',
      'stir fry', 'fried noodle', 'flat rice noodle', 'wide noodle'
    ],
    genericMappings: [
      'fried noodles', 'stir fried noodles', 'seafood noodles',
      'flat noodles', 'wok noodles', 'asian noodles', 'rice noodles',
      'noodle dish', 'fried rice noodles', 'stir fry', 'wok dish'
    ],
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
    keywords: [
      'noodle', 'wonton', 'dumpling', 'char siew', 'pork', 'egg noodles',
      'wanton', 'mee', 'wan tan', 'bbq pork', 'roast pork', 'red pork',
      'yellow noodle', 'thin noodle', 'soup', 'dry noodle', 'chili sauce',
      'green vegetable', 'bok choy', 'dumpling soup', 'pork dumpling'
    ],
    genericMappings: [
      'noodle dish', 'dumpling noodles', 'wonton noodles', 'egg noodles',
      'pork noodles', 'asian noodles', 'chinese noodles', 'noodle soup',
      'dumpling soup', 'yellow noodles', 'thin noodles', 'noodle bowl'
    ],
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
    keywords: [
      'bread', 'flatbread', 'pancake', 'dough', 'pastry', 'indian',
      'roti', 'prata', 'paratha', 'roti canai', 'crispy', 'flaky',
      'plain prata', 'egg prata', 'cheese prata', 'banana prata',
      'curry', 'dhal', 'sugar', 'condensed milk', 'fried bread'
    ],
    genericMappings: [
      'flatbread', 'pancake', 'bread', 'indian bread', 'fried bread',
      'pastry', 'dough', 'crispy bread', 'layered bread', 'flat pancake',
      'fried pancake', 'asian bread', 'breakfast bread'
    ],
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
    keywords: [
      'fish', 'soup', 'seafood', 'broth', 'clear soup', 'sliced fish',
      'fish slice', 'white fish', 'batang', 'snapper', 'grouper',
      'tomato', 'cabbage', 'lettuce', 'ginger', 'evaporated milk',
      'fish head', 'fish fillet', 'fish soup bee hoon', 'fish ball',
      'clear broth', 'light soup', 'healthy soup', 'white soup'
    ],
    genericMappings: [
      'fish soup', 'seafood soup', 'clear soup', 'fish broth', 'fish dish',
      'soup bowl', 'light soup', 'white soup', 'asian soup', 'fish meal',
      'seafood broth', 'fish and vegetables', 'healthy soup'
    ],
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
    keywords: [
      'noodle', 'prawn', 'seafood', 'fried', 'egg', 'thick noodles',
      'hokkien', 'mee', 'yellow noodle', 'white noodle', 'bee hoon',
      'squid', 'pork belly', 'bean sprout', 'lime', 'sambal',
      'dark sauce', 'prawn stock', 'fried noodle', 'wet noodle',
      'stir fry', 'wok noodle', 'mixed noodle', 'seafood noodle'
    ],
    genericMappings: [
      'fried noodles', 'seafood noodles', 'prawn noodles', 'thick noodles',
      'stir fried noodles', 'asian noodles', 'mixed noodles', 'wok noodles',
      'yellow noodles', 'noodle dish', 'seafood stir fry', 'noodle plate'
    ],
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
    keywords: [
      'noodle', 'gravy', 'yellow noodles', 'potato', 'egg', 'sweet',
      'mee', 'rebus', 'thick gravy', 'sweet potato', 'boiled egg',
      'fried shallot', 'green chili', 'lime', 'bean sprout', 'tofu',
      'sweet sauce', 'brown gravy', 'malay noodle', 'yellow mee'
    ],
    genericMappings: [
      'noodle soup', 'gravy noodles', 'yellow noodles', 'sweet noodles',
      'noodle dish', 'thick soup', 'noodle with sauce', 'asian noodles',
      'malay noodles', 'noodle bowl', 'saucy noodles', 'brown sauce'
    ],
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
    keywords: [
      'noodle', 'spicy', 'sour', 'vermicelli', 'tamarind', 'thin noodles',
      'mee', 'siam', 'rice vermicelli', 'bee hoon', 'tau pok', 'tofu',
      'bean sprout', 'chives', 'lime', 'dried shrimp', 'egg',
      'spicy noodle', 'sour noodle', 'tangy', 'red gravy', 'thin rice noodle'
    ],
    genericMappings: [
      'noodle soup', 'spicy noodles', 'sour noodles', 'vermicelli',
      'thin noodles', 'rice noodles', 'asian noodles', 'noodle dish',
      'spicy soup', 'tangy noodles', 'red noodles', 'noodle bowl'
    ],
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
    keywords: [
      'rice', 'fried', 'egg', 'chicken', 'shrimp', 'malay',
      'nasi', 'goreng', 'fried rice', 'fried egg', 'sunny side up',
      'prawn', 'chicken piece', 'sambal', 'chili', 'cucumber',
      'malay fried rice', 'spicy rice', 'dark rice', 'wok rice'
    ],
    genericMappings: [
      'fried rice', 'rice dish', 'rice with egg', 'chicken rice',
      'shrimp rice', 'asian rice', 'rice plate', 'rice meal',
      'wok rice', 'stir fried rice', 'rice and egg', 'malay rice'
    ],
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
    name: 'Carrot Cake',
    keywords: [
      'radish', 'cake', 'fried', 'egg', 'white', 'black', 'turnip',
      'chai', 'tow', 'kway', 'cai', 'tau', 'carrot cake', 'radish cake',
      'white carrot cake', 'black carrot cake', 'fried radish',
      'preserved radish', 'sweet sauce', 'dark sauce', 'egg dish'
    ],
    genericMappings: [
      'radish cake', 'turnip cake', 'fried cake', 'egg dish', 'savory cake',
      'asian cake', 'fried radish', 'white cake', 'black cake',
      'breakfast dish', 'fried food', 'egg and radish', 'savory dish'
    ],
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
  mappingReason: 'signature_match' | 'keyword_match' | 'generic_mapping' | 'no_match'
  matchDetails?: {
    keywordMatches: number
    signatureMatch: boolean
    genericMatch: boolean
    weightedScore: number
  }
}

// Calculate weighted score for keyword matching
const calculateKeywordScore = (
  predictionText: string,
  keywords: string[],
  signatureCombos: string[][] = []
): { score: number; keywordMatches: number; signatureMatch: boolean } => {
  let score = 0
  let keywordMatches = 0
  let signatureMatch = false

  // Check for signature ingredient combinations (highest weight)
  for (const combo of signatureCombos) {
    const comboMatches = combo.filter(ingredient =>
      predictionText.includes(ingredient.toLowerCase())
    ).length

    if (comboMatches === combo.length) {
      // All ingredients in signature combo found
      signatureMatch = true
      score += 100 * combo.length // Very high score for complete signature match
      keywordMatches += combo.length
    } else if (comboMatches >= combo.length - 1) {
      // Almost complete signature match
      score += 50 * comboMatches
      keywordMatches += comboMatches
    }
  }

  // Check individual keywords with weighted scoring
  for (const keyword of keywords) {
    if (predictionText.includes(keyword.toLowerCase())) {
      keywordMatches++

      // Weight based on keyword specificity
      if (keyword.length > 8) {
        // Long, specific keywords get higher weight
        score += 15
      } else if (keyword.length > 5) {
        // Medium keywords
        score += 10
      } else {
        // Short, generic keywords
        score += 5
      }

      // Bonus for exact dish name matches
      if (keyword === 'laksa' || keyword === 'prata' || keyword === 'nasi' ||
          keyword === 'char' || keyword === 'hokkien' || keyword === 'mee') {
        score += 20
      }
    }
  }

  return { score, keywordMatches, signatureMatch }
}

// Enhanced prediction function - returns nutrition data from singaporeanDishes.ts
export const enhancePrediction = (
  predictions: Array<{ className: string; probability: number }>
): EnhancedPrediction => {
  const topPrediction = predictions[0]
  const predictionText = predictions
    .map(p => p.className)
    .join(' ')
    .toLowerCase()

  let bestMatch: {
    dish: SingaporeanDish
    score: number
    keywordMatches: number
    signatureMatch: boolean
    genericMatch: boolean
    reason: 'signature_match' | 'keyword_match' | 'generic_mapping'
  } | null = null

  // Step 1: Check all dishes with weighted scoring
  // ALL nutrition data comes from singaporeanDishes array
  for (const dish of singaporeanDishes) {
    const signatureCombos = SIGNATURE_COMBINATIONS[dish.name] || []
    const keywordResult = calculateKeywordScore(
      predictionText,
      dish.keywords,
      signatureCombos
    )

    // Check generic mappings
    const genericMatch = dish.genericMappings.some(mapping =>
      predictionText.includes(mapping.toLowerCase())
    )

    // Calculate total score
    let totalScore = keywordResult.score

    // Boost score for signature matches
    if (keywordResult.signatureMatch) {
      totalScore *= 2
    }

    // Boost score for generic matches with high MobileNet confidence
    if (genericMatch && topPrediction.probability > 0.7) {
      totalScore += 40
    } else if (genericMatch) {
      totalScore += 20
    }

    // Determine match reason
    let reason: 'signature_match' | 'keyword_match' | 'generic_mapping'
    if (keywordResult.signatureMatch) {
      reason = 'signature_match'
    } else if (keywordResult.keywordMatches >= 2) {
      reason = 'keyword_match'
    } else {
      reason = 'generic_mapping'
    }

    // Update best match if this score is higher
    if (totalScore > 0 && (!bestMatch || totalScore > bestMatch.score)) {
      bestMatch = {
        dish,
        score: totalScore,
        keywordMatches: keywordResult.keywordMatches,
        signatureMatch: keywordResult.signatureMatch,
        genericMatch,
        reason
      }
    }
  }

  // Step 2: Return best match if found
  // Nutrition data comes from singaporeanDishes.ts
  if (bestMatch) {
    // Calculate confidence based on score and original prediction probability
    let confidence = topPrediction.probability

    if (bestMatch.signatureMatch) {
      confidence = Math.min(confidence * 1.5, 0.98) // High confidence for signature matches
    } else if (bestMatch.keywordMatches >= 3) {
      confidence = Math.min(confidence * 1.3, 0.95) // Good confidence for multiple keywords
    } else if (bestMatch.genericMatch && topPrediction.probability > 0.7) {
      confidence = Math.min(confidence * 1.2, 0.90) // Decent confidence for strong generic matches
    } else if (bestMatch.keywordMatches >= 2) {
      confidence = Math.min(confidence * 1.1, 0.85) // Moderate confidence
    } else {
      confidence = Math.min(confidence * 0.9, 0.75) // Lower confidence for weak matches
    }

    return {
      originalPrediction: topPrediction.className,
      enhancedDish: bestMatch.dish,
      confidence,
      mappingReason: bestMatch.reason,
      matchDetails: {
        keywordMatches: bestMatch.keywordMatches,
        signatureMatch: bestMatch.signatureMatch,
        genericMatch: bestMatch.genericMatch,
        weightedScore: bestMatch.score
      }
    }
  }

  // Step 3: No match found
  return {
    originalPrediction: topPrediction.className,
    enhancedDish: null,
    confidence: topPrediction.probability,
    mappingReason: 'no_match'
  }
}

// Get dish by name from local database
export const getDishByName = (name: string): SingaporeanDish | null => {
  return (
    singaporeanDishes.find(
      dish => dish.name.toLowerCase() === name.toLowerCase()
    ) || null
  )
}

// Get all dish names from local database
export const getAllDishNames = (): string[] => {
  return singaporeanDishes.map(dish => dish.name).sort()
}
