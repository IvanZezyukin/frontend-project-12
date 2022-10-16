import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: localStorage.token ? true : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.isAuth = true;
    },
    loggedOut: (state) => {
      state.isAuth = false;
    }
  }
});

export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
