/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: !!localStorage.token,
  isError: false,
  username: '',
  errorMessage: '',
  isSignupError: false,
  signupErrorMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.username = action.payload;
      state.isAuth = true;
    },
    loggedOut: (state) => {
      state.isAuth = false;
    },
    authError: (state, action) => {
      const { message } = action.payload;
      state.isError = true;
      state.errorMessage = message;
    },
    authErrorDismissal: (state) => {
      state.isError = false;
      state.errorMessage = '';
    },
    signupError: (state, action) => {
      const { message } = action.payload;
      state.isSignupError = true;
      state.signupErrorMessage = message;
    },
    signupErrorDismissal: (state) => {
      state.isSignupError = false;
      state.signupErrorMessage = '';
    },
  },
});

export const {
  loggedIn, loggedOut, authError, authErrorDismissal, signupError, signupErrorDismissal,
} = authSlice.actions;
export default authSlice.reducer;
