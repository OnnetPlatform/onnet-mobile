import Avatar from '@Atoms/Avatar';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { ProfileObject } from '@Khayat/Database/Models/types';
import React from 'react';
import { View } from 'react-native';

export const User: React.FC<ProfileObject & { subtitle?: string }> = (
  props
) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Avatar isActive={props.active === true} avatar={props.avatar} />
      <Separator horizontal size={'md'} />
      <View>
        <Text weight="bold" fontSize={16}>
          {props.first_name} {props.last_name}
        </Text>
        {props.subtitle ? <Text>{props.subtitle}</Text> : null}
      </View>
    </View>
  );
};
export default User;
