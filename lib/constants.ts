// Constants for AreScore project

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
  PROVINCE_DATA: 3600000, // 1 hour in milliseconds
  WEATHER_DATA: 600000,   // 10 minutes in milliseconds
} as const;

export const WEATHER_REFRESH_INTERVAL = 300000; // 5 minutes in milliseconds
