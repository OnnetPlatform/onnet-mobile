import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateAnnouncement } from '@Screens/Announcement';
import React from 'react';

const Stack = createNativeStackNavigator();

export const AnnouncementNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CreateAnnouncement"
        component={CreateAnnouncement}
      />
    </Stack.Navigator>
  );
};
