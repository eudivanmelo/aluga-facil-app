import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Select } from '@/components/atoms/Select';
import { Stepper } from '@/components/atoms/Stepper';
import { TagInput } from '@/components/molecules/TagInput';
import { WizardHeader } from '@/components/organisms/WizardHeader';
import { COLORS } from '@/constants/colors';
import { FURNISHED_OPTIONS, PETS_ALLOWED_OPTIONS, PROPERTY_TYPE_OPTIONS } from '@/constants/propertyOptions';
import { useNewProperty } from '@/contexts/NewPropertyContext';
import { useCreateProperty } from '@/hooks/useCreateProperty';
import { useUpdateProperty } from '@/hooks/useUpdateProperty';
import { getErrorMessage } from '@/utils/errors';
import { parsePriceInput } from '@/utils/textFormat';

export default function NewPropertyStep3Screen() {
  const router = useRouter();
  const { formData, updateFormData, resetFormData, propertyId } = useNewProperty();
  const isEditing = propertyId !== null;
  const { mutate: createProperty, isPending: isCreating, error: createError } = useCreateProperty();
  const { mutate: updateProperty, isPending: isUpdating, error: updateError } = useUpdateProperty();
  const isPending = isCreating || isUpdating;
  const submitError = createError ?? updateError;
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!formData.petsAllowed || !formData.furnished) {
      setError('Selecione se o imóvel aceita animais e a situação de mobília.');
      return;
    }

    if (formData.latitude === null || formData.longitude === null) {
      setError('Selecione a localização do imóvel no mapa antes de confirmar.');
      return;
    }

    setError(null);

    // O backend ainda não tem um campo dedicado para "tipo do imóvel" nem para a opção
    // "semi-mobiliado" — preservamos essa informação como tags de categorização.
    const propertyTypeLabel = PROPERTY_TYPE_OPTIONS.find((o) => o.value === formData.propertyType)?.label;
    const extraTags = [
      propertyTypeLabel,
      formData.furnished === 'semi-mobiliado' ? 'Semi-mobiliado' : null,
    ].filter((tag): tag is string => !!tag && !formData.tags.includes(tag));

    const payload = {
      title: formData.title,
      description: formData.description,
      price: parsePriceInput(formData.price),
      paymentFrequency: formData.paymentFrequency || 'mês',
      street: formData.street,
      number: formData.number,
      neighborhood: formData.neighborhood,
      complement: formData.complement,
      city: formData.city,
      state: formData.state,
      latitude: formData.latitude,
      longitude: formData.longitude,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      parkingSpaces: formData.parkingSpaces,
      petsAllowed: formData.petsAllowed === 'sim',
      isFurnished: formData.furnished !== 'nao-mobiliado',
      tags: [...formData.tags, ...extraTags],
      photos: formData.photos,
    };

    const onSuccess = () => {
      Alert.alert(
        isEditing ? 'Imóvel atualizado!' : 'Imóvel cadastrado!',
        isEditing ? 'As alterações foram salvas com sucesso.' : 'Seu anúncio foi criado com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => {
              resetFormData();
              router.replace('/(tabs)/my-area');
            },
          },
        ]
      );
    };

    if (propertyId !== null) {
      updateProperty({ id: propertyId, ...payload }, { onSuccess });
    } else {
      createProperty(payload, { onSuccess });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <WizardHeader
        title={isEditing ? 'Editar Imóvel' : 'Cadastrar Imóvel'}
        currentStep={3}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Typography variant="heading/small" style={styles.sectionTitle}>
          Detalhes do imóvel
        </Typography>
        <Typography variant="body/small" color={COLORS.neutral[700]} style={styles.sectionSubtitle}>
          Informe as características e comodidades do imóvel.
        </Typography>

        <Typography variant="body/medium" style={styles.groupTitle}>
          Características
        </Typography>

        <View style={styles.steppersRow}>
          <Stepper
            label="Quartos"
            value={formData.bedrooms}
            onChange={(bedrooms) => updateFormData({ bedrooms })}
            min={0}
            containerStyle={styles.stepperItem}
          />
          <Stepper
            label="Banheiros"
            value={formData.bathrooms}
            onChange={(bathrooms) => updateFormData({ bathrooms })}
            min={0}
            containerStyle={styles.stepperItem}
          />
          <Stepper
            label="Vagas de garagem"
            value={formData.parkingSpaces}
            onChange={(parkingSpaces) => updateFormData({ parkingSpaces })}
            min={0}
            containerStyle={styles.stepperItem}
          />
        </View>

        <View style={[styles.row, styles.field]}>
          <Select
            label="Aceita animais?"
            options={PETS_ALLOWED_OPTIONS}
            value={formData.petsAllowed}
            onChange={(petsAllowed) => updateFormData({ petsAllowed })}
            containerStyle={styles.rowItem}
          />
          <Select
            label="Mobília?"
            options={FURNISHED_OPTIONS}
            value={formData.furnished}
            onChange={(furnished) => updateFormData({ furnished })}
            containerStyle={styles.rowItem}
          />
        </View>

        <TagInput
          label="Tags"
          tags={formData.tags}
          onChange={(tags) => updateFormData({ tags })}
        />

        {(error || submitError) && (
          <Typography variant="body/small" color={COLORS.danger[500]} style={styles.error}>
            {error ?? getErrorMessage(submitError, isEditing ? 'Não foi possível salvar as alterações.' : 'Não foi possível cadastrar o imóvel.')}
          </Typography>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={isEditing ? 'Salvar alterações' : 'Confirmar'}
          variant="primary"
          onPress={handleConfirm}
          loading={isPending}
          style={styles.footerButton}
        />
        <Button
          label="Voltar"
          variant="outline"
          onPress={() => router.back()}
          disabled={isPending}
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
  groupTitle: {
    marginBottom: 12,
  },
  steppersRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  stepperItem: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowItem: {
    flex: 1,
  },
  field: {
    marginBottom: 20,
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
