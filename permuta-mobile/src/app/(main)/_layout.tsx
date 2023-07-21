import TabBar from "@/components/layout/tabBar";
import { Tabs } from "expo-router";
import { Home, Settings } from "lucide-react-native";

export default function MainLayout() {
  return (
    <Tabs tabBar={TabBar} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          href: "home",
          title: "Home",
          tabBarIcon: ({ focused, size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: "settings",
          title: "Settings",
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
