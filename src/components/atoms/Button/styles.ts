import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    height: 40,
    gap: 10,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: COLORS.primary[500],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary[500],
  },
  secondary: {
    backgroundColor: COLORS.primary[100],
  },
});

export const labelStyles = StyleSheet.create({
  primary: {
    color: COLORS.primary[100],
  },
  outline: {
    color: COLORS.primary[500],
  },
  secondary: {
    color: COLORS.primary[500],
  },
});