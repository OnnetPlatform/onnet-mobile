import React, { useCallback, useMemo } from 'react';
import { SnackbarProps } from './types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '@Atoms/Text';
import Separator from '@Atoms/Separator';
import { Pressable, View } from 'react-native';
import Icon from '@Atoms/Icon';
import { useSnackbarColors } from './Snackbar.styles';
import styles from './Snackbar.styles';
import { useSnackbar } from '@Context/SnackbarContext';
import Animated, { SlideInUp } from 'react-native-reanimated';
import Texture from '@Skia/Texture/Texture';

export const Snackbar: React.FC<SnackbarProps> = (props) => {
  const { top } = useSafeAreaInsets();
  const { backgroundColor } = useSnackbarColors(props);
  const { showSnackbar } = useSnackbar();
  const hideSnackbar = useCallback(() => {
    showSnackbar(undefined);
  }, []);

  const container = useMemo(
    () => ({
      marginTop: top,
    }),
    [backgroundColor, top]
  );

  return (
    <Animated.View entering={SlideInUp} style={styles.wrapper}>
      <View style={[container, styles.container]}>
        <Texture />
        <View style={styles.body}>
          <Pressable onPress={hideSnackbar}>
            <Icon name={'close-outline'} />
          </Pressable>

          <Separator horizontal size={'md'} />
          <View style={styles.flex}>
            <Title {...props} />
            <Subtitle {...props} />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const Title: React.FC<SnackbarProps> = ({ title, variant }) => {
  switch (variant) {
    case 'SUCCESS':
      return (
        <Text weight="bold" fontSize={16}>
          {title}
        </Text>
      );

    case 'WARRNING':
      return (
        <Text weight="bold" fontSize={16}>
          {title}
        </Text>
      );

    case 'ERROR':
      return (
        <Text weight="bold" fontSize={16}>
          {title}
        </Text>
      );
  }
  return <Text>{title}</Text>;
};
const Subtitle: React.FC<SnackbarProps> = ({ subtitle, variant }) => {
  switch (variant) {
    case 'SUCCESS':
      return (
        <Text fontSize={14} numberOfLines={3}>
          {subtitle}
        </Text>
      );

    case 'WARRNING':
      return (
        <Text fontSize={14} numberOfLines={3}>
          {subtitle}
        </Text>
      );

    case 'ERROR':
      return (
        <Text fontSize={14} numberOfLines={3}>
          {subtitle}
        </Text>
      );
  }
  return <Text>{subtitle}</Text>;
};

export default Snackbar;
