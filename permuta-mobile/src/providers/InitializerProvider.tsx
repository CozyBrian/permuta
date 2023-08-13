import { PERMUTA_AUTH } from "@/constants";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import SplashLoader from "@/components/layout/splashloader";
import axios from "@/lib/axios";
import { IUser } from "@/types";

const InitializerProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const auth = await SecureStore.getItemAsync(PERMUTA_AUTH);
        await SplashScreen.hideAsync();
        if (auth) {
          const parsedAuth = JSON.parse(auth);
          dispatch(action.auth.setAuth(parsedAuth));
          const { data } = await axios.get<IUser>("/v1/users/me", {
            headers: {
              Authorization: `Bearer ${parsedAuth.accessToken}`,
            },
          });
          dispatch(action.auth.setUser(data));
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

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {children}
    </View>
  );
};
export default InitializerProvider;
