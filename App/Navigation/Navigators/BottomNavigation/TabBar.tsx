import { HeaderLoader, Text } from '@Atoms';
import { MessagingSelector } from '@Khayat/Redux/Selectors/MessagingSelector';
import MaskedView from '@react-native-masked-view/masked-view';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationState } from '@react-navigation/native';
import { BOTTOM_BAR_HEIGHT, useColors } from '@Theme';
import React, { useCallback, useEffect } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useSelector } from 'react-redux';

import styles from './TabBar.styles';
import useTabs from './Tabs';
import {
  Blend,
  Canvas,
  Fill,
  Rect,
  Turbulence,
  vec,
  LinearGradient as SKiaLG,
} from '@shopify/react-native-skia';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useStyles } from '@Theme/Colors';

const TabBar = React.memo(
  (props: BottomTabBarProps) => {
    const { state } = props;
    const { width } = useWindowDimensions();
    const colors = useColors();
    const { isConnected } = useSelector(MessagingSelector);
    const offset = width / 5;
    const currentOffset = useSharedValue(0);
    const { shadow } = useStyles();
    const animatedStyle = useAnimatedStyle(
      () => ({
        width: 4,
        height: 4,
        left: currentOffset.value,
        backgroundColor: colors.text,
        borderRadius: 2,
      }),
      [currentOffset]
    );

    useEffect(() => {
      currentOffset.value = withSpring(state.index * offset + offset / 2 - 3, {
        damping: 50,
      });
    }, [state]);

    return (
      <>
        {isConnected ? null : (
          <View
            style={{ position: 'absolute', alignSelf: 'center', bottom: 80 }}>
            <HeaderLoader />
          </View>
        )}

        <View style={[styles.tabbar]}>
          <Canvas style={[StyleSheet.absoluteFillObject]}>
            <Rect width={width} height={BOTTOM_BAR_HEIGHT}>
              <Blend mode="difference">
                <SKiaLG
                  start={vec(0, 0)}
                  end={vec((state.index + 1) * offset, 0)}
                  colors={[colors.background]}
                />
                <Turbulence freqX={1} freqY={1} octaves={4} />
              </Blend>
            </Rect>
            <Fill color={colors.blur} />
          </Canvas>
          <SafeAreaView style={styles.container}>
            {state.routes.map((route, index) => (
              // @ts-ignore
              <Tab key={index} {...props} {...{ route, index }} />
            ))}
          </SafeAreaView>
          <Animated.View style={[animatedStyle, shadow]} />
        </View>
      </>
    );
  },
  (next, prev) => next.descriptors === prev.descriptors
);

const Tab = React.memo<
  BottomTabBarProps & { index: number; route: NavigationState }
>(
  ({ state, index, navigation, route }: any) => {
    const tabs = useTabs();

    const colors = useColors();
    const isFocused = state.index === index;
    const { icon } = tabs[index];

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate({ name: route.name, merge: true });
      }
    };

    const onLongPress = () =>
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });

    const badge = () => {
      if (index === 3) {
        return (
          <View style={[styles.badge, { backgroundColor: colors.text }]}>
            <Text weight="bold" color={colors.background} fontSize={10}>
              2
            </Text>
          </View>
        );
      }
      return null;
    };

    const renderIcon = useCallback(() => {
      if (isFocused) {
        return (
          <MaskedView maskElement={icon}>
            <LinearGradient
              style={styles.icon}
              colors={[colors.pink, colors.cyan]}
            />
          </MaskedView>
        );
      }

      return icon;
    }, [isFocused, tabs]);

    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.tab}
        key={index}>
        {badge()}
        {renderIcon()}
      </Pressable>
    );
  },
  (next, prev) => next.state.index === prev.state.index
);
export default TabBar;
