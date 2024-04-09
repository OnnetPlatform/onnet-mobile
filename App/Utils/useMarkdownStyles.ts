import { fonts, useColors } from '@Theme/index';
import { useMemo } from 'react';
import { Platform } from 'react-native';
import { MarkdownProps } from 'react-native-markdown-display';

export const useMarkdownStyles = () => {
  const colors = useColors();
  const styles: MarkdownProps['style'] = useMemo(
    () => ({
      body: {
        color: colors.text,
        fontFamily: fonts.regular,
      },
      heading1: {
        flexDirection: 'row',
        fontSize: 32,
        color: colors.text,
        fontFamily: fonts.bold,
      },
      heading2: {
        flexDirection: 'row',
        fontSize: 24,
        color: colors.text,
        fontFamily: fonts.bold,
      },
      heading3: {
        flexDirection: 'row',
        fontSize: 18,
        fontFamily: fonts.bold,
        color: colors.text,
      },
      heading4: {
        flexDirection: 'row',
        fontSize: 16,
        color: colors.text,
        fontFamily: fonts.regular,
      },
      heading5: {
        flexDirection: 'row',
        fontSize: 13,
        color: colors.text,
        fontFamily: fonts.regular,
      },
      heading6: {
        flexDirection: 'row',
        fontSize: 11,
        color: colors.text,
        fontFamily: fonts.regular,
      },
      hr: {
        backgroundColor: colors.text,
        height: 1,
      },
      strong: {
        color: colors.text,
        fontFamily: fonts.bold,
      },
      em: {
        fontStyle: 'italic',
        color: colors.text,
      },
      s: {
        textDecorationLine: 'line-through',
        color: colors.text,
      },
      blockquote: {
        backgroundColor: colors.secondaryBackground,
        borderColor: colors.border,
        borderLeftWidth: 4,
        marginLeft: 5,
        paddingHorizontal: 11,
        marginVertical: 8,
        color: colors.text,
      },
      bullet_list: {},
      ordered_list: {},
      list_item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      bullet_list_icon: {
        width: 8,
        height: 8,
        backgroundColor: colors.text,
        borderRadius: 4,
        overflow: 'hidden',
        marginTop: 4,
      },
      bullet_list_content: {
        flex: 1,
      },
      ordered_list_icon: {
        marginLeft: 10,
        marginRight: 10,
      },
      ordered_list_content: {
        flex: 1,
      },
      code_inline: {
        backgroundColor: colors.secondaryBackground,
        padding: 10,
        borderRadius: 4,
        overflow: 'hidden',
        color: colors.text,
        ...Platform.select({
          ['ios']: {
            fontFamily: 'Courier',
          },
          ['android']: {
            fontFamily: 'monospace',
          },
        }),
      },
      code_block: {
        borderWidth: 1,
        borderColor: colors.background,
        backgroundColor: colors.secondaryBackground,
        padding: 10,
        borderRadius: 4,
        color: colors.text,
        ...Platform.select({
          ['ios']: {
            fontFamily: 'Courier',
          },
          ['android']: {
            fontFamily: 'monospace',
          },
        }),
      },
      fence: {
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.secondaryBackground,
        padding: 10,
        borderRadius: 4,
        color: colors.text,
        marginVertical: 8,
        ...Platform.select({
          ['ios']: {
            fontFamily: 'Courier',
          },
          ['android']: {
            fontFamily: 'monospace',
          },
        }),
      },
      table: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 3,
        color: colors.text,
        borderRightWidth: 0,
      },
      thead: {
        backgroundColor: colors.secondaryBackground,
        borderColor: colors.border,
        color: colors.text,
        borderBottomWidth: 0,
      },
      tbody: {},
      th: {
        padding: 5,
        textAlign: 'center',
        fontFamily: fonts.bold,
        borderRightWidth: 1,
        borderRightColor: colors.border,
      },
      tr: {
        textAlign: 'center',
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
      },
      td: {
        padding: 5,
        borderColor: colors.border,
        borderWidth: 1,
        color: colors.text,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        alignContent: 'center',
        justifyContent: 'center',
      },
      link: {
        textDecorationLine: 'underline',
        color: colors.cyan,
      },
      blocklink: {
        flex: 1,
        borderColor: colors.border,
        borderBottomWidth: 1,
        color: colors.text,
      },
      image: {
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden',
      },
      text: {},
      textgroup: {},
      paragraph: {
        marginTop: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        color: colors.text,
        fontFamily: fonts.regular,
      },
      hardbreak: {
        width: '100%',
        height: 1,
      },
      softbreak: {},

      // Believe these are never used but retained for completeness
      pre: {},
      inline: {},
      span: {},
      file: {
        backgroundColor: 'red',
        width: 100,
        height: 100,
      },
    }),
    [colors]
  );
  return styles;
};
