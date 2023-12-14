// @ts-nocheck

/**
 * NOTE: Dolbyio is not installed  and not used within this project
 */

import { useEffect, useMemo, useState } from 'react';
import CommsAPI from '@dolbyio/comms-sdk-react-native';
import {
  ConferenceCreateOptions,
  ConferenceJoinOptions,
  Conference,
  Participant,
  ConferenceStatus,
} from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';

const useConference = () => {
  const [conference, setConference] = useState<Conference | null>(null);
  const [participants, setParticipants] = useState<Map<string, Participant>>(new Map());
  const [localParticipant, setLocalParticipant] = useState<Participant>();
  const [isSDKReady, setSDKReady] = useState<boolean>(false);
  const [status, setStatus] = useState<ConferenceStatus>();
  const [duration, setDuration] = useState<Date>();
  const [confereceAlias, setConferenceAlias] = useState<string>();
  const username = useMemo(() => {
    const rand = Math.round(Math.random() * 10000);
    return `user-${rand}`;
  }, []);

  const create = async (options: ConferenceCreateOptions) => {
    if (!isSDKReady) return console.log('Not ready');
    try {
      const cnfrnc = await CommsAPI.conference.create(options);
      setConference(cnfrnc);
    } catch (error) {
      console.log('create:', error);
    }
  };

  const initializeSDK = async () => {
    try {
      await CommsAPI.initialize(
        '1gCopDT9nL2uf6Mhte9cUw==',
        'iOT_msMy-0ym5OZJRryO7kg4gaC1OKJsB_8RzRHluIY='
      );
      await CommsAPI.session.open({
        name: username,
        avatarUrl:
          'https://images.unsplash.com/photo-1678737176644-99fdb97795cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
      });
      setSDKReady(true);
    } catch (error) {
      console.log('initializeSDK', error);
    }
  };

  const join = async (options: ConferenceJoinOptions) => {
    try {
      if (!conference || !isSDKReady) return console.log('conference not initialized');
      const joinedconference = await CommsAPI.conference.join(conference, options);
      setConferenceAlias(joinedconference.alias);
      setDuration(new Date());
    } catch (error) {
      console.log('join:', error);
    }
  };

  const onStreamChange = () => {
    try {
      CommsAPI.conference.onStreamsChange(({ participant: updatedParticipant, stream }) => {
        console.log('onStreamChanged', stream.type);
        setParticipants((parts) => {
          const p = parts.get(updatedParticipant.id);
          return new Map(
            parts.set(updatedParticipant.id, {
              ...p,
              ...updatedParticipant,
            })
          );
        });
      });
    } catch (error) {
      console.log('onStreamChanged', error);
    }
  };

  const leaveConference = async () => {
    try {
      await CommsAPI.conference.leave({ leaveRoom: true });
    } finally {
      // @ts-ignore
      setStatus('LEFT');
      setParticipants(new Map());
    }
  };

  const getConference = async () => {
    try {
      const cnfrnc = await CommsAPI.conference.current();
      setConference(cnfrnc);
    } catch (error) {
      console.log('getConference', error);
    }
  };

  useEffect(() => {
    try {
      initializeSDK();
    } catch (error) {
      console.log(error);
    }
  }, [conference]);

  useEffect(() => {
    onStreamChange();
    CommsAPI.conference.onParticipantsChange(({ participant: updatedParticipant }, type) => {
      const participantsArray = Array.from(participants, ([id, participant]) => ({
        id,
        participant,
      }));
      if (
        !localParticipant ||
        (participantsArray.length > 0 && updatedParticipant.id === participantsArray[0].id)
      ) {
        setLocalParticipant(updatedParticipant);
      }
      // @ts-ignore
      if (['LEFT', 'KICKED'].includes(updatedParticipant.status)) {
        return setParticipants((participants) => {
          participants.delete(updatedParticipant.id);
          return new Map(participants);
        });
      }

      setParticipants((participants) => {
        const p = participants.get(updatedParticipant.id);
        return new Map(
          participants.set(updatedParticipant.id, {
            ...p,
            ...updatedParticipant,
          })
        );
      });
    });
  }, [conference]);

  useEffect(() => {
    CommsAPI.conference.onStatusChange(({ status }) => {
      setStatus(status);
    });
    if (isSDKReady) getConference();
  }, [isSDKReady]);

  return {
    create,
    join,
    leaveConference,
    onStreamChange,
    isSDKReady,
    conference,
    participants: Array.from(participants, ([id, participant]) => ({ id, participant })),
    username,
    localParticipant,
    status,
    confereceAlias,
    duration,
  };
};

export default useConference;
