import {  StyleSheet, View } from 'react-native';
import { Redirect } from 'expo-router';
//import { useAuth } from '../../contexts/AuthContext';
import { COLORS } from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const { isAuthenticated } = { isAuthenticated: false }; // Replace with your actual authentication logic

  if (isAuthenticated) return <Redirect href="/(tabs)/my-area" />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.neutral[200] },
  content: { flex: 1 },
});
