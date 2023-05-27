import { GradientLayout } from '../../Components/HOCs';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import ConferenceFooter from './components/ConferenceFooter/ConferenceFooter';
import useConference from '../../Services/Conference/useConference';
import { ConferenceVideo } from './components/ConferenceVideo/ConferenceVideo';
import { Text } from '../../Components/atoms';
export default () => {
  const {
    create,
    isSDKReady,
    localParticipant,
    join,
    conference,
    leaveConference,
    participants,
    status,
    confereceAlias,
  } = useConference();

  useEffect(() => {
    if (isSDKReady)
      create({
        alias: 'Unified Componenets - Team 1',
        params: {},
      });
  }, [isSDKReady]);

  useEffect(() => {
    if (conference) join({ constraints: { video: false, audio: false } });
  }, [conference]);

  return (
    <GradientLayout>
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          weight="bold"
          style={{ textTransform: 'uppercase', textAlign: 'center', padding: 16 }}>
          {confereceAlias}
        </Text>
        <FlatList
          data={participants}
          renderItem={({ item, index }) => {
            return (
              <ConferenceVideo
                index={index}
                localParticipant={localParticipant}
                id={item.id}
                participant={item.participant}
              />
            );
          }}
        />
      </SafeAreaView>

      <SafeAreaView>
        <View style={{ paddingHorizontal: 22 }}>
          <ConferenceFooter
            conference={conference}
            leaveConference={leaveConference}
            isSDKReady={isSDKReady}
            status={status}
          />
        </View>
      </SafeAreaView>
    </GradientLayout>
  );
};
