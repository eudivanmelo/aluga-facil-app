import { TouchableOpacity, View } from 'react-native';
import { Marker } from '@maplibre/maplibre-react-native';
import { Typography } from '@/components/atoms/Typography';
import { styles } from './styles';

interface Props {
  id: string;
  coordinate: [number, number];
  price: number;
  isSelected: boolean;
  onPress: (id: string) => void;
}

export function MapMarker({ id, coordinate, price, isSelected, onPress }: Props) {
  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Marker lngLat={coordinate} anchor='top'>
      <TouchableOpacity
        onPress={() => onPress(id)}
        activeOpacity={0.85}
        style={styles.wrapper}
      >
        <View style={[styles.pill, isSelected && styles.pillSelected]}>
          <Typography
            variant="label/tiny"
            style={[styles.label, isSelected && styles.labelSelected]}
          >
            {formattedPrice}
          </Typography>
        </View>
        <View style={[styles.arrow, isSelected && styles.arrowSelected]} />
      </TouchableOpacity>
    </Marker>
  );
}
