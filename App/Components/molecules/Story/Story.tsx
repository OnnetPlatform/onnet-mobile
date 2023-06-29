import React, { useCallback, useEffect, useState } from 'react';
import { View, useWindowDimensions, Image as RNImage, Pressable } from 'react-native';
import StoryHeader from './StoryHeader/StoryHeader';
import { Blur, Text } from '../../atoms';
import { useColors } from '../../../Theme';
import LinearGradient from 'react-native-linear-gradient';
import { StoryGallery } from './StoryGallery';
import { SharedValue } from 'react-native-reanimated';
import type { Story as StoryType } from './types';

export const Story: React.FC<{ isFocused: SharedValue<boolean>; data: StoryType }> = ({
  isFocused,
  data,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { height } = useWindowDimensions();
  const colors = useColors();

  const increament = useCallback(() => {
    if (currentIndex < data.stories.length - 1 && isFocused.value) {
      setCurrentIndex(Math.min(currentIndex + 1, data.stories.length - 1));
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  const decreament = () => setCurrentIndex(Math.max(currentIndex - 1, 0));
  useEffect(() => {
    setCurrentIndex(0);
  }, []);
  return (
    <Blur style={{ borderRadius: 16, height: height * 0.6, overflow: 'hidden' }}>
      <StoryGallery
        isFocused={isFocused}
        media={data.stories[currentIndex]?.media}
        currentIndex={currentIndex}
      />
      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          locations={[0, 0.4, 0.5, 0.85, 1]}
          style={{
            justifyContent: 'space-between',
            flex: 1,
          }}
          colors={[
            colors.secondaryBackground,
            'transparent',
            'transparent',
            'transparent',
            colors.secondaryBackground,
          ]}>
          <View style={{ padding: 16 }}>
            <Text fontSize={13} style={{ marginBottom: 8 }}>
              {data.stories[currentIndex]?.title}
            </Text>
            <StoryHeader
              storiesLength={data.stories.length}
              isFocused={isFocused}
              currentIndex={currentIndex}
              onEnd={increament}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Pressable onPress={decreament} style={{ flex: 1 }} />
            <Pressable onPress={increament} style={{ flex: 1 }} />
          </View>
          <View style={{ padding: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <RNImage
                source={{ uri: data.author.avatar }}
                style={{ height: 48, width: 48, marginRight: 8 }}
              />
              <Text fontSize={16} weight="bold">
                {data.author.first_name}
              </Text>
            </View>
            <Text numberOfLines={5}>{data.stories[currentIndex]?.content || '...'}</Text>
          </View>
        </LinearGradient>
      </View>
    </Blur>
  );
};
