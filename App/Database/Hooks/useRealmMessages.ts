import { useQuery, useRealm } from '@Khayat/Database/Hooks/useRealmContext';
import Message from '@Khayat/Database/Models/Message';
import { UserChat } from '@Khayat/Database/Models/types';
import User from '@Khayat/Database/Models/User';
import { FormattedMessages } from '@Screens/UserChatScreen/components/MessageItem/utils';
import { useEffect, useMemo } from 'react';

export const useRoomMessages = (user: UserChat): FormattedMessages[] => {
  const realm = useRealm();
  const localUsers = useQuery(
    User,
    (collection) => collection.filtered(`_id == "${user._id}"`),
    [user]
  );
  const data = useQuery(
    Message,
    (collection) =>
      collection.filtered(`from._id = "${user._id}" OR to._id = "${user._id}"`),
    [user]
  );

  console.log(data[0]);

  useEffect(() => {
    if (realm.isClosed) {
      try {
        realm.write(() => {
          localUsers.map((item) => {
            item.unreadCount = 0;
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [realm]);

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
    data: [{ message: data[0].message, createdAt: data[0].createdAt }],
    title: data[0].user.first_name,
  };

  for (let index = 1; index < data.length; index++) {
    if (data[index].user._id === data[index - 1].user._id) {
      currentGroup.data.push(data[index]);
    } else {
      groupedArray.push(currentGroup);
      currentGroup = {
        user: data[index].user,
        data: [data[index]],
        title: data[index].user.first_name,
      };
    }
  }
  groupedArray.push(currentGroup);
  return groupedArray;
};
