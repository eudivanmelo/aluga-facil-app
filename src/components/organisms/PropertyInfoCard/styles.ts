import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.neutral[100],
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  titleRow: {
    gap: 4,
  },
  title: {
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    flex: 1,
  },
});
