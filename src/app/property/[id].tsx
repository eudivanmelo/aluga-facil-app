import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../constants/colors';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text>Property Detail Screen - ID: {id}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.neutral[200] },
  content: { flex: 1 },
});
