import React from 'react';
import { View } from 'react-native';
import { Info } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  message: string;
}

export function InfoBanner({ message }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Info size={20} color={COLORS.primary[800]} />
      </View>

      <Typography variant="body/small" color={COLORS.primary[800]} style={styles.text}>
        {message}
      </Typography>
    </View>
  );
}
