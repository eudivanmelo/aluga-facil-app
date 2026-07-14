import { View } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { PropertyStatsRow } from '@/components/molecules/PropertyStatsRow';
import { COLORS } from '@/constants/colors';
import { formatPrice } from '@/utils/textFormat';
import { styles } from './styles';

interface Props {
  title: string;
  price: number;
  paymentFrequency: string;
  neighborhood: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
}

export function PropertyInfoCard({
  title,
  price,
  paymentFrequency,
  neighborhood,
  city,
  state,
  bedrooms,
  bathrooms,
  parkingSpaces,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Typography variant="heading/large" style={styles.title}>
          {title}
        </Typography>

        <View style={styles.priceRow}>
          <Typography variant="heading/small" color={COLORS.primary[500]}>
            {formatPrice(price)}
          </Typography>
          <Typography variant="body/small" color={COLORS.neutral[700]}>
            {` / ${paymentFrequency}`}
          </Typography>
        </View>
      </View>

      <View style={styles.locationRow}>
        <MapPin size={18} color={COLORS.primary[800]} />
        <Typography
          variant="body/medium"
          color={COLORS.neutral[700]}
          numberOfLines={1}
          style={styles.locationText}
        >
          {`Bairro ${neighborhood}, ${city}/${state}`}
        </Typography>
      </View>

      <PropertyStatsRow bedrooms={bedrooms} bathrooms={bathrooms} parkingSpaces={parkingSpaces} />
    </View>
  );
}
