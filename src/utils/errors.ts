import { isAxiosError } from 'axios';

export function getErrorMessage(error: unknown, fallback = 'Ocorreu um erro. Tente novamente.'): string {
  if (isAxiosError(error) && typeof error.response?.data?.message === 'string') {
    return error.response.data.message;
  }
  return fallback;
}
