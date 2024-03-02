import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { useColors } from '@Theme';
import moment from 'moment';
import React from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Icon, Text } from '../../Components/atoms';
import dyanmicStyles from './ProfileScreen.styles';

const image =
  'https://images.unsplash.com/photo-1708348127662-6c3771e8c3bd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const styles = dyanmicStyles(insets, colors);
  const scrollValue = useSharedValue(0);
  const scrollRef = useAnimatedRef<ScrollView>();
  const gradientColors = ['transparent', colors.background];
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  useScrollToTop(scrollRef);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(scrollValue.value, [0, 1], [1, 0]) }],
  }));

  const onScroll = ({
    nativeEvent: { contentOffset },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollValue.value = contentOffset.y < 0 ? contentOffset.y / 1000 : 0;
  };

  const onBackPressed = () => navigation.goBack();

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.screen}>
      <Animated.Image
        style={[StyleSheet.absoluteFill, animatedStyle]}
        source={{ uri: image }}
      />
      {canGoBack ? (
        <Pressable onPress={onBackPressed} style={styles.backArrow}>
          <Icon name={'arrow-ios-back-outline'} />
        </Pressable>
      ) : null}
      <ScrollView
        scrollEventThrottle={0.3}
        ref={scrollRef}
        scrollToOverflowEnabled={false}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={gradientColors}
          style={styles.linearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.85 }}>
          <View style={styles.spacer} />
          <View style={styles.content}>
            <Text fontSize={12} style={{ marginBottom: 4, opacity: 0.8 }}>
              Engineering
            </Text>
            <View style={styles.textRow}>
              <Text weight="bold" fontSize={20}>
                Muhammad El-Khayat •{' '}
              </Text>
              <Text fontSize={12}>Active</Text>
            </View>
            <Text>Senior Software Engineer</Text>
            <Text weight="bold" fontSize={15}>
              🇪🇬 Cairo, Egypt
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.info}>
          <View style={styles.infoRow}>
            <Icon
              name={'email-outline'}
              style={{ width: 16, height: 16, marginRight: 11 }}
            />
            <Text>muhammad.elkhayat@gmail.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon
              name={'phone-outline'}
              style={{ width: 16, height: 16, marginRight: 11 }}
            />
            <Text>+20112345678</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon
              name={'clock-outline'}
              style={{ width: 16, height: 16, marginRight: 11 }}
            />
            <Text>{moment().format('hh:mm A')}</Text>
          </View>
          <View style={{ marginTop: 22, paddingBottom: 22 }}>
            <Text>Reports to</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 11,
              }}>
              <Image
                source={{ uri: image }}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  marginRight: 11,
                }}
              />
              <Text>John Doe</Text>
            </View>
          </View>
        </View>
        <View style={styles.limit} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileScreen;
