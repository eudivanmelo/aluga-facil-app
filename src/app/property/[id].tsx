import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../constants/colors';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

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
