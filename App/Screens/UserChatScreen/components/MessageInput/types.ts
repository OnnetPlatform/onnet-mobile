import { SharedValue } from 'react-native-reanimated';
import { UploadedImage } from '../../../../../types';

export type MessageInputProps = {
  onSend(): void;
  onChangeText(value: string): void;
  value: string;
  sheetInputHeight: SharedValue<number>;
  attachedImage: UploadedImage | undefined;
  onAttachedImage(image: UploadedImage | undefined): void;
};
