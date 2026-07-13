import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProperty, CreatePropertyPayload, uploadPhoto } from '@/services/properties';

export interface CreatePropertyInput extends Omit<CreatePropertyPayload, 'photoUrls'> {
  photos: string[];
}

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ photos, ...payload }: CreatePropertyInput) => {
      const photoUrls = await Promise.all(photos.map(uploadPhoto));
      return createProperty({ ...payload, photoUrls });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['my-properties'] });
    },
  });
}
