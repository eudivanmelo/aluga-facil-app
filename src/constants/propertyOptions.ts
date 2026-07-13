export interface SelectOption {
  label: string;
  value: string;
}

export const PROPERTY_TYPE_OPTIONS: SelectOption[] = [
  { label: 'Casa', value: 'casa' },
  { label: 'Apartamento', value: 'apartamento' },
  { label: 'Quarto', value: 'quarto' },
  { label: 'Kitnet', value: 'kitnet' },
  { label: 'Studio', value: 'studio' },
  { label: 'Sobrado', value: 'sobrado' },
];

// O valor é exibido diretamente após a barra no PropertyCard (ex: "/mês"), então usa a
// mesma grafia esperada lá em vez de um código interno.
export const PAYMENT_FREQUENCY_OPTIONS: SelectOption[] = [
  { label: 'Por mês', value: 'mês' },
  { label: 'Por semana', value: 'semana' },
  { label: 'Por dia', value: 'dia' },
];

export const PETS_ALLOWED_OPTIONS: SelectOption[] = [
  { label: 'Sim', value: 'sim' },
  { label: 'Não', value: 'nao' },
];

export const FURNISHED_OPTIONS: SelectOption[] = [
  { label: 'Mobiliado', value: 'mobiliado' },
  { label: 'Semi-mobiliado', value: 'semi-mobiliado' },
  { label: 'Não mobiliado', value: 'nao-mobiliado' },
];

export const BRAZILIAN_STATE_OPTIONS: SelectOption[] = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO',
].map((uf) => ({ label: uf, value: uf }));
