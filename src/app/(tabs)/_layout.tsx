import { Tabs, usePathname, useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { TabBar, TabRoute } from '../../components/organisms/TabBar';

function TabBarWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = { isAuthenticated: true };

  const activeRoute: TabRoute =
    pathname.startsWith('/map') ? 'map' :
      pathname.startsWith('/auth') || pathname.startsWith('/my-area') ? 'auth' :
        'catalog';

  function handlePress(route: TabRoute) {
    if (route === 'catalog') router.push('/(tabs)/');
    if (route === 'map') router.push('/(tabs)/map');
    if (route === 'auth') {
      if (true) router.push('/(tabs)/my-area');
      else router.push('/auth/');
    }
  }

  return (
    <TabBar
      activeRoute={activeRoute}
      isAuthenticated={isAuthenticated}
      onPress={handlePress}
    />
  );
}

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
        <TabBarWrapper />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
