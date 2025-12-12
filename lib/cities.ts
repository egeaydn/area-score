// Türkiye'deki 81 ilin listesi
// ASCII karakterler kullanılıyor (OpenWeather API için)

export interface CityMapping {
  display: string;    // Kullanıcıya gösterilen isim (Türkçe karakterli)
  api: string;        // API çağrılarında kullanılan isim (ASCII)
  plateCode: number;  // Plaka kodu
}

export const TURKISH_CITIES: CityMapping[] = [
  { display: 'Adana', api: 'Adana', plateCode: 1 },
  { display: 'Adıyaman', api: 'Adiyaman', plateCode: 2 },
  { display: 'Afyonkarahisar', api: 'Afyonkarahisar', plateCode: 3 },
  { display: 'Ağrı', api: 'Agri', plateCode: 4 },
  { display: 'Amasya', api: 'Amasya', plateCode: 5 },
  { display: 'Ankara', api: 'Ankara', plateCode: 6 },
  { display: 'Antalya', api: 'Antalya', plateCode: 7 },
  { display: 'Artvin', api: 'Artvin', plateCode: 8 },
  { display: 'Aydın', api: 'Aydin', plateCode: 9 },
  { display: 'Balıkesir', api: 'Balikesir', plateCode: 10 },
  { display: 'Bilecik', api: 'Bilecik', plateCode: 11 },
  { display: 'Bingöl', api: 'Bingol', plateCode: 12 },
  { display: 'Bitlis', api: 'Bitlis', plateCode: 13 },
  { display: 'Bolu', api: 'Bolu', plateCode: 14 },
  { display: 'Burdur', api: 'Burdur', plateCode: 15 },
  { display: 'Bursa', api: 'Bursa', plateCode: 16 },
  { display: 'Çanakkale', api: 'Canakkale', plateCode: 17 },
  { display: 'Çankırı', api: 'Cankiri', plateCode: 18 },
  { display: 'Çorum', api: 'Corum', plateCode: 19 },
  { display: 'Denizli', api: 'Denizli', plateCode: 20 },
  { display: 'Diyarbakır', api: 'Diyarbakir', plateCode: 21 },
  { display: 'Edirne', api: 'Edirne', plateCode: 22 },
  { display: 'Elazığ', api: 'Elazig', plateCode: 23 },
  { display: 'Erzincan', api: 'Erzincan', plateCode: 24 },
  { display: 'Erzurum', api: 'Erzurum', plateCode: 25 },
  { display: 'Eskişehir', api: 'Eskisehir', plateCode: 26 },
  { display: 'Gaziantep', api: 'Gaziantep', plateCode: 27 },
  { display: 'Giresun', api: 'Giresun', plateCode: 28 },
  { display: 'Gümüşhane', api: 'Gumushane', plateCode: 29 },
  { display: 'Hakkari', api: 'Hakkari', plateCode: 30 },
  { display: 'Hatay', api: 'Hatay', plateCode: 31 },
  { display: 'Isparta', api: 'Isparta', plateCode: 32 },
  { display: 'Mersin', api: 'Mersin', plateCode: 33 },
  { display: 'İstanbul', api: 'Istanbul', plateCode: 34 },
  { display: 'İzmir', api: 'Izmir', plateCode: 35 },
  { display: 'Kars', api: 'Kars', plateCode: 36 },
  { display: 'Kastamonu', api: 'Kastamonu', plateCode: 37 },
  { display: 'Kayseri', api: 'Kayseri', plateCode: 38 },
  { display: 'Kırklareli', api: 'Kirklareli', plateCode: 39 },
  { display: 'Kırşehir', api: 'Kirsehir', plateCode: 40 },
  { display: 'Kocaeli', api: 'Kocaeli', plateCode: 41 },
  { display: 'Konya', api: 'Konya', plateCode: 42 },
  { display: 'Kütahya', api: 'Kutahya', plateCode: 43 },
  { display: 'Malatya', api: 'Malatya', plateCode: 44 },
  { display: 'Manisa', api: 'Manisa', plateCode: 45 },
  { display: 'Kahramanmaraş', api: 'Kahramanmaras', plateCode: 46 },
  { display: 'Mardin', api: 'Mardin', plateCode: 47 },
  { display: 'Muğla', api: 'Mugla', plateCode: 48 },
  { display: 'Muş', api: 'Mus', plateCode: 49 },
  { display: 'Nevşehir', api: 'Nevsehir', plateCode: 50 },
  { display: 'Niğde', api: 'Nigde', plateCode: 51 },
  { display: 'Ordu', api: 'Ordu', plateCode: 52 },
  { display: 'Rize', api: 'Rize', plateCode: 53 },
  { display: 'Sakarya', api: 'Sakarya', plateCode: 54 },
  { display: 'Samsun', api: 'Samsun', plateCode: 55 },
  { display: 'Siirt', api: 'Siirt', plateCode: 56 },
  { display: 'Sinop', api: 'Sinop', plateCode: 57 },
  { display: 'Sivas', api: 'Sivas', plateCode: 58 },
  { display: 'Tekirdağ', api: 'Tekirdag', plateCode: 59 },
  { display: 'Tokat', api: 'Tokat', plateCode: 60 },
  { display: 'Trabzon', api: 'Trabzon', plateCode: 61 },
  { display: 'Tunceli', api: 'Tunceli', plateCode: 62 },
  { display: 'Şanlıurfa', api: 'Sanliurfa', plateCode: 63 },
  { display: 'Uşak', api: 'Usak', plateCode: 64 },
  { display: 'Van', api: 'Van', plateCode: 65 },
  { display: 'Yozgat', api: 'Yozgat', plateCode: 66 },
  { display: 'Zonguldak', api: 'Zonguldak', plateCode: 67 },
  { display: 'Aksaray', api: 'Aksaray', plateCode: 68 },
  { display: 'Bayburt', api: 'Bayburt', plateCode: 69 },
  { display: 'Karaman', api: 'Karaman', plateCode: 70 },
  { display: 'Kırıkkale', api: 'Kirikkale', plateCode: 71 },
  { display: 'Batman', api: 'Batman', plateCode: 72 },
  { display: 'Şırnak', api: 'Sirnak', plateCode: 73 },
  { display: 'Bartın', api: 'Bartin', plateCode: 74 },
  { display: 'Ardahan', api: 'Ardahan', plateCode: 75 },
  { display: 'Iğdır', api: 'Igdir', plateCode: 76 },
  { display: 'Yalova', api: 'Yalova', plateCode: 77 },
  { display: 'Karabük', api: 'Karabuk', plateCode: 78 },
  { display: 'Kilis', api: 'Kilis', plateCode: 79 },
  { display: 'Osmaniye', api: 'Osmaniye', plateCode: 80 },
  { display: 'Düzce', api: 'Duzce', plateCode: 81 },
];

// Sadece API çağrıları için kullanılan isimler (küçük harf, ASCII)
export const CITY_NAMES_FOR_API = TURKISH_CITIES.map(city => city.api);

// Şehir adı normalleştirme fonksiyonu
export function normalizeCityName(cityName: string): string {
  const city = TURKISH_CITIES.find(
    c => c.display.toLowerCase() === cityName.toLowerCase() || 
         c.api.toLowerCase() === cityName.toLowerCase()
  );
  return city?.api || cityName;
}

// Display adından API adına çevirme
export function getCityApiName(displayName: string): string {
  const city = TURKISH_CITIES.find(c => c.display === displayName);
  return city?.api || displayName;
}
