import AsyncStorage from '@react-native-community/async-storage';
import { ReducersWhiteList } from '../Redux';
// @ts-ignore
import { seamlessImmutableReconciler } from 'redux-persist-seamless-immutable';

export default {
  active: true,
  reducerVersion: '1.0.2',
  rootConfig: {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ReducersWhiteList,
    stateReconciler: seamlessImmutableReconciler,
  },
  dataConfig: {
    key: 'data',
    storage: AsyncStorage,
    whitelist: 'cache',
  },
};
