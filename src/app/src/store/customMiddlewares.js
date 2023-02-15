import { addAlert } from "./slices/alertsSlice";
import { unableToConnect, invalidCredentials, sessionExpired } from "../utils/alerts";
import { authApi } from './slices/api/authSliceApi';

import { isAllOf, isRejected } from "@reduxjs/toolkit";


// Notify for generic fetch errors.
export const fetchErrorNotifier = (store) => (next) => (action) => {
  if (isRejected(action) && action?.payload?.status === 'FETCH_ERROR') {
    store.dispatch(addAlert(unableToConnect));
  }

  return next(action);
};

// Notify for 401 errors.
export const authErrorNotifier = (store) => (next) => (action) => {
  if (isRejected(action) && action?.payload?.status === 401) {
    const matchAll = isAllOf(authApi.endpoints.getToken.matchRejected);

    if (matchAll(action)) {
      // For login from show an invalid credentials
      store.dispatch(addAlert(invalidCredentials));
    } else {
      store.dispatch(addAlert(sessionExpired));
    }
  }

  return next(action);
};