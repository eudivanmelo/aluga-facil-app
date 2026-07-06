import { View, Image, TouchableOpacity } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import LocationPinIcon from '../../../../assets/location-pin.svg';
import EyeIcon from '../../../../assets/eye.svg';
import EditIcon from '../../../../assets/edit-2.svg';
import TrashIcon from '../../../../assets/trash.svg';
import { styles } from './styles';

interface Props {
  title: string;
  location: string;
  price: string;
  imageUrl: string;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProfilePropertyCard({ title, location, price, imageUrl, onView, onEdit, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <Typography variant="heading/small" style={styles.title}>{title}</Typography>
        
        <View style={styles.locationRow}>
          <LocationPinIcon width={14} height={14} color={COLORS.primary[500]} />
          <Typography variant="body/small" color={COLORS.neutral[900]} style={styles.locationText} numberOfLines={1}>
            {location}
          </Typography>
        </View>

        <View style={styles.footerRow}>
          <Typography variant="body/medium" color={COLORS.primary[500]}>
            {price} <Typography variant="body/small" color={COLORS.neutral[700]}>/ mês</Typography>
          </Typography>

          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={onView} style={[styles.actionBtn, { backgroundColor: COLORS.neutral[700] }]}>
              <EyeIcon width={16} height={16} color={COLORS.neutral[100]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onEdit} style={[styles.actionBtn, { backgroundColor: COLORS.primary[500] }]}>
              <EditIcon width={16} height={16} color={COLORS.neutral[100]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={[styles.actionBtn, { backgroundColor: "#FF383C" }]}>
              <TrashIcon width={16} height={16} color={COLORS.neutral[100]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}