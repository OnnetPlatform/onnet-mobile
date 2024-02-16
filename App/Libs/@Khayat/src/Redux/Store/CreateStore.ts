import { ReduxPersistConfig } from '../../Config';
import { Reducer } from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware, { Saga, Task } from 'redux-saga';
import { RehydrationService } from '../../Service';

export default (rootReducer: Reducer<any, any>, rootSaga: Saga) => {
  const middleware = [];
  const enhancers = [];
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);
  enhancers.push(applyMiddleware(...middleware));
  const store = createStore(rootReducer, compose(...enhancers));

  if (ReduxPersistConfig.active) {
    RehydrationService.updateReducers(store);
  }
  const sagasManager: Task = sagaMiddleware.run(rootSaga, store);
  return {
    store,
    sagasManager,
    sagaMiddleware,
  };
};
