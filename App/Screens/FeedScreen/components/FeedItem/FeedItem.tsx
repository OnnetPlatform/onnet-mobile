import Blur from '@Atoms/Blur';
import Icon from '@Atoms/Icon';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { faker } from '@faker-js/faker';
import { useColors } from '@Theme/index';
import moment from 'moment';
import React from 'react';
import { FlatList, Image, View } from 'react-native';

export const FeedItem: React.FC<any> = ({ item }) => {
  const colors = useColors();
  if (item.__typename === 'Bulletin') {
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
            source={{ uri: faker.image.avatar() }}
            style={{ width: 36, height: 36, borderRadius: 24 }}
          />
          <Separator horizontal />
          <View>
            <Text fontSize={12} style={{ opacity: 0.67 }}>
              {item.__typename}
            </Text>
            <Text weight="bold">
              {`${item.streamer.first_name} ${item.streamer.last_name}`.trim()}
            </Text>
            <Text fontSize={12} style={{ opacity: 0.67 }}>
              Host
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 16,
          }}>
          <Text fontSize={22} numberOfLines={2} weight="bold">
            {item.title}
          </Text>
          <Separator />
        </View>

        <View style={{ backgroundColor: colors.blur, padding: 16 }}>
          <FlatList
            data={[1, 2, 3]}
            horizontal
            contentContainerStyle={{ alignItems: 'center' }}
            ListFooterComponent={
              <>
                <Text textAlign={'center'} style={{ marginLeft: 4 }}>
                  +22 are listening
                </Text>
              </>
            }
            renderItem={({ index }) => (
              <Image
                key={index}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  borderColor: colors.background,
                  borderWidth: 1,
                  marginLeft: index > 0 ? -16 : 0,
                  backgroundColor: colors.background,
                }}
                source={{ uri: faker.image.avatar() }}
              />
            )}
          />
        </View>
      </Blur>
    );
  }
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
        }}>
        <Text>
          <Text weight="bold">
            {`${item.organizer.first_name} ${item.organizer.last_name}`.trim()}
          </Text>{' '}
          scheduled a Meeting
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
        }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={'calendar-outline'} style={{ width: 16, height: 16 }} />
            <Separator horizontal />
            <Text style={{ textTransform: 'uppercase' }} fontSize={12}>
              {moment(new Date(item.date)).format('ddd, MMMM Do, YYYY')}
            </Text>
          </View>
          <Separator />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={'clock-outline'} style={{ width: 16, height: 16 }} />
            <Separator horizontal />
            <Text fontSize={12}>
              {moment(new Date(item.date)).format('hh:mm A')}
            </Text>
          </View>
        </View>
        <Icon name={'more-horizontal-outline'} />
      </View>

      <Text
        weight="bold"
        fontSize={24}
        numberOfLines={2}
        style={{ paddingHorizontal: 16 }}>
        {item.title}
      </Text>
      <Text
        fontSize={12}
        numberOfLines={2}
        style={{ textTransform: 'uppercase', paddingHorizontal: 16 }}>
        {item.__typename}
      </Text>
      <Separator size={'md'} />

      <View
        style={{
          backgroundColor: colors.blur,
          padding: 8,
          paddingHorizontal: 16,
        }}>
        <FlatList
          data={[1, 2, 3, 5, 6, 7]}
          horizontal
          contentContainerStyle={{ alignItems: 'center' }}
          ListFooterComponent={
            <Text textAlign={'center'} style={{ marginLeft: 4 }}>
              +22 going
            </Text>
          }
          renderItem={({ index }) => (
            <Image
              key={index}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                borderColor: colors.background,
                borderWidth: 1,
                marginLeft: index > 0 ? -16 : 0,
              }}
              source={{ uri: faker.image.avatar() }}
            />
          )}
        />
      </View>
    </Blur>
  );
};
