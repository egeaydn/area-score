// Custom hook for fetching weather data
import useSWR from 'swr';
import { WeatherData } from '@/lib/types';
import { CACHE_DURATIONS, WEATHER_REFRESH_INTERVAL } from '@/lib/constants';
import { getCityApiName } from '@/lib/cities';

const fetcher = async (url: string): Promise<WeatherData> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch weather data');
  return res.json();
};

export function useWeather(city?: string) {
  // Türkçe karakterleri İngilizce'ye çevir
  const normalizedCity = city ? getCityApiName(city) : null;
  
  const url = normalizedCity 
    ? `/api/weather?city=${encodeURIComponent(normalizedCity)}` 
    : null;

  const { data, error, isLoading } = useSWR<WeatherData>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: CACHE_DURATIONS.WEATHER_DATA,
      refreshInterval: WEATHER_REFRESH_INTERVAL,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}
