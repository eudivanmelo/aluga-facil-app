import React, { useEffect, useState } from 'react';
import { ActivityIndicator, NativeSyntheticEvent, View } from 'react-native';
import * as Location from 'expo-location';
import { Camera, Map, Marker, PressEvent } from '@maplibre/maplibre-react-native';
import { MAP_CENTER } from '@/data/mapProperties';
import { COLORS } from '@/constants/colors';
import LocationPinIcon from '../../../../assets/location-pin.svg';
import { styles } from './styles';

const STYLE_URL = 'https://tiles.versatiles.org/assets/styles/colorful/style.json';
const INITIAL_ZOOM = 15;

export interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Props {
  initialCoordinate?: Coordinate | null;
  onCoordinateChange: (coordinate: Coordinate) => void;
}

export function LocationPicker({ initialCoordinate, onCoordinateChange }: Props) {
  const [cameraCenter, setCameraCenter] = useState<[number, number] | null>(null);
  const [marker, setMarker] = useState<[number, number] | null>(
    initialCoordinate ? [initialCoordinate.longitude, initialCoordinate.latitude] : null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (initialCoordinate) {
        setCameraCenter([initialCoordinate.longitude, initialCoordinate.latitude]);
        setLoading(false);
        return;
      }

      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.granted) {
        const position = await Location.getCurrentPositionAsync();
        const coordinate: [number, number] = [position.coords.longitude, position.coords.latitude];

        setCameraCenter(coordinate);
        setMarker(coordinate);
        onCoordinateChange({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      } else {
        setCameraCenter([MAP_CENTER.longitude, MAP_CENTER.latitude]);
      }

      setLoading(false);
    })();
  }, [initialCoordinate, onCoordinateChange]);

  const handleMapPress = (event: NativeSyntheticEvent<PressEvent>) => {
    const [longitude, latitude] = event.nativeEvent.lngLat;
    setMarker([longitude, latitude]);
    onCoordinateChange({ latitude, longitude });
  };

  if (loading || !cameraCenter) {
    return (
      <View style={[styles.container, styles.loadingOverlay]}>
        <ActivityIndicator size="large" color={COLORS.primary[500]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Map
        style={styles.map}
        mapStyle={STYLE_URL}
        logo={false}
        attribution={false}
        compass={false}
        onPress={handleMapPress}
      >
        <Camera center={cameraCenter} zoom={INITIAL_ZOOM} duration={1000} easing="ease" />

        {marker && (
          <Marker lngLat={marker} anchor="bottom">
            <View style={styles.markerWrapper}>
              <LocationPinIcon width={36} height={36} color={COLORS.primary[500]} />
            </View>
          </Marker>
        )}
      </Map>
    </View>
  );
}
