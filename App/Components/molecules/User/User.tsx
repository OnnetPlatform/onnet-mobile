import Avatar from '@Atoms/Avatar';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { useAppNavigation } from '@Hooks/useAppNavigation';
import { ProfileObject } from '@Khayat/Database/Models/types';
import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import React, { ReactElement, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useSelector } from 'react-redux';

export const User: React.FC<
  ProfileObject & { subtitle?: string | ReactElement; disabled?: boolean }
> = (props) => {
  const { id } = useSelector(AuthSelector);
  const is_you = id === props.user;
  const navigation = useAppNavigation();
  const onPress = () => {
    navigation.navigate('ProfileScreen', { id: props.user });
  };
  const isYouText = useCallback(() => {
    return (
      <>
        <Separator horizontal />
        <Text fontSize={12} weight="light">
          (You)
        </Text>
      </>
    );
  }, [is_you]);
  return (
    <Pressable
      onPress={onPress}
      disabled={props.disabled}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Avatar isActive={props.active === true} avatar={props.avatar} />
      <Separator horizontal size={'md'} />
      <View>
        <Text weight="bold" fontSize={16}>
          {props.first_name} {props.last_name}
          {is_you ? isYouText() : null}
        </Text>
        {props.subtitle ? <Text>{props.subtitle}</Text> : null}
      </View>
    </Pressable>
  );
};
export default User;
