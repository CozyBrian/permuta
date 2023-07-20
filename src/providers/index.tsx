import React, { useCallback } from "react";
import { Provider } from "react-redux";
import AuthProvider from "./authProvider";
import store from "@/redux";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_500Medium,
  useFonts,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import InitializerProvider from "./InitializerProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <InitializerProvider>
          <AuthProvider>{children}</AuthProvider>
        </InitializerProvider>
      </Provider>
    </>
  );
}
