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

export const CreateEventMutation = gql`
  mutation CreateEventMutation($input: CreateEventInput!) {
    createEvent(createEventInput: $input) {
      title
      description
      date
      id
    }
  }
`;
