import { Separator } from '@Atoms';
import { useColors } from '@Theme';
import React from 'react';
import { SafeAreaView, TextInput } from 'react-native';

export const EventDescriptionScreen: React.FC = () => {
  const colors = useColors();
  return (
    <SafeAreaView
      style={{ flex: 1, flexGrow: 1, backgroundColor: colors.background }}>
      <Separator />
      <TextInput
        multiline
        placeholder="Description"
        style={{
          padding: 16,
          minHeight: 200,
        }}
        textAlignVertical="top"
      />
    </SafeAreaView>
  );
};

export default EventDescriptionScreen;
