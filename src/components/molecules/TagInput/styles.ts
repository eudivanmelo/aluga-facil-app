import { COLORS } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  label: {
    color: COLORS.neutral[900],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.neutral[200],
    borderWidth: 1,
    borderColor: COLORS.neutral[400],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.neutral[900],
    padding: 0,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary[100],
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
