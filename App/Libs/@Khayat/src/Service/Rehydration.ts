import { ReduxPersistConfig } from '../Config';
import { AppCreators } from '../Redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Store } from 'redux';
import { persistStore } from 'redux-persist';
const updateReducers = (store: Store) => {
  const { reducerVersion } = ReduxPersistConfig;
  const startup = () => store.dispatch(AppCreators.startUp());
  AsyncStorage.getItem('reducerVersion')
    .then((localVersion) => {
      if (localVersion !== reducerVersion) {
        persistStore(store, null, startup).purge();
        AsyncStorage.setItem('reducerVersion', reducerVersion);
      } else {
        persistStore(store, null, startup);
      }
    })
    .catch(() => {
      persistStore(store, null, startup);
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    });
};

export default { updateReducers };
