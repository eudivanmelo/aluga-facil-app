import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  containerStyle?: ViewStyle;
}

export function Stepper({ label, value, onChange, min = 0, max, containerStyle }: Props) {
  const canDecrement = value > min;
  const canIncrement = max === undefined || value < max;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Typography variant="body/medium" style={styles.label}>
          {label}
        </Typography>
      )}

      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.75}
          disabled={!canDecrement}
          style={[styles.button, !canDecrement && styles.buttonDisabled]}
          onPress={() => onChange(value - 1)}
        >
          <Minus size={16} color={COLORS.neutral[100]} />
        </TouchableOpacity>

        <Typography variant="body/medium" style={styles.value}>
          {value}
        </Typography>

        <TouchableOpacity
          activeOpacity={0.75}
          disabled={!canIncrement}
          style={[styles.button, !canIncrement && styles.buttonDisabled]}
          onPress={() => onChange(value + 1)}
        >
          <Plus size={16} color={COLORS.neutral[100]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
