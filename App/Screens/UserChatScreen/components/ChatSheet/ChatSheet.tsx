import { Icon } from '@Atoms';
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetScrollView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import MaskedView from '@react-native-masked-view/masked-view';
import { useColors } from '@Theme';
import React from 'react';
import { Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { CustomBackground } from '../../../ConferenceScreen/components/CreateEventSheet/CustomBackground';
import styles from './ChatSheet.styles';

export const ChatSheet: React.FC = () => {
  const snapPoints = ['CONTENT_HEIGHT'];
  const colors = useColors();
  const withColors = styles(colors);
  const { animatedSnapPoints, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(snapPoints);
  return (
    <BottomSheet
      enableDynamicSizing={true}
      footerComponent={(props) => (
        <BottomSheetFooter {...props}>
          <View
            style={{
              minHeight: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 22,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon style={withColors.icon} name={'attach-2-outline'} />
              <Icon style={withColors.icon} name={'phone-call-outline'} />
              <Icon style={withColors.icon} name={'calendar-outline'} />
              <Icon style={withColors.icon} name={'mic-outline'} />
            </View>
            <Animated.View exiting={FadeOut} entering={FadeIn}>
              <Pressable onPress={() => {}}>
                <MaskedView maskElement={<Icon name={'paper-plane-outline'} />}>
                  <LinearGradient
                    style={withColors.sendIcon}
                    colors={[colors.pink, colors.cyan]}
                  />
                </MaskedView>
              </Pressable>
            </Animated.View>
          </View>
        </BottomSheetFooter>
      )}
      style={{ borderRadius: 16, overflow: 'hidden' }}
      backgroundComponent={CustomBackground}
      snapPoints={animatedSnapPoints}>
      <BottomSheetScrollView
        style={withColors.scrollView}
        onLayout={handleContentLayout}>
        <View style={withColors.messageContainer}>
          <BottomSheetTextInput
            multiline={true}
            textAlignVertical="top"
            textAlign="left"
            placeholder="Message"
            onTouchStart={() => {}}
            placeholderTextColor={colors.text}
            style={withColors.messageInput}
          />
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

/**
 *
 *
 *      <Collapsible expanded={true}>
          <View style={withColors.featureWrapper}>
            <Text>Attach Media</Text>
          </View>
          <View style={withColors.featureWrapper}>
            <Text>Quick call</Text>
          </View>
          <View style={withColors.featureWrapper}>
            <Text>Schedule Meeting</Text>
          </View>
          <View style={withColors.featureWrapper}>
            <Icon style={withColors.icon} name={'mic-outline'} />
            <Text>Record</Text>
          </View>
        </Collapsible>
 */
