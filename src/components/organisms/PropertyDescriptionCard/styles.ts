import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.neutral[100],
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  title: {
    marginBottom: 4,
  },
  description: {
    lineHeight: 20,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ownerText: {
    flex: 1,
  },
});
