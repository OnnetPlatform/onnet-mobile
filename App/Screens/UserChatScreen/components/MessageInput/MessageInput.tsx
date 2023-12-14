import { Icon, Text } from '@Atoms';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { EmojiList } from '@Molecules/EmojiList/EmojiList';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { BlurView } from '@react-native-community/blur';
import MaskedView from '@react-native-masked-view/masked-view';
import { BOTTOM_BAR_HEIGHT, useColors } from '@Theme';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  useColorScheme,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedKeyboard,
  useAnimatedReaction,
  useDerivedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRealmUsers } from '../../../../Database/Hooks/useRealmUsers';
import { useUploadImage } from '../../../../Hooks/useUploadImage';
import { CreateEventSheetRef } from '../../../../Services/CreateEventRef/CreateEventRef';
import { URL } from '../../../../Services/Fetch';
import { CustomBackground } from '../../../ConferenceScreen/components/CreateEventSheet/CustomBackground';
import styles from '../../UserChatScreen.styles';
import { GalleryModal, TypingIndicator } from '..';
import messageStyles from './MessageInput.styles';
import { MessageInputProps } from './types';

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  onChangeText,
  value,
  sheetInputHeight,
  attachedImage,
  onAttachedImage,
  onEmojiPressed,
  user,
}) => {
  const { state } = useAnimatedKeyboard();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const withColors = styles(colors, insets);
  const sheetInputRef = useRef<BottomSheet>(null);
  const { uploadImage, uploadedImages, getUploadedImages } = useUploadImage();
  const [openGallery, setOpenGallery] = useState<boolean>(false);
  const [stagedImage, setStagedImage] = useState<PhotoIdentifier | undefined>();
  const [openUploadedGallery, setOpenUploadedGallery] =
    useState<boolean>(false);
  const [openEmojiList, setOpenEmojiList] = useState<boolean>(false);
  const isDark = useColorScheme() === 'dark';
  const { getUser } = useRealmUsers();
  const localUser = getUser(user);
  const snapPoints = useMemo(
    () => ['CONTENT_HEIGHT'],
    [insets.top, stagedImage, openUploadedGallery, uploadedImages]
  );

  const {
    handleContentLayout,
    animatedSnapPoints,
    animatedContentHeight,
    animatedHandleHeight,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  useAnimatedReaction(
    () => animatedContentHeight.value,
    (height) =>
      sheetInputHeight.value === 0 ? (sheetInputHeight.value = height) : null
  );

  const animatedSheetIndex = useDerivedValue(() => {
    return state.value === 1 ? 0 : 0;
  }, [state]);

  useEffect(() => {
    if (stagedImage) {
      uploadImage(stagedImage).then(() => setStagedImage(undefined));
    }
  }, [stagedImage]);

  useEffect(() => {
    if (openUploadedGallery) {
      setOpenEmojiList(false);
      getUploadedImages();
    }
  }, [openUploadedGallery]);

  useEffect(() => {
    if (openEmojiList) {
      setOpenGallery(false);
      setOpenUploadedGallery(false);
    }
  }, [openEmojiList]);

  useEffect(() => {
    setOpenUploadedGallery(false);
  }, [attachedImage]);

  useEffect(() => {
    Keyboard.addListener('keyboardWillHide', () => {
      sheetInputRef.current?.snapToIndex(0);
    });
  }, [sheetInputRef, sheetInputRef.current]);

  return (
    <>
      <BottomSheet
        ref={sheetInputRef}
        contentHeight={animatedContentHeight}
        handleHeight={animatedHandleHeight}
        bottomInset={BOTTOM_BAR_HEIGHT}
        animatedIndex={animatedSheetIndex}
        backgroundComponent={CustomBackground}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={1}
            onPress={() => {
              sheetInputRef.current?.snapToIndex(-1);
              Keyboard.dismiss();
            }}
          />
        )}
        handleStyle={{ paddingVertical: 8 }}
        style={{ borderRadius: 16, overflow: 'hidden' }}
        // @ts-ignore
        handleComponent={() => <TypingIndicator opponent={localUser || {}} />}
        snapPoints={animatedSnapPoints}>
        <BottomSheetView onLayout={handleContentLayout}>
          <View style={withColors.messageContainer}>
            <BottomSheetTextInput
              onChangeText={onChangeText}
              value={value}
              textAlignVertical={'top'}
              multiline={true}
              placeholder="Message"
              onTouchStart={() => setOpenUploadedGallery(false)}
              placeholderTextColor={colors.text}
              style={withColors.messageInput}
            />
            {attachedImage ? (
              <Animated.View
                entering={FadeIn.duration(1000)}
                exiting={FadeOut.duration(100)}
                style={messageStyles.imageWrapper}>
                <Pressable
                  hitSlop={12}
                  onPress={() => onAttachedImage(undefined)}
                  style={withColors.closeIcon}>
                  <Icon name={'close-outline'} />
                </Pressable>
                <Image
                  style={messageStyles.image}
                  source={{ uri: URL + attachedImage.filename }}
                />
              </Animated.View>
            ) : null}
            <View style={withColors.inputFooter}>
              <View style={withColors.footerHeader}>
                <Pressable
                  onPress={() => setOpenUploadedGallery(!openUploadedGallery)}>
                  <Icon
                    name={'attach-2-outline'}
                    style={{
                      opacity: openUploadedGallery ? 1 : 0.4,
                      width: 18,
                      height: 18,
                      marginRight: 8,
                    }}
                  />
                </Pressable>
                <Pressable onPress={() => setOpenEmojiList(!openEmojiList)}>
                  <Icon
                    name={'smiling-face-outline'}
                    style={{
                      opacity: openEmojiList ? 1 : 0.4,
                      width: 18,
                      height: 18,
                      marginRight: 8,
                    }}
                  />
                </Pressable>
                <Pressable>
                  <Icon
                    name={'code-outline'}
                    style={{
                      opacity: 0.4,
                      width: 18,
                      height: 18,
                      marginRight: 8,
                    }}
                  />
                </Pressable>
                <Pressable>
                  <Icon
                    name={'at-outline'}
                    style={{
                      opacity: 0.4,
                      width: 18,
                      height: 18,
                      marginRight: 8,
                    }}
                  />
                </Pressable>
                <Pressable>
                  <Icon
                    name={'mic-outline'}
                    style={{
                      opacity: 0.4,
                      width: 18,
                      height: 18,
                      marginRight: 8,
                    }}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    CreateEventSheetRef.current?.snapToIndex(0);
                  }}>
                  <Icon
                    name={'calendar-outline'}
                    style={{
                      opacity: 0.4,
                      width: 18,
                      height: 18,
                      marginRight: 8,
                    }}
                  />
                </Pressable>
              </View>
              {value || attachedImage ? (
                <Animated.View exiting={FadeOut} entering={FadeIn}>
                  <Pressable
                    onPress={() => {
                      onSend();
                      setOpenUploadedGallery(false);
                      setOpenEmojiList(false);
                    }}>
                    <MaskedView
                      maskElement={
                        <Icon
                          style={withColors.icon}
                          name={'paper-plane-outline'}
                        />
                      }>
                      <LinearGradient
                        style={withColors.icon}
                        colors={[colors.pink, colors.cyan]}
                      />
                    </MaskedView>
                  </Pressable>
                </Animated.View>
              ) : null}
            </View>
          </View>
          {openUploadedGallery ? (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <FlatList
                style={{ maxHeight: 400 }}
                data={uploadedImages}
                numColumns={3}
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                  <BlurView
                    blurType={isDark ? 'dark' : 'light'}
                    blurAmount={10}>
                    <Pressable
                      style={messageStyles.header}
                      onPress={() => setOpenGallery(true)}>
                      <Text weight="semibold">Import from camera roll</Text>
                      <Icon style={messageStyles.icon} name={'plus-outline'} />
                    </Pressable>
                  </BlurView>
                }
                renderItem={({ item, index }) => (
                  <Pressable
                    key={index}
                    onPress={() => onAttachedImage(item)}
                    style={messageStyles.attachedImageWrapper}>
                    <Image
                      style={messageStyles.attachedImage}
                      source={{ uri: URL + item.filename }}
                    />
                  </Pressable>
                )}
              />
            </Animated.View>
          ) : null}
          {openEmojiList ? (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <EmojiList onEmojiPressed={onEmojiPressed} />
            </Animated.View>
          ) : null}
        </BottomSheetView>
      </BottomSheet>
      {openGallery ? (
        <GalleryModal
          onImageSelected={(image) => setStagedImage(image)}
          onRequestClose={() => setOpenGallery(false)}
        />
      ) : null}
    </>
  );
};

export default MessageInput;
