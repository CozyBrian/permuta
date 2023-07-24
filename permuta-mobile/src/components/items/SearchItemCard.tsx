import { FONT } from "@/assets/font";
import { SCREEN_WIDTH } from "@/constants";
import { IItemsMin } from "@/types";
import { router } from "expo-router";
import { Heart } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";

type SearchItemCardProps = {
  item: IItemsMin;
};
const SearchItemCard = ({ item }: SearchItemCardProps) => {
  return (
    <Pressable
      onPress={() => router.push(`/(main)/item/${item.id}`)}
      className="flex-1 flex-row mx-2 my-2 h-20"
    >
      <View className="h-full mr-[14px] aspect-square bg-permuta-primary rounded-2xl"></View>
      <View
        style={{
          width: SCREEN_WIDTH - 32 - 80 - 14,
        }}
        className="flex-col justify-between pt-1"
      >
        <View>
          <Text numberOfLines={1} className="text-base text-ellipsis">
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            className="text-xs text-ellipsis leading-4 text-slate-500"
          >
            @{item.seller.username} ⸱ {item.seller.hostel.name}
          </Text>
        </View>
        <View className=" flex-row items-end justify-between">
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

export default SearchItemCard;
