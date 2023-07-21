import { PERMUTA_AUTH } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

type initialStateType = {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: initialStateType = {
  isAuthenticated: true,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<initialStateType>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = action.payload.isAuthenticated;
      SecureStore.setItemAsync(PERMUTA_AUTH, JSON.stringify(action.payload));
    },
    Logout(state) {
      state.accessToken = null;
      state.isAuthenticated = false;
      SecureStore.deleteItemAsync(PERMUTA_AUTH);
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export default authSlice;
