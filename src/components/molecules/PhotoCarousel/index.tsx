import { useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
  View,
} from 'react-native';
import { CarrouselDots } from '@/components/atoms/CarrouselDots';
import { styles } from './styles';

interface Props {
  photoUrls: string[];
}

export function PhotoCarousel({ photoUrls }: Props) {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  if (photoUrls.length === 0) {
    return <View style={[styles.photo, styles.placeholder, { width }]} />;
  }

  const renderPhoto = ({ item }: ListRenderItemInfo<string>) => (
    <Image source={{ uri: item }} style={[styles.photo, { width }]} />
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={photoUrls}
        keyExtractor={(uri) => uri}
        renderItem={renderPhoto}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      />

      {photoUrls.length > 1 && (
        <View style={styles.dotsWrapper}>
          <CarrouselDots count={photoUrls.length} activeIndex={activeIndex} />
        </View>
      )}
    </View>
  );
}
