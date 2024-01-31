import { combineReducers, configureStore } from '@reduxjs/toolkit'

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// import reducers
import themeReducer from './slices/themeSlice'
import userReducer from './slices/users/userSlice'
import authReducer from './slices/authSlice'
import roleReducer from './slices/roleSlice';
import categoryReducer from './slices/categories/categorySlice';

const authPersistConfig = {
    key: 'auth',
    version: 1,
    storage,
    blacklist: ['userInfo', 'loading']
}

const themePersistConfig = {
    key: 'theme',
    version: 1,
    storage,
}

const reducers = combineReducers({
    role: roleReducer,
    user: userReducer,
    category: categoryReducer,
    theme: persistReducer(themePersistConfig, themeReducer),
    auth: persistReducer(authPersistConfig, authReducer),
});

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export default store