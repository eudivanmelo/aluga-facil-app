import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { Button } from '@/components/atoms/Button';
import LogoIcon from '../../../assets/logo-home.svg';

export default function RegisterConfirmScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();

  const handleBackToLogin = () => {
    router.push('/auth/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <LogoIcon width={90} height={90} color={COLORS.primary[500]} />
          </View>
          <Typography variant="heading/large" style={styles.title}>
            Quase lá!
          </Typography>
          <Typography variant="body/medium" color={COLORS.neutral[700]} style={styles.subtitle}>
            Enviamos um e-mail para você
          </Typography>
        </View>

        <Typography variant="body/medium" color={COLORS.neutral[700]} style={styles.paragraph}>
          Para ativar sua conta e começar a usar o Aluga Fácil, clique no link que enviamos para:
        </Typography>

        <View style={styles.emailPill}>
          <Typography variant="body/medium" color={COLORS.primary[800]}>
            {email || 'seu@email.com'}
          </Typography>
        </View>

        <Typography variant="body/small" color={COLORS.neutral[700]} style={styles.paragraph}>
          Não encontrou o e-mail? Verifique sua caixa de entrada, a pasta de spam ou o lixo eletrônico.
        </Typography>

        <Button
          label="Voltar para o login"
          variant="primary"
          onPress={handleBackToLogin}
          style={[styles.buttonCenter, styles.buttonSpacing]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F5F3',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  paragraph: {
    textAlign: 'center',
    marginBottom: 16,
  },
  emailPill: {
    alignSelf: 'center',
    backgroundColor: COLORS.primary[100],
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  buttonCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSpacing: {
    marginTop: 8,
  },
});
