import React from 'react';
import {
    TouchableOpacity,
    View,
} from 'react-native';
import { Home, MapPin, LogIn, KeySquare } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { styles } from './styles';

// Gap above the safe-area inset (home indicator / Android system nav bar) so the
// floating tab bar never sits underneath it.
const BASE_BOTTOM_OFFSET = 12;

export type TabRoute = 'catalog' | 'map' | 'auth';

interface Tab {
    route: TabRoute;
    label: string;
    Icon: React.ElementType;
}

interface Props {
    activeRoute: TabRoute;
    isAuthenticated?: boolean;
    onPress: (route: TabRoute) => void;
}

const TABS_GUEST: Tab[] = [
    { route: 'catalog', label: 'Catálogo', Icon: Home },
    { route: 'map', label: 'Mapa', Icon: MapPin },
    { route: 'auth', label: 'Entrar', Icon: LogIn },
];

const TABS_LOGGED: Tab[] = [
    { route: 'catalog', label: 'Catálogo', Icon: Home },
    { route: 'map', label: 'Mapa', Icon: MapPin },
    { route: 'auth', label: 'Minha Área', Icon: KeySquare },
];

export function TabBar({ activeRoute, isAuthenticated = false, onPress }: Props) {
    const tabs = isAuthenticated ? TABS_LOGGED : TABS_GUEST;
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.wrapper, { bottom: insets.bottom + BASE_BOTTOM_OFFSET }]}>
            <BlurView intensity={40} tint="light" style={styles.container}>
                {tabs.map(({ route, label, Icon }) => {
                    const isActive = activeRoute === route;

                    return (
                        <TouchableOpacity
                            key={route}
                            activeOpacity={0.85}
                            onPress={() => onPress(route)}
                            style={[styles.button, isActive && styles.buttonActive]}
                        >
                            <Icon
                                size={32}
                                strokeWidth={2}
                                color={isActive ? COLORS.primary[100] : COLORS.primary[800]}
                            />
                            {isActive && (
                                <Typography variant="heading/small" style={styles.label}>
                                    {label}
                                </Typography>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </BlurView>
        </View>
    );
}