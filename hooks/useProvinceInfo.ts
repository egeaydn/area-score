// Custom hook for fetching province information
import useSWR from 'swr';
import { ProvinceData } from '@/lib/types';
import { CACHE_DURATIONS } from '@/lib/constants';

const fetcher = async (url: string): Promise<ProvinceData> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch province data');
  const data = await res.json();
  return data.data?.[0] || data; // TürkiyeAPI returns array in data property
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
      dedupingInterval: CACHE_DURATIONS.PROVINCE_DATA,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}
