import { StyleSheet, View } from 'react-native';
import { PropertyMap } from '@/components/organisms/PropertyMap';
import { PropertyMapItem } from '@/data/mapProperties';
import { COLORS } from '@/constants/colors';

export default function MapScreen() {
  function handleMarkerPress(property: PropertyMapItem) {
  }

  return (
    <View style={styles.container}>
      <PropertyMap onMarkerPress={handleMarkerPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.neutral[200] },
});
