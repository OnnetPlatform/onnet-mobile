import { Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import Icon from '@Atoms/Icon';
import LinearGradient from 'react-native-linear-gradient';
import { useColors } from '@Theme/index';
import { useMessageInputContext } from '@Context/MessageInputContext/MessageInputContext';
import { useDispatch } from 'react-redux';
import { MessagingCreators } from '@Khayat/Redux/Actions/MessagingActions';

export const SendButton: React.FC = () => {
  const { textMessage, user } = useMessageInputContext();
  const colors = useColors();
  const dispatch = useDispatch();
  const onSendPressed = () => {
    dispatch(
      MessagingCreators.sendMessage({
        textMessage,
        id: user._id,
      })
    );
  };

  if (textMessage)
    return (
      <Animated.View exiting={FadeOut} entering={FadeIn}>
        <Pressable onPress={onSendPressed}>
          <MaskedView maskElement={<Icon name={'paper-plane-outline'} />}>
            <LinearGradient
              style={{ width: 24, height: 24 }}
              colors={[colors.pink, colors.cyan]}
            />
          </MaskedView>
        </Pressable>
      </Animated.View>
    );

  return null;
};

export default SendButton;
