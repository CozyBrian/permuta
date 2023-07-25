import { View, Text } from "react-native";
import React from "react";
import { HeaderWithBack } from "@/components/layout/header";

export default function MyProfile() {
  return (
    <View className="flex-1 bg-permuta-background">
      <HeaderWithBack title="Profile" centerTitle showBack={false} />
      <Text>MyProfile</Text>
    </View>
  );
}
