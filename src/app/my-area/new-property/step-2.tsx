import { SafeAreaView, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants/colors';

export default function NewPropertyStep2Screen() {
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
