import { useScrollToTop } from '@react-navigation/native';
import { useColors } from '@Theme';
import moment from 'moment';
import React, { useEffect } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
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
import { useProfile } from '@Hooks/useProfile';
import { useSelector } from 'react-redux';
import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import Refresh from '@Skia/Refresh';
import Image from '@Atoms/Image';
import { useAppNavigation } from '@Hooks/useAppNavigation';
const image =
  'https://images.unsplash.com/photo-1708348127662-6c3771e8c3bd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const ProfileScreen: React.FC<{}> = ({ route }: any) => {
  const { id } = route.params;
  const { profile, notFound, loading } = useProfile(id);
  const { id: userId } = useSelector(AuthSelector);
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const styles = dyanmicStyles(insets, colors);
  const scrollValue = useSharedValue(0);
  const scrollRef = useAnimatedRef<ScrollView>();
  const gradientColors = ['transparent', colors.background];
  const navigation = useAppNavigation();
  const canGoBack = navigation.canGoBack();
  useScrollToTop(scrollRef);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: interpolate(scrollValue.value, [0, 1], [1, 0]) }],
    }),
    []
  );

  const onScroll = ({
    nativeEvent: { contentOffset },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollValue.value = contentOffset.y < 0 ? contentOffset.y / 1000 : 0;
  };

  const onBackPressed = () => navigation.goBack();
  const onEditPressed = () => navigation.navigate('EditProfile');
  useEffect(() => {
    if (profile) {
      scrollRef.current?.scrollTo({ y: 200, animated: true });
    }
  }, [profile]);
  if (notFound)
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
          },
        ]}>
        <Pressable onPress={onBackPressed} style={styles.backArrow}>
          <Icon name={'arrow-ios-back-outline'} />
        </Pressable>
        <Text>Looks likes this user hasn't set his profile yet</Text>
      </View>
    );
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.screen}>
      <Refresh loading={loading} />
      {loading ? null : (
        <Image
          style={[StyleSheet.absoluteFill, animatedStyle]}
          source={{ uri: image }}
        />
      )}
      {canGoBack ? (
        <Pressable onPress={onBackPressed} style={styles.backArrow}>
          <Icon name={'arrow-ios-back-outline'} />
        </Pressable>
      ) : null}
      {userId == id ? (
        <Pressable
          onPress={onEditPressed}
          style={{
            top: insets.top,
            position: 'absolute',
            right: 22,
            zIndex: 100,
          }}>
          <Text>Edit</Text>
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
              {profile?.department}
            </Text>
            <View style={styles.textRow}>
              <Text weight="bold" fontSize={20}>
                {profile?.first_name} {profile?.last_name} •{' '}
              </Text>
              <Text fontSize={12}>{profile?.active ? 'Active' : 'Away'}</Text>
            </View>
            <Text>{profile?.title}</Text>
            <Text weight="bold" fontSize={15}>
              🇪🇬 {profile?.country}, {profile?.city}
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.info}>
          <View style={styles.infoRow}>
            <Icon
              name={'phone-outline'}
              style={{ width: 16, height: 16, marginRight: 11 }}
            />
            <Text>{profile?.phone}</Text>
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
