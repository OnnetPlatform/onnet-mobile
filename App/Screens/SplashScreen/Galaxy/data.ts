import {blue, turquoise, yellow} from '@Theme/Colors';

export type Planet = {
  index: number;
  colors: string[];
  title: string;
  radius: number;
  spikes?: boolean;
};
export const planets = [
  {
    index: 0,
    colors: ['orange', yellow],
    title: 'Sun',
    radius: 100,
  },
  {
    index: 1,
    colors: ['yellow', 'grey'],
    title: 'Mercury',
    radius: 15,
  },
  {
    index: 2,
    colors: ['#a57c1b', '#e39e1c'],
    title: 'Venus',
    radius: 37,
  },
  {
    index: 3,
    colors: [blue, turquoise],
    title: 'Earth',
    radius: 39.59,
  },
  {
    index: 4,
    colors: ['red', 'brown'],
    title: 'Mars',
    radius: 21,
  },
  {
    index: 5,
    colors: ['brown', 'orange'],
    title: 'Jupiter',
    radius: 434,
    spikes: true,
  },
  {
    index: 6,
    colors: ['brown', 'orange', 'lightblue'],
    title: 'Saturn',
    radius: 361,
  },
  {
    index: 7,
    colors: ['#e1eeee', '#c6d3e3', '#d9ddf4'],
    title: 'Uranus',
    radius: 157,
  },
  {
    index: 8,
    colors: ['#5b5ddf', '#85addb'],
    title: 'Neptune',
    radius: 153,
  },
];
