import React from 'react';
import { CustomIconProps } from './types';
import { Icon as UIcon } from '@ui-kitten/components';
import styles from './Icon.styles';
import { useColors } from '../../../Theme';

const Icon: React.FC<CustomIconProps> = (props) => {
  const colors = useColors();
  return <UIcon style={styles.icon} fill={colors.text} {...props} pack={''} />;
};

export default Icon;
