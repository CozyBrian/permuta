import TabBar from "@/components/layout/tabBar";
import { Tabs } from "expo-router";
import { Home, Search, Settings, User } from "lucide-react-native";

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
        name="search"
        options={{
          href: "/(main)/search",
          title: "Search",
          tabBarIcon: ({ size, color }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          href: "my-profile",
          title: "My Profile",
          tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
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
