// Weather Widget Component
'use client';

import { useWeather } from '@/hooks/useWeather';
import { WeatherWidgetProps } from '@/lib/types';
import LoadingSpinner from './LoadingSpinner';

export default function WeatherWidget({ city }: WeatherWidgetProps) {
  const { data, error, isLoading } = useWeather(city);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-sm text-red-500 p-4 bg-red-50 rounded-lg">
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
      <h3 className="text-sm font-medium text-gray-600 mb-3">
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
          <p>Rüzgar: {Math.round(data.wind.speed)} m/s</p>
        </div>
      </div>
    </div>
  );
}
