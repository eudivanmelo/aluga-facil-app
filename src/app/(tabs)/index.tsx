import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { HomeHeader } from '@/components/organisms/HomeHeader';
import { PropertyCard } from '@/components/molecules/PropertyCard';
import { COLORS } from '@/constants/colors';

type HomeProperty = {
  id: string;
  title: string;
  price: number;
  paymentFrequency: string;
  neighborhood: string;
  city: string;
  state: string;
  description: string;
  ownerName: string;
  imageUrl?: string;
};

const BASE_PROPERTIES: Omit<HomeProperty, 'id' | 'price'>[] = [
  {
    title: 'Apartamento moderno e arejado',
    paymentFrequency: 'mês',
    neighborhood: 'Centro',
    city: 'Natal',
    state: 'RN',
    description: 'Apartamento com suíte, varanda e vaga coberta perto de tudo.',
    ownerName: 'Maria Silva',
  },
  {
    title: 'Casa térrea com quintal',
    paymentFrequency: 'mês',
    neighborhood: 'Ponta Negra',
    city: 'Natal',
    state: 'RN',
    description: 'Casa ampla, ventilada, ideal para família e pets.',
    ownerName: 'João Pedro',
  },
  {
    title: 'Kitnet mobiliada e prática',
    paymentFrequency: 'mês',
    neighborhood: 'Tirol',
    city: 'Natal',
    state: 'RN',
    description: 'Perfeita para quem quer economizar sem abrir mão da localização.',
    ownerName: 'Ana Costa',
  },
  {
    title: 'Studio compacto com vista',
    paymentFrequency: 'mês',
    neighborhood: 'Lagoa Nova',
    city: 'Natal',
    state: 'RN',
    description: 'Ambiente moderno, pronto para morar, com acabamentos novos.',
    ownerName: 'Lucas Lima',
  },
  {
    title: 'Cobertura com área gourmet',
    paymentFrequency: 'mês',
    neighborhood: 'Capim Macio',
    city: 'Natal',
    state: 'RN',
    description: 'Espaço premium para receber amigos com conforto e privacidade.',
    ownerName: 'Fernanda Souza',
  },
  {
    title: 'Apartamento próximo à praia',
    paymentFrequency: 'mês',
    neighborhood: 'Areia Preta',
    city: 'Natal',
    state: 'RN',
    description: 'Localização estratégica com fácil acesso a comércio e lazer.',
    ownerName: 'Carlos Mendes',
  },
];

const PAGE_SIZE = 8;

function createPropertyBatch(page: number): HomeProperty[] {
  return Array.from({ length: PAGE_SIZE }, (_, index) => {
    const template = BASE_PROPERTIES[(page * PAGE_SIZE + index) % BASE_PROPERTIES.length];
    const ordinal = page * PAGE_SIZE + index + 1;

    return {
      id: `${page}-${ordinal}`,
      title: template.title,
      price: 600 + (ordinal % 6) * 250,
      paymentFrequency: template.paymentFrequency,
      neighborhood: template.neighborhood,
      city: template.city,
      state: template.state,
      description: template.description,
      ownerName: template.ownerName,
      imageUrl: template.imageUrl,
    };
  });
}

export default function HomeScreen() {
  const pageRef = useRef(0);
  const [properties, setProperties] = useState<HomeProperty[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const resetList = useCallback(() => {
    pageRef.current = 0;
    setProperties(createPropertyBatch(0));
  }, []);

  const loadNextPage = useCallback(() => {
    const nextPage = pageRef.current + 1;
    pageRef.current = nextPage;
    setProperties((current) => [...current, ...createPropertyBatch(nextPage)]);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      resetList();
      setIsInitialLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [resetList]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);

    setTimeout(() => {
      resetList();
      setIsRefreshing(false);
    }, 700);
  }, [resetList]);

  const handleEndReached = useCallback(() => {
    if (isInitialLoading || isRefreshing || isLoadingMore) return;

    setIsLoadingMore(true);

    setTimeout(() => {
      loadNextPage();
      setIsLoadingMore(false);
    }, 700);
  }, [isInitialLoading, isLoadingMore, isRefreshing, loadNextPage]);

  const renderProperty = useCallback(
    ({ item }: ListRenderItemInfo<HomeProperty>) => (
      <Pressable onPress={() => router.push(`/property/${item.id}`)} style={styles.cardWrapper}>
        <PropertyCard
          title={item.title}
          price={item.price}
          paymentFrequency={item.paymentFrequency}
          neighborhood={item.neighborhood}
          city={item.city}
          state={item.state}
          description={item.description}
          ownerName={item.ownerName}
          imageUrl={item.imageUrl}
        />
      </Pressable>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <HomeHeader />

      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={renderProperty}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.35}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        ListFooterComponent={
          isLoadingMore ? (
            <View style={styles.footerLoading}>
              <ActivityIndicator size="large" color={COLORS.primary[500]} />
            </View>
          ) : (
            <View style={styles.footerSpacer} />
          )
        }
      />

      {isInitialLoading && (
        <View style={styles.initialLoadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary[500]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral[200],
    position: 'relative',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 128,
  },
  cardWrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  footerLoading: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerSpacer: {
    height: 24,
  },
  initialLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(247, 250, 252, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
