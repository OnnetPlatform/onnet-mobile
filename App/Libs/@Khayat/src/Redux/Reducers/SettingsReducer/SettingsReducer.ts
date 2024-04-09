import SeamlessImmutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { SettingTypes } from '../../Actions/SettingsActions/SettingsActions';
import { CalendarStyle, SettingsState, SettingsStateType } from './types';

const initial_state = SeamlessImmutable<SettingsState>({
  calendarStyle: CalendarStyle.LIST,
});

const setCalendarStyle = (
  state: SettingsStateType,
  { style }: { style: CalendarStyle }
) => state.merge({ ...state, calendarStyle: style });

const hanlders = {
  [SettingTypes.SET_CALENDAR_STYLE]: setCalendarStyle,
};
export default createReducer(initial_state, hanlders);
