import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';

import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { uiReducer } from '@/features/UI';
import { rtkApi } from '@/shared/api/rtkApi';
import { supabase } from '@/shared/api/supabase';

import { createReducerManager } from './reducerManager';
import { StateSchema, ThunkExtraArg } from './StateSchema';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    ui: uiReducer,
    [rtkApi.reducerPath]: rtkApi.reducer
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    supabase
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg
        },
        serializableCheck: {
          ignoredActions: ['__rtkq/focused', '__rtkq/unfocused'],
        }
      }).concat(rtkApi.middleware)
  });

  // @ts-expect-error reducerManager is added dynamically
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
