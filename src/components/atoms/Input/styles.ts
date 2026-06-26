import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

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
    justifyContent: 'space-between',
    backgroundColor: COLORS.neutral[200],
    borderWidth: 1,
    borderColor: COLORS.neutral[400],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 40,
    gap: 10,
  },
  textareaContainer: {
    height: 139,
    alignItems: 'flex-start',
    flexDirection: 'column',
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.neutral[900],
    padding: 0,
  },
  textareaInput: {
    flex: 1,
    alignSelf: 'stretch',
  },
  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    position: 'absolute',
    right: 8,
    bottom: 6,
    color: COLORS.neutral[400],
  },
});