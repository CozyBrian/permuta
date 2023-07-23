import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ask-to-buy"
        options={{
          presentation: "containedTransparentModal",
        }}
      />
      <Stack.Screen
        name="place-bid-modal"
        options={{
          presentation: "containedTransparentModal",
        }}
      />
    </Stack>
  );
}
