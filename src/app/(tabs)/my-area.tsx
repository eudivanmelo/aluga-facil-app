import { ActivityIndicator, Alert, StyleSheet, View, ScrollView } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/atoms/Typography';
import { UserAreaProfile } from '@/components/organisms/UserAreaProfile';
import { AddPropertyBanner } from '@/components/molecules/AddPropertyBanner';
import HomeIcon from '../../../assets/home.svg';
import { ProfilePropertyCard } from '@/components/molecules/ProfilePropertyCard';
import { UserMenu } from '@/components/molecules/UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { useMyProperties } from '@/hooks/useMyProperties';
import { useDeleteProperty } from '@/hooks/useDeleteProperty';
import { formatPrice } from '@/utils/textFormat';
import { getErrorMessage } from '@/utils/errors';

export default function MyAreaScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const { data: properties = [], isLoading: isLoadingProperties } = useMyProperties();
  const { mutate: deleteProperty } = useDeleteProperty();

  if (isLoading) return null;
  if (!isAuthenticated) return <Redirect href="/auth/" />;

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/');
  };

  const handleDelete = (id: number, title: string) => {
    Alert.alert('Excluir imóvel', `Tem certeza que deseja excluir "${title}"? Essa ação não pode ser desfeita.`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () =>
          deleteProperty(id, {
            onError: (error) => Alert.alert('Erro', getErrorMessage(error, 'Não foi possível excluir o imóvel.')),
          }),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* 1. Perfil do Usuário */}
        <UserAreaProfile
          name={user?.name ?? ''}
          email={user?.email ?? ''}
          phone={user?.phone ?? ''}
          avatarUrl={null}
          verified={user?.verified}
          onEditPress={() => console.log('Editar perfil')}
        />

        {/* 2. Banner de Adicionar Imóvel */}
        <AddPropertyBanner onAddPress={() => router.push('/my-area/new-property/step-1')} />

        {/* 3. Seção "Meus Imóveis" */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <HomeIcon width={20} height={20} color={COLORS.primary[800]} />
              <Typography variant="body/medium" style={{ marginLeft: 8 }}>
                Meus imóveis
              </Typography>
            </View>
            <Typography variant="body/small" color={COLORS.primary[500]}>
              {properties.length} imóveis cadastrados
            </Typography>
          </View>

          {/* Lista de Cards */}
          {isLoadingProperties ? (
            <ActivityIndicator color={COLORS.primary[500]} />
          ) : properties.length === 0 ? (
            <Typography variant="body/small" color={COLORS.neutral[700]}>
              Você ainda não cadastrou nenhum imóvel.
            </Typography>
          ) : (
            properties.map((property) => (
              <ProfilePropertyCard
                key={property.id}
                title={property.title}
                location={`Bairro ${property.neighborhood}, ${property.city}/${property.state}`}
                price={formatPrice(property.price)}
                imageUrl={property.firstPhotoUrl}
                onView={() => router.push(`/property/${property.id}`)}
                onEdit={() => router.push(`/my-area/new-property/step-1?id=${property.id}`)}
                onDelete={() => handleDelete(property.id, property.title)}
              />
            ))
          )}
        </View>

        <UserMenu
          onChangePassword={() => console.log('Navegar para alterar senha')}
          onTermsOfUse={() => console.log('Abrir termos de uso')}
          onLogout={handleLogout}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.neutral[200] // Cinza claro do fundo
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionContainer: {
    backgroundColor: COLORS.neutral[100],
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});