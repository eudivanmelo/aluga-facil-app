import { api } from './api';
import { resolveImageUrl } from '@/utils/media';

export interface PropertySummary {
  id: number;
  title: string;
  price: number;
  paymentFrequency: string;
  city: string;
  state: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  petsAllowed: boolean;
  isFurnished: boolean;
  tags: string[];
  firstPhotoUrl: string | null;
  latitude: number;
  longitude: number;
}

export interface PagedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PropertyFilter {
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  petsAllowed?: boolean;
  isFurnished?: boolean;
  tag?: string;
  page?: number;
  pageSize?: number;
}

export async function getCatalog(filter: PropertyFilter = {}): Promise<PagedResponse<PropertySummary>> {
  const { data } = await api.get<PagedResponse<PropertySummary>>('/properties', { params: filter });
  return { ...data, data: data.data.map(withResolvedPhoto) };
}

export interface PropertyMapItem {
  id: number;
  title: string;
  price: number;
  latitude: number;
  longitude: number;
  firstPhotoUrl: string | null;
}

export async function getMapProperties(): Promise<PropertyMapItem[]> {
  const { data } = await api.get<PropertyMapItem[]>('/properties/map');
  return data.map(withResolvedPhoto);
}

export async function getMyProperties(): Promise<PropertySummary[]> {
  const { data } = await api.get<PropertySummary[]>('/properties/mine');
  return data.map(withResolvedPhoto);
}

function withResolvedPhoto<T extends { firstPhotoUrl: string | null }>(item: T): T {
  return { ...item, firstPhotoUrl: resolveImageUrl(item.firstPhotoUrl) };
}

export interface CreatePropertyPayload {
  title: string;
  description: string;
  price: number;
  paymentFrequency: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  petsAllowed: boolean;
  isFurnished: boolean;
  tags: string[];
  photoUrls: string[];
}

export async function createProperty(payload: CreatePropertyPayload): Promise<{ id: number }> {
  const { data } = await api.post<{ id: number }>('/properties', payload);
  return data;
}

export async function uploadPhoto(uri: string): Promise<string> {
  const filename = uri.split('/').pop() ?? `photo-${Date.now()}.jpg`;
  const extension = /\.(\w+)$/.exec(filename)?.[1]?.toLowerCase();
  const type = `image/${extension === 'jpg' ? 'jpeg' : extension ?? 'jpeg'}`;

  // O React Native aceita { uri, name, type } no lugar de um Blob real, mas os tipos do DOM
  // (trazidos pelo suporte a web do Expo) sobrepõem os tipos de FormData do RN aqui.
  const formData = new FormData();
  formData.append('file', { uri, name: filename, type } as unknown as Blob);

  const { data } = await api.post<{ url: string }>('/photos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return resolveImageUrl(data.url);
}
