import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import LogoIcon from '../../../assets/logo-home.svg';

export default function ForgotPasswordConfirmScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    router.push('/auth/');
  };

  const handleRestartRecovery = () => {
    router.push('/auth/forgot-password');
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
              label="Código"
              placeholder="000-000"
              keyboardType="numeric"
              value={code}
              onChangeText={setCode}
              containerStyle={styles.inputSpacing}
            />

            <Input
              label="Nova senha"
              variant="password"
              placeholder="Digite sua nova senha"
              value={newPassword}
              onChangeText={setNewPassword}
              containerStyle={styles.inputSpacing}
            />

            <Input
              label="Confirmar senha"
              variant="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              containerStyle={styles.inputSpacing}
            />

            <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleRestartRecovery}>
              <Typography variant="body/medium" color={COLORS.primary[500]} style={styles.forgotPasswordText}>
                Esqueci minha senha
              </Typography>
            </TouchableOpacity>

            <Button
              label="Alterar senha"
              variant="primary"
              onPress={handleChangePassword}
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -4,
  },
  forgotPasswordText: {
    fontWeight: '600',
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
