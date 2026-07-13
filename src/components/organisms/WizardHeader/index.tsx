import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { styles } from './styles';

const DEFAULT_STEPS = ['Informações', 'Fotos', 'Detalhes'];

interface Props {
  title?: string;
  currentStep: 1 | 2 | 3;
  steps?: string[];
  onBack: () => void;
}

export function WizardHeader({ title = 'Cadastrar Imóvel', currentStep, steps = DEFAULT_STEPS, onBack }: Props) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.75}>
          <ChevronLeft size={24} color={COLORS.neutral[100]} />
        </TouchableOpacity>

        <Typography variant="heading/small" color={COLORS.neutral[100]} style={styles.title}>
          {title}
        </Typography>
      </View>

      <View style={styles.stepsContainer}>
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isReached = stepNumber <= currentStep;

          return (
            <React.Fragment key={label}>
              {index > 0 && (
                <View
                  style={[styles.stepConnector, stepNumber <= currentStep && styles.stepConnectorFilled]}
                />
              )}

              <View style={styles.stepColumn}>
                <View style={[styles.circle, isReached && styles.circleFilled]}>
                  <Typography
                    variant="body/medium"
                    color={isReached ? COLORS.neutral[100] : COLORS.neutral[400]}
                  >
                    {stepNumber}
                  </Typography>
                </View>

                <Typography
                  variant="body/small"
                  color={isReached ? COLORS.primary[800] : COLORS.neutral[400]}
                  style={styles.stepLabel}
                >
                  {label}
                </Typography>
              </View>
            </React.Fragment>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
