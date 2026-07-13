import { COLORS } from '@/constants/colors';
import { StyleSheet } from 'react-native';

const TILE_SIZE = 100;

export const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  addTile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.primary[500],
    backgroundColor: COLORS.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  addTileDisabled: {
    opacity: 0.5,
  },
  addTileLabel: {
    textAlign: 'center',
  },
  photoTile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(26, 29, 33, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
