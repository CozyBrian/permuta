import AssetLoader from "@/providers/assetLoader";
import AuthProvider from "@/providers/authProvider";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  return (
    <AssetLoader>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </AssetLoader>
  );
}
