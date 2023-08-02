import { View, Text } from "react-native";
import React from "react";
import { HeaderWithBack } from "@/components/layout/header";
import { FONT } from "@/assets/font";

export default function AddItem() {
  return (
    <View className="flex-1 bg-permuta-background">
      <HeaderWithBack title="New Item" />
      <View className="pt-4 px-4 flex-1">
        <View className="w-full h-[194px] bg-permuta-primary rounded-2xl"></View>
        <View className="flex-1 flex flex-col pt-[10px]">
          <Text style={{ fontFamily: FONT.NunitoSans.Bold }}>Details</Text>
        </View>
      </View>
    </View>
  );
}
