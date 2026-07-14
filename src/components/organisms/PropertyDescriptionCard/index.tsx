import { View } from 'react-native';
import { UserCircle } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { VerifiedTag } from '@/components/molecules/VerifiedTag';
import { COLORS } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  description: string;
  ownerName: string;
  ownerVerified: boolean;
}

export function PropertyDescriptionCard({ description, ownerName, ownerVerified }: Props) {
  return (
    <View style={styles.card}>
      <Typography variant="heading/small" style={styles.title}>
        Descrição
      </Typography>
      <Typography variant="body/medium" color={COLORS.neutral[700]} style={styles.description}>
        {description}
      </Typography>

      <View style={styles.ownerRow}>
        <UserCircle size={22} color={COLORS.neutral[700]} />
        <Typography variant="body/medium" color={COLORS.neutral[700]} style={styles.ownerText}>
          {`Locador: ${ownerName}`}
        </Typography>
        {ownerVerified && <VerifiedTag />}
      </View>
    </View>
  );
}
