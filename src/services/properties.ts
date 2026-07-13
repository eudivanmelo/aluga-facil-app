import { api } from './api';

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
  return data;
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
  return data;
}
