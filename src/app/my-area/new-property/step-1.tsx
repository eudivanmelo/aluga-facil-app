import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { WizardHeader } from '@/components/organisms/WizardHeader';
import { COLORS } from '@/constants/colors';
import {
  BRAZILIAN_STATE_OPTIONS,
  PAYMENT_FREQUENCY_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from '@/constants/propertyOptions';
import { NewPropertyFormData, useNewProperty } from '@/contexts/NewPropertyContext';
import { useProperty } from '@/hooks/useProperty';
import { PropertyDetail } from '@/services/properties';

function mapPropertyDetailToFormData(property: PropertyDetail): NewPropertyFormData {
  const propertyType = PROPERTY_TYPE_OPTIONS.find((o) => property.tags.includes(o.label))?.value ?? '';
  const propertyTypeLabel = PROPERTY_TYPE_OPTIONS.find((o) => o.value === propertyType)?.label;
  const isSemiFurnished = property.tags.includes('Semi-mobiliado');
  const tags = property.tags.filter((tag) => tag !== propertyTypeLabel && tag !== 'Semi-mobiliado');

  return {
    title: property.title,
    description: property.description,
    propertyType,
    price: String(property.price),
    paymentFrequency: property.paymentFrequency,
    street: property.street,
    number: property.number,
    neighborhood: property.neighborhood,
    complement: property.complement,
    city: property.city,
    state: property.state,
    latitude: property.latitude,
    longitude: property.longitude,
    photos: property.photoUrls,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    parkingSpaces: property.parkingSpaces,
    petsAllowed: property.petsAllowed ? 'sim' : 'nao',
    furnished: !property.isFurnished ? 'nao-mobiliado' : isSemiFurnished ? 'semi-mobiliado' : 'mobiliado',
    tags,
  };
}

export default function NewPropertyStep1Screen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const editId = id ? Number(id) : null;
  const { formData, updateFormData, propertyId, setPropertyId } = useNewProperty();
  const [error, setError] = useState<string | null>(null);
  const loadedEditRef = useRef(false);

  const { data: editingProperty } = useProperty(editId ?? NaN);

  useEffect(() => {
    if (editId && editingProperty && !loadedEditRef.current) {
      loadedEditRef.current = true;
      setPropertyId(editId);
      updateFormData(mapPropertyDetailToFormData(editingProperty));
    }
  }, [editId, editingProperty]);

  const hasLocation = formData.latitude !== null && formData.longitude !== null;
  const isEditing = propertyId !== null;
  const waitingForEditData = !!editId && !loadedEditRef.current;

  const handleContinue = () => {
    if (
      !formData.title.trim() ||
      !formData.propertyType ||
      !formData.price.trim() ||
      !formData.city.trim() ||
      !formData.state
    ) {
      setError('Preencha ao menos título, tipo, valor, cidade e UF para continuar.');
      return;
    }

    setError(null);
    router.push('/my-area/new-property/step-2');
  };

  if (waitingForEditData) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
        <WizardHeader title="Editar Imóvel" currentStep={1} onBack={() => router.back()} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary[500]} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <WizardHeader
        title={isEditing ? 'Editar Imóvel' : 'Cadastrar Imóvel'}
        currentStep={1}
        onBack={() => router.back()}
      />

      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Typography variant="heading/small" style={styles.sectionTitle}>
            Informações básicas
          </Typography>
          <Typography variant="body/small" color={COLORS.neutral[700]} style={styles.sectionSubtitle}>
            Preencha os dados principais do seu anúncio.
          </Typography>

          <Input
            label="Título do anúncio"
            placeholder="Ex: Casa 2 quartos"
            value={formData.title}
            onChangeText={(title) => updateFormData({ title })}
            containerStyle={styles.field}
          />

          <Input
            label="Descrição"
            variant="textarea"
            placeholder="Conte mais sobre o imóvel, pontos de referências, comodidades etc."
            maxLength={1000}
            value={formData.description}
            onChangeText={(description) => updateFormData({ description })}
            containerStyle={styles.field}
          />

          <Select
            label="Tipo do imóvel"
            placeholder="Selecione o tipo do imóvel"
            options={PROPERTY_TYPE_OPTIONS}
            value={formData.propertyType}
            onChange={(propertyType) => updateFormData({ propertyType })}
            containerStyle={styles.field}
          />

          <View style={[styles.row, styles.field]}>
            <Input
              label="Valor"
              placeholder="R$ 0,00"
              keyboardType="numeric"
              value={formData.price}
              onChangeText={(price) => updateFormData({ price })}
              containerStyle={styles.rowItemLarge}
            />
            <Select
              label=" "
              placeholder="por mês"
              options={PAYMENT_FREQUENCY_OPTIONS}
              value={formData.paymentFrequency}
              onChange={(paymentFrequency) => updateFormData({ paymentFrequency })}
              containerStyle={styles.rowItemSmall}
            />
          </View>

          <View style={[styles.row, styles.field]}>
            <Input
              label="Logradouro"
              placeholder="Rua exemplo"
              value={formData.street}
              onChangeText={(street) => updateFormData({ street })}
              containerStyle={styles.rowItemLarge}
            />
            <Input
              label="Número"
              placeholder="00A"
              value={formData.number}
              onChangeText={(number) => updateFormData({ number })}
              containerStyle={styles.rowItemSmall}
            />
          </View>

          <View style={[styles.row, styles.field]}>
            <Input
              label="Bairro"
              placeholder="Centro"
              value={formData.neighborhood}
              onChangeText={(neighborhood) => updateFormData({ neighborhood })}
              containerStyle={styles.rowItemLarge}
            />
            <Input
              label="Complemento"
              placeholder="Casa"
              value={formData.complement}
              onChangeText={(complement) => updateFormData({ complement })}
              containerStyle={styles.rowItemLarge}
            />
          </View>

          <View style={[styles.row, styles.field]}>
            <Input
              label="Cidade"
              placeholder="Nome da cidade"
              value={formData.city}
              onChangeText={(city) => updateFormData({ city })}
              containerStyle={styles.rowItemLarge}
            />
            <Select
              label="UF"
              placeholder="UF"
              options={BRAZILIAN_STATE_OPTIONS}
              value={formData.state}
              onChange={(state) => updateFormData({ state })}
              containerStyle={styles.rowItemSmall}
            />
          </View>

          <Typography variant="body/medium" style={styles.locationLabel}>
            Localização no mapa (Opcional, mas recomendado)
          </Typography>
          <Button
            label={hasLocation ? 'Localização selecionada' : 'Selecionar no mapa'}
            variant="outline"
            leftIcon={<MapPin size={18} color={COLORS.primary[500]} />}
            onPress={() => router.push('/my-area/new-property/location')}
            style={styles.mapButton}
          />

          {error && (
            <Typography variant="body/small" color={COLORS.danger[500]} style={styles.error}>
              {error}
            </Typography>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Button label="Continuar" variant="primary" onPress={handleContinue} style={styles.footerButton} />
        <Button
          label="Cancelar"
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
  keyboardView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  field: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowItemLarge: {
    flex: 2,
    marginBottom: 0,
  },
  rowItemSmall: {
    flex: 1,
    marginBottom: 0,
  },
  locationLabel: {
    marginBottom: 8,
  },
  mapButton: {
    justifyContent: 'center',
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
