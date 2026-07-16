import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
floatingCard: {
    position: "absolute",
    left: 16,
    right: 16,
},
cardInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.neutral[100],
    borderRadius: 8,
    padding: 8,
    gap: 12,
    shadowColor: COLORS.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 2
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    resizeMode: "cover",
  },
  cardImagePlaceholder: {
    backgroundColor: COLORS.neutral[200],
  },
  cardBody: {
    flex: 1,
    gap: 2,
  },
});