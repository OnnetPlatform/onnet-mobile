import React, { ReactElement, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
type Props = {
  style?: ViewStyle;
  children: ReactElement;
};
const KeyboardFloatingView: (props: Props) => JSX.Element = (props: Props) => {
  const insets = useSafeAreaInsets();
  const [bottomPadding, setBottomPadding] = useState(insets.bottom);
  const [topPadding, setTopPadding] = useState(insets.top);

  useEffect(() => {
    setTimeout(() => {
      setBottomPadding(insets.bottom);
      setTopPadding(insets.top);
    }, 100);
  }, [insets.bottom, insets.top]);

  const keyboardVerticalOffset = topPadding + bottomPadding + 30 + (StatusBar.currentHeight || 0);
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
