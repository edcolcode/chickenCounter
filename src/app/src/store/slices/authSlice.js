import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  roles: []
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const {accessToken, roles} = action.payload;
      state.token = accessToken;
      state.roles = roles;
    },
    logOut: (state) => {
      state.token = null;
      state.roles = [];
    }
  }
});

export const selectIsUserAuth = (state) => (state?.auth?.token) ? true : false;
export const selectCurrentUserToken = (state) => state?.auth?.token;

export const {  
  setCredentials,
  logOut
} = loginSlice.actions;

export default loginSlice.reducer;