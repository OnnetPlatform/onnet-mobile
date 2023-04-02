import React, { ReactElement } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
type Props = {
  style?: ViewStyle;
  children: ReactElement;
};
const KeyboardFloatingView: (props: Props) => ReactElement = (props: Props) => {
  const insets = useSafeAreaInsets();
  const keyboardVerticalOffset = insets.top + (StatusBar.currentHeight || 0);
  const behaviour = Platform.OS == 'ios' ? 'padding' : 'height';
  return (
    <KeyboardAvoidingView
      behavior={behaviour}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={props.style}>
      {props.children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardFloatingView;
