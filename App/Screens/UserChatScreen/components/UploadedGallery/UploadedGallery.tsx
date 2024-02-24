import Blur from '@Atoms/Blur';
import Icon from '@Atoms/Icon';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { useUploadImage } from '@Hooks/useUploadImage';
import React from 'react';
import { Image, Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import MessageInputStyles from '../MessageInput/MessageInput.styles';
import { FlashList } from '@shopify/flash-list';

export const UploadedGallery: React.FC = () => {
  const { uploadImage, uploadedImages, getUploadedImages } = useUploadImage();

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <FlashList
        style={{ maxHeight: 400 }}
        data={uploadedImages}
        numColumns={3}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Blur blurAmount={10}>
            <Pressable
              style={MessageInputStyles.header}
              onPress={() => setOpenGallery(true)}>
              <Icon style={MessageInputStyles.icon} name={'image-outline'} />
              <Separator horizontal />
              <Text weight="semibold">Attach Image</Text>
            </Pressable>
          </Blur>
        }
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            onPress={() => onAttachedImage(item)}
            style={MessageInputStyles.attachedImageWrapper}>
            <Image
              style={MessageInputStyles.attachedImage}
              source={{ uri: URL + item.filename }}
            />
          </Pressable>
        )}
      />
    </Animated.View>
  );
};
