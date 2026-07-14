import { View } from "react-native";
import { styles } from "./styles";

interface CarrouselDotsProps {
    count: number,
    activeIndex: number
}

export const CarrouselDots = ({count, activeIndex}: CarrouselDotsProps) => {
    return (
        <View style={styles.container}>
            {Array.from({ length: count }).map((_, index) => (
                <View key={index} style={[styles.dot, (index === activeIndex && styles.activeDot)]} />
            ))}
        </View>
    );
}