 

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage as default storage
import authReducer from './features/authSlice';
import postReducer from './features/postSlice'; // Import the post reducer

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Create persisted reducers
const authPersistedReducer = persistReducer(persistConfig, authReducer);
const postPersistedReducer = persistReducer(persistConfig, postReducer);

// Configure the store with the persisted reducers
const store = configureStore({
  reducer: {
    auth: authPersistedReducer, // Auth slice with persistence
    posts: postPersistedReducer, // Post slice with persistence
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Disable serializable check if needed
});

const persistor = persistStore(store);

export { store, persistor };

