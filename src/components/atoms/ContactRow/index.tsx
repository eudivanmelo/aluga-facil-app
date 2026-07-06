import { View } from "react-native";
import { styles } from "./styles";
import { Typography } from "@/components/atoms/Typography";
import { COLORS } from "@/constants/colors";

export function ContactRow({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <View style={styles.contactRow}>
      {icon}
      <Typography variant="body/medium" color={COLORS.primary[800]} style={styles.contactText}>
        {value}
      </Typography>
    </View>
  );
}