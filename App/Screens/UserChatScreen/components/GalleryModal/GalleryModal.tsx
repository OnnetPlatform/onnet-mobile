import { Text } from '@Atoms';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { BlurView } from '@react-native-community/blur';
import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import {} from 'react-native-safe-area-context';

import { useCameraRoll } from '../../../../Hooks/useCameraRoll';

export const GalleryModal: React.FC<{
  onRequestClose(): void;
  onImageSelected(image: PhotoIdentifier): void;
}> = ({ onRequestClose, onImageSelected }) => {
  const { width } = useWindowDimensions();
  const photos = useCameraRoll();
  const isDark = useColorScheme() === 'dark';
  return (
    <Modal
      visible={true}
      onRequestClose={onRequestClose}
      animationType={'slide'}
      transparent
      presentationStyle={'pageSheet'}>
      <BlurView
        blurType={isDark ? 'dark' : 'light'}
        blurAmount={10}
        style={{ width, flex: 1 }}>
        <View style={{ padding: 22 }}>
          <Text fontSize={24} weight="bold">
            Select Photo
          </Text>
        </View>
        <FlatList
          numColumns={3}
          data={photos}
          contentContainerStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <Pressable
                onPress={() => {
                  onImageSelected(item);
                  onRequestClose();
                }}
                style={{
                  width: width / 3,
                  height: width / 3,
                  padding: 1,
                }}>
                <View style={{ width: '100%', height: '100%' }}>
                  <Image
                    style={{ flex: 1 }}
                    source={{ uri: item.node.image.uri }}
                  />
                </View>
              </Pressable>
            );
          }}
        />
      </BlurView>
    </Modal>
  );
};
export default GalleryModal;
