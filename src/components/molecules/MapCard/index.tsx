import { Image, Pressable, View } from "react-native";
import { styles } from "./styles";
import { Typography } from "@/components/atoms/Typography";
import { Ionicons } from "@expo/vector-icons";
import { formatPrice } from "@/utils/textFormat";
import { COLORS } from "@/constants/colors";
import { router } from "expo-router";

const property = {
    id: "1",
    title: "Apartamento Moderno",
    neighborhood: "Centro",
    city: "São Paulo",
    price: 2500,
};

export const MapCard = () => {
    return (
        <View style={styles.floatingCard}>
            <Pressable
                style={styles.cardInner}
                onPress={() => router.push(`/property/${property.id}`)}
            >
                <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.cardImage} />
                <View style={styles.cardBody}>
                    <Typography variant="body/medium" style={{ fontWeight: "bold" }} color={COLORS.neutral[900]} numberOfLines={1}>
                        {property.title}
                    </Typography>
                    <View style={styles.cardLocationRow}>
                        <Ionicons name="location-outline" size={13} color={COLORS.primary[500]} />
                        <Typography variant="body/small" color={COLORS.neutral[700]} numberOfLines={1}>
                            {`${property.neighborhood}, ${property.city}`}
                        </Typography>
                    </View>
                    <Typography variant="body/small" style={{ fontWeight: "bold" }} color={COLORS.primary[500]}>
                        {`${formatPrice(property.price)} / mês`}
                    </Typography>
                </View>
                <Ionicons name="chevron-forward" size={22} color={COLORS.neutral[700]} />
            </Pressable>
        </View>
    );
};