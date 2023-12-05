import { gql } from '@apollo/client';

export const GetCalendarQuery = gql`
  query GetCalendar {
    calendar {
      day
      month
      year
      title
      data {
        date
        id
        title
        duration
        description
      }
    }
  }
`;
