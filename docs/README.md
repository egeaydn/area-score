# AreScore - Türkiye İnteraktif Harita Projesi

## 🎯 Proje Özeti

AreScore, Türkiye haritası üzerinde interaktif olarak illerin bilgilerini ve anlık hava durumunu gösteren minimal ve hızlı bir web uygulamasıdır.

### Temel Özellikler

- 🗺️ **İnteraktif Türkiye Haritası**: Hover ve click ile il seçimi
- 📊 **Statik İl Bilgileri**: TürkiyeAPI ile nüfus, ilçe sayısı vb.
- 🌤️ **Anlık Hava Durumu**: OpenWeather API ile gerçek zamanlı hava verileri
- ⚡ **Performans Odaklı**: Cache stratejisi ile hızlı veri erişimi
- 🎨 **Modern UI**: Tailwind CSS ve Framer Motion ile şık animasyonlar

### Teknik Kısıtlamalar

- ❌ **Veritabanı Yok**: Tüm veriler API'lerden client-side çekilir
- ❌ **Authentication Yok**: Public, açık erişimli uygulama
- ✅ **Stateless**: Her oturum bağımsız

## 🚀 Hızlı Başlangıç

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev

# Production build
npm run build
```

## 📁 Dokümantasyon

- [Tech Stack](./tech-stack.md) - Kullanılan teknolojiler ve kütüphaneler
- [Architecture](./architecture.md) - Mimari ve veri akışı
- [Setup Steps](./setup-steps.md) - Detaylı kurulum adımları
- [Implementation Plan](./implementation-plan.md) - Geliştirme planı
- [Code Examples](./code-examples.md) - Örnek kod parçaları

## 🌐 API'ler

### TürkiyeAPI
- Endpoint: `https://api.turkiyeapi.dev/v1/provinces?name={city}`
- Kullanım: İl bilgileri (nüfus, ilçeler, posta kodu vb.)
- Rate Limit: Yok
- Cache: 1 saat+ (nadiren değişir)

### OpenWeather API
- Endpoint: `https://api.openweathermap.org/data/2.5/weather`
- Kullanım: Anlık hava durumu
- Rate Limit: Var (proxy ile korunuyor)
- Cache: 5-10 dakika

## 🎨 UI/UX Prensipleri

- **Minimal**: Gereksiz element yok, sadece gerekli bilgi
- **Hızlı**: Loading state'ler kısa, instant feedback
- **Responsive**: Mobile-first tasarım
- **Accessible**: Keyboard navigation, screen reader friendly

## 📝 Lisans

MIT
