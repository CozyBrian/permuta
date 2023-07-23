import { View, Text } from "react-native";
import React from "react";
import { FillButton } from "@/components/buttons";
import { FONT } from "@/assets/font";
import { router } from "expo-router";

const PlaceBidModal = () => {
  return (
    <View className="flex-1 items-center justify-center bg-slate-500/40 px-12">
      <View className="w-full -my-1 bg-white p-4 rounded-2xl">
        <Text
          style={{ fontFamily: FONT.Nunito.SemiBold }}
          className="my-1 text-base"
        >
          Confirm Bid?
        </Text>
        <Text className="my-1">PlaceBidModal</Text>
        <FillButton
          onPress={() => router.back()}
          className="my-1"
          label="Place Bid"
        />
      </View>
    </View>
  );
};

export default PlaceBidModal;
