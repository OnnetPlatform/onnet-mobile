import Text from '@Atoms/Text';
import { useColors } from '@Theme/index';
import React from 'react';
import { Pressable } from 'react-native';

import { buttonStyle } from './styles';
import { SolidButtonProps } from './types';

export const SolidButton: React.FC<SolidButtonProps> = (props) => {
  const colors = useColors();
  const style = buttonStyle(props, colors);
  return (
    <Pressable style={[style.button, props.style]}>
      {props.children || (
        <Text
          weight="bold"
          fontSize={18}
          color={props.textColor || colors.text}>
          {props.title}
        </Text>
      )}
    </Pressable>
  );
};
