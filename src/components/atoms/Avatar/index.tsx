import { Image, View } from 'react-native';
import AvatarDefault from '../../../../assets/avatar-default.svg';
import { styles } from './styles';

interface Props {
  source: string | null;
}

export function Avatar({ source }: Props) {
  return (
    <View style={styles.container}>
      {source ? (
        <Image source={{ uri: source }} style={styles.image} />
      ) : (
        <AvatarDefault width={64} height={64} />
      )}
    </View>
  );
}