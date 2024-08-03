import Blur from '@Atoms/Blur';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import Texture from '@Skia/Texture/Texture';
import { useColors } from '@Theme/index';
import React from 'react';
import { Image, View } from 'react-native';

export const FeedItem: React.FC<any> = ({ item }) => {
  const colors = useColors();
  const host = item.__typename === 'Bulletin' ? item.streamer : item.organizer;
  return (
    <Blur
      style={{
        borderRadius: 16,
        overflow: 'hidden',
      }}>
      <View
        style={{
          padding: 16,
          backgroundColor: colors.blur,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{ uri: host.avatar }}
          style={{ width: 36, height: 36, borderRadius: 24 }}
        />
        <Separator horizontal />
        <View>
          <Text fontSize={10} style={{ opacity: 0.67 }}>
            {item.__typename}
          </Text>
          <Text weight="bold" fontSize={12}>
            {`${host.first_name} ${host.last_name}`.trim()}
          </Text>
          <Text fontSize={10} style={{ opacity: 0.67 }}>
            Host
          </Text>
        </View>
      </View>

      <View
        style={{
          padding: 16,
        }}>
        <Texture />
        <Text fontSize={16} numberOfLines={2} weight="bold">
          {item.title}
        </Text>
        <Separator />
      </View>
    </Blur>
  );
};
