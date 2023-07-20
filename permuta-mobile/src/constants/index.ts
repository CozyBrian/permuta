import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;

export const SCREEN_HEIGHT = Dimensions.get("window").height;

export const PERMUTA_AUTH = "PERMUTA_AUTH";

export const API_URL = process.env.EXPO_PUBLIC_API_URL;
