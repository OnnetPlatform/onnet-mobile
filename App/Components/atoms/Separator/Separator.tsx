import React from 'react';
import { View } from 'react-native';
import { SeparatorTypes } from './types';
import styles from './styles';

export const Separator: React.FC<SeparatorTypes> = ({ size = 'sm', horizontal = false }) => {
  return <View style={styles({ size, horizontal }).sparator} />;
};
export default Separator;
