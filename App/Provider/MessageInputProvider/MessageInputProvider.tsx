import React, { useCallback, useRef, useState } from 'react';
import { MessageInputContext } from '../../Context/MessageInputContext/MessageInputContext';
import { UploadedImage } from '../../Context/MessageInputContext/types';
import { BOTTOM_BAR_HEIGHT, useColors } from '@Theme/index';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';
import { UserChat } from '@Khayat/Database/Models/types';
import { useRealmUsers } from '../../Database/Hooks/useRealmUsers';
import TypingIndicator from './Components/TypingIndicator';
import { MarkdownTextInput } from '@expensify/react-native-live-markdown';
import { useMarkdownStyles } from '@Utils/useMarkdownStyles';
import InputFooter from './Components/InputFooter';
import LocalGallery from './Components/LocalGallery';
import InputEmojisList from './Components/InputEmojisList';
import MentionList from './Components/MentionList';
import InputBackdrop from './Components/InputBackdrop';
import Texture from '@Skia/Texture/Texture';
import { ThemeColors } from '@Theme/Colors';

export const MessageInputProvider: React.FC<{ user: UserChat }> = ({
  user,
}) => {
  const { getUser } = useRealmUsers();
  const localUser = getUser(user);
  const sheetInputRef = useRef<BottomSheet>(null);
  const [textMessage, setTextMessage] = useState<string>('');
  const [attachedGallery] = useState<UploadedImage[]>([]);
  const [openLocalGallery, toggleLocalGalleryModel] = useState<boolean>(false);
  const [openUploadedGallery, toggleUploadedGalleryModel] = useState(false);
  const [openEmojisList, toggleEmojisList] = useState(false);
  const [openMentionsList, toggleMentionsList] = useState(false);
  const markdownStyle = useMarkdownStyles();
  const colors = useColors();

  const renderIndicator = useCallback(() => {
    if (localUser) return <TypingIndicator opponent={localUser} />;
    return <View />;
  }, []);

  if (!localUser) return null;
  return (
    <MessageInputContext.Provider
      value={{
        textMessage,
        attachedGallery,
        openLocalGallery,
        toggleLocalGalleryModel,
        openUploadedGallery,
        toggleUploadedGalleryModel,
        openEmojisList,
        toggleEmojisList,
        setTextMessage,
        openMentionsList,
        toggleMentionsList,
        user: localUser,
      }}>
      <BottomSheet
        ref={sheetInputRef}
        bottomInset={BOTTOM_BAR_HEIGHT - 20}
        enableDynamicSizing={true}
        index={0}
        backgroundComponent={Texture}
        handleStyle={{ paddingVertical: 8 }}
        style={styles(colors).sheet}
        handleComponent={renderIndicator}
        enablePanDownToClose={false}
        backdropComponent={InputBackdrop}>
        <BottomSheetView style={{ minHeight: 100, paddingBottom: 20 }}>
          <MarkdownTextInput
            value={textMessage}
            onChangeText={setTextMessage}
            autoCapitalize={'none'}
            autoCorrect={false}
            autoComplete={undefined}
            style={styles(colors).input}
            placeholder="Message"
            multiline
            markdownStyle={markdownStyle}
          />
          <InputFooter />
          <LocalGallery />
          <InputEmojisList />
          <MentionList />
        </BottomSheetView>
      </BottomSheet>
    </MessageInputContext.Provider>
  );
};

const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    input: {
      color: colors.text,
      padding: 16,
      maxHeight: 400,
      overflow: 'scroll',
    },
    sheet: {
      borderRadius: 16,
      overflow: 'hidden',
    },
  });

export default MessageInputProvider;
