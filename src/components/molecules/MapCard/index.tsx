import { Image, Pressable, View } from "react-native";
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

export const MapCard = ({ property }: Props) => {
    return (
        <View style={styles.floatingCard}>
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
