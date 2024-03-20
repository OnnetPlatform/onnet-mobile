import { InvitationResponse } from '@Hooks/useEventUsers';
import { InvitationStatus } from '@Khayat/Graphql/Events';
type Status = { title: string; color: string; key: InvitationStatus };

export const STATUS: Status[] = [
  { title: 'Accept', color: 'green', key: 'ACCEPTED' },
  { title: 'Tentative', color: 'yellow', key: 'TENTATIVE' },
  { title: 'Decline', color: 'red', key: 'DECLINED' },
  { title: 'No Response', color: 'gray', key: 'INVITED' },
];

export const getStatus = (status: InvitationResponse['status']) => {
  const item = STATUS.find((item) => item.key === status);
  if (!item) return undefined;

  const response: Status = {
    ...item,
    title:
      item.title.charAt(0).toUpperCase() + item.title.slice(1).toLowerCase(),
  };

  return response;
};
