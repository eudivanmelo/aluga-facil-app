import { usePathname, useRouter } from 'expo-router';
import { TabBar, TabRoute } from '../TabBar';

function AppTabBarWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = { isAuthenticated: false }; // Substitua com a lógica real de autenticação

  const activeRoute: TabRoute =
    pathname.startsWith('/map') ? 'map' :
      pathname.startsWith('/auth') || pathname.startsWith('/my-area') ? 'auth' :
        'catalog';

  function handlePress(route: TabRoute) {
    if (route === 'catalog') router.push('/(tabs)/');
    if (route === 'map') router.push('/(tabs)/map');
    if (route === 'auth') {
      if (isAuthenticated) router.push('/(tabs)/my-area');
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

export function AppTabBar() {
  return <AppTabBarWrapper />;
}