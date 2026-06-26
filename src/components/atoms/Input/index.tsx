import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { styles } from './styles';

type Variant = 'default' | 'password' | 'textarea';

interface Props extends TextInputProps {
  label?: string;
  variant?: Variant;
  rightIcon?: React.ReactNode;
  maxLength?: number;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  variant = 'default',
  rightIcon,
  maxLength,
  containerStyle,
  style,
  value,
  ...props
}: Props) {
  const [visible, setVisible] = useState(false);

  const isPassword = variant === 'password';
  const isTextarea = variant === 'textarea';

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Typography variant="body/medium" style={styles.label}>
          {label}
        </Typography>
      )}

      <View style={[styles.inputContainer, isTextarea && styles.textareaContainer]}>
        <TextInput
          style={[styles.input, isTextarea && styles.textareaInput, style]}
          placeholderTextColor={COLORS.neutral[400]}
          secureTextEntry={isPassword && !visible}
          multiline={isTextarea}
          textAlignVertical={isTextarea ? 'top' : 'center'}
          maxLength={maxLength}
          value={value}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setVisible(v => !v)} style={styles.icon}>
            {visible
              ? <EyeOff size={24} color={COLORS.neutral[700]} />
              : <Eye size={24} color={COLORS.neutral[700]} />}
          </TouchableOpacity>
        )}

        {!isPassword && rightIcon && (
          <View style={styles.icon}>{rightIcon}</View>
        )}

        {isTextarea && maxLength && (
          <Typography variant="body/medium" style={styles.counter}>
            {value?.length ?? 0}/{maxLength}
          </Typography>
        )}
      </View>
    </View>
  );
}