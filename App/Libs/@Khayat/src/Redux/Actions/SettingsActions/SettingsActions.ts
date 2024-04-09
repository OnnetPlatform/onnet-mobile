import { createActions } from 'reduxsauce';
import { SettingsActionTypes, SettingsCreatorsTypes } from './types';

export const { Types: SettingTypes, Creators: SettingsCreators } =
  createActions<SettingsActionTypes, SettingsCreatorsTypes>(
    {
      setCalendarStyle: ['style'],
    },
    { prefix: '/settings' }
  );
