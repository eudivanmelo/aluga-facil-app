import { View } from 'react-native';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { Avatar } from '@/components/atoms/Avatar';
import { VerifiedTag } from '@/components/molecules/VerifiedTag';
import EmailIcon from '../../../../assets/email.svg';
import PhoneIcon from '../../../../assets/phone.svg';
import EditIcon from '../../../../assets/edit.svg';
import { styles } from './styles';
import { ContactRow } from '@/components/atoms/ContactRow';

interface Props {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
  verified?: boolean;
  onEditPress?: () => void;
}

export function UserAreaProfile({
  name,
  email,
  phone,
  avatarUrl,
  verified = true,
  onEditPress,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarColumn}>
        <Avatar source={avatarUrl} />
      </View>

      <View style={styles.infoColumn}>
        <Typography variant="heading/large" style={styles.name} numberOfLines={1}>
          {name}
        </Typography>

        {/* <ContactRow icon={<EmailIcon width={16} height={16} />} value={email} /> */}
        <ContactRow icon={<PhoneIcon width={16} height={16} />} value={phone} />

        {verified && <VerifiedTag />}
      </View>

      <View style={styles.actionColumn}>
        <Button
          label="Editar"
          variant="outline"
          leftIcon={<EditIcon width={16} height={16} />}
          onPress={onEditPress}
        />
      </View>
    </View>
  );
}