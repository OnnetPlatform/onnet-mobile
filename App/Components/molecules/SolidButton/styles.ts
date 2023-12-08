import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

import { SolidButtonProps } from './types';

export const buttonStyle = (props: SolidButtonProps, colors: ThemeColors) => {
  return StyleSheet.create({
    button: {
      padding: 16,
      paddingHorizontal: 32,
      backgroundColor:
        props.variant === 'OUTLINED' ? 'transparent' : props.color,
      borderWidth: props.variant === 'OUTLINED' ? 1 : 0,
      borderColor: colors.text,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
