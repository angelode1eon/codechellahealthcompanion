# Health Companion 🇸🇬

A Singapore-localized health tracking app with AI-powered food recognition, gamification, and hawker health tips!

## Features

### 🤖 AI Food Recognition
- TensorFlow.js powered image classification
- Custom Singaporean dish recognition (15+ local dishes)
- HPB-referenced nutrition data

### 🏪 Hawker Health Tips
- 10+ popular hawker dishes with healthier alternatives
- Singlish-friendly ordering tips
- Calorie and sodium savings calculator
- Popular hawker center locations

### 🏥 HealthHub Integration
- Connect to Singapore's official health platform
- Access HPB nutrition database
- Healthier Choice Symbol (HCS) recognition
- Verified nutrition data

### 🎮 Gamification
- Points system (0-100 per meal)
- 7-tier badge system
- Streak tracking
- Monthly Health Wrapped

### 📊 Analytics
- Daily intake tracking
- Weekly/monthly trends
- Nutrient improvement tracking
- Health score calculation

## Singapore-Specific Features

### Singlish UI
- "Shiok" success messages
- "Alamak" error messages
- "Lah", "Leh", "Mah" copywriting
- Local context and humor

### Local Food Database
- Chicken Rice, Laksa, Char Kway Teow
- Nasi Lemak, Hokkien Mee, Bak Chor Mee
- Roti Prata, Carrot Cake, Kopi
- And many more!

### Hawker Culture
- Ordering tips in Singlish
- Popular hawker center locations
- "少油" (less oil) suggestions
- Sharing culture tips

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure HealthHub API (optional):
```bash
cp .env.example .env
# Add your HealthHub API key to .env
```

3. Start development server:
```bash
npm run dev
```

## HealthHub API Setup

To get accurate HPB nutrition data:

1. Visit [HealthHub Developer Portal](https://www.healthhub.sg/developer)
2. Sign up for an API key
3. Add the key to your `.env` file
4. Connect through the HealthHub tab in the app

**Note:** The app works with local data if no API key is provided.

## Tech Stack

- React + TypeScript
- Vite
- TailwindCSS
- TensorFlow.js (MobileNet)
- Recharts
- localStorage

## Memphis Design

Bold, colorful, geometric design inspired by 1980s Memphis Group:
- Bright saturated colors
- Geometric patterns
- Playful typography (Baloo 2, Fredoka)
- Fun, engaging UI

## Contributing

Contributions welcome! Please ensure:
- Singapore context is maintained
- Singlish copywriting is authentic
- HPB data accuracy
- Memphis design consistency

## License

MIT

---

Made with ❤️ for Singaporeans by Singaporeans! 🇸🇬
