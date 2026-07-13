import React, { useState } from 'react';
import { FlatList, Modal, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Check, ChevronDown } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { SelectOption } from '@/constants/propertyOptions';
import { styles } from './styles';

interface Props {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  containerStyle?: ViewStyle;
}

export function Select({ label, placeholder = 'Selecione', options, value, onChange, containerStyle }: Props) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Typography variant="body/medium" style={styles.label}>
          {label}
        </Typography>
      )}

      <TouchableOpacity activeOpacity={0.75} style={styles.inputContainer} onPress={() => setOpen(true)}>
        <Typography
          variant="body/medium"
          color={selectedOption ? COLORS.neutral[900] : COLORS.neutral[400]}
          style={styles.valueText}
          numberOfLines={1}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Typography>

        <View style={styles.icon}>
          <ChevronDown size={20} color={COLORS.neutral[700]} />
        </View>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setOpen(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.sheet}>
            {label && (
              <Typography variant="heading/small" style={styles.sheetTitle}>
                {label}
              </Typography>
            )}

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <TouchableOpacity
                    activeOpacity={0.75}
                    style={[styles.option, isSelected && styles.optionSelected]}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Typography
                      variant="body/medium"
                      color={isSelected ? COLORS.primary[800] : COLORS.neutral[900]}
                    >
                      {item.label}
                    </Typography>

                    {isSelected && <Check size={18} color={COLORS.primary[800]} />}
                  </TouchableOpacity>
                );
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
