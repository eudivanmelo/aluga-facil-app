import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Info } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import LogoIcon from '../../../assets/logo-home.svg';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');

  const handleSendCode = () => {
    router.push('/auth/forgot-password-confirm');
  };

  const handleBackToLogin = () => {
    router.push('/auth/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LogoIcon width={90} height={90} color={COLORS.primary[500]} />
            </View>
            <Typography variant="heading/large" style={styles.title}>
              Recuperar senha
            </Typography>
            <Typography variant="body/medium" color={COLORS.neutral[700]} style={styles.subtitle}>
              Vamos te ajudar a acessar sua conta
            </Typography>
          </View>

          <View style={styles.formContainer}>
            <Input
              label="CPF"
              placeholder="000.000.000-00"
              keyboardType="numeric"
              value={cpf}
              onChangeText={setCpf}
              containerStyle={styles.inputSpacing}
            />

            <View style={styles.infoBox}>
              <Info size={20} color={COLORS.primary[500]} />
              <Typography variant="body/small" color={COLORS.neutral[700]} style={styles.infoText}>
                Enviaremos um código de recuperação para o e-mail e whatsapp cadastrado em sua conta.
              </Typography>
            </View>

            <Button
              label="Enviar código de recuperação"
              variant="primary"
              onPress={handleSendCode}
              style={styles.buttonCenter}
            />

            <Button
              label="Voltar para o login"
              variant="outline"
              onPress={handleBackToLogin}
              style={[styles.buttonCenter, styles.buttonSpacing]}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F5F3',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
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
  formContainer: {
    marginBottom: 24,
  },
  inputSpacing: {
    marginBottom: 16,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
  },
  buttonCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSpacing: {
    marginTop: 12,
  },
});
