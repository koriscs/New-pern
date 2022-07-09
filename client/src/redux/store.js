import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Import Slices
import cartSlice from './slices/cartSlice';
import authSlice from './slices/authSlice';

const persistConfig = {
  key: 'auth',
  storage,
}

const reducers = combineReducers({auth: authSlice, cart: cartSlice})
const persistedReducer = persistReducer(persistConfig, reducers)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      },
    }),
});
export let persistor = persistStore(store);
