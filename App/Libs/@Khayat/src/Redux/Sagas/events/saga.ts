import { put } from 'redux-saga/effects';
import client from '../../../Graphql/Client';
import { GetCalendarQuery } from '../../../Graphql/Events';
import { EventCreators } from '../../Actions';

export function* getEvents(): any {
  try {
    const result = yield client.query({
      query: GetCalendarQuery,
      fetchPolicy: 'no-cache',
    });
    yield put(EventCreators.setEvents(result.data.calendar));
  } catch (error) {}
}
