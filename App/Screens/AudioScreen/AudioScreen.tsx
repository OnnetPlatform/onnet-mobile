import Text from '@Atoms/Text';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import Button from '@Molecules/Button';
import Separator from '@Atoms/Separator';
import { Audio } from 'expo-av';

export const AudioScreen: React.FC = () => {
  const [recording, setRecording] = useState<Audio.Recording>();
  const [isAllowRecord, setAllowRecord] = useState('No');

  const onRecordPress = useCallback(() => {}, []);

  async function _askForPermissions() {
    try {
      const response = await Audio.requestPermissionsAsync();
      setAllowRecord(response.status);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const onStopRecordingPressed = useCallback(() => {}, []);

  useEffect(() => {
    _askForPermissions();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, flexGrow: 1, justifyContent: 'center', padding: 22 }}>
      <Text weight="bold">Recording ya beeeeh</Text>
      <Separator size={'md'} />

      <View style={{ flexDirection: 'row' }}>
        <Button onPress={onRecordPress}>Record</Button>
        <Separator size={'md'} horizontal />
        <Button onPress={onStopRecordingPressed}>Stop Recording</Button>
      </View>
    </SafeAreaView>
  );
};

export default AudioScreen;
