import { useQuery } from '@tanstack/react-query';
import { getMyProperties } from '@/services/properties';

export function useMyProperties() {
  return useQuery({
    queryKey: ['my-properties'],
    queryFn: getMyProperties,
  });
}
