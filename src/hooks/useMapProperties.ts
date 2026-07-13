import { useQuery } from '@tanstack/react-query';
import { getMapProperties } from '@/services/properties';

export function useMapProperties() {
  return useQuery({
    queryKey: ['properties', 'map'],
    queryFn: getMapProperties,
  });
}
