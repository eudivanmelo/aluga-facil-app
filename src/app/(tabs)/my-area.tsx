import { StyleSheet, View, ScrollView } from 'react-native';
import { Redirect } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/atoms/Typography';
import { UserAreaProfile } from '@/components/organisms/UserAreaProfile';
import { AddPropertyBanner } from '@/components/molecules/AddPropertyBanner';
import HomeIcon from '../../../assets/home.svg';
import { ProfilePropertyCard } from '@/components/molecules/ProfilePropertyCard';
import { UserMenu } from '@/components/molecules/UserMenu';

// Mock de dados para renderizar a lista
const MOCK_PROPERTIES = [
  {
    id: '1',
    title: 'Quarto individual',
    location: 'Bairro João XXIII, Pau dos Ferros/RN',
    price: 'R$ 600,00',
    imageUrl: 'https://via.placeholder.com/150', // Substitua por imagens reais
  },
  {
    id: '2',
    title: 'Quarto individual',
    location: 'Bairro João XXIII, Pau dos Ferros/RN',
    price: 'R$ 600,00',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

export default function MyAreaScreen() {
  const { isAuthenticated } = { isAuthenticated: true }; 

  if (!isAuthenticated) return <Redirect href="/auth/" />;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 1. Perfil do Usuário */}
        <UserAreaProfile
          name="João Silva"
          email="joaosilva@email.com"
          phone="(00) 00000-0000"
          avatarUrl={null}
          verified
          onEditPress={() => console.log('Editar perfil')}
        />

        {/* 2. Banner de Adicionar Imóvel */}
        <AddPropertyBanner onAddPress={() => console.log('Navegar para Adicionar Imóvel')} />

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
              {MOCK_PROPERTIES.length} imóveis cadastrados
            </Typography>
          </View>

          {/* Lista de Cards */}
          {MOCK_PROPERTIES.map((property) => (
            <ProfilePropertyCard
              key={property.id}
              title={property.title}
              location={property.location}
              price={property.price}
              imageUrl={property.imageUrl}
              onView={() => console.log('Ver imóvel', property.id)}
              onEdit={() => console.log('Editar imóvel', property.id)}
              onDelete={() => console.log('Deletar imóvel', property.id)}
            />
          ))}
        </View>

        <UserMenu 
          onChangePassword={() => console.log('Navegar para alterar senha')}
          onTermsOfUse={() => console.log('Abrir termos de uso')}
          onLogout={() => console.log('Deslogar do app')}
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