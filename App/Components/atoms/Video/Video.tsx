import React, { useCallback, useRef } from 'react';
import { ResizeMode, Video } from 'expo-av';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import PlayIcon from '@Icons/Play';
export const VideoComponent: React.FC<{ url: string }> = ({ url }) => {
  const { height } = useWindowDimensions();
  const ref = useRef<Video>();

  const onPlayPressed = useCallback(async () => {
    if (ref.current) await ref.current.playAsync();
    ref.current?.setPositionAsync(0);
  }, [url]);

  const handleRef = useCallback(
    (component: any) => (ref.current = component),
    [url]
  );
  return (
    <View>
      <Video
        resizeMode={ResizeMode.CONTAIN}
        ref={handleRef}
        source={{ uri: url }}
        style={{ width: '100%', height, borderRadius: 22 }}
      />
      <Pressable
        onPress={onPlayPressed}
        style={[
          StyleSheet.absoluteFillObject,
          { justifyContent: 'center', alignItems: 'center' },
        ]}>
        <PlayIcon width={80} height={80} />
      </Pressable>
    </View>
  );
};
export default VideoComponent;
