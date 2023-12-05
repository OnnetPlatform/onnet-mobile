import { Icon } from '@Atoms';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventDescriptionScreen, EventInfoScreen } from '@Screens/CreateEvent';
import Header from '@Screens/CreateEvent/EventInfoScreen/Components/Header/Header';
import { useColors } from '@Theme';
import React from 'react';

const Stack = createNativeStackNavigator();
export const CreateEventNavigation: React.FC = () => {
  const colors = useColors();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'EventInfo'}
        component={EventInfoScreen}
        options={{
          header: Header,
        }}
      />
      <Stack.Screen
        name={'EventDescription'}
        component={EventDescriptionScreen}
        options={{
          title: 'Event Description',
          headerRight: () => <Icon name={'checkmark-outline'} />,
          headerLeft: () => <Icon name={'arrow-ios-back-outline'} />,
          headerStyle: {
            backgroundColor: colors.secondaryBackground,
          },
          headerShadowVisible: false,
          headerTintColor: colors.text,
        }}
      />
    </Stack.Navigator>
  );
};

export default CreateEventNavigation;
