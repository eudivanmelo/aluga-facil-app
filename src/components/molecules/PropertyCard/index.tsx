import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { MapPin, UserCircle } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  title: string;
  price: number;
  paymentFrequency: string;
  neighborhood: string;
  city: string;
  state: string;
  description: string;
  ownerName: string;
  imageUrl?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export function PropertyCard({
  title,
  price,
  paymentFrequency,
  neighborhood,
  city,
  state,
  description,
  ownerName,
  imageUrl,
  style,
  onPress,
}: Props) {
  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]} />
        )}
      </View>

      <View style={styles.body}>
        <View style={styles.header}>
          <Typography variant="heading/large" style={styles.title}>
            {title}
          </Typography>

          <View style={styles.priceRow}>
            <View style={styles.pricePill}>
              <Typography variant="heading/small" style={styles.priceText}>
                {formattedPrice}
              </Typography>
              <Typography variant="body/small" style={styles.frequencyText}>
                /{paymentFrequency}
              </Typography>
            </View>
          </View>
        </View>

        <View style={styles.locationRow}>
          <MapPin size={18} color={COLORS.primary[800]} />
          <Typography variant="heading/small" style={styles.locationText} numberOfLines={1}>
            {`Bairro ${neighborhood}, ${city}/${state}`}
          </Typography>
        </View>

        <Typography variant="body/medium" style={styles.description} numberOfLines={2}>
          {description}
        </Typography>

        <View style={styles.ownerRow}>
          <UserCircle size={24} color={COLORS.neutral[700]} />
          <Typography variant="body/medium" style={styles.ownerText}>
            {`Locador: ${ownerName}`}
          </Typography>
        </View>
      </View>
    </Pressable>
  );
}