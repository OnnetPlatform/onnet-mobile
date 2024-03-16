import { useQuery } from '@Khayat/Database/Hooks/useRealmContext';
import Message from '@Khayat/Database/Models/Message';
import { Profile } from '@Khayat/Database/Profile';
import { FormattedMessages } from '@Screens/UserChatScreen/components/MessageItem/utils';
import { useMemo } from 'react';

export const useRoomMessages = (user: Profile): FormattedMessages[] => {
  const data = useQuery(
    Message,
    (collection) =>
      collection.filtered(
        `from.user = "${user.user}" OR to.user = "${user.user}"`
      ),
    [user]
  );

  return useMemo(() => {
    const sorted = naiveSorting(Array.from(data));
    const maniulpulated: any = [];
    sorted.map((item) => {
      maniulpulated.push(`${item.user.first_name} ${item.user.last_name}`);
      // @ts-ignore
      item.data.map((nested) => {
        maniulpulated.push(nested);
      });
    });
    return maniulpulated;
  }, [data, user]);
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
