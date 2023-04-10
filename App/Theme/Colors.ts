import { useMemo } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

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

const pink = '#E90064';
const blue = '#19294f';
const black = '#000000';
const white = '#e4dbd3';
const cyan = '#09CFFA';
const yellow = '#ffde03';
const secondaryDark = '#121212';
const secondaryLight = '#cdc5bd';
const turquoise = '#30D5C8';

export const colors: (scheme: ColorSchemeName) => ThemeColors = (scheme: ColorSchemeName) => ({
  pink,
  blue,
  black,
  white,
  cyan,
  yellow,
  text: scheme === 'dark' ? white : '#212427',
  background: scheme === 'dark' ? black : white,
  blur: scheme === 'dark' ? 'rgba(0,0,0,.2)' : 'rgba(255,255,255,.2)',
  secondaryBackground: scheme === 'dark' ? secondaryDark : secondaryLight,
  secondaryDark,
  secondaryLight,
  turquoise,
});

export default () => {
  const scheme = useColorScheme();
  const themecolors = useMemo(() => colors(scheme), [scheme]);
  return themecolors;
};
