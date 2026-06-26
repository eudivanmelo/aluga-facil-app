import { Text, TextProps, StyleSheet } from 'react-native';
import { TYPOGRAPHY, TypographyVariant } from '@/constants/typography';
import { COLORS } from '@/constants/colors';

interface Props extends TextProps {
  variant?: TypographyVariant;
  color?: string;
}

export function Typography({ variant = 'body/medium', color, style, ...props }: Props) {
  return (
    <Text
      style={[
        styles.base,
        TYPOGRAPHY[variant],
        { color: color ?? COLORS.neutral[900] },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Inter',
  },
});