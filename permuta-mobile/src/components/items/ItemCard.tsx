import { FONT } from "@/assets/font";
import { IItemsMin } from "@/types";
import { router } from "expo-router";
import { Heart } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

type ItemCardProps = {
  item: IItemsMin;
};
const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Pressable
      onPress={() => router.push(`/(main)/item/${item.id}`)}
      className="flex-1 mx-2 my-2"
    >
      <View className="w-full aspect-[6/5] bg-permuta-primary rounded-2xl"></View>
      <View className="flex-col pt-1">
        <Text numberOfLines={1} className="text-ellipsis">
          {item.name}
        </Text>
        <View className="pt-1 flex-row items-end justify-between">
          <Text
            style={{ fontFamily: FONT.Nunito.Medium }}
            className="text-lg text-permuta-text"
          >
            GH₵{item.price.toFixed(2)}
          </Text>
          <Heart size={24} color="#7D7D7D" />
        </View>
      </View>
    </Pressable>
  );
};

export default ItemCard;
