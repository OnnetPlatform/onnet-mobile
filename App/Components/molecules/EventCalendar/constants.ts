import moment from 'moment';

export const CELL_WIDTH = 200;
export const HOURS_WIDTH = 55;
export const CELL_HEIGHT = 100;
const date = new Date();
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);

export const HOURS = Array.from({ length: 24 }, (_, i) =>
  moment(date)
    .add(60 * 60 * 1000 * i)
    .format('hh A')
);
