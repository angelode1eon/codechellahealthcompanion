# Health Companion 🍜

A Singapore-focused health tracking app with AI-powered food recognition using Clarifai Food Model API.

## Features

- 📸 **AI Food Recognition**: Upload photos and get instant food identification using Clarifai's advanced food model
- 🇸🇬 **Singapore-First**: Specialized recognition for local dishes like Chicken Rice, Laksa, Nasi Lemak, and more
- 📊 **Nutrition Tracking**: Detailed nutritional information based on HPB (Health Promotion Board) data
- 🎮 **Gamification**: Earn health points (0-100) for every meal with 7 badge tiers
- 📈 **Insights**: Track your progress with beautiful charts and monthly Health Wrapped summaries
- 🤖 **Buddy Ah Chatbot**: Your friendly Singlish-speaking health companion
- 🔒 **Secure**: Encrypted localStorage for data privacy

## Setup

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Configure Clarifai API**
   - Get your Personal Access Token (PAT) from [Clarifai Settings](https://clarifai.com/settings/security)
   - Copy `.env.example` to `.env`
   - Add your Clarifai PAT:
     ```
     VITE_CLARIFAI_PAT=your_personal_access_token_here
     ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## How It Works

### Food Recognition Flow

1. **Upload Photo**: User takes or uploads a food photo
2. **Clarifai API**: Image is sent to Clarifai Food Model API
3. **Prediction**: API returns top food prediction with confidence score
4. **Enhancement**: Local layer maps predictions to Singaporean dishes when possible
5. **Display**: Shows food name, confidence score, and nutritional information
6. **User Correction**: Users can correct predictions to improve accuracy

### Confidence Threshold

- Minimum 50% confidence required to identify food
- Below threshold shows "Unknown dish"
- Users can manually select correct dish from database

### Singaporean Dish Mapping

The app includes a local enhancement layer that maps generic predictions to specific Singaporean dishes:

- **Keyword Matching**: Direct matches (e.g., "chicken rice" → "Chicken Rice")
- **Generic Mapping**: Maps similar foods (e.g., "rice" → "Chicken Rice")
- **User Corrections**: Learns from user feedback

### Supported Local Dishes

- Chicken Rice
- Laksa
- Nasi Lemak
- Char Kway Teow
- Hokkien Mee
- Roti Prata
- Satay
- Bak Kut Teh
- Chilli Crab
- Hainanese Curry Rice
- Mee Goreng
- Carrot Cake
- Popiah

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS (Memphis Design theme)
- **AI**: Clarifai Food Model API
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Security**: crypto-js for encryption

## API Configuration

### Clarifai Settings

Default configuration (can be customized in `.env`):

```
VITE_CLARIFAI_USER_ID=clarifai
VITE_CLARIFAI_APP_ID=main
VITE_CLARIFAI_MODEL_ID=food-item-recognition
```

### Error Handling

The app gracefully handles:
- Missing API key
- Network failures
- API rate limits
- Low confidence predictions
- Unknown food items

## Development

### Project Structure

```
src/
├── components/        # React components
├── hooks/            # Custom React hooks
├── services/         # API services (Clarifai)
├── utils/            # Utility functions
├── types/            # TypeScript types
└── pages/            # Page components
```

### Key Files

- `src/services/clarifaiService.ts` - Clarifai API integration
- `src/hooks/useFoodRecognition.ts` - Food recognition hook
- `src/utils/singaporeanDishes.ts` - Local dish database
- `src/components/FoodResult.tsx` - Results display with correction UI

## Contributing

Contributions welcome! Please ensure:
- TypeScript types are properly defined
- Error handling is comprehensive
- UI follows Memphis Design theme
- Singapore-first approach is maintained

## License

MIT

## Credits

- Powered by [Clarifai](https://clarifai.com) Food Model API
- Nutrition data from Singapore Health Promotion Board (HPB)
- Design inspired by Memphis Design movement
