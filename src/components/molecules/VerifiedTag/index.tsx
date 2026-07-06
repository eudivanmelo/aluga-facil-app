import { View } from 'react-native';
import VerifiedCheck from '../../../../assets/verified-check.svg';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  label?: string;
}

export function VerifiedTag({ label = 'Verificado' }: Props) {
  return (
    <View style={styles.container}>
      <VerifiedCheck width={16} height={16} />
      <Typography variant="body/medium" color={COLORS.success[100]} style={styles.label}>
        {label}
      </Typography>
    </View>
  );
}