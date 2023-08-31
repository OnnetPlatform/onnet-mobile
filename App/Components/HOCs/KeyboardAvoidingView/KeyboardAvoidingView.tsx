import React, { ReactElement } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, ViewStyle } from 'react-native';
type Props = {
  style?: ViewStyle;
  children: ReactElement | ReactElement[];
};
const KeyboardFloatingView: (props: Props) => ReactElement = (props: Props) => {
  const behaviour = Platform.OS == 'ios' ? 'height' : 'padding';
  return (
    <KeyboardAvoidingView behavior={behaviour} style={props.style}>
      {props.children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardFloatingView;
