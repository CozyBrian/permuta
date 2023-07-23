import { FONT } from "@/assets/font";
import { Heart } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const ItemCard = () => {
  return (
    <View className="flex-1 mx-2 my-2">
      <View className="w-full aspect-[6/5] bg-permuta-primary rounded-2xl"></View>
      <View className="flex-col pt-1">
        <Text numberOfLines={1} className="text-ellipsis">
          Brand New Oraimo Earbuds
        </Text>
        <View className="pt-1 flex-row items-end justify-between">
          <Text
            style={{ fontFamily: FONT.Nunito.Medium }}
            className="text-lg text-gray-500"
          >
            GH₵60.99
          </Text>
          <Heart size={24} color="#7D7D7D" />
        </View>
      </View>
    </View>
  );
};

export default ItemCard;
