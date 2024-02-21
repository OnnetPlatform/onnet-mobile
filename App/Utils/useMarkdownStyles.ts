import { fonts, useColors } from '@Theme/index';
import { MarkdownStyle } from '@expensify/react-native-live-markdown';
import { useMemo } from 'react';

export const useMarkdownStyles = () => {
  const colors = useColors();
  const styles: MarkdownStyle = useMemo(
    () => ({
      syntax: {
        color: colors.text,
        fontFamily: fonts.regular,
      },
      link: {
        color: colors.cyan,
        fontFamily: fonts.regular,
      },
      h1: {
        fontSize: 25,
      },
      blockquote: {
        borderColor: colors.text,
        borderWidth: 6,
        marginLeft: 6,
        paddingLeft: 6,
      },
      code: {
        fontFamily: 'monospace',
        color: colors.text,
        backgroundColor: 'transparent',
      },
      pre: {
        fontFamily: 'monospace',
        color: colors.text,
        backgroundColor: 'transparent',
      },
      mentionHere: {
        color: colors.yellow,
        backgroundColor: 'transparent',
      },
      mentionUser: {
        color: colors.blue,
        backgroundColor: colors.cyan,
      },
    }),
    [colors]
  );
  return styles;
};
