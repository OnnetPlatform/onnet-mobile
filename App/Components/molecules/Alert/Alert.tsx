import { Separator, Text } from '@Atoms';
import { Button } from '@Molecules';
import { useColors } from '@Theme';
import React, { useCallback, useEffect } from 'react';
import { Modal, View } from 'react-native';
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

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const Alert: React.FC = () => {
  const colors = useColors();
  const styles = AlertStyles(colors);
  const angleValue = useSharedValue(0);
  const { visible, title, subtitle, onPress, customView } = useAlert();

  const animatedAngle = useAnimatedProps(
    () => ({
      angle: angleValue.value,
    }),
    []
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
        <Text weight="bold" fontSize={22}>
          {title}
        </Text>
        <Separator />
        <Text>{subtitle}</Text>
        {onPress ? (
          <>
            <Separator size="md" />
            <Separator size="md" />
            <Button onPress={onPress}>Join</Button>
          </>
        ) : null}
      </>
    );
  }, [title, subtitle, onPress, visible]);

  return (
    <Modal transparent visible={visible} animationType={'fade'}>
      <Animated.View
        entering={FadeInDown.duration(1000)}
        style={styles.container}>
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
