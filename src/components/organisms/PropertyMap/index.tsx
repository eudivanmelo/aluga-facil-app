import { useCallback, useState } from 'react';
import { MapMarker } from '@/components/molecules/MapMarker';
import { PropertyMapItem } from '@/services/properties';
import { MAP_CENTER } from '@/data/mapProperties';
import { Camera, Map } from '@maplibre/maplibre-react-native';
import { styles } from './styles';
import { View } from 'react-native';

const STYLE_URL = 'https://tiles.versatiles.org/assets/styles/colorful/style.json';

const INITIAL_ZOOM = 14;

interface Props {
  properties: PropertyMapItem[];
  onMarkerPress?: (property: PropertyMapItem | null) => void;
}

export function PropertyMap({ properties, onMarkerPress }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleMarkerPress = useCallback(
    (id: string) => {
      if (selectedId === id) {
        setSelectedId(null);
        onMarkerPress?.(null);
        return;
      }

      const property = properties.find((p) => String(p.id) === id);
      if (!property) return;

      setSelectedId(id);
      onMarkerPress?.(property);
    },
    [selectedId, properties, onMarkerPress]
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

        {properties.map((property) => (
          <MapMarker
            key={property.id}
            id={String(property.id)}
            coordinate={[property.longitude, property.latitude]}
            price={property.price}
            isSelected={selectedId === String(property.id)}
            onPress={handleMarkerPress}
          />
        ))}
      </Map>
    </View>
  );
}
