import { configureStore } from '@reduxjs/toolkit';
import { boardReducer } from './board';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, boardReducer);

const store = configureStore({
  reducer: {
    board: persistedReducer
  },
  middleware: [thunk]
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
