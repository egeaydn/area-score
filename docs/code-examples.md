# Code Examples

Bu dokümanda projenin temel kod parçaları ve örnekleri bulunur.

## 1. TurkeyMapWrapper Component

```typescript
// components/TurkeyMapWrapper.tsx
'use client';

import React from 'react';
import TurkeyMap from 'turkey-map-react';

interface TurkeyMapWrapperProps {
  onHover: (province: { name: string; plateNumber: number } | null) => void;
  onClick: (province: { name: string; plateNumber: number }) => void;
  selectedProvince?: string;
}

export default function TurkeyMapWrapper({ 
  onHover, 
  onClick, 
  selectedProvince 
}: TurkeyMapWrapperProps) {
  // Bölge renkleri
  const colors = {
    'Marmara': '#60A5FA',
    'Ege': '#FB7185',
    'Akdeniz': '#FBBF24',
    'İç Anadolu': '#A78BFA',
    'Karadeniz': '#34D399',
    'Doğu Anadolu': '#F472B6',
    'Güneydoğu Anadolu': '#FB923C',
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <TurkeyMap
        onProvinceHover={(province) => onHover(province)}
        onProvinceClick={(province) => onClick(province)}
        colors={colors}
        enableTooltips={false}
        style={{ width: '100%', height: 'auto', maxWidth: '1000px' }}
      />
    </div>
  );
}
```

## 2. useProvinceInfo Hook

```typescript
// hooks/useProvinceInfo.ts
import useSWR from 'swr';

interface District {
  name: string;
  population: number;
}

interface ProvinceData {
  name: string;
  population: number;
  areaCode: string;
  districts: District[];
  id: number;
}

const fetcher = async (url: string): Promise<ProvinceData> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch province data');
  const data = await res.json();
  return data.data?.[0] || data; // TürkiyeAPI returns array
};

export function useProvinceInfo(cityName?: string) {
  const url = cityName
    ? `https://api.turkiyeapi.dev/v1/provinces?name=${encodeURIComponent(cityName)}`
    : null;

  const { data, error, isLoading } = useSWR<ProvinceData>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 3600000, // 1 hour
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}
```

## 3. useWeather Hook

```typescript
// hooks/useWeather.ts
import useSWR from 'swr';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

const fetcher = async (url: string): Promise<WeatherData> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch weather data');
  return res.json();
};

export function useWeather(city?: string) {
  const url = city 
    ? `/api/weather?city=${encodeURIComponent(city)}` 
    : null;

  const { data, error, isLoading } = useSWR<WeatherData>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 600000, // 10 minutes
      refreshInterval: 300000,   // Refresh every 5 minutes
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}
```

## 4. Weather API Route (Proxy)

```typescript
// app/api/weather/route.ts
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.OPENWEATHER_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city') || 'Istanbul';

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)},TR&appid=${API_KEY}&units=metric&lang=tr`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Weather data fetch failed' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Set cache headers
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## 5. ProvinceCard Component

```typescript
// components/ProvinceCard.tsx
'use client';

import { motion } from 'framer-motion';
import { useProvinceInfo } from '@/hooks/useProvinceInfo';
import WeatherWidget from './WeatherWidget';
import LoadingSpinner from './LoadingSpinner';

interface ProvinceCardProps {
  provinceName: string;
  onClose?: () => void;
}

export default function ProvinceCard({ provinceName, onClose }: ProvinceCardProps) {
  const { data, error, isLoading } = useProvinceInfo(provinceName);

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{provinceName}</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        )}
      </div>

      {isLoading && <LoadingSpinner />}

      {error && (
        <div className="text-red-500 text-sm">
          Veri yüklenirken hata oluştu.
        </div>
      )}

      {data && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Nüfus" value={data.population.toLocaleString('tr-TR')} />
            <InfoItem label="İlçe Sayısı" value={data.districts.length.toString()} />
            <InfoItem label="Alan Kodu" value={data.areaCode} />
            <InfoItem label="Plaka" value={data.id.toString()} />
          </div>

          <div className="pt-4 border-t">
            <WeatherWidget city={provinceName} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  );
}
```

## 6. WeatherWidget Component

```typescript
// components/WeatherWidget.tsx
'use client';

