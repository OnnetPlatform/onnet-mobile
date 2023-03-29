import MaskedView from '@react-native-masked-view/masked-view';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, View, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Text } from '../../../Components/atoms';
import { useColors } from '../../../Theme';
import useTabs from './Tabs';
import styles from './TabBar.styles';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, withTiming } from 'react-native-reanimated';
const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  const colors = useColors();
  const tabs = useTabs();

  return (
    <View
      style={[
        styles.tabbar,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <SafeAreaView style={styles.container}>
        {state.routes.map((route, index) => {
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
                <Icon
                  style={{ width: 18, height: 18 }}
                  name={icon + (isFocused ? '' : '-outline')}
                />
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
        })}
      </SafeAreaView>
    </View>
  );
};

export default TabBar;
