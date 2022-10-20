import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: localStorage.token ? true : false,
  isError: false,
  username: '',
  errorMessage: '',
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
    }  
  }
});

export const { loggedIn, loggedOut, authError, authErrorDismissal } = authSlice.actions;
export default authSlice.reducer;
