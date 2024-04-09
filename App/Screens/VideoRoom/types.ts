import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppNavigationParamsList } from 'Navigation/Navigators/Stacks/AuthStack/types';

export interface VideoRoomProps
  extends NativeStackScreenProps<AppNavigationParamsList, 'ConferenceScreen'> {}
