import { SharedValue } from 'react-native-reanimated';
import { UploadedImage, UserChat } from '../../../../../types';
import { EmojisListProps } from '../../../../Components/molecules/EmojiList/EmojiList';
export type MessageInputProps = {
  onSend(): void;
  onChangeText(value: string): void;
  value: string;
  sheetInputHeight: SharedValue<number>;
  attachedImage: UploadedImage | undefined;
  onAttachedImage(image: UploadedImage | undefined): void;
  user: UserChat;
} & EmojisListProps;
