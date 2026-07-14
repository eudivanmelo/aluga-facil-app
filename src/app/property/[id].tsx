import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera, Map, Marker } from '@maplibre/maplibre-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Bath,
  BedDouble,
  Car,
  ChevronLeft,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  UserCircle,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { CarrouselDots } from '@/components/atoms/CarrouselDots';
import { VerifiedTag } from '@/components/molecules/VerifiedTag';
import { COLORS } from '@/constants/colors';
import { useProperty } from '@/hooks/useProperty';
import { formatPrice } from '@/utils/textFormat';
import { getErrorMessage } from '@/utils/errors';
import LocationPinIcon from '../../../assets/location-pin.svg';

const MAP_STYLE_URL = 'https://tiles.versatiles.org/assets/styles/colorful/style.json';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const propertyId = Number(id);
  const { data: property, isLoading, isError, error, refetch } = useProperty(propertyId);
  const [activePhoto, setActivePhoto] = useState(0);

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

  const handleCall = () => {
    if (!property) return;
    Linking.openURL(`tel:${property.owner.phone.replace(/[^\d+]/g, '')}`).catch(() =>
      Alert.alert('Não foi possível ligar', 'Verifique se há um aplicativo de telefone disponível.')
    );
  };

  const handleWhatsApp = () => {
    if (!property) return;
    Linking.openURL(property.whatsAppLink).catch(() =>
      Alert.alert('Não foi possível abrir o WhatsApp', 'Verifique se o aplicativo está instalado.')
    );
  };

  const handleRoute = () => {
    if (!property) return;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${property.latitude},${property.longitude}`;
    Linking.openURL(url).catch(() =>
      Alert.alert('Não foi possível abrir o mapa', 'Verifique se há um aplicativo de mapas disponível.')
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setActivePhoto(index);
  };

  const renderPhoto = ({ item }: ListRenderItemInfo<string>) => (
    <Image source={{ uri: item }} style={styles.photo} />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton} activeOpacity={0.75}>
          <ChevronLeft size={24} color={COLORS.neutral[100]} />
        </TouchableOpacity>
        <Typography variant="heading/small" color={COLORS.neutral[100]}>
          Detalhes do imóvel
        </Typography>
        <TouchableOpacity onPress={handleShare} style={styles.headerButton} activeOpacity={0.75}>
          <Share2 size={22} color={COLORS.neutral[100]} />
        </TouchableOpacity>
      </SafeAreaView>

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
          <FlatList
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            data={[property]}
            keyExtractor={() => 'detail'}
            renderItem={() => (
              <>
                <View style={styles.carouselWrapper}>
                  {property.photoUrls.length > 0 ? (
                    <FlatList
                      data={property.photoUrls}
                      keyExtractor={(uri) => uri}
                      renderItem={renderPhoto}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      onMomentumScrollEnd={handleScroll}
                    />
                  ) : (
                    <View style={[styles.photo, styles.photoPlaceholder]} />
                  )}

                  {property.photoUrls.length > 1 && (
                    <View style={styles.dotsWrapper}>
                      <CarrouselDots count={property.photoUrls.length} activeIndex={activePhoto} />
                    </View>
                  )}
                </View>

                <View style={styles.content}>
                  <View style={styles.card}>
                    <View style={styles.titleRow}>
                      <Typography variant="heading/large" style={styles.title}>
                        {property.title}
                      </Typography>
                      <View style={styles.priceRow}>
                        <Typography variant="heading/small" color={COLORS.primary[500]}>
                          {formatPrice(property.price)}
                        </Typography>
                        <Typography variant="body/small" color={COLORS.neutral[700]}>
                          {` / ${property.paymentFrequency}`}
                        </Typography>
                      </View>
                    </View>

                    <View style={styles.locationRow}>
                      <MapPin size={18} color={COLORS.primary[800]} />
                      <Typography variant="body/medium" color={COLORS.neutral[700]} numberOfLines={1} style={styles.locationText}>
                        {`Bairro ${property.neighborhood}, ${property.city}/${property.state}`}
                      </Typography>
                    </View>

                    <View style={styles.statsRow}>
                      <View style={styles.statPill}>
                        <BedDouble size={18} color={COLORS.primary[800]} />
                        <Typography variant="body/small" color={COLORS.neutral[700]}>
                          {`${property.bedrooms} quarto${property.bedrooms === 1 ? '' : 's'}`}
                        </Typography>
                      </View>
                      <View style={styles.statPill}>
                        <Bath size={18} color={COLORS.primary[800]} />
                        <Typography variant="body/small" color={COLORS.neutral[700]}>
                          {`${property.bathrooms} banheiro${property.bathrooms === 1 ? '' : 's'}`}
                        </Typography>
                      </View>
                      <View style={styles.statPill}>
                        <Car size={18} color={COLORS.primary[800]} />
                        <Typography variant="body/small" color={COLORS.neutral[700]}>
                          {`${property.parkingSpaces} vaga${property.parkingSpaces === 1 ? '' : 's'}`}
                        </Typography>
                      </View>
                    </View>
                  </View>

                  <View style={styles.card}>
                    <View style={styles.cardHeaderRow}>
                      <LocationPinIcon width={18} height={18} color={COLORS.primary[500]} />
                      <Typography variant="heading/small">Localização</Typography>
                    </View>

                    <Typography variant="body/medium" style={styles.addressLine}>
                      {`${property.street}, ${property.number}`}
                    </Typography>
                    <Typography variant="body/small" color={COLORS.neutral[700]} style={styles.addressLine}>
                      {`Bairro ${property.neighborhood}, ${property.city}/${property.state}`}
                    </Typography>

                    <View style={styles.mapPreview}>
                      <Map
                        style={styles.map}
                        mapStyle={MAP_STYLE_URL}
                        logo={false}
                        attribution={false}
                        compass={false}
                      >
                        <Camera center={[property.longitude, property.latitude]} zoom={15} />
                        <Marker lngLat={[property.longitude, property.latitude]} anchor="bottom">
                          <LocationPinIcon width={32} height={32} color={COLORS.primary[500]} />
                        </Marker>
                      </Map>
                    </View>

                    <Button label="Ver rota" variant="outline" onPress={handleRoute} style={styles.routeButton} />
                  </View>

                  <View style={styles.card}>
                    <Typography variant="heading/small" style={styles.cardTitle}>
                      Descrição
                    </Typography>
                    <Typography variant="body/medium" color={COLORS.neutral[700]} style={styles.description}>
                      {property.description}
                    </Typography>

                    <View style={styles.ownerRow}>
                      <UserCircle size={22} color={COLORS.neutral[700]} />
                      <Typography variant="body/medium" color={COLORS.neutral[700]} style={styles.ownerText}>
                        {`Locador: ${property.owner.name}`}
                      </Typography>
                      {property.owner.verified && <VerifiedTag />}
                    </View>
                  </View>
                </View>
              </>
            )}
          />

          <SafeAreaView edges={['bottom']} style={styles.footer}>
            <Button
              label="Ligar"
              variant="outline"
              leftIcon={<Phone size={18} color={COLORS.primary[500]} />}
              onPress={handleCall}
              style={styles.footerButton}
            />
            <Button
              label="WhatsApp"
              variant="primary"
              leftIcon={<MessageCircle size={18} color={COLORS.primary[100]} />}
              onPress={handleWhatsApp}
              style={styles.footerButton}
            />
          </SafeAreaView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary[500],
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
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
  carouselWrapper: {
    position: 'relative',
  },
  photo: {
    width: '100%',
    aspectRatio: 16 / 10,
  },
  photoPlaceholder: {
    backgroundColor: COLORS.neutral[400],
  },
  dotsWrapper: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.neutral[100],
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  titleRow: {
    gap: 4,
  },
  title: {
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary[100],
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    marginBottom: 4,
  },
  addressLine: {
    marginTop: 2,
  },
  mapPreview: {
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  map: {
    flex: 1,
  },
  routeButton: {
    justifyContent: 'center',
  },
  description: {
    lineHeight: 20,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ownerText: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: COLORS.neutral[100],
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral[200],
  },
  footerButton: {
    flex: 1,
    justifyContent: 'center',
  },
});
