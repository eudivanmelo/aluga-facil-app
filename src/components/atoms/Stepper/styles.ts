import { COLORS } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  label: {
    color: COLORS.neutral[900],
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.neutral[200],
    borderWidth: 1,
    borderColor: COLORS.neutral[400],
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  button: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: COLORS.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: COLORS.neutral[400],
  },
  value: {
    minWidth: 24,
    textAlign: 'center',
  },
});
