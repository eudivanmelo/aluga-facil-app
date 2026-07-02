import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
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
