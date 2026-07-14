import { useEffect, useState } from 'react';
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { X } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Stepper } from '@/components/atoms/Stepper';
import { COLORS } from '@/constants/colors';
import { FURNISHED_OPTIONS, PETS_ALLOWED_OPTIONS, SelectOption } from '@/constants/propertyOptions';
import { useCities } from '@/hooks/useCities';
import { styles } from './styles';

export interface PropertyFiltersState {
  city: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: number;
  petsAllowed: string;
  isFurnished: string;
}

export const EMPTY_PROPERTY_FILTERS: PropertyFiltersState = {
  city: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: 0,
  petsAllowed: '',
  isFurnished: '',
};

const ANY_PETS_OPTIONS: SelectOption[] = [{ label: 'Tanto faz', value: '' }, ...PETS_ALLOWED_OPTIONS];
const ANY_FURNISHED_OPTIONS: SelectOption[] = [{ label: 'Tanto faz', value: '' }, ...FURNISHED_OPTIONS];

interface Props {
  visible: boolean;
  initialFilters: PropertyFiltersState;
  onApply: (filters: PropertyFiltersState) => void;
  onClose: () => void;
}

export function PropertyFilterModal({ visible, initialFilters, onApply, onClose }: Props) {
  const { data: cities } = useCities();
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    if (visible) setFilters(initialFilters);
  }, [visible, initialFilters]);

  const cityOptions: SelectOption[] = [
    { label: 'Todas as cidades', value: '' },
    ...(cities ?? []).map((city) => ({ label: city, value: city })),
  ];

  const handleClear = () => setFilters(EMPTY_PROPERTY_FILTERS);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Typography variant="heading/small">Filtros</Typography>
            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <X size={22} color={COLORS.neutral[700]} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
            <Select
              label="Cidade"
              options={cityOptions}
              value={filters.city}
              onChange={(city) => setFilters((prev) => ({ ...prev, city }))}
            />

            <View style={styles.row}>
              <Input
                label="Preço mínimo"
                placeholder="R$ 0"
                keyboardType="numeric"
                value={filters.minPrice}
                onChangeText={(minPrice) => setFilters((prev) => ({ ...prev, minPrice }))}
                containerStyle={styles.rowItem}
              />
              <Input
                label="Preço máximo"
                placeholder="R$ 0"
                keyboardType="numeric"
                value={filters.maxPrice}
                onChangeText={(maxPrice) => setFilters((prev) => ({ ...prev, maxPrice }))}
                containerStyle={styles.rowItem}
              />
            </View>

            <Stepper
              label="Quartos (0 = qualquer)"
              value={filters.bedrooms}
              onChange={(bedrooms) => setFilters((prev) => ({ ...prev, bedrooms }))}
              min={0}
            />

            <Select
              label="Aceita animais?"
              options={ANY_PETS_OPTIONS}
              value={filters.petsAllowed}
              onChange={(petsAllowed) => setFilters((prev) => ({ ...prev, petsAllowed }))}
            />

            <Select
              label="Mobília"
              options={ANY_FURNISHED_OPTIONS}
              value={filters.isFurnished}
              onChange={(isFurnished) => setFilters((prev) => ({ ...prev, isFurnished }))}
            />
          </ScrollView>

          <View style={styles.footer}>
            <Button label="Limpar" variant="outline" onPress={handleClear} style={styles.footerButton} />
            <Button label="Aplicar filtros" variant="primary" onPress={handleApply} style={styles.footerButton} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
