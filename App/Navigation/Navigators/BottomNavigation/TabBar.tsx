import MaskedView from '@react-native-masked-view/masked-view';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { Pressable, View, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Text } from '../../../Components/atoms';
import { useColors } from '../../../Theme';
import useTabs from './Tabs';
import styles from './TabBar.styles';
import { NavigationState } from '@react-navigation/native';
import Animated, { FadeIn, FadeOut, useAnimatedStyle } from 'react-native-reanimated';

const TabBar = React.memo(
  (props: BottomTabBarProps) => {
    const { state } = props;
    const colors = useColors();

    return (
      <View
        style={[
          styles.tabbar,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <SafeAreaView style={styles.container}>
          {state.routes.map((route, index) => (
            // @ts-ignore
            <Tab key={index} {...props} {...{ route, index }} />
          ))}
        </SafeAreaView>
      </View>
    );
  },
  (next, prev) => next.descriptors === prev.descriptors
);

const Tab = React.memo<BottomTabBarProps & { index: number; route: NavigationState }>(
  ({ state, index, navigation, route }) => {
    const tabs = useTabs();
    const colors = useColors();
    const isFocused = state.index === index;
    const { icon, label: tabLabel } = tabs[index];

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        //@ts-ignore
        navigation.navigate({ name: route.name, merge: true });
      }
    };

    const onLongPress = () =>
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });

    const animatedStyle = useAnimatedStyle(
      () => ({
        display: isFocused ? 'none' : 'flex',
      }),
      [isFocused]
    );

    return (
      <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.tab} key={index}>
        {isFocused ? (
          <MaskedView maskElement={<Icon name={icon + (isFocused ? '' : '-outline')} />}>
            <LinearGradient style={styles.icon} colors={[colors.pink, colors.cyan]} />
          </MaskedView>
        ) : (
          <>
            <Icon style={{ width: 18, height: 18 }} name={icon + (isFocused ? '' : '-outline')} />
          </>
        )}
        {/* @ts-ignore */}
        {isFocused ? null : (
          <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(100)}
            style={animatedStyle}>
            <Text fontSize={10} weight={'regular'} style={styles.label}>
              {tabLabel}
            </Text>
          </Animated.View>
        )}
      </Pressable>
    );
  },
  (next, prev) => next.state.index === prev.state.index
);
export default TabBar;
