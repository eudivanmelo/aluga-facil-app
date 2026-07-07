import { api } from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  verified: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  cpf: string;
  password: string;
}

export interface RegisterPayload {
  cpf: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);
  return data;
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/register', payload);
  return data;
}
