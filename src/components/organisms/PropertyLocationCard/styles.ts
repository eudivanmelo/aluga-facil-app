import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.neutral[100],
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addressLine: {
    marginTop: 2,
  },
  mapPreview: {
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  map: {
    flex: 1,
  },
  routeButton: {
    justifyContent: 'center',
  },
});
