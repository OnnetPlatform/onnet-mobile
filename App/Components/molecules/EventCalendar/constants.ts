import moment from 'moment';
import { Dimensions } from 'react-native';
export const HOURS_WIDTH = 55;
export const CELL_WIDTH =
  (Dimensions.get('window').width - HOURS_WIDTH - 16) / 2;

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
