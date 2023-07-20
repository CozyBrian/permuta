import TabBar from "@/components/layout/tabBar";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function MainLayout() {
  return (
    <Tabs tabBar={TabBar} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          href: "home",
          title: "Home",
          // tabBarIcon: () => <Icon name="home" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: "settings",
          title: "Settings",
          // tabBarIcon: () => <Icon name="home" />,
        }}
      />
    </Tabs>
  );
}
