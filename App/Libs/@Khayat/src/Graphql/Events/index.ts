import { gql } from '@apollo/client';
export type InvitationStatus =
  | 'INVITED'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'TENTATIVE';

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

export const GET_EVENT_INVITATIONS = gql`
  query GetEventInvitations($input: GetEventInvitationsInput) {
    getEventInvitations(input: $input) {
      status
      createdAt
      user {
        username
        avatar
        bio
        cover
        workspace
        user
        active
        status
        title
        city
        country
        department
        phone
        last_name
        first_name
        full_name
      }
    }
  }
`;

export const GET_EVENT_BY_ID_QUERY = gql`
  query Event($id: String) {
    event(id: $id) {
      title
      description
      id
      date
      organizer {
        id
        username
        avatar
        active
        last_name
        user
        first_name
      }
      duration
      createdAt
    }
  }
`;

export const UPDATE_EVENT_BY_ID_MUTATION = gql`
  mutation UpdateEvent($input: UpdateEventInput) {
    updateEvent(updateEventInput: $input) {
      title
      description
      id
      date
      duration
      createdAt
      is_organizer
    }
  }
`;

export const REMOVE_EVENT_MUTATION = gql`
  mutation RemoveEvent($input: String) {
    removeEvent(id: $input)
  }
`;

export const UPDATE_INVITATION_BY_EVENT = gql`
  mutation UpdateInvitation($input: UpdateInvitaionInput) {
    updateInvitation(input: $input)
  }
`;
