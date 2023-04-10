import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Avatar } from '../../../../Components/atoms';
import { URL } from '../../../../Services/Fetch';
import { useColors } from '../../../../Theme';
import { UserChatMessage } from '../../types';
import styles from '../../UserChatScreen.styles';
import ImageModal from '../ImageModal';

export const MessageItem: React.FC<{ item: UserChatMessage; index: number }> = React.memo(
  ({ item, index }) => {
    const colors = useColors();
    const insets = useSafeAreaInsets();
    const withColors = styles(colors, insets);
    const { user, messages } = item;
    const [openImage, setOpenImage] = useState<boolean>(false);
    return (
      <Animated.View entering={FadeIn.duration(500).delay(10 * index)} style={withColors.row}>
        <View>
          <Avatar avatar={user.avatar} isActive={user.isActive} />
        </View>
        <View style={withColors.flex}>
          <Text fontSize={15} weight={'bold'}>
            {user.name}
          </Text>
          <View style={withColors.messageWrapper}>
            {messages.map((msg, index) => {
              return (
                <>
                  {msg.message ? (
                    <Text key={index} style={withColors.flex}>
                      {msg.message}
                    </Text>
                  ) : null}
                  {msg.attachment &&
                  msg.attachment.gallery &&
                  msg.attachment.gallery?.length > 0 ? (
                    <View>
                      {msg.attachment.gallery.map((image, index) => {
                        return (
                          <ImageModal
                            key={index}
                            image={image}
                            onRequestClose={() => setOpenImage(false)}
                            visible={openImage}>
                            <Pressable disabled={openImage} onPress={() => setOpenImage(true)}>
                              <Animated.Image
                                style={{
                                  width: '100%',
                                  height: 200,
                                  marginVertical: 4,
                                  borderRadius: 8,
                                  overflow: 'hidden',
                                }}
                                source={{ uri: URL + image.filename }}
                              />
                            </Pressable>
                          </ImageModal>
                        );
                      })}
                    </View>
                  ) : null}
                </>
              );
            })}
          </View>
        </View>
      </Animated.View>
    );
  }
);
export default MessageItem;
