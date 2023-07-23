import { FONT } from "@/assets/font";
import IconButton from "@/components/buttons/IconButton";
import { Bell, Menu } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MainHeader = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: insets.top,
      }}
      className="h-14 w-full flex-row items-center justify-between px-4 "
    >
      <IconButton
        onPress={() => console.log("menu")}
        Icon={Menu}
        size={24}
        color="#000"
      />
      <Text
        style={{ fontFamily: FONT.Nunito.SemiBold }}
        className="text-2xl font-semibold"
      >
        Permuta
      </Text>
      <IconButton
        onPress={() => console.log("bell")}
        Icon={Bell}
        size={24}
        color="#000"
      />
    </View>
  );
};

export default MainHeader;
