import { StyleSheet, View } from 'react-native';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import HomePlusIcon from '../../../../assets/home-plus.svg';
import { styles } from './styles';

interface Props {
  onAddPress: () => void;
}

export function AddPropertyBanner({ onAddPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <HomePlusIcon width={32} height={32} color={COLORS.primary[800]} />
      </View>
      
      <View style={styles.textContainer}>
        <Typography variant="body/medium" color={COLORS.neutral[100]} style={{ marginBottom: 4 }}>
          Adicionar novo imóvel
        </Typography>
        <Typography variant="body/small" color={COLORS.neutral[100]}>
          Cadastre um novo imóvel para alugar
        </Typography>
      </View>

      <Button
        label="Adicionar Imóvel"
        variant="secondary"
        style={styles.button}
        onPress={onAddPress}
      />
    </View>
  );
}