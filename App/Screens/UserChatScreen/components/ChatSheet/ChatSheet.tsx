import BottomSheet, {
  BottomSheetFooter,
  BottomSheetScrollView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React from 'react';
import { CustomBackground } from '../../../ConferenceScreen/components/CreateEventSheet/CustomBackground';
import { useColors } from '../../../../Theme';
import styles from './ChatSheet.styles';
import { Icon } from '../../../../Components/atoms';
import { Pressable, View } from 'react-native';
import Animated, { FadeOut, FadeIn } from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

export const ChatSheet: React.FC = () => {
  const snapPoints = ['CONTENT_HEIGHT'];
  const colors = useColors();
  const withColors = styles(colors);
  const { animatedContentHeight, animatedHandleHeight, animatedSnapPoints, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(snapPoints);
  return (
    <BottomSheet
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
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
                  <LinearGradient style={withColors.sendIcon} colors={[colors.pink, colors.cyan]} />
                </MaskedView>
              </Pressable>
            </Animated.View>
          </View>
        </BottomSheetFooter>
      )}
      style={{ borderRadius: 16, overflow: 'hidden' }}
      backgroundComponent={CustomBackground}
      snapPoints={animatedSnapPoints}>
      <BottomSheetScrollView style={withColors.scrollView} onLayout={handleContentLayout}>
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
