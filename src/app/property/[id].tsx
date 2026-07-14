import { ActivityIndicator, ScrollView, Share, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { PhotoCarousel } from '@/components/molecules/PhotoCarousel';
import { PropertyDetailHeader } from '@/components/organisms/PropertyDetailHeader';
import { PropertyInfoCard } from '@/components/organisms/PropertyInfoCard';
import { PropertyLocationCard } from '@/components/organisms/PropertyLocationCard';
import { PropertyDescriptionCard } from '@/components/organisms/PropertyDescriptionCard';
import { PropertyContactFooter } from '@/components/organisms/PropertyContactFooter';
import { COLORS } from '@/constants/colors';
import { useProperty } from '@/hooks/useProperty';
import { formatPrice } from '@/utils/textFormat';
import { getErrorMessage } from '@/utils/errors';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const propertyId = Number(id);
  const { data: property, isLoading, isError, error, refetch } = useProperty(propertyId);

  const handleShare = async () => {
    if (!property) return;
    try {
      await Share.share({
        message: `${property.title} - ${formatPrice(property.price)}/${property.paymentFrequency}\n${property.street}, ${property.number} - Bairro ${property.neighborhood}, ${property.city}/${property.state}`,
      });
    } catch {
      // Usuário cancelou o compartilhamento; nada a fazer.
    }
  };

  return (
    <View style={styles.container}>
      <PropertyDetailHeader onBack={() => router.back()} onShare={handleShare} />

      {isLoading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary[500]} />
        </View>
      )}

      {isError && (
        <View style={styles.centered}>
          <Typography variant="body/medium" color={COLORS.neutral[700]} style={styles.errorText}>
            {getErrorMessage(error, 'Não foi possível carregar o imóvel.')}
          </Typography>
          <Button label="Tentar novamente" variant="primary" onPress={() => refetch()} />
        </View>
      )}

      {property && (
        <>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <PhotoCarousel photoUrls={property.photoUrls} />

            <View style={styles.content}>
              <PropertyInfoCard
                title={property.title}
                price={property.price}
                paymentFrequency={property.paymentFrequency}
                neighborhood={property.neighborhood}
                city={property.city}
                state={property.state}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                parkingSpaces={property.parkingSpaces}
              />

              <PropertyLocationCard
                street={property.street}
                number={property.number}
                neighborhood={property.neighborhood}
                city={property.city}
                state={property.state}
                latitude={property.latitude}
                longitude={property.longitude}
              />

              <PropertyDescriptionCard
                description={property.description}
                ownerName={property.owner.name}
                ownerVerified={property.owner.verified}
              />
            </View>
          </ScrollView>

          <PropertyContactFooter phone={property.owner.phone} whatsAppLink={property.whatsAppLink} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral[200],
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 32,
  },
  errorText: {
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  content: {
    padding: 16,
    gap: 16,
  },
});
