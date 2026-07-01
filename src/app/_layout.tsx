import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" />
          <Stack.Screen
            name="property/[id]"
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="my-area/new-property"
            options={{ animation: 'slide_from_bottom' }}
          />
        </Stack>

    </QueryClientProvider>
  );
}
