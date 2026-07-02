import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingVertical: 0,
        gap: 8
    },
    dot:{
        width: 12,
        height: 12,
        backgroundColor: COLORS.neutral[200],
        opacity: 1,
        borderRadius: 999
    },
    activeDot: {
        opacity: 0.5
    }
});