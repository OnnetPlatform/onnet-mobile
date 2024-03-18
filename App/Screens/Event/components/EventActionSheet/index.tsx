import React, { useMemo } from 'react';
import Icon from '@Atoms/Icon';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { Pressable, View, ViewStyle } from 'react-native';
import { useColors } from '@Theme/index';
import useAlert from '@Context/AlertContext/AlertContext';
import { useAppNavigation } from '@Hooks/useAppNavigation';
import { Event } from '@Khayat/Graphql/Events/types';

export const ActionSheet: React.FC<{ event: Event }> = ({ event }) => {
  const colors = useColors();
  const { configureAlert } = useAlert();
  const navigation = useAppNavigation();
  const container: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomColor: colors.secondaryBackground,
      borderBottomWidth: 1,
    }),
    [colors]
  );
  return (
    <View style={{ width: '100%' }}>
      <View style={container}>
        <Icon name={'person-add-outline'} />
        <Separator horizontal />
        <Text>Invite Guests</Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate('EditEventScreen', { event })}
        style={container}>
        <Icon name={'edit-2-outline'} />
        <Separator horizontal />
        <Text>Edit Meeting</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          configureAlert({
            title: 'Are you sure?',
            visible: true,
            subtitle: 'Are you sure you want to delete this event?',
            actionTitle: 'Yes',
            onPress() {
              console.log();
              configureAlert({ visible: false });
            },
          });
        }}
        style={container}>
        <Icon name={'trash-outline'} />
        <Separator horizontal />
        <Text color="red">Delete Meeting</Text>
      </Pressable>
    </View>
  );
};
export default ActionSheet;
