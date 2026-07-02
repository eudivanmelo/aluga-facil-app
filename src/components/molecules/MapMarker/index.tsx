import { TouchableOpacity, View } from 'react-native';
import { Marker } from '@maplibre/maplibre-react-native';
import { Typography } from '@/components/atoms/Typography';
import { styles } from './styles';
import { formatPrice } from '@/utils/textFormat';

interface Props {
  id: string;
  coordinate: [number, number];
  price: number;
  isSelected: boolean;
  onPress: (id: string) => void;
}

export function MapMarker({ id, coordinate, price, isSelected, onPress }: Props) {
  return (
    <Marker lngLat={coordinate} anchor='top'>
      <TouchableOpacity
        onPress={() => onPress(id)}
        activeOpacity={0.85}
        style={styles.wrapper}
      >
        <View style={[styles.bubble, isSelected && styles.bubbleSelected]}>
          <Typography
            variant="label/tiny"
            style={[styles.label, isSelected && styles.labelSelected]}
          >
            {formatPrice(price)}
          </Typography>
        </View>
        <View style={[styles.dot, isSelected && styles.dotSelected]} />
      </TouchableOpacity>
    </Marker>
  );
}
