import { useMutation } from '@tanstack/react-query';
import { register, RegisterPayload } from '@/services/auth';

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
  });
}
