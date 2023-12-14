import { fonts, useColors } from '@Theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { TextProps } from './types';

export const useTextStyle = (props: TextProps) => {
  const colors = useColors();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        text: {
          fontSize: props.fontSize,
          color: props.color || colors.text,
          fontFamily: props.weight ? fonts[props.weight] : fonts.regular,
          textAlign: props.textAlign,
        },
      }),
    [colors, props]
  );
  return styles;
};
