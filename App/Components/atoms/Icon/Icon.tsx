import { useColors } from '@Theme';
import { Icon as UIcon } from '@ui-kitten/components';
import React from 'react';

import styles from './Icon.styles';
import { CustomIconProps } from './types';

const Icon: React.FC<CustomIconProps> = (props) => {
  const colors = useColors();
  const { style } = props;
  return (
    <UIcon
      fill={colors.text}
      {...props}
      style={[styles.icon, style]}
      pack={''}
    />
  );
};

export default Icon;
