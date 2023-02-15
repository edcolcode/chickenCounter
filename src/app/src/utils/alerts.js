import { ALERT_TYPES } from "./constants";

export const unableToConnect = {
  type: ALERT_TYPES.error, 
  message: 'Unable to connect to the server, try again.'
};

export const unknownError = {
  type: ALERT_TYPES.error, 
  message: 'Unknown error.'
};

export const invalidCredentials = {
  type: ALERT_TYPES.warn, 
  message: 'Invalid credentials.'
};

export const sessionExpired = {
  type: ALERT_TYPES.error, 
  message: 'Session expired, please log in again.'
};

export const recordAddedSuccessfully = {
  type: ALERT_TYPES.success,
  message: 'Chicken count has been registered successfully.'
};
