import authReducer from "./slices/authSlice";
import alertsReducer from "./slices/alertsSlice";
import { chickenCountsApi } from "./slices/api/chickenCounterSliceApi";
import { authApi } from './slices/api/authSliceApi';

import { authErrorNotifier, fetchErrorNotifier } from "./customMiddlewares";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    alerts: alertsReducer,
    [chickenCountsApi.reducerPath]: chickenCountsApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: {
        
        }
      }
    }).concat([
      // Enables caching, invalidation, polling, and other useful features or 'rtk-query'
      authApi.middleware,
      chickenCountsApi.middleware,
      // Notify global errors
      fetchErrorNotifier,
      authErrorNotifier
    ])
});

export default store;