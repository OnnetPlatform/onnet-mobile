import { useMemo } from 'react';
import { SnackbarProps } from './types';
import { useColors } from '@Theme/index';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'absolute',
    zIndex: 100,
    paddingHorizontal: 16,
  },
  container: {
    padding: 16,
    zIndex: 100,
    borderRadius: 16,
    overflow: 'hidden',
  },
  body: {
    flexDirection: 'row',
    flex: 1,
  },
  flex: {
    flex: 1,
  },
});

export const useSnackbarColors = (props?: SnackbarProps) => {
  if (!props) return { iconColor: '', backgroundColor: '' };
  const { variant } = props;
  const colors = useColors();

  const backgroundColor = useMemo(
    () => colors.text,

    [variant, colors]
  );

  const iconColor = variant === 'WARRNING' ? 'black' : 'white';
  return { iconColor, backgroundColor };
};
