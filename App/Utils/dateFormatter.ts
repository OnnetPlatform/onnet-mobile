import moment from 'moment';

export const humanizeDate = (date: Date) => {
  return moment(date).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastDay: '[Yesterday]',
    lastWeek: '[Last Week] ',
    sameElse: 'DD, MMM, YYYY',
  });
};
