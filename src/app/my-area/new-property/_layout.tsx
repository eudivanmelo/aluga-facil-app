import { Stack } from 'expo-router';
import { Redirect } from 'expo-router';
//import { useAuth } from '../../../contexts/AuthContext';

export default function NewPropertyLayout() {
  const { isAuthenticated } = { isAuthenticated: true }; // Replace with your actual authentication logic

  if (!isAuthenticated) return <Redirect href="/auth/" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="step-1" />
      <Stack.Screen name="step-2" />
      <Stack.Screen name="step-3" />
    </Stack>
  );
}
