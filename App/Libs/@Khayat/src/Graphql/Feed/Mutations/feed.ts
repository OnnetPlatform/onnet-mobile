import { gql } from '@apollo/client';

export const FEED_MUTATION = gql`
  query Feed {
    feed {
      __typename
      ... on Bulletin {
        status
        eventId: id
        title
        streamer {
          last_name
          first_name
          email
        }
        startDate
        duration
        createdAt
      }
      ... on Event {
        title
        description
        organizer {
          last_name
          first_name
          email
          avatar
        }
        date
        duration
        id
      }
    }
  }
`;
