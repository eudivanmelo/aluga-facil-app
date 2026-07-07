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
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import LogoIcon from '../../../assets/logo-home.svg';
import { useRegister } from '@/hooks/useRegister';
import { getErrorMessage } from '@/utils/errors';

export default function RegisterScreen() {
  const router = useRouter();
  const { mutate: register, isPending, error } = useRegister();
  const [cpf, setCpf] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleRegister = () => {
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError('As senhas não coincidem.');
      return;
    }

    register(
      { cpf, name: fullName, email, password, phone },
      { onSuccess: () => router.push({ pathname: '/auth/register-confirm', params: { email } }) }
    );
  };

  const handleGoToLogin = () => {
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
              Criar conta
            </Typography>
            <Typography variant="body/medium" color={COLORS.neutral[700]} style={styles.subtitle}>
              Preencha seus dados para começar
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

            <Input
              label="Nome completo"
              placeholder="Digite seu nome completo"
              value={fullName}
              onChangeText={setFullName}
              containerStyle={styles.inputSpacing}
            />

            <Input
              label="E-mail"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              containerStyle={styles.inputSpacing}
            />

            <Input
              label="Telefone"
              placeholder="00 00000-0000"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              containerStyle={styles.inputSpacing}
            />

            <Input
              label="Senha"
              variant="password"
              placeholder="Mínimo de 8 caracteres"
              value={password}
              onChangeText={setPassword}
              containerStyle={styles.inputSpacing}
            />

            <Input
              label="Confirmar senha"
              variant="password"
              placeholder="Digite sua senha novamente"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              containerStyle={styles.inputSpacing}
            />

            {(validationError || error) && (
              <Typography variant="body/small" color={COLORS.danger[500]} style={styles.errorText}>
                {validationError ?? getErrorMessage(error, 'Não foi possível criar sua conta.')}
              </Typography>
            )}

            <Button
              label="Criar conta"
              variant="primary"
              onPress={handleRegister}
              loading={isPending}
              style={styles.buttonCenter}
            />
          </View>

          <View style={styles.footer}>
            <Typography variant="body/medium" color={COLORS.neutral[900]} style={styles.noAccountText}>
              Já tem uma conta?
            </Typography>
            <Button
              label="Acessar sua conta"
              variant="outline"
              onPress={handleGoToLogin}
              style={styles.buttonCenter}
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
  errorText: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 16,
  },
  noAccountText: {
    textAlign: 'center',
    marginBottom: 12,
  },
  buttonCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
