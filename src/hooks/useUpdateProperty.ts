import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdatePropertyPayload, updateProperty, uploadPhoto } from '@/services/properties';
import { isRemoteUrl } from '@/utils/media';

export interface UpdatePropertyInput extends Omit<UpdatePropertyPayload, 'photoUrls'> {
  id: number;
  photos: string[];
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, photos, ...payload }: UpdatePropertyInput) => {
      const photoUrls = await Promise.all(
        photos.map((photo) => (isRemoteUrl(photo) ? photo : uploadPhoto(photo)))
      );
      return updateProperty(id, { ...payload, photoUrls });
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['my-properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', id] });
    },
  });
}
