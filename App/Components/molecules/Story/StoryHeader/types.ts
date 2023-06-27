import { SharedValue } from 'react-native-reanimated';

export type StoryHeaderProps = {
  currentIndex: number;
  onEnd(): void;
  isFocused: SharedValue<boolean>;
  storiesLength: number;
};
