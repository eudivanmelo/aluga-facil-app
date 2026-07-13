import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { InfoBanner } from '@/components/molecules/InfoBanner';
import { PhotoGrid } from '@/components/molecules/PhotoGrid';
import { WizardHeader } from '@/components/organisms/WizardHeader';
import { COLORS } from '@/constants/colors';
import { useNewProperty } from '@/contexts/NewPropertyContext';

const MIN_PHOTOS = 3;
const MAX_PHOTOS = 15;

export default function NewPropertyStep2Screen() {
  const router = useRouter();
  const { formData, updateFormData } = useNewProperty();
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
    if (formData.photos.length < MIN_PHOTOS) {
      setError(`Adicione pelo menos ${MIN_PHOTOS} fotos para continuar.`);
      return;
    }

    setError(null);
    router.push('/my-area/new-property/step-3');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <WizardHeader currentStep={2} onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Typography variant="heading/small" style={styles.sectionTitle}>
          Fotos do imóvel
        </Typography>
        <Typography variant="body/small" color={COLORS.neutral[700]} style={styles.sectionSubtitle}>
          Adicione fotos de qualidade para atrair mais interessados.
        </Typography>

        <InfoBanner
          message={`Adicione pelo menos ${MIN_PHOTOS} fotos. Você pode adicionar até ${MAX_PHOTOS} fotos.`}
        />

        <View style={styles.photoGrid}>
          <PhotoGrid
            photos={formData.photos}
            onChange={(photos) => updateFormData({ photos })}
            max={MAX_PHOTOS}
          />
        </View>

        {error && (
          <Typography variant="body/small" color={COLORS.danger[500]} style={styles.error}>
            {error}
          </Typography>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Continuar" variant="primary" onPress={handleContinue} style={styles.footerButton} />
        <Button
          label="Voltar"
          variant="outline"
          onPress={() => router.back()}
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
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  sectionSubtitle: {
    marginBottom: 20,
  },
  photoGrid: {
    marginTop: 16,
  },
  error: {
    marginTop: 16,
  },
  footer: {
    flexDirection: 'column',
    gap: 12,
    padding: 16,
    backgroundColor: COLORS.neutral[100],
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral[200],
  },
  footerButton: {
    justifyContent: 'center',
  },
});
