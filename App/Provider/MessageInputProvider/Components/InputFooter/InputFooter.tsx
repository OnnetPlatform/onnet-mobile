import Icon from '@Atoms/Icon';
import Separator from '@Atoms/Separator';
import { useMessageInputContext } from '@Context/MessageInputContext/MessageInputContext';
import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import SendButton from '../SendButton';
import { FlashList, ListRenderItem } from '@shopify/flash-list';

type FooterItem = {
  icon: string;
  action(args: any): void;
};

export const InputFooter: React.FC = () => {
  const {
    toggleEmojisList,
    openEmojisList,
    toggleLocalGalleryModel,
    openLocalGallery,
    toggleMentionsList,
    openMentionsList,
  } = useMessageInputContext();

  const items: FooterItem[] = useMemo(
    () => [
      {
        icon: 'attach-2-outline',
        action: () => toggleLocalGalleryModel(!openLocalGallery),
      },
      {
        icon: 'smiling-face-outline',
        action: () => toggleEmojisList(!openEmojisList),
      },
      {
        icon: 'at-outline',
        action: () => toggleMentionsList(!openMentionsList),
      },
      {
        icon: 'mic-outline',
        action: () => toggleMentionsList(!openMentionsList),
      },
    ],
    [openEmojisList, openEmojisList, openLocalGallery, openMentionsList]
  );

  const renderButton: ListRenderItem<FooterItem> = useCallback(({ item }) => {
    return (
      <Pressable onPress={item.action}>
        <Icon style={{ width: 16 }} name={item.icon} />
      </Pressable>
    );
  }, []);

  return (
    <View style={styles.row}>
      <FlashList
        data={items}
        keyExtractor={(item) => item.icon}
        scrollEnabled={false}
        horizontal
        renderItem={renderButton}
        ItemSeparatorComponent={() => <Separator horizontal />}
      />
      <SendButton />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default InputFooter;
