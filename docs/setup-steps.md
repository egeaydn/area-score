# Setup Steps

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenWeather API key (free tier)
- Code editor (VS Code recommended)

## Step 1: Project Initialization

Proje zaten oluşturulmuş durumda. Eğer sıfırdan başlıyor olsaydık:

```bash
npx create-next-app@latest area-score
cd area-score
```

Seçenekler:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ App Router
- ❌ src/ directory (optional)
- ✅ Import alias (@/*)

## Step 2: Install Dependencies

```bash
npm install turkey-map-react swr framer-motion
```

### Dependency Breakdown

| Package | Version | Purpose |
|---------|---------|---------|
| turkey-map-react | latest | İnteraktif Türkiye haritası |
| swr | ^2.0.0 | Data fetching & caching |
| framer-motion | ^11.0.0 | Animasyonlar |

## Step 3: Environment Variables

`.env.local` dosyası oluştur:

```env
# OpenWeather API Key (https://openweathermap.org/api)
OPENWEATHER_KEY=your_api_key_here

# TürkiyeAPI Base URL (optional, public)
NEXT_PUBLIC_TURKIYEAPI_URL=https://api.turkiyeapi.dev/v1
```

### OpenWeather API Key Alma

1. https://openweathermap.org adresine git
2. Sign up / Login
3. API Keys sekmesine git
4. Key oluştur veya mevcut key'i kopyala
5. `.env.local` dosyasına ekle

⚠️ **ÖNEMLİ**: `.env.local` dosyasını `.gitignore`'a ekle (Next.js otomatik ekler)

## Step 4: Tailwind Configuration

`tailwind.config.ts` dosyasını özelleştir:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom color palette
        accent: {
          teal: '#14B8A6',
          cyan: '#06B6D4',
          indigo: '#6366F1',
        }
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-in',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
};

export default config;
```

## Step 5: Project Structure

Aşağıdaki klasör yapısını oluştur:

```
area-score/
├── app/
│   ├── api/
│   │   └── weather/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── TurkeyMapWrapper.tsx
│   ├── ProvinceCard.tsx
│   ├── WeatherWidget.tsx
│   └── LoadingSpinner.tsx
├── hooks/
│   ├── useProvinceInfo.ts
│   └── useWeather.ts
├── lib/
│   ├── types.ts
│   └── constants.ts
├── docs/
│   ├── README.md
│   ├── tech-stack.md
│   ├── architecture.md
│   ├── setup-steps.md
│   ├── implementation-plan.md
│   └── code-examples.md
├── public/
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Step 6: Global Styles

`app/globals.css` içinde base styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: 222.2 84% 4.9%;
      --foreground: 210 40% 98%;
    }
  }

  body {
    @apply bg-background text-foreground;
  }
}

@layer components {
  .card {
    @apply rounded-lg border bg-card text-card-foreground shadow-sm;
  }
}
```

## Step 7: TypeScript Configuration

`tsconfig.json` zaten mevcut olmalı. Kontrol et:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Step 8: Test Run

Development server'ı başlat:

```bash
npm run dev
```

Tarayıcıda aç: http://localhost:3000

## Step 9: Git Setup (Opsiyonel)

```bash
git init
git add .
git commit -m "Initial commit: AreScore project setup"
```

`.gitignore` kontrol:
```
node_modules/
.next/
.env.local
.env*.local
*.log
.vercel
```

## Troubleshooting

### Port 3000 kullanımda
```bash
# Farklı port kullan
npm run dev -- -p 3001
```

### Module not found
```bash
# node_modules'u sil ve tekrar yükle
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Type definitions güncellemeleri
npm install --save-dev @types/react @types/node
```

## Next Steps

✅ Setup tamamlandı! Şimdi implementation'a geçebiliriz:
1. API routes oluşturma
2. Custom hooks yazma
3. Component development
4. Integration & testing
