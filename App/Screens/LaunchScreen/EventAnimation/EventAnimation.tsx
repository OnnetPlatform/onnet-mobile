import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { HackerText, Icon } from '../../../Components/atoms';

export const EventAnimation: React.FC = () => {
  const { width } = useWindowDimensions();
  const animatedWidth = useSharedValue(0);
  const titleWidth = useSharedValue(0);
  const subtitleWidth = useSharedValue(0);
  const damping = { damping: 100 };
  const [title, setTitle] = useState(faker.name.jobArea());
  const titleStyle = useAnimatedStyle(
    () => ({
      width: titleWidth.value,
    }),
    [titleWidth]
  );
  const subtitleStyle = useAnimatedStyle(
    () => ({
      width: subtitleWidth.value,
    }),
    [subtitleWidth]
  );
  const widthStyle = useAnimatedStyle(
    () => ({
      width: animatedWidth.value,
    }),
    [animatedWidth]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTitle(faker.name.jobArea());
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const animate = () => {
    titleWidth.value = 0;
    subtitleWidth.value = 0;
    animatedWidth.value = 0;
    setTimeout(() => {
      titleWidth.value = withSpring(title.length * 10, damping);
      subtitleWidth.value = withSpring(50, damping);
      animatedWidth.value = withTiming(width - 88, { duration: 900 });
    }, 1000);
  };
  useEffect(() => {
    animate();
  }, [title]);
  return (
    <View>
      <View style={styles.row}>
        <View style={styles.center}>
          <View style={styles.icon}>
            <Icon fill={'white'} name={'flag-outline'} />
          </View>
          <View style={styles.separator} />
        </View>
        <HackerText weight="bold" color={'black'} style={styles.hackerText}>
          {title}
        </HackerText>
      </View>
      <View style={styles.card}>
        <View style={styles.avatar} />
        <Animated.View style={[styles.title, titleStyle]} />
        <Animated.View style={[styles.line, subtitleStyle]} />
        <View style={{ height: 11 }} />
        <Animated.View style={[styles.line, widthStyle]} />
        <Animated.View style={[styles.line, widthStyle]} />
        <Animated.View style={[styles.line, widthStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 2,
    backgroundColor: 'white',
    marginTop: 11,
    borderRadius: 2,
  },
  title: {
    height: 2,
    backgroundColor: 'white',
  },
  icon: {
    width: 48,
    height: 48,
    backgroundColor: 'black',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 10,
    width: 2,
    backgroundColor: 'black',
    marginVertical: 4,
  },
  card: {
    backgroundColor: 'black',
    padding: 22,
    borderRadius: 11,
    overflow: 'hidden',
    maxWidth: '100%',
    minWidth: '100%',
  },
  hackerText: {
    marginTop: 15,
    textTransform: 'uppercase',
    marginLeft: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    marginBottom: 22,
    borderRadius: 8,
  },
});
