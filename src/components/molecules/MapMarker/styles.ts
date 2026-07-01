import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  pill: {
    backgroundColor: COLORS.neutral[100],
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1.5,
    borderColor: COLORS.neutral[400],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  pillSelected: {
    backgroundColor: COLORS.primary[500],
    borderColor: COLORS.primary[800],
  },
  label: {
    color: COLORS.neutral[900],
    fontWeight: '700',
  },
  labelSelected: {
    color: COLORS.neutral[100],
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.neutral[400],
    marginTop: -1,
  },
  arrowSelected: {
    borderTopColor: COLORS.primary[800],
  },
});