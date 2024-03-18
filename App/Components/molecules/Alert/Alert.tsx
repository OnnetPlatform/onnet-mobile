import { Separator, Text } from '@Atoms';
import { Button } from '..';
import { useColors } from '@Theme';
import React, { useCallback, useEffect } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import useAlert from '../../../Context/AlertContext/AlertContext';
import AlertStyles from './Alert.styles';
import { SolidButton } from '@Molecules/SolidButton/SolidButton';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const Alert: React.FC = () => {
  const colors = useColors();
  const styles = AlertStyles(colors);
  const angleValue = useSharedValue(0);
  const {
    visible,
    title,
    subtitle,
    onPress,
    customView,
    configureAlert,
    actionTitle,
  } = useAlert();

  const animatedAngle = useAnimatedProps(
    () => ({
      angle: angleValue.value,
    }),
    [visible]
  );

  useEffect(() => {
    angleValue.value = 0;

    if (visible) {
      angleValue.value = withRepeat(
        withTiming(360, { duration: 7000, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      angleValue.value = 0;
    }
  }, [visible]);

  const defaultView = useCallback(() => {
    return (
      <>
        <Text weight="bold" textAlign="center" fontSize={22}>
          {title}
        </Text>
        <Separator />
        <Text textAlign="center">{subtitle}</Text>
        {onPress ? (
          <>
            <Separator size="md" />
            <Separator size="md" />
            <SolidButton onPress={onPress}>
              <Text weight="bold">{actionTitle || ''}</Text>
            </SolidButton>
          </>
        ) : null}
      </>
    );
  }, [title, subtitle, onPress, visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Animated.View
        entering={FadeInDown.duration(100)}
        style={styles.container}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPressIn={() => configureAlert({ visible: false })}
        />
        <AnimatedLinearGradient
          animatedProps={animatedAngle}
          end={{ x: 0, y: 0.6 }}
          start={{ x: 0, y: 0 }}
          useAngle={true}
          style={styles.linearGradient}
          colors={[colors.text, colors.background, colors.background]}>
          <View style={styles.body}>
            {customView ? customView() : defaultView()}
          </View>
        </AnimatedLinearGradient>
      </Animated.View>
    </Modal>
  );
};

export default Alert;
