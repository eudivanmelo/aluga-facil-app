import { Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Phone } from 'lucide-react-native';
import { Button } from '@/components/atoms/Button';
import { COLORS } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  phone: string;
  whatsAppLink: string;
}

export function PropertyContactFooter({ phone, whatsAppLink }: Props) {
  const handleCall = () => {
    Linking.openURL(`tel:${phone.replace(/[^\d+]/g, '')}`).catch(() =>
      Alert.alert('Não foi possível ligar', 'Verifique se há um aplicativo de telefone disponível.')
    );
  };

  const handleWhatsApp = () => {
    Linking.openURL(whatsAppLink).catch(() =>
      Alert.alert('Não foi possível abrir o WhatsApp', 'Verifique se o aplicativo está instalado.')
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.footer}>
      <Button
        label="Ligar"
        variant="outline"
        leftIcon={<Phone size={18} color={COLORS.primary[500]} />}
        onPress={handleCall}
        style={styles.footerButton}
      />
      <Button
        label="WhatsApp"
        variant="primary"
        leftIcon={<MessageCircle size={18} color={COLORS.primary[100]} />}
        onPress={handleWhatsApp}
        style={styles.footerButton}
      />
    </SafeAreaView>
  );
}
