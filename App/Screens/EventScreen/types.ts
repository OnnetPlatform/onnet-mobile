import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppNavigationParamsList } from 'Navigation/Navigators/Stacks/AuthStack/types';

export interface EventScreenProps
  extends NativeStackScreenProps<AppNavigationParamsList, 'EventScreen'> {}
