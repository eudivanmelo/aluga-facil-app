import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import MenuIcon from '../../../../assets/menu.svg';
import ChevronRightIcon from '../../../../assets/chevron-right.svg';
interface Props {
  onChangePassword: () => void;
  onTermsOfUse: () => void;
  onLogout: () => void;
}

export function UserMenu({ onChangePassword, onTermsOfUse, onLogout }: Props) {
  return (
    <View style={styles.container}>
      {/* Cabeçalho do Menu */}
      <View style={styles.header}>
        <MenuIcon width={24} height={24} color={COLORS.primary[800]} />
        <Typography variant="body/medium" style={styles.headerTitle}>
          Menu
        </Typography>
      </View>

      {/* Opção: Alterar Senha */}
      <TouchableOpacity style={styles.menuItem} onPress={onChangePassword}>
        <Typography variant="body/medium" color={COLORS.neutral[900]}>
          Alterar minha senha
        </Typography>
        <ChevronRightIcon width={16} height={16} color={COLORS.primary[500]} />
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Opção: Termos de Uso */}
      <TouchableOpacity style={styles.menuItem} onPress={onTermsOfUse}>
        <Typography variant="body/medium" color={COLORS.neutral[900]}>
          Termos de uso
        </Typography>
        <ChevronRightIcon width={16} height={16} color={COLORS.primary[500]} />
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Opção: Deslogar */}
      <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
        {/* Usando a cor de perigo (vermelho) para a ação destrutiva */}
        <Typography variant="body/medium" color={'#FF383C'}>
          Deslogar
        </Typography>
        <ChevronRightIcon width={16} height={16} color={COLORS.primary[500]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral[100],
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    marginLeft: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.neutral[200],
  },
});