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
import LogoIcon from '../../../assets/logo-home.svg';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { useLogin } from '@/hooks/useLogin';
import { getErrorMessage } from '@/utils/errors';

export default function LoginScreen() {
  const router = useRouter();
  const { mutate: login, isPending, error } = useLogin();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(
      { cpf, password },
      { onSuccess: () => router.replace('/(tabs)/my-area') }
    );
  };

  const handleCreateAccount = () => {
    router.push('/auth/register');
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
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
          {/* Cabeçalho e Logo */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LogoIcon width={90} height={90} color={COLORS.primary[500]} />
            </View>
            <Typography variant="heading/large" style={styles.title}>
              Entre na sua conta
            </Typography>
            <Typography variant="body/medium" color={COLORS.neutral[700]} style={styles.subtitle}>
              Acesse para continuar
            </Typography>
          </View>

          {/* Formulário */}
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
              label="Senha"
              variant="password"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              containerStyle={styles.inputSpacing}
            />

            <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
              <Typography variant="body/medium" color={COLORS.primary[500]} style={styles.forgotPasswordText}>
                Esqueci minha senha
              </Typography>
            </TouchableOpacity>

            {error && (
              <Typography variant="body/small" color={COLORS.danger[500]} style={styles.errorText}>
                {getErrorMessage(error, 'CPF ou senha inválidos.')}
              </Typography>
            )}

            <Button
              label="Entrar"
              variant="primary"
              onPress={handleLogin}
              loading={isPending}
              style={styles.buttonCenter} // Força a centralização do texto interno
            />
          </View>

          {/* Rodapé / Criar Conta */}
          <View style={styles.footer}>
            <Typography variant="body/medium" color={COLORS.neutral[900]} style={styles.noAccountText}>
              Não tem uma conta?
            </Typography>
            <Button
              label="Criar conta"
              variant="outline"
              onPress={handleCreateAccount}
              style={styles.buttonCenter} // Força a centralização do texto interno
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
    backgroundColor: '#E8F5F3', // Tom esverdeado do fundo da imagem
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', // Centraliza todo o bloco verticalmente na tela
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
  errorText: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 16, // Removido o 'auto' para não esticar o layout até as bordas extremas
  },
  noAccountText: {
    textAlign: 'center',
    marginBottom: 12,
  },
  // Estilo adicionado para garantir que o texto do seu componente Button fique no centro
  buttonCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});