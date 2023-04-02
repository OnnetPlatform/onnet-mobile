import React from 'react';
import { CustomIconProps } from './types';
import { Icon as UIcon } from '@ui-kitten/components';
import styles from './Icon.styles';
import { useColors } from '../../../Theme';

const Icon: React.FC<CustomIconProps> = (props) => {
  const colors = useColors();
  const { style } = props;
  return <UIcon fill={colors.text} {...props} style={[styles.icon, style]} pack={''} />;
};

export default Icon;
