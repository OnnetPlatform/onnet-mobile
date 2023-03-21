import { BlurView } from '@react-native-community/blur';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  measure,
  runOnUI,
  SharedValue,
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, Text } from '../../../../Components/atoms';
import { useColors } from '../../../../Theme';
import { useFakerData } from '../EventsList/Data';
import styles, { withColors, withInsets } from './HomeScreen.styles';

export const HomseScreenHeader: React.FC<{
  onCreatePressed(): void;
  animatedHeaderValue: SharedValue<number>;
}> = ({ onCreatePressed, animatedHeaderValue }) => {
  const colors = useColors();
  const { eventsData } = useFakerData();
  const insets = useSafeAreaInsets();
  const insetStyles = withInsets(insets);
  const listHeight = useSharedValue(56);
  const height = useSharedValue<number>(56);
  const ref = useAnimatedRef();

  useAnimatedReaction(
    () => animatedHeaderValue.value,
    (h) => (height.value = withTiming(h))
  );

  const measureLayout = () => {
    runOnUI(() => {
      'worklet';
      const measured = measure(ref)?.height;
      if (measured > 0) listHeight.value = measured;
    })();
  };

  useEffect(() => {
    if (ref.current) measureLayout();
  }, [ref, ref.current]);

  return (
    <BlurView style={insetStyles.header}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} fontSize={24} weight={'black'}>
          Events
        </Text>
        <Pressable onPress={onCreatePressed}>
          <Icon fill={colors.text} name={'plus-outline'} />
        </Pressable>
      </View>
      <Animated.FlatList
        contentContainerStyle={styles.listContainer}
        data={eventsData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // @ts-ignore
        ref={ref}
        ItemSeparatorComponent={() => <View style={styles.spacer} />}
        renderItem={({ index }) => <DateSlot id={index} />}
      />
    </BlurView>
  );
};

const DateSlot = React.memo(
  ({ id }: any) => {
    const colors = useColors();
    const style = withColors(colors);
    const date = new Date();

    date.setDate(date.getDate() + id);

    return (
      <View style={style.dateSlot}>
        <Text color={colors.black} weight="bold">
          {moment(date).format('DD')}
        </Text>
      </View>
    );
  },
  (prev, next) => prev.id === next.id
);

export default HomseScreenHeader;
