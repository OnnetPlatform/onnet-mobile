import { useColors } from '@Theme/index';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const colors = useColors();

  return useMemo(
    () =>
      StyleSheet.create({
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          backgroundColor: colors.secondaryBackground,
          justifyContent: 'space-between',
          paddingHorizontal: 22,
        },
        input: {
          padding: 16,
          paddingTop: 16,
          borderRadius: 8,
          borderWidth: 0.2,
          borderColor: colors.text,
          color: colors.text,
        },
      }),
    [colors]
  );
};
