import { useQuery } from '@tanstack/react-query';
import { getPropertyById } from '@/services/properties';

export function useProperty(id: number) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(id),
    enabled: Number.isFinite(id),
  });
}
