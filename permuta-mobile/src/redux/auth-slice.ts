import { PERMUTA_AUTH } from "@/constants";
import { IRegisterPayload, IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

type initialStateType = {
  isAuthenticated: boolean;
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  registerData: IRegisterPayload;
};

const initialState: initialStateType = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  registerData: {
    email: "",
    password: "",
    full_name: "",
    phone_number: "",
    image_url: "",
    username: "",
    hostel_id: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(
      state,
      action: PayloadAction<Omit<initialStateType, "registerData">>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      SecureStore.setItemAsync(PERMUTA_AUTH, JSON.stringify(action.payload));
    },
    Logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      SecureStore.deleteItemAsync(PERMUTA_AUTH);
    },
    setRegisterData(state, action: PayloadAction<Partial<IRegisterPayload>>) {
      state.registerData = { ...state.registerData, ...action.payload };
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
