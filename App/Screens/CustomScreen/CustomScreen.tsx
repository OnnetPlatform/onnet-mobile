import { PageView } from '@HOCs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChatStackParamList } from '../../Navigation/Navigators/Stacks/ChatStack/types';
import React from 'react';

type Props = NativeStackScreenProps<ChatStackParamList, 'CustomScreen'>;

export const CustomScreen: React.FC<Props> = ({ route }) => {
  const { content, title } = route.params;
  return <PageView title={title}>{content}</PageView>;
};
export default CustomScreen;
