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
          full_name
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
          avatar
          full_name
        }
        date
        duration
        id
      }
    }
  }
`;
