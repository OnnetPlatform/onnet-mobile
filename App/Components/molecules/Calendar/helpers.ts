import moment from 'moment';

const currentMonth = new Date().getMonth();

export const WEEK = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const MONTHS = [currentMonth, currentMonth + 1, currentMonth + 2];

export function createCalendar(month: number, year: number) {
  const table: Date[] = [];
  const date = new Date(year, month);

  if (date.getDay() !== 6) {
    for (let i = 0; i <= date.getDay(); i++) {
      let temp = new Date(year, month);
      temp.setDate(i - date.getDay());
      table.push(temp);
    }
  }

  while (date.getMonth() === month) {
    table.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  if (date.getDay() !== 5) {
    for (let i = date.getDay(); i < 6; i++) {
      table.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  }

  return table;
}

function getDay(date: Date) {
  // get day number from 0 (monday) to 6 (sunday)
  let day = date.getDay();
  if (day == 0) day = 7; // make Sunday (0) the last day
  return day - 1;
}
