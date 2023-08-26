import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
const uri =
  'https://images.unsplash.com/photo-1692858180214-c76c1b5d3cf3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80';

const array = Array.from({ length: 8 }, (_, i) => i);

export const FeaturesScreen: React.FC<any> = () => {
  return (
    <SafeAreaView style={{ padding: 22, flex: 1, flexGrow: 1 }}>
      <View
        style={{
          padding: 0,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {array.map((item) => (
          <AnimatedImage id={item} key={item} />
        ))}
      </View>
    </SafeAreaView>
  );
};

const AnimatedImage: React.FC<{ id: number }> = ({ id }) => {
  const scale = useSharedValue<number>(0);
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: scale.value },
        {
          scale: interpolate(scale.value, [-80, 0, 80], [0.8, 0.9, 0.8]),
        },
      ],
      opacity: interpolate(
        scale.value,
        [-8 * array.length + 1, 0, 8 * array.length + 1],
        [0, 1, 0]
      ),
      zIndex: 100 - id,
    }),
    [id]
  );

  useEffect(() => {
    if (id === 0) return;
    scale.value = 0;
    scale.value = withDelay(
      (array.length - id) * 100,
      withRepeat(
        withTiming(id % 2 ? 10 * id : -10 * id - 1, {
          duration: 700,
          easing: Easing.ease,
        }),
        -1
      )
    );
  }, [id]);

  return <Animated.Image source={{ uri }} style={[styles.image, animatedStyle]} />;
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
export default FeaturesScreen;
