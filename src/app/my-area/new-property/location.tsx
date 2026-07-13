import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { LocationPicker, Coordinate } from '@/components/organisms/LocationPicker';
import { COLORS } from '@/constants/colors';
import { useNewProperty } from '@/contexts/NewPropertyContext';

export default function NewPropertyLocationScreen() {
  const router = useRouter();
  const { formData, updateFormData } = useNewProperty();

  const [coordinate, setCoordinate] = useState<Coordinate | null>(
    formData.latitude !== null && formData.longitude !== null
      ? { latitude: formData.latitude, longitude: formData.longitude }
      : null
  );

  const handleConfirm = () => {
    if (coordinate) {
      updateFormData({ latitude: coordinate.latitude, longitude: coordinate.longitude });
    }
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.75}>
            <ChevronLeft size={24} color={COLORS.neutral[100]} />
          </TouchableOpacity>

          <Typography variant="heading/small" color={COLORS.neutral[100]}>
            Selecionar localização
          </Typography>
        </View>
      </SafeAreaView>

      <LocationPicker initialCoordinate={coordinate} onCoordinateChange={setCoordinate} />

      <View style={styles.footer}>
        <Button
          label="Confirmar localização"
          variant="primary"
          onPress={handleConfirm}
          disabled={!coordinate}
          style={styles.footerButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.neutral[200],
  },
  headerSafeArea: {
    backgroundColor: COLORS.primary[500],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    padding: 16,
    backgroundColor: COLORS.neutral[100],
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral[200],
  },
  footerButton: {
    justifyContent: 'center',
  },
});
