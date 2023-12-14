import Icon from '@Atoms/Icon';
import Separator from '@Atoms/Separator';
import { BottomSheetProps } from '@Molecules/BottomSheet/types';
import { useColors } from '@Theme/index';
import React from 'react';

import styles from './styles';

export const BottomSheetIcon: React.FC<BottomSheetProps> = (props) => {
  const colors = useColors();
  const name = props.icon || 'info-outline';

  if (!props.icon) {
    return null;
  }
  return (
    <>
      <Icon style={styles.icon} fill={colors.turquoise} name={name} />
      <Separator size={'md'} />
    </>
  );
};

export default BottomSheetIcon;
