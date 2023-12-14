import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventDescriptionScreen, EventInfoScreen } from '@Screens/CreateEvent';
import EventTimeScreen from '@Screens/CreateEvent/EventTimeScreen';
import React from 'react';

const Stack = createNativeStackNavigator();
export const CreateEventNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'EventInfo'}
        component={EventInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'EventDescription'}
        component={EventDescriptionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'EventTime'}
        component={EventTimeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CreateEventNavigation;
