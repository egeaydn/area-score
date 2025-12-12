# Tech Stack

## Core Framework

### Next.js 15+
- **Neden**: React framework, SSR/SSG, API routes, optimize edilmiş production build
- **Kullanım**: 
  - App router ile modern Next.js yapısı
  - API routes ile OpenWeather proxy
  - Server ve client component'ler

## Styling

### Tailwind CSS
- **Neden**: Utility-first, hızlı development, küçük bundle size
- **Kullanım**:
  - Custom color palette (slate base, teal/cyan/indigo accent)
  - Responsive design utilities
  - Dark mode support (isteğe bağlı)

## State Management & Data Fetching

### SWR (Stale-While-Revalidate)
- **Neden**: 
  - Otomatik cache ve revalidation
  - Dedupe requests
  - Focus revalidation
  - Minimal setup
- **Alternatif**: React Query (daha fazla feature)
- **Kullanım**:
  - Province data fetching
  - Weather data fetching
  - Custom hooks (useProvinceInfo, useWeather)

## Map Component

### turkey-map-react
- **Neden**: 
  - Hazır Türkiye haritası component'i
  - Event handling (hover, click)
  - Renklendirme desteği
  - SVG/GeoJSON ile uğraşmaya gerek yok
- **Features**:
  - `onProvinceHover`: İl üzerine hover event'i
  - `onProvinceClick`: İl click event'i
  - `colors`: Bölge/il bazlı renklendirme
  - `enableTooltips`: Tooltip kontrolü

## Animation

### Framer Motion
- **Neden**: 
  - React-friendly animation library
  - Gesture support
  - Layout animations
  - Exit animations
- **Alternatif**: CSS transitions (daha lightweight)
- **Kullanım**:
  - ProvinceCard slide-in animasyonu
  - Fade transitions
  - Loading skeletons

## External APIs

### TürkiyeAPI
- **URL**: `https://api.turkiyeapi.dev/v1/provinces`
- **Data**: İl bilgileri (nüfus, ilçeler, posta kodu, telefon kodu)
- **Free**: Evet
- **Rate Limit**: Yok
- **Response Format**: JSON

### OpenWeather API
- **URL**: `https://api.openweathermap.org/data/2.5/weather`
- **Data**: Hava durumu (sıcaklık, nem, rüzgar, açıklama)
- **Free Plan**: 60 calls/minute, 1M calls/month
- **Authentication**: API Key gerekli
- **Response Format**: JSON

## Development Tools

### TypeScript
- Type safety
- Better IDE support
- Catch errors early

### ESLint
- Code quality
- Consistent style
- Best practices

## Environment Variables

```env
# .env.local
OPENWEATHER_KEY=your_api_key_here
NEXT_PUBLIC_TURKIYEAPI_URL=https://api.turkiyeapi.dev/v1
```

## Package.json Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "turkey-map-react": "^latest",
    "swr": "^2.0.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```
