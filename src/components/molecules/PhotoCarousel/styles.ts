import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  photo: {
    aspectRatio: 16 / 10,
  },
  placeholder: {
    backgroundColor: COLORS.neutral[400],
  },
  dotsWrapper: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
