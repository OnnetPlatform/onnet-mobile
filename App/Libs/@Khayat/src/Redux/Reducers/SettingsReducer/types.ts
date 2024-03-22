import { ImmutableObject } from 'seamless-immutable';

export enum CalendarStyle {
  TABLE = 'Table',
  LIST = 'List',
}

export type SettingsState = {
  calendarStyle: CalendarStyle;
};

export type SettingsStateType = ImmutableObject<SettingsState>;
