import { createSlice } from "@reduxjs/toolkit";
import { ALERT_TYPES } from "../../utils/constants";

const initialState = [];

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      const {type, message} = action.payload;
      if (!message && type) {
        return;
      } 
      if (!ALERT_TYPES[type]) {
        return;
      }
      state.push(action.payload);
    },
    clearAlert: (state) => {
      state.shift();
    }
  }
});

export const selectAlerts = (state) => {
  if (!state?.alerts) {
    return null;
  }
  if (state.alerts.length === 0) {
    return null;
  }

  return state.alerts[0];
};

export const {
  addAlert,
  clearAlert
} = alertsSlice.actions;

export default alertsSlice.reducer;