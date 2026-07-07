import { useMutation } from '@tanstack/react-query';
import { login, LoginPayload } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';

export function useLogin() {
  const { setSession } = useAuth();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: setSession,
  });
}
