import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { HomeHeader } from '@/components/organisms/HomeHeader';
import { PropertyCard } from '@/components/molecules/PropertyCard';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { COLORS } from '@/constants/colors';
import { useProperties } from '@/hooks/useProperties';
import { PropertySummary } from '@/services/properties';
import { getErrorMessage } from '@/utils/errors';

export default function HomeScreen() {
  const {
    data,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isError,
    error,
  } = useProperties();

  const properties = data?.pages.flatMap((page) => page.data) ?? [];

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderProperty = useCallback(
    ({ item }: ListRenderItemInfo<PropertySummary>) => (
      <View style={styles.cardWrapper}>
        <PropertyCard
          title={item.title}
          price={item.price}
          paymentFrequency={item.paymentFrequency}
          neighborhood={item.neighborhood}
          city={item.city}
          state={item.state}
          imageUrl={item.firstPhotoUrl ?? undefined}
          onPress={() => router.push(`/property/${item.id}`)}
        />
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <HomeHeader />

      {isError ? (
        <View style={styles.errorContainer}>
          <Typography variant="body/medium" color={COLORS.neutral[700]} style={styles.errorText}>
            {getErrorMessage(error, 'Não foi possível carregar os imóveis.')}
          </Typography>
          <Button label="Tentar novamente" variant="primary" onPress={() => refetch()} />
        </View>
      ) : (
        <FlatList
          data={properties}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderProperty}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.35}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={styles.footerLoading}>
                <ActivityIndicator size="large" color={COLORS.primary[500]} />
              </View>
            ) : (
              <View style={styles.footerSpacer} />
            )
          }
        />
      )}

      {isLoading && (
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
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 32,
  },
  errorText: {
    textAlign: 'center',
  },
});
