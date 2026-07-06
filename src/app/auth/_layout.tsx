import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { AppTabBar } from '@/components/organisms/AppTabBar';

export default function AuthLayout() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
        <Stack.Screen name="register-confirm" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="forgot-password-confirm" />
      </Stack>
      <AppTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
