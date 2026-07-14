import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Share2 } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  onBack: () => void;
  onShare: () => void;
}

export function PropertyDetailHeader({ onBack, onShare }: Props) {
  return (
    <SafeAreaView edges={['top']} style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.headerButton} activeOpacity={0.75}>
        <ChevronLeft size={24} color={COLORS.neutral[100]} />
      </TouchableOpacity>

      <Typography variant="heading/small" color={COLORS.neutral[100]}>
        Detalhes do imóvel
      </Typography>

      <TouchableOpacity onPress={onShare} style={styles.headerButton} activeOpacity={0.75}>
        <Share2 size={22} color={COLORS.neutral[100]} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
