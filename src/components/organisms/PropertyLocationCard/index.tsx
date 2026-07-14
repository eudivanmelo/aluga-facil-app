import { Alert, Linking, View } from 'react-native';
import { Camera, Map, Marker } from '@maplibre/maplibre-react-native';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { COLORS } from '@/constants/colors';
import LocationPinIcon from '../../../../assets/location-pin.svg';
import { styles } from './styles';

const MAP_STYLE_URL = 'https://tiles.versatiles.org/assets/styles/colorful/style.json';

interface Props {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export function PropertyLocationCard({
  street,
  number,
  neighborhood,
  city,
  state,
  latitude,
  longitude,
}: Props) {
  const handleRoute = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch(() =>
      Alert.alert('Não foi possível abrir o mapa', 'Verifique se há um aplicativo de mapas disponível.')
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <LocationPinIcon width={18} height={18} color={COLORS.primary[500]} />
        <Typography variant="heading/small">Localização</Typography>
      </View>

      <Typography variant="body/medium" style={styles.addressLine}>
        {`${street}, ${number}`}
      </Typography>
      <Typography variant="body/small" color={COLORS.neutral[700]} style={styles.addressLine}>
        {`Bairro ${neighborhood}, ${city}/${state}`}
      </Typography>

      <View style={styles.mapPreview}>
        <Map style={styles.map} mapStyle={MAP_STYLE_URL} logo={false} attribution={false} compass={false}>
          <Camera center={[longitude, latitude]} zoom={15} />
          <Marker lngLat={[longitude, latitude]} anchor="bottom">
            <LocationPinIcon width={32} height={32} color={COLORS.primary[500]} />
          </Marker>
        </Map>
      </View>

      <Button label="Ver rota" variant="outline" onPress={handleRoute} style={styles.routeButton} />
    </View>
  );
}
