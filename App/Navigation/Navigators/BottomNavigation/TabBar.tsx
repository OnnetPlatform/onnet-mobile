import MaskedView from '@react-native-masked-view/masked-view';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, View, SafeAreaView, useColorScheme, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Text } from '../../../Components/atoms';
import { useColors } from '../../../Theme';
import useTabs from './Tabs';
import styles from './TabBar.styles';
import { NavigationState } from '@react-navigation/native';
import Animated, { FadeIn, FadeOut, useAnimatedStyle } from 'react-native-reanimated';
import { HeaderLoader } from '../../../Components/atoms/HeaderLoader/HeaderLoader';
import { useSocketContext } from '../../../Context/SocketContext/SocketContext';
import { BlurView } from '@react-native-community/blur';

const TabBar = React.memo(
  (props: BottomTabBarProps) => {
    const { state } = props;
    const { index } = state;
    const colors = useColors();
    const isDark = useColorScheme() === 'dark';
    const { connected } = useSocketContext();
    const background: ViewStyle = {
      backgroundColor: index === 4 ? colors.background : 'transparent',
    };
    return (
      <>
        {connected ? null : (
          <View style={{ position: 'absolute', alignSelf: 'center', bottom: 80 }}>
            <HeaderLoader />
          </View>
        )}

        <BlurView
          blurAmount={100}
          blurType={isDark ? 'dark' : 'light'}
          style={[styles.tabbar, background]}>
          <SafeAreaView style={styles.container}>
            {state.routes.map((route, index) => (
              // @ts-ignore
              <Tab key={index} {...props} {...{ route, index }} />
            ))}
          </SafeAreaView>
        </BlurView>
      </>
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

    const badge = () => {
      if (index === 3)
        return (
          <View style={styles.badge}>
            <Text weight="bold" color="white" fontSize={10}>
              {'2'}
            </Text>
          </View>
        );
      return null;
    };

    return (
      <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.tab} key={index}>
        {badge()}
        {isFocused ? (
          <MaskedView maskElement={<Icon name={icon + (isFocused ? '' : '-outline')} />}>
            <LinearGradient style={styles.icon} colors={[colors.pink, colors.cyan]} />
          </MaskedView>
        ) : (
          <Icon style={{ width: 24 }} name={icon + (isFocused ? '' : '-outline')} />
        )}

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
