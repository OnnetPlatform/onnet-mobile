import React, { useMemo, useState } from 'react';
import { Dimensions, FlatList, Pressable, SectionList, TextInput, View } from 'react-native';
import emojis from './emoji.json';
import { Text } from '../../atoms';
import _ from 'lodash';
import { useColors } from '../../../Theme';

const { width } = Dimensions.get('screen');
export type EmojisListProps = {
  onEmojiPressed(item: (typeof emojis)[0]): void;
};
export const EmojiList: React.FC<EmojisListProps> = ({ onEmojiPressed }) => {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const object = (data: any, title: string) => ({ title, data: [{ list: data, title }] });
  var matches = (tags: string[]) =>
    tags.filter((s) => s.includes(searchQuery.toLowerCase())).length > 0;
  const filtered = useMemo(() => _.filter(emojis, (o) => matches(o.aliases)), [searchQuery]);
  const sections = _(filtered).groupBy('category').map(object).value();

  const renderSection = ({ item }: any) => {
    return (
      <FlatList
        numColumns={7}
        keyExtractor={(item) => item.description}
        renderItem={({ item }) => <EmojiItem onEmojiPressed={onEmojiPressed} {...{ item }} />}
        data={item.list}
      />
    );
  };
  return (
    <>
      <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
        <TextInput
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            padding: 8,
            borderRadius: 4,
            backgroundColor: colors.background,
            color: colors.text,
          }}
        />
      </View>
      <SectionList
        sections={sections}
        stickyHeaderIndices={[0]}
        style={{ maxHeight: 400 }}
        renderSectionHeader={({ section }) => (
          <Text
            weight="bold"
            style={{
              paddingHorizontal: 16,
              backgroundColor: colors.secondaryBackground,
              paddingVertical: 8,
            }}>
            {section.title}
          </Text>
        )}
        keyExtractor={(item) => item.list.title}
        contentContainerStyle={{ justifyContent: 'space-between' }}
        renderItem={renderSection}
      />
    </>
  );
};

const EmojiItem: React.FC<{ item: (typeof emojis)[0] } & EmojisListProps> = React.memo(
  ({ item, onEmojiPressed }) => {
    return (
      <Pressable
        onPress={() => onEmojiPressed(item)}
        style={{
          width: width / 7,
          justifyContent: 'center',
          alignItems: 'center',
          height: width / 7,
        }}>
        <Text fontSize={24}>{item.emoji}</Text>
      </Pressable>
    );
  },
  (prev, next) => prev.item.description === next.item.description
);
