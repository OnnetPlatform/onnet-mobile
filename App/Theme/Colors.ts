import { useMemo } from 'react';
import {
  ColorSchemeName,
  TextStyle,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { useColors } from '.';

export type ThemeColors = {
  pink: string;
  blue: string;
  black: string;
  white: string;
  cyan: string;
  yellow: string;
  text: string;
  background: string;
  blur: string;
  secondaryBackground: string;
  secondaryDark: string;
  secondaryLight: string;
  turquoise: string;
  border: string;
};

export const pink = '#E90064';
export const blue = '#19294f';
export const black = '#000000';
export const white = '#f2efe5';
export const cyan = '#1da1e2';
export const yellow = '#ffde03';
export const secondaryDark = '#121212';
export const secondaryLight = '#e6e4d5';
export const turquoise = '#30D5C8';
export const border = '#353535';

export const colors: (scheme: ColorSchemeName) => ThemeColors = (
  scheme: ColorSchemeName
) => ({
  pink,
  blue,
  black,
  white,
  cyan,
  yellow,
  text: scheme === 'dark' ? 'rgba(255,255,255,0.87)' : '#212427',
  background: scheme === 'dark' ? black : white,
  blur: scheme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255,255,255,.2)',
  secondaryBackground: scheme === 'dark' ? secondaryDark : secondaryLight,
  secondaryDark,
  secondaryLight,
  turquoise,
  border: scheme === 'dark' ? '#1c1c1c' : '#c1bfb7',
});

export default () => {
  const scheme = useColorScheme();
  return useMemo(() => colors(scheme), [scheme]);
};

export const useStyles = () => {
  const { background, text, secondaryBackground, border, ...colors } =
    useColors();
  const backgroundColor: ViewStyle = useMemo(
    () => ({ backgroundColor: background }),
    [background]
  );
  const textColor: TextStyle = useMemo(() => ({ color: text }), [text]);

  const screenStyle: ViewStyle = useMemo(
    () => ({ flex: 1, flexGrow: 1, backgroundColor: background }),
    [background]
  );

  const borderColor: ViewStyle = useMemo(
    () => ({ borderColor: border, borderWidth: 1 }),
    [colors]
  );

  const backgroundSecondary: ViewStyle = useMemo(
    () => ({ backgroundColor: secondaryBackground }),
    [background]
  );

  const shadow = useMemo(
    () => ({
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 6.27,
      elevation: 10,
      shadowColor: text,
    }),
    [colors]
  );

  return {
    backgroundColor,
    textColor,
    screenStyle,
    backgroundSecondary,
    borderColor,
    shadow,
  };
};
