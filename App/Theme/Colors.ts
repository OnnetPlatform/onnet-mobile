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
};

export const pink = '#E90064';
export const blue = '#19294f';
export const black = '#000000';
export const white = '#e5e5e5';
export const cyan = '#09CFFA';
export const yellow = '#ffde03';
export const secondaryDark = '#121212';
export const secondaryLight = '#fbfcf8';
export const turquoise = '#30D5C8';

export const colors: (scheme: ColorSchemeName) => ThemeColors = (
  scheme: ColorSchemeName
) => ({
  pink,
  blue,
  black,
  white,
  cyan,
  yellow,
  text: scheme === 'dark' ? white : '#212427',
  background: scheme === 'dark' ? black : white,
  blur: scheme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255,255,255,.2)',
  secondaryBackground: scheme === 'dark' ? secondaryDark : secondaryLight,
  secondaryDark,
  secondaryLight,
  turquoise,
});

export default () => {
  const scheme = useColorScheme();
  return useMemo(() => colors(scheme), [scheme]);
};

export const useStyles = () => {
  const { background, text, secondaryBackground } = useColors();
  const backgroundColor: ViewStyle = useMemo(
    () => ({ backgroundColor: background }),
    [background]
  );
  const textColor: TextStyle = useMemo(() => ({ color: text }), [text]);

  const screenStyle: ViewStyle = useMemo(
    () => ({ flex: 1, flexGrow: 1, backgroundColor: background }),
    [background]
  );
  const backgroundSecondary: ViewStyle = useMemo(
    () => ({ backgroundColor: secondaryBackground }),
    [background]
  );

  return { backgroundColor, textColor, screenStyle, backgroundSecondary };
};
