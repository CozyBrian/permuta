import Providers from "@/providers";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  return (
    <Providers>
      <Slot />
    </Providers>
  );
}
