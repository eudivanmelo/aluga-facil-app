import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../../../assets/logo.svg';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { SearchInput } from '@/components/molecules/SearchInput';
import { styles } from './styles';

interface Props {
  searchValue: string;
  onChangeSearch: (value: string) => void;
  onPressFilter: () => void;
}

export function HomeHeader({ searchValue, onChangeSearch, onPressFilter }: Props) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoRow}>
          <Logo width={32} height={32} />

          <Typography variant="heading/large" color={COLORS.neutral[100]} style={styles.title}>
            Aluga Fácil
          </Typography>
        </View>

        <SearchInput value={searchValue} onChangeText={onChangeSearch} onPressFilter={onPressFilter} />
      </View>
    </SafeAreaView>
  );
}