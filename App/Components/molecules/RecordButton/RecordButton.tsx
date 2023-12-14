import { SolidButton } from '@Molecules/SolidButton/SolidButton';
import { SolidButtonProps } from '@Molecules/SolidButton/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type RecordButtonType = SolidButtonProps & { isRecording: boolean };

export const RecordButton: React.FC<RecordButtonType> = ({
  isRecording,
  ...props
}) => {
  const recordingIndicatorStyle = useAnimatedStyle(
    () => ({
      borderRadius: withTiming(isRecording ? 4 : 32),
      width: withTiming(isRecording ? 27 : 60),
      height: withTiming(isRecording ? 27 : 60),
      backgroundColor: 'red',
    }),
    [isRecording]
  );
  return (
    <SolidButton style={styles.button} variant="OUTLINED" {...props}>
      <Animated.View style={recordingIndicatorStyle} />
    </SolidButton>
  );
};
export default RecordButton;

const styles = StyleSheet.create({
  button: {
    width: 72,
    height: 72,
    padding: 4,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
});
