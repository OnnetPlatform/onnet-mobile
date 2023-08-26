import { Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');

export const arcs = Array.from({ length: 10 }, (_, i) => ({
  width: 200,
  height: 200,
  radius: width - 30 - i * 40,
  index: i,
}));
