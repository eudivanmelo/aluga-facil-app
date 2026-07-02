import { useCallback, useState } from 'react';
import { MapMarker } from '@/components/molecules/MapMarker';
import { MOCK_MAP_PROPERTIES, MAP_CENTER, PropertyMapItem } from '@/data/mapProperties';
import { Camera, Map } from '@maplibre/maplibre-react-native';
import { styles } from './styles';
import { View } from 'react-native';

const STYLE_URL = 'https://tiles.versatiles.org/assets/styles/colorful/style.json';

const INITIAL_ZOOM = 14;

interface Props {
  onMarkerPress?: (property: PropertyMapItem | null) => void;
}

export function PropertyMap({ onMarkerPress }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleMarkerPress = useCallback(
    (id: string) => {
      const property = MOCK_MAP_PROPERTIES.find((p) => p.id === id);
      if (!property) return;

      setSelectedId((prev) => (prev === id ? null : id));

      if (selectedId === property.id)
        return onMarkerPress?.(null);

      onMarkerPress?.(property);
    },
    [onMarkerPress]
  );

  return (
    <View style={styles.container}>
      <Map
        style={styles.map}
        mapStyle={STYLE_URL}
        logo={false}
        attribution={false}
        compass={false}
      >
        <Camera
          center={[MAP_CENTER.longitude, MAP_CENTER.latitude]}
          zoom={INITIAL_ZOOM}
          duration={2000}
          easing='ease'
        />

        {MOCK_MAP_PROPERTIES.map((property) => (
          <MapMarker
            key={property.id}
            id={property.id}
            coordinate={[property.longitude, property.latitude]}
            price={property.price}
            isSelected={selectedId === property.id}
            onPress={handleMarkerPress}
          />
        ))}
      </Map>
    </View>
  );
}
