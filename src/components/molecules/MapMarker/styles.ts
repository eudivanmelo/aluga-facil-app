import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: COLORS.neutral[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: COLORS.primary[500],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  bubbleSelected: {
    backgroundColor: COLORS.primary[500],
  },
  label: {
    color: COLORS.primary[500],
    fontWeight: '700',
  },
  labelSelected: {
    color: COLORS.neutral[100],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary[500],
    marginTop: 2,
  },
  dotSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary[800],
  },
});