import { PERMUTA_AUTH } from "@/constants";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import SplashLoader from "@/components/layout/splashloader";

const InitializerProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const auth = await SecureStore.getItemAsync(PERMUTA_AUTH);
        await SplashScreen.hideAsync();
        // wait 30 seconds
        // await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
        if (auth) {
          const parsedAuth = JSON.parse(auth);
          dispatch(action.auth.setAuth(parsedAuth));
        }
      } catch (e) {
        console.warn("async?", e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [dispatch]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <SplashLoader />;
  }

  return <View style={{ flex: 1 }}>{children}</View>;
};
export default InitializerProvider;
