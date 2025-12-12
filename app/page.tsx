'use client';

import { useState } from 'react';
import TurkeyMapWrapper from '@/components/TurkeyMapWrapper';
import ProvinceCard from '@/components/ProvinceCard';
import { Province } from '@/lib/types';

export default function Home() {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const handleHover = (province: Province | null) => {
    if (!selectedProvince) {
      setHoveredProvince(province?.name || null);
    }
  };

  const handleClick = (province: Province) => {
    setSelectedProvince(province.name);
    setHoveredProvince(null);
  };

  const handleClose = () => {
    setSelectedProvince(null);
  };

  const displayProvince = selectedProvince || hoveredProvince;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            AreScore
          </h1>
          <p className="text-gray-600">
            Türkiye İnteraktif Harita - İl Bilgileri ve Hava Durumu
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">
          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[600px] flex items-center justify-center">
            <TurkeyMapWrapper
              onHover={handleHover}
              onClick={handleClick}
              selectedProvince={selectedProvince || undefined}
            />
          </div>

          {/* Info Section */}
          <div className="sticky top-8">
            {displayProvince ? (
              <ProvinceCard
                provinceName={displayProvince}
                onClose={selectedProvince ? handleClose : undefined}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-xl p-6 h-fit">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Hoş Geldiniz! 👋
                </h3>
                <p className="text-gray-600 text-sm">
                  Harita üzerindeki bir ilin üzerine gelerek bilgilerini görüntüleyin.
                  Tıklayarak kartı sabit tutabilirsiniz.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>
            Veriler:{' '}
            <a
              href="https://api.turkiyeapi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              TürkiyeAPI
            </a>
            {' & '}
            <a
              href="https://openweathermap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              OpenWeather
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
