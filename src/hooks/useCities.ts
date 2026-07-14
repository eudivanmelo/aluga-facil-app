import { useQuery } from '@tanstack/react-query';
import { getCities } from '@/services/properties';

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: getCities,
    staleTime: 5 * 60 * 1000,
  });
}
