import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { PropertyMap } from '@/components/organisms/PropertyMap';
import { PropertyMapItem } from '@/services/properties';
import { COLORS } from '@/constants/colors';
import { useState } from 'react';
import { MapCard } from '@/components/molecules/MapCard';
import { useMapProperties } from '@/hooks/useMapProperties';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { getErrorMessage } from '@/utils/errors';

export default function MapScreen() {
  const [selectedProperty, setSelectedProperty] = useState<PropertyMapItem | null>(null);
  const { data, isLoading, isError, error, refetch } = useMapProperties();

  function handleMarkerPress(property: PropertyMapItem | null) {
    setSelectedProperty(property);
  }

  if (isError) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Typography variant="body/medium" color={COLORS.neutral[700]} style={styles.errorText}>
          {getErrorMessage(error, 'Não foi possível carregar o mapa.')}
        </Typography>
        <Button label="Tentar novamente" variant="primary" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PropertyMap properties={data ?? []} onMarkerPress={handleMarkerPress} />

      {selectedProperty && <MapCard property={selectedProperty} />}

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary[500]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.neutral[200] },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 32,
  },
  errorText: {
    textAlign: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(247, 250, 252, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
