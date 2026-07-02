import { StyleSheet, View } from 'react-native';
import { PropertyMap } from '@/components/organisms/PropertyMap';
import { PropertyMapItem } from '@/data/mapProperties';
import { COLORS } from '@/constants/colors';
import { useState } from 'react';
import { MapCard } from '@/components/molecules/MapCard';

export default function MapScreen() {
  const [selectedProperty, setSelectedProperty] = useState<PropertyMapItem | null>(null);

  function handleMarkerPress(property: PropertyMapItem | null) {
    setSelectedProperty(property);

    console.log('Selected property:', property);
  }

  return (
    <View style={styles.container}>
      <PropertyMap onMarkerPress={handleMarkerPress} />

      {selectedProperty && <MapCard />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.neutral[200] },
});
