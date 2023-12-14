import { Separator } from '@Atoms';
import { useEventContext } from '@Context/EventContext/EventContext';
import { useColors } from '@Theme';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput } from 'react-native';

import NestedScreenHeader from '../Components/NestedScreenHeader/NestedScreenHeader';
import useSave from '../Hooks/useSave';
import withColors from './EventDescriptionScreen.styles';

export const EventDescriptionScreen: React.FC = () => {
  const colors = useColors();
  const { event } = useEventContext();
  const styles = withColors(colors);
  const [text, setText] = useState<string>('');

  const { onBackPressed, onSavePressed } = useSave({
    value: text,
    key: 'description',
  });

  useEffect(() => {
    if (event) {
      setText(event.description);
    }
  }, [event]);
  return (
    <SafeAreaView style={styles.screen}>
      <NestedScreenHeader
        title={'Event Description'}
        onSavePressed={onSavePressed}
        onBackPressed={onBackPressed}
      />
      <Separator />
      <TextInput
        multiline
        placeholder="Description"
        style={styles.textarea}
        textAlignVertical="top"
        value={text}
        onChangeText={setText}
      />
    </SafeAreaView>
  );
};

export default EventDescriptionScreen;
