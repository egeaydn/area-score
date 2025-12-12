// Type definitions for AreScore project

export interface Province {
  name: string;
  plateNumber: number;
}

export interface District {
  name: string;
  population: number;
}

export interface ProvinceData {
  id: number;
  name: string;
  population: number;
  areaCode: string;
  districts: District[];
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

export interface ProvinceCardProps {
  provinceName: string;
  onClose?: () => void;
}

export interface WeatherWidgetProps {
  city: string;
}

export interface TurkeyMapWrapperProps {
  onHover: (province: Province | null) => void;
  onClick: (province: Province) => void;
  selectedProvince?: string;
}
