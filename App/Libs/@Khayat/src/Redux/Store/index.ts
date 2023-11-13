//@ts-nocheck
import { persistReducer } from 'redux-persist';

import ReduxPersistConfig from '../../Config/ReduxPersist';

import rootSaga from '../../Redux/Sagas';
import rootReducer from '../../Redux/Reducers';
import createStore from './CreateStore';

export default () => {
  let finalReducer = rootReducer;

  if (ReduxPersistConfig.active) {
    finalReducer = persistReducer(ReduxPersistConfig.rootConfig, rootReducer);
  }

  let { store, sagasManager, sagaMiddleware } = createStore(
    finalReducer,
    rootSaga
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../Reducers').default;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }
  return store;
};
