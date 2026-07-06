import React from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';

interface Props extends TextInputProps {
  onPressFilter?: () => void;
}

export function SearchInput({
  onPressFilter,
  placeholder = 'Buscar por bairro, tipo ou preço',
  style,
  ...props
}: Props) {
  return (
    <View style={styles.container}>
      <Search size={16} color={COLORS.primary[100]} strokeWidth={2} />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(230, 247, 246, 0.7)"
        style={[styles.input, style]}
        autoCorrect={false}
        autoCapitalize="none"
        selectionColor={COLORS.primary[100]}
        {...props}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Abrir filtros"
        hitSlop={10}
        onPress={onPressFilter}
        style={styles.filterButton}
      >
        <SlidersHorizontal size={16} color={COLORS.primary[100]} strokeWidth={2} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    minHeight: 32,
    paddingHorizontal: 8,
    backgroundColor: COLORS.primary[800],
    borderRadius: 8,
  },
  input: {
    flex: 1,
    color: COLORS.primary[100],
    fontSize: 12,
    lineHeight: 15,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  filterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
});