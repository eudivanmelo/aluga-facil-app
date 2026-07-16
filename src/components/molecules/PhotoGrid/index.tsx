import React from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, X } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  photos: string[];
  onChange: (photos: string[]) => void;
  max?: number;
}

export function PhotoGrid({ photos, onChange, max = 15 }: Props) {
  const remainingSlots = max - photos.length;
  const canAddMore = remainingSlots > 0;

  const handlePickFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso às suas fotos para adicionar imagens do imóvel.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: remainingSlots,
      quality: 0.7,
    });

    if (result.canceled) return;

    const newUris = result.assets.map((asset) => asset.uri);
    onChange([...photos, ...newUris].slice(0, max));
  };

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso à sua câmera para tirar fotos do imóvel.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });

    if (result.canceled) return;

    const newUris = result.assets.map((asset) => asset.uri);
    onChange([...photos, ...newUris].slice(0, max));
  };

  const handleAddPhotos = () => {
    Alert.alert('Adicionar foto', 'Escolha de onde deseja adicionar a foto.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Tirar foto', onPress: handleTakePhoto },
      { text: 'Escolher da galeria', onPress: handlePickFromLibrary },
    ]);
  };

  const handleRemove = (uri: string) => {
    onChange(photos.filter((photo) => photo !== uri));
  };

  return (
    <View style={styles.grid}>
      <TouchableOpacity
        activeOpacity={0.75}
        disabled={!canAddMore}
        style={[styles.addTile, !canAddMore && styles.addTileDisabled]}
        onPress={handleAddPhotos}
      >
        <Camera size={24} color={COLORS.primary[800]} />
        <Typography variant="body/small" color={COLORS.primary[800]} style={styles.addTileLabel}>
          Adicionar Foto
        </Typography>
      </TouchableOpacity>

      {photos.map((uri) => (
        <View key={uri} style={styles.photoTile}>
          <Image source={{ uri }} style={styles.photo} />
          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(uri)}>
            <X size={14} color={COLORS.neutral[100]} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
