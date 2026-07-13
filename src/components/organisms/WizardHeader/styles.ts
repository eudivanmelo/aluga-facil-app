import { COLORS } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.primary[500],
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.neutral[100],
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  stepColumn: {
    alignItems: 'center',
    gap: 6,
  },
  stepConnector: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.neutral[400],
    marginTop: 15,
    marginHorizontal: -4,
  },
  stepConnectorFilled: {
    backgroundColor: COLORS.primary[500],
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.neutral[400],
    backgroundColor: COLORS.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleFilled: {
    backgroundColor: COLORS.primary[500],
    borderColor: COLORS.primary[500],
  },
  stepLabel: {
    textAlign: 'center',
  },
});
