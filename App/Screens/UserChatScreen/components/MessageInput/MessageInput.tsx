import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useAnimatedKeyboard, useAnimatedReaction, useDerivedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUploadImage } from '../../../../Hooks/useUploadImage';
import { useColors } from '../../../../Theme';
import styles from '../../UserChatScreen.styles';
import { View, Pressable, Image, useWindowDimensions, FlatList } from 'react-native';
import { Icon, Text } from '../../../../Components/atoms';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { TypingIndicator, GalleryModal } from '..';
import { MessageInputProps } from './types';
import { Button } from '../../../../Components/molecules';
import { UploadedImage } from '../../../../../types';
import { URL } from '../../../../Services/Fetch';

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  onChangeText,
  value,
  sheetInputHeight,
  attachedImage,
  onAttachedImage,
}) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const withColors = styles(colors, insets);
  const sheetInputRef = useRef<BottomSheet>(null);
  const { uploadImage, uploadedImages } = useUploadImage();
  const [openGallery, setOpenGallery] = useState<boolean>(false);
  const [stagedImage, setStagedImage] = useState<PhotoIdentifier | undefined>();
  const [openUploadedGallery, setOpenUploadedGallery] = useState<boolean>(false);

  const snapPoints = useMemo(
    () => ['CONTENT_HEIGHT'],
    [insets.top, stagedImage, openUploadedGallery, uploadedImages]
  );
  const { state } = useAnimatedKeyboard();

  const { handleContentLayout, animatedSnapPoints, animatedContentHeight, animatedHandleHeight } =
    useBottomSheetDynamicSnapPoints(snapPoints);

  useAnimatedReaction(
    () => animatedContentHeight.value,
    (height) => (sheetInputHeight.value === 0 ? (sheetInputHeight.value = height) : null)
  );

  const animatedSheetIndex = useDerivedValue(() => {
    return state.value === 1 ? 0 : 0;
  }, [state]);

  useEffect(() => {
    if (stagedImage) {
      uploadImage(stagedImage).then(() => setStagedImage(undefined));
    }
  }, [stagedImage]);

  return (
    <>
      <BottomSheet
        ref={sheetInputRef}
        contentHeight={animatedContentHeight}
        handleHeight={animatedHandleHeight}
        animatedIndex={animatedSheetIndex}
        handleStyle={{ backgroundColor: colors.background, paddingVertical: 8 }}
        backgroundStyle={{ backgroundColor: colors.secondaryBackground, borderRadius: 16 }}
        handleComponent={TypingIndicator}
        snapPoints={animatedSnapPoints}>
        <BottomSheetView onLayout={handleContentLayout}>
          <View style={withColors.messageContainer}>
            <BottomSheetTextInput
              onChangeText={onChangeText}
              value={value}
              textAlignVertical={'top'}
              multiline={true}
              placeholder="Message"
              onTouchStart={() => {
                setOpenUploadedGallery(false);
              }}
              placeholderTextColor={colors.text}
              style={withColors.messageInput}
            />
            {attachedImage ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: width / 3 }}>
                <Pressable
                  hitSlop={12}
                  onPress={() => onAttachedImage(undefined)}
                  style={withColors.closeIcon}>
                  <Icon name={'close-outline'} />
                </Pressable>
                <Image
                  style={{
                    width: width / 3,
                    height: width / 3,
                  }}
                  source={{ uri: URL + attachedImage.filename }}
                />
              </View>
            ) : null}
            <View style={withColors.inputFooter}>
              <View style={withColors.footerHeader}>
                <Pressable onPress={() => setOpenUploadedGallery(!openUploadedGallery)}>
                  <Icon
                    name={'attach-2-outline'}
                    style={{ opacity: openUploadedGallery ? 1 : 0.4 }}
                  />
                </Pressable>
                <Pressable>
                  <Icon name={'code-outline'} style={{ opacity: 0.4 }} />
                </Pressable>
                <Pressable>
                  <Icon name={'mic-outline'} style={{ opacity: 0.4 }} />
                </Pressable>
              </View>
              {value || attachedImage ? (
                <Animated.View exiting={FadeOut} entering={FadeIn}>
                  <Pressable
                    onPress={() => {
                      onSend();
                      setOpenUploadedGallery(false);
                    }}>
                    <MaskedView maskElement={<Icon name={'paper-plane-outline'} />}>
                      <LinearGradient style={withColors.icon} colors={[colors.pink, colors.cyan]} />
                    </MaskedView>
                  </Pressable>
                </Animated.View>
              ) : null}
            </View>
          </View>
          {openUploadedGallery ? (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <FlatList
                style={{ maxHeight: 300 }}
                data={uploadedImages}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <Pressable
                    key={index}
                    onPress={() => onAttachedImage(item)}
                    style={{ width: width / 3, height: width / 3, padding: 1 }}>
                    <Image
                      style={{ width: '100%', height: '100%', backgroundColor: 'red' }}
                      source={{ uri: 'http://192.168.1.5:3000/' + item.filename }}
                    />
                  </Pressable>
                )}
              />
              <Button style={{ margin: 22 }} onPress={() => setOpenGallery(true)}>
                <Text weight="bold" style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                  Add more
                </Text>
              </Button>
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
