// store/store.ts
import { configureStore,combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';

import patientReducer from './slices/patientSlice';
import userReducer from './slices/userSlice';
import logReducer from './slices/logSlice';
import progressNoteReducer from './slices/progressNoteSlice';

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     patients: patientReducer,
//     logs: logReducer,
//   },
// });


const rootReducer = combineReducers({
  user: userReducer,
  patients: patientReducer,
  logs: logReducer,
  progressNotes: progressNoteReducer,
});

// 2. Configure redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // ✅ Only persist specific slices if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🔥 Required by redux-persist
    }),
});

// 4. Export persistor
export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
