import { put } from 'redux-saga/effects';
import client from '../../../Graphql/Client';
import { CreateEventMutation, GetCalendarQuery } from '../../../Graphql/Events';
import { EventCreators } from '../../Actions';
import { EventData } from './types';

export function* getEvents(): any {
  try {
    const result = yield client.query({
      query: GetCalendarQuery,
      fetchPolicy: 'no-cache',
    });
    yield put(EventCreators.setEvents(result.data.calendar));
  } catch (error) {}
}
export function* createEvent({ data }: { data: EventData }): any {
  try {
    yield client.mutate({
      mutation: CreateEventMutation,
      variables: { input: data },
    });
    yield put(EventCreators.getEvents());
  } catch (error) {
    console.log(error);
  }
}
