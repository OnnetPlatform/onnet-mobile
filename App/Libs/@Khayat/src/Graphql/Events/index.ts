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
        organizer {
          last_name
          first_name
          full_name
          avatar
        }
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