import { useWeather } from '@/hooks/useWeather';
import LoadingSpinner from './LoadingSpinner';

interface WeatherWidgetProps {
  city: string;
}

export default function WeatherWidget({ city }: WeatherWidgetProps) {
  const { data, error, isLoading } = useWeather(city);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-sm text-red-500">
        Hava durumu yüklenemedi
      </div>
    );
  }

  if (!data) return null;

  const temp = Math.round(data.main.temp);
  const description = data.weather[0]?.description || 'Bilinmiyor';
  const icon = data.weather[0]?.icon;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-600 mb-2">
        Anlık Hava Durumu
      </h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
              className="w-16 h-16"
            />
          )}
          <div>
            <p className="text-3xl font-bold text-gray-800">{temp}°C</p>
            <p className="text-sm text-gray-600 capitalize">{description}</p>
          </div>
        </div>

        <div className="text-right text-sm text-gray-600">
          <p>Nem: {data.main.humidity}%</p>
          <p>Rüzgar: {data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}
```

## 7. LoadingSpinner Component

```typescript
// components/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
    </div>
  );
}
```

## 8. Main Page

```typescript
// app/page.tsx
'use client';

import { useState } from 'react';
import TurkeyMapWrapper from '@/components/TurkeyMapWrapper';
import ProvinceCard from '@/components/ProvinceCard';

export default function Home() {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          AreScore - Türkiye İnteraktif Harita
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <TurkeyMapWrapper
              onHover={(province) => setHoveredProvince(province?.name || null)}
              onClick={(province) => setSelectedProvince(province.name)}
              selectedProvince={selectedProvince || undefined}
            />
          </div>

          {/* Info Section */}
          <div className="lg:col-span-1">
            {(selectedProvince || hoveredProvince) && (
              <ProvinceCard
                provinceName={selectedProvince || hoveredProvince || ''}
                onClose={selectedProvince ? () => setSelectedProvince(null) : undefined}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
```

## 9. Types Definition

```typescript
// lib/types.ts
export interface Province {
  name: string;
  plateNumber: number;
}

export interface ProvinceData {
  id: number;
  name: string;
  population: number;
  areaCode: string;
  districts: District[];
}

export interface District {
  name: string;
  population: number;
}

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}
```

## 10. Constants

```typescript
// lib/constants.ts
export const REGION_COLORS = {
  'Marmara': '#60A5FA',
  'Ege': '#FB7185',
  'Akdeniz': '#FBBF24',
  'İç Anadolu': '#A78BFA',
  'Karadeniz': '#34D399',
  'Doğu Anadolu': '#F472B6',
  'Güneydoğu Anadolu': '#FB923C',
} as const;

export const API_ENDPOINTS = {
  TURKIYE_API: 'https://api.turkiyeapi.dev/v1',
  WEATHER_PROXY: '/api/weather',
} as const;

export const CACHE_DURATIONS = {
  PROVINCE_DATA: 3600000, // 1 hour
  WEATHER_DATA: 600000,   // 10 minutes
} as const;
```

## Usage Tips

### Hover ve Click Farkı
- **Hover**: Geçici bilgi gösterimi, kullanıcı mouse'u çekince kaybolur
- **Click**: Persistent card, kullanıcı manuel kapatana kadar açık kalır

### Error Handling Örneği
```typescript
if (error) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded">
      <p className="text-red-600">Bir hata oluştu</p>
      <button onClick={() => mutate()}>Tekrar Dene</button>
    </div>
  );
}
```

### Performance Optimization
```typescript
// Memoize expensive components
import { memo } from 'react';

const WeatherWidget = memo(({ city }: Props) => {
  // ...
});
```
