import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChatStackParamList } from 'App/Navigation/Navigators/Stacks/ChatStack/types';

export type SettingsScreenProps = NativeStackScreenProps<ChatStackParamList, 'Settings'>;
export type SettingsScreenNavigationProps = NativeStackNavigationProp<
  ChatStackParamList,
  'Settings',
  undefined
>;

export type SettingItem = {
  title: string;
  icon: string;
  onPress: () => void;
  settings?: SettingItem[];
};
