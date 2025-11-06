import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: "", isLoggedIn: false }, 
    reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      sessionStorage.removeItem("Id");
    }
  },
});

export const store = configureStore({
    reducer: authSlice.reducer
});

export const authActions = authSlice.actions;