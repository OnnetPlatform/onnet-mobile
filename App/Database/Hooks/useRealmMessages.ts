import { useQuery, useRealm } from '@Khayat/Database/Hooks/useRealmContext';
import Message from '@Khayat/Database/Models/Message';
import { UserChat, UserChatMessage } from '@Khayat/Database/Models/types';

import { URL } from '../../Services/Fetch';
import { useRealmUsers } from './useRealmUsers';

export const useRealmMessages = () => {
  const realm = useRealm();
  const { getUser } = useRealmUsers();
  const createMessage = (data: UserChatMessage) =>
    realm.write(() => {
      const createdMessages = data.messages.map((message) => {
        const gallery = message.attachment?.gallery?.map((image) =>
          realm.create('UploadedImage', {
            ...image,
            path: URL + image.filename,
          })
        );
        const attachment = realm.create('Attachment', { gallery, voice: '' });
        const textMessage = realm.create('TextMessage', {
          attachment,
          date: new Date().toString(),
          message: message.message,
        });
        return textMessage;
      });
      const localuser = getUser(data.user);
      realm.create('Message', { messages: createdMessages, user: localuser });
    });

  return { createMessage };
};

export const useRoomMessages = (user: UserChat) => {
  const messages = useQuery(Message);

  try {
    const data = Array.from(
      messages.filtered(`user.id = "${user.id}"`)
    ).reverse();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
