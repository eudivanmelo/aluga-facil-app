export const formatPrice = (price: number): string => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

/** Parses a loosely-typed Brazilian currency input ("R$ 1.500,00", "1500") into a number. */
export const parsePriceInput = (value: string): number => {
  const normalized = value
    .replace(/[^\d,.-]/g, '')
    .replace(/\.(?=\d{3}(\D|$))/g, '')
    .replace(',', '.');

  const parsed = parseFloat(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
};