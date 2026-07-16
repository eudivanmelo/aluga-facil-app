import { Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Typography } from "@/components/atoms/Typography";
import { Ionicons } from "@expo/vector-icons";
import { formatPrice } from "@/utils/textFormat";
import { COLORS } from "@/constants/colors";
import { router } from "expo-router";
import { PropertyMapItem } from "@/services/properties";

interface Props {
    property: PropertyMapItem;
}

// Clears the floating tab bar: its own bottom offset + container height + a gap.
const TAB_BAR_CLEARANCE = 12 + 64 + 20;

export const MapCard = ({ property }: Props) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.floatingCard, { bottom: insets.bottom + TAB_BAR_CLEARANCE }]}>
            <Pressable
                style={styles.cardInner}
                onPress={() => router.push(`/property/${property.id}`)}
            >
                {property.firstPhotoUrl ? (
                    <Image source={{ uri: property.firstPhotoUrl }} style={styles.cardImage} />
                ) : (
                    <View style={[styles.cardImage, styles.cardImagePlaceholder]} />
                )}
                <View style={styles.cardBody}>
                    <Typography variant="body/medium" style={{ fontWeight: "bold" }} color={COLORS.neutral[900]} numberOfLines={1}>
                        {property.title}
                    </Typography>
                    <Typography variant="body/small" style={{ fontWeight: "bold" }} color={COLORS.primary[500]}>
                        {`${formatPrice(property.price)} / mês`}
                    </Typography>
                </View>
                <Ionicons name="chevron-forward" size={22} color={COLORS.neutral[700]} />
            </Pressable>
        </View>
    );
};
