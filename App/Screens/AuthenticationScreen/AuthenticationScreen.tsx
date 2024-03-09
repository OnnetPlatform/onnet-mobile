import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import AppLogo from '@Skia/AppLogo';
import Texture from '@Skia/Texture/Texture';
import Images from '@Theme/Images';
import { useColors } from '@Theme/index';
import {
  Blend,
  Canvas,
  LinearGradient,
  RadialGradient,
  Rect,
  Turbulence,
  vec,
  Image as SkiaImage,
  useImage,
  Group,
  BackdropFilter,
  ColorMatrix,
  BackdropBlur,
  Lerp,
  Circle,
  useClock,
} from '@shopify/react-native-skia';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { BLACK_AND_WHITE, COLORFUL, PURPLE } from './constants';
import useStyles from './styles';
import Icon from '@Atoms/Icon';
import RegisterSection from './components/RegisterSection';
import LoginSection from './components/LoginSection';

export const AuthenticationScreen: React.FC = () => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const styles = useStyles(colors, insets);
  const [step, setStep] = useState<'LOGIN' | 'REGISTER'>();
  const lerp = useSharedValue(0);

  const ref = useRef<BottomSheet>(null);

  useEffect(() => {
    lerp.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.ease }),
      -1,
      true
    );
  }, []);

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.screen}>
      <WallEffect />
      <BottomSheet
        enableContentPanningGesture={false}
        enableDynamicSizing={true}
        enableHandlePanningGesture={false}
        backgroundComponent={Texture}
        keyboardBlurBehavior="restore"
        handleComponent={null}
        ref={ref}
        style={{
          backgroundColor: colors.background,
          borderRadius: 22,
          overflow: 'hidden',
        }}
        enablePanDownToClose={false}>
        <BottomSheetScrollView>
          <BottomSheetView style={styles.section}>
            <AppLogo />
            <Separator />
            <Text fontSize={12} textAlign="center">
              WHERE TEAMS MEET!
            </Text>

            <View style={styles.separator}>
              <Pressable
                onPress={() => {
                  setStep(step === 'REGISTER' ? undefined : 'REGISTER');
                }}
                style={styles.button}>
                <Text>REGISTER</Text>
                <Icon
                  name={`arrow-ios-${
                    step === 'REGISTER' ? 'downward' : 'upward'
                  }-outline`}
                />
              </Pressable>
              {step === 'REGISTER' ? <RegisterSection /> : null}
              <Separator />

              <Pressable
                onPress={() => {
                  setStep(step === 'LOGIN' ? undefined : 'LOGIN');
                }}
                style={styles.button}>
                <Text>LOGIN</Text>
                <Icon
                  name={`arrow-ios-${
                    step === 'LOGIN' ? 'downward' : 'upward'
                  }-outline`}
                />
              </Pressable>
            </View>
            {step === 'LOGIN' ? <LoginSection /> : null}
            <Text textAlign="center" weight="bold">
              TERMS AND CONDITIONS
            </Text>
          </BottomSheetView>
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export const RadialNoise = () => {
  const { width, height } = useWindowDimensions();
  const colors = useColors();
  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect width={width} height={height} x={0} y={0}>
        <Blend mode={'dstIn'}>
          <RadialGradient
            colors={[colors.text, colors.background]}
            c={{ x: 0, y: 0 }}
            mode={'mirror'}
            r={2}
          />
          <Turbulence freqX={1} freqY={1} octaves={10} />
        </Blend>
      </Rect>
    </Canvas>
  );
};

export const WallEffect = () => {
  const { width, height } = useWindowDimensions();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const logo = useImage(Images.logo);
  const lerp = useSharedValue(0);
  const clock = useClock();
  const lightx = useDerivedValue(
    () => ({
      x: Math.max(Math.abs(Math.sin(clock.value / 10000)) * (width / 2), 50),
      y: Math.max(Math.abs(Math.cos(clock.value / 10000)) * (height / 2), 50),
    }),
    [clock]
  );

  useEffect(() => {
    lerp.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.ease }),
      -1,
      true
    );
  }, []);

  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Circle
        r={height}
        cx={width / 2}
        cy={height / 2}
        color={colors.background}
      />
      <Circle r={100} c={lightx} color={colors.text} />
      <BackdropBlur blur={100} />
      <Rect x={0} y={0} width={width} height={height}>
        <Blend mode={'dstIn'}>
          <LinearGradient
            colors={[colors.background, colors.text]}
            start={vec(0, 0)}
            mode={'repeat'}
            positions={[0, 0.1]}
            end={vec(0, 9)}
          />
          <Turbulence freqX={1} freqY={1} octaves={1} />
        </Blend>
      </Rect>
      <Group>
        <SkiaImage
          image={logo}
          width={128}
          height={128}
          x={width / 2 - 64}
          y={0.375 * height - 64 - insets.top}
        />
        <BackdropFilter
          clip={{
            x: 0,
            y: 0.375 * height - 64 - insets.top,
            width,
            height: 128,
          }}
          filter={
            <Lerp t={lerp}>
              <ColorMatrix matrix={PURPLE} />
              <ColorMatrix matrix={COLORFUL} />
              <ColorMatrix matrix={BLACK_AND_WHITE} />
            </Lerp>
          }
        />
      </Group>
    </Canvas>
  );
};
export default AuthenticationScreen;
