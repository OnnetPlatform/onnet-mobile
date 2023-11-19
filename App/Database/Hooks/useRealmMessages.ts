import { useQuery } from '@Khayat/Database/Hooks/useRealmContext';
import Message from '@Khayat/Database/Models/Message';
import { UserChat } from '@Khayat/Database/Models/types';
import { FormattedMessages } from 'App/Screens/UserChatScreen/components/MessageItem/utils';
import { useMemo } from 'react';

export const useRoomMessages = (user: UserChat): FormattedMessages[] => {
  const data = useQuery(
    Message,
    (collection) =>
      collection.filtered(
        `to.user_id == "${user.user_id}" OR from.user_id == "${user.user_id}"`
      ),
    [user]
  );
  // @ts-ignore
  return useMemo(() => naiveSorting(Array.from(data)), [data, user]);
};

const naiveSorting = (data: Message[]) => {
  if (data.length === 0) {
    return data;
  }
  const groupedArray = [];
  let currentGroup = {
    user: data[0].user,
    data: [data[0].message],
    title: data[0].user.name,
  };

  for (let index = 1; index < data.length; index++) {
    if (data[index].user.user_id === data[index - 1].user.user_id) {
      currentGroup.data.push(data[index].message);
    } else {
      groupedArray.push(currentGroup);
      currentGroup = {
        user: data[index].user,
        data: [data[index].message],
        title: data[index].user.name,
      };
    }
  }
  groupedArray.push(currentGroup);
  return groupedArray;
};
