import { AnyAction } from 'redux';
import { CalendarStyle } from '../../Reducers/SettingsReducer/types';

export type SettingsActionTypes = {
  SET_CALENDAR_STYLE: 'SET_CALENDAR_STYLE';
};

export type SettingsCreatorsTypes = {
  setCalendarStyle(style: CalendarStyle): AnyAction;
};
