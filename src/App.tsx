import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TabBar, TabRoute } from '@/components/organisms/TabBar';
import { PropertyCard } from './components/molecules/PropertyCard';
import { COLORS } from './constants/colors';

const properties = [
  {
    id: 1,
    title: 'Apartamento Moderno no Centro',
    price: 2500,
    paymentFrequency: 'mensal',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    description: 'Apartamento moderno com 2 quartos, sala ampla e cozinha equipada.',
    owner: {
      name: 'João Silva',
    },
    firstPhotoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fGNhc3xlbnwwfHx8fDE2OTg4NzQyMjd8&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    title: 'Casa Aconchegante com Quintal',
    price: 3500,
    paymentFrequency: 'mensal',
    neighborhood: 'Jardim das Flores',
    city: 'Rio de Janeiro',
    state: 'RJ',
    description: 'Casa aconchegante com 3 quartos, quintal espaçoso e garagem.',
    owner: {
      name: 'Maria Oliveira',
    },
    firstPhotoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fGNhc3xlbnwwfHx8fDE2OTg4NzQyMjd8&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    title: '  Loft Estiloso no Bairro Boêmio',
    price: 2800,
    paymentFrequency: 'mensal',
    neighborhood: 'Bairro Boêmio',
    city: 'Belo Horizonte',
    state: 'MG',
    description: 'Loft estiloso com design moderno, ideal para jovens profissionais.',
    owner: {
      name: 'Carlos Pereira',
    },
    firstPhotoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fGNhc3xlbnwwfHx8fDE2OTg4NzQyMjd8&auto=format&fit=crop&w=800&q=60',
  },
];

export default function App() {
  const [activeRoute, setActiveRoute] = useState<TabRoute>('catalog');
  //const { isAuthenticated } = useAuth();

  return (
    <View style={styles.container}>
      <FlatList
        data={properties}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PropertyCard
            title={item.title}
            price={item.price}
            paymentFrequency={item.paymentFrequency}
            neighborhood={item.neighborhood}
            city={item.city}
            state={item.state}
            description={item.description}
            ownerName={item.owner.name}
            imageUrl={item.firstPhotoUrl ?? undefined}
            
          />
        )}
        contentContainerStyle={{ padding: 10, gap: 16, paddingBottom: 100 }}
      />

      <TabBar
        activeRoute={activeRoute}
        isAuthenticated={false}
        onPress={setActiveRoute}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
