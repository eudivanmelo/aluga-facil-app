import { View } from 'react-native';
import { Bath, BedDouble, Car } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
}

export function PropertyStatsRow({ bedrooms, bathrooms, parkingSpaces }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.pill}>
        <BedDouble size={18} color={COLORS.primary[800]} />
        <Typography variant="body/small" color={COLORS.neutral[700]}>
          {`${bedrooms} quarto${bedrooms === 1 ? '' : 's'}`}
        </Typography>
      </View>

      <View style={styles.pill}>
        <Bath size={18} color={COLORS.primary[800]} />
        <Typography variant="body/small" color={COLORS.neutral[700]}>
          {`${bathrooms} banheiro${bathrooms === 1 ? '' : 's'}`}
        </Typography>
      </View>

      <View style={styles.pill}>
        <Car size={18} color={COLORS.primary[800]} />
        <Typography variant="body/small" color={COLORS.neutral[700]}>
          {`${parkingSpaces} vaga${parkingSpaces === 1 ? '' : 's'}`}
        </Typography>
      </View>
    </View>
  );
}
