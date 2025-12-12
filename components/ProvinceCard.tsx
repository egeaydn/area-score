// Province Information Card Component
'use client';

import { motion } from 'framer-motion';
import { useProvinceInfo } from '@/hooks/useProvinceInfo';
import { ProvinceCardProps } from '@/lib/types';
import WeatherWidget from './WeatherWidget';
import LoadingSpinner from './LoadingSpinner';

export default function ProvinceCard({ provinceName, onClose }: ProvinceCardProps) {
  const { data, error, isLoading } = useProvinceInfo(provinceName);

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="bg-white rounded-lg shadow-xl p-6 w-full h-fit"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{provinceName}</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
            aria-label="Kapat"
          >
            ✕
          </button>
        )}
      </div>

      {isLoading && <LoadingSpinner />}

      {error && (
        <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">
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

          <div className="pt-4 border-t border-gray-200">
            <WeatherWidget city={provinceName} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  );
}
