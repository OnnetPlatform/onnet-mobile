import React, { useCallback, useImperativeHandle, useMemo } from 'react';
import { SnackbarProps, SnackbarRefType } from './types';
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
import Markdown from 'react-native-markdown-display';
import { useMarkdownStyles } from '@Utils/useMarkdownStyles';
export const Snackbar = React.forwardRef<SnackbarRefType, SnackbarProps>(
  (props, ref) => {
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

    useImperativeHandle(ref, () => ({ showSnackbar }));

    if (Object.keys(props).length === 0) return <View />;

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
              <Separator size={'md'} />
              <Subtitle {...props} />
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }
);

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
  return <Text weight="bold">{title}</Text>;
};
const Subtitle: React.FC<SnackbarProps> = ({ subtitle, variant }) => {
  const style = useMarkdownStyles();
  switch (variant) {
    case 'SUCCESS':
      return <Markdown style={style}>{subtitle}</Markdown>;

    case 'WARRNING':
      return <Markdown style={style}>{subtitle}</Markdown>;

    case 'ERROR':
      return <Markdown style={style}>{subtitle}</Markdown>;
  }
  return <Markdown style={style}>{subtitle}</Markdown>;
};

export default Snackbar;
