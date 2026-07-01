export interface PropertyMapItem {
  id: string;
  title: string;
  price: number;
  latitude: number;
  longitude: number;
  firstPhotoUrl: string | null;
}

export const MOCK_MAP_PROPERTIES: PropertyMapItem[] = [
  {
    id: '1',
    title: 'Quarto Individual',
    price: 600,
    latitude: -6.1088,
    longitude: -38.2099,
    firstPhotoUrl: null,
  },
  {
    id: '2',
    title: 'Apartamento 2 quartos',
    price: 1200,
    latitude: -6.1120,
    longitude: -38.2150,
    firstPhotoUrl: null,
  },
  {
    id: '3',
    title: 'Casa ampla',
    price: 1800,
    latitude: -6.1050,
    longitude: -38.2060,
    firstPhotoUrl: null,
  },
  {
    id: '4',
    title: 'Kitnet mobiliada',
    price: 750,
    latitude: -6.1070,
    longitude: -38.2180,
    firstPhotoUrl: null,
  },
  {
    id: '5',
    title: 'Studio moderno',
    price: 950,
    latitude: -6.1140,
    longitude: -38.2090,
    firstPhotoUrl: null,
  },
];

export const MAP_CENTER = {
  longitude: -38.2099,
  latitude: -6.1088,
};
