import { Stack } from "expo-router/stack";
import { ClickOutsideProvider } from "react-native-click-outside";

export default function AuthLayout() {
  return (
    <ClickOutsideProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ClickOutsideProvider>
  );
}
