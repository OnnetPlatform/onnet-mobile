import React from 'react';
import { View } from 'react-native';

import styles from './styles';
import { SeparatorTypes } from './types';

export const Separator: React.FC<SeparatorTypes> = ({
  size = 'sm',
  horizontal = false,
}) => {
  return <View style={styles({ size, horizontal }).sparator} />;
};
export default Separator;
