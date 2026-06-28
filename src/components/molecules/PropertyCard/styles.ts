import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.neutral[100],
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: "#102429",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  pressed: {
    opacity: 0.92,
  },
  imageContainer: {
    height: 160,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    backgroundColor: COLORS.neutral[200],
  },
  body: {
    padding: 8,
    gap: 10,
  },
  header: {
    gap: 4,
  },
  title: {
    color: COLORS.neutral[900],
    fontSize: 17,
  },
  priceRow: {
    flexDirection: 'row',
  },
  pricePill: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  priceText: {
    color: COLORS.primary[800],
    fontWeight: 'bold',
  },
  frequencyText: {
    color: COLORS.primary[800],
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationText: {
    flex: 1,
    color: COLORS.neutral[900],
  },
  description: {
    color: COLORS.neutral[900],
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ownerText: {
    color: COLORS.neutral[900],
  },
});