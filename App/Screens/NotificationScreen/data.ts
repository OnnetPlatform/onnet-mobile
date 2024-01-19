import _ from 'lodash';
import moment, { Moment } from 'moment';

const today = new Date();
const yesterday = new Date(new Date().setDate(today.getDate() - 1));
const day3before = new Date(new Date().setDate(today.getDate() - 3));
const weekbefore = new Date(new Date().setDate(today.getDate() - 7));

export enum NotificationTypes {
  EVENT_SCHEDULED = 'EVENT_SCHEDULED',
  MESSAGE_REACTION = 'MESSAGE_REACTION',
}

export type EventScheduledNotification = {
  title: string;
  data: { date: Date; time: Date };
  createdDate: Date;
  type: NotificationTypes.EVENT_SCHEDULED;
};
export type MessageReactionNotification = {
  title: string;
  data: { message: string; emoji: string };
  createdDate: Date;
  type: NotificationTypes.MESSAGE_REACTION;
};

export type Notification =
  | EventScheduledNotification
  | MessageReactionNotification;

export const notifications: Notification[] = [
  {
    title: 'John Doe has scheduled an event',
    data: { date: new Date(), time: new Date() },
    createdDate: new Date(),
    type: NotificationTypes.EVENT_SCHEDULED,
  },
  {
    title: 'John Doe has scheduled an event',
    data: { date: yesterday, time: yesterday },
    createdDate: yesterday,
    type: NotificationTypes.EVENT_SCHEDULED,
  },
  {
    title: 'John Doe has reacted to your message',
    data: { message: 'lorem ipsum dolor sit amis', emoji: '❤️' },
    createdDate: yesterday,
    type: NotificationTypes.MESSAGE_REACTION,
  },
  {
    title: 'John Doe has reacted to your message',
    data: { message: 'lorem ipsum dolor sit amis', emoji: '🙏🏻' },
    createdDate: yesterday,
    type: NotificationTypes.MESSAGE_REACTION,
  },
  {
    title: 'John Doe has reacted to your message',
    data: { message: 'lorem ipsum dolor sit amis', emoji: '👍🏻' },
    createdDate: day3before,
    type: NotificationTypes.MESSAGE_REACTION,
  },
  {
    title: 'John Doe has reacted to your message',
    data: { message: 'lorem ipsum dolor sit amis', emoji: '👍🏻' },
    createdDate: weekbefore,
    type: NotificationTypes.MESSAGE_REACTION,
  },
  {
    title: 'John Doe has reacted to your message',
    data: { message: 'lorem ipsum dolor sit amis', emoji: '👍🏻' },
    createdDate: day3before,
    type: NotificationTypes.MESSAGE_REACTION,
  },
];

export function formatList(data: Notification[]) {
  const formatted = _(data)
    .groupBy((item: any) => item.createdDate)
    .map((item: any, title: any) => ({
      title: getHeaderTitle(moment(title)),
      data: item,
    }))
    .value();

  return formatted;
}
const getHeaderTitle = (date: Moment) => {
  return date.calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastDay: '[Yesterday]',
    lastWeek: '[Last Week]',
    sameElse: 'MMMM Do, YYYY',
  });
};

export default notifications;
