import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { AppTabBar } from '../../components/organisms/AppTabBar';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
        <Tabs
          screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="map" />
          <Tabs.Screen name="my-area" />
        </Tabs>
        <AppTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
