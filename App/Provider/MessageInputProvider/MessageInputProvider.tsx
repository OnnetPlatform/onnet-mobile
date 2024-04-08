import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MessageInputContext } from '../../Context/MessageInputContext/MessageInputContext';
import { UploadedImage } from '../../Context/MessageInputContext/types';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';

import TypingIndicator from './Components/TypingIndicator';
import LocalGallery from './Components/LocalGallery';
import InputEmojisList from './Components/InputEmojisList';
import MentionList from './Components/MentionList';
import InputBackdrop from './Components/InputBackdrop';
import Texture from '@Skia/Texture/Texture';
import { MessagingCreators } from '@Khayat/Redux/Actions/MessagingActions';
import { useDispatch } from 'react-redux';
import RecordingModal from './Components/RecordingModal';
import { Profile } from '@Khayat/Database/Profile';
import { useRealmProfiles } from '../../Database/Hooks/useRealmProfiles';
import { RichTextEditor } from '@Atoms/RichTextEditor/RichTextEditor';
import InputFooter from './Components/InputFooter';

export const MessageInputProvider: React.FC<{ user: Profile }> = ({ user }) => {
  const { getUser } = useRealmProfiles();
  const localUser = getUser(user);
  const sheetInputRef = useRef<BottomSheet>(null);
  const [textMessage, setTextMessage] = useState<string>('');
  const [attachedGallery] = useState<UploadedImage[]>([]);
  const [openLocalGallery, toggleLocalGalleryModel] = useState<boolean>(false);
  const [openUploadedGallery, toggleUploadedGalleryModel] = useState(false);
  const [openEmojisList, toggleEmojisList] = useState(false);
  const [openMentionsList, toggleMentionsList] = useState(false);
  const [openRecordingModal, toggleRecordingModal] = useState<boolean>(false);
  const typingSent = useRef(false);
  const dispatch = useDispatch();

  const sendTypingEvent = () => {
    typingSent.current = true;
    dispatch(MessagingCreators.typing(user));
  };

  const sendTypingStoppedEvent = () => {
    typingSent.current = false;
    dispatch(MessagingCreators.typingStopped(user));
  };

  useEffect(() => {
    if (!typingSent.current && textMessage) {
      sendTypingEvent();
    }
    const typingStoppedTimeout = setTimeout(sendTypingStoppedEvent, 500);

    return () => {
      clearTimeout(typingStoppedTimeout);
    };
  }, [textMessage, typingSent.current, user]);

  const renderIndicator = useCallback(() => {
    if (localUser) return <TypingIndicator opponent={localUser} />;
    return <View />;
  }, [localUser]);

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
        openRecordingModal,
        toggleRecordingModal,
      }}>
      <BottomSheet
        ref={sheetInputRef}
        enableDynamicSizing={true}
        backgroundComponent={Texture}
        style={styles.sheet}
        handleComponent={renderIndicator}
        keyboardBlurBehavior="restore"
        enablePanDownToClose={false}
        backdropComponent={InputBackdrop}>
        <BottomSheetView enableFooterMarginAdjustment style={{ minHeight: 60 }}>
          <RichTextEditor onChangeText={setTextMessage} value={textMessage} />
          <LocalGallery />
          <InputEmojisList />
          <MentionList />
          <RecordingModal />
          <InputFooter />
        </BottomSheetView>
      </BottomSheet>
    </MessageInputContext.Provider>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 16,
    maxHeight: 200,
    overflow: 'scroll',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingTop: 16,
    textAlignVertical: 'top',
  },
  sheet: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export default MessageInputProvider;
