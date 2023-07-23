import { FONT } from "@/assets/font";
import { SCREEN_WIDTH } from "@/constants";
import { Heart } from "lucide-react-native";
import { View, Text } from "react-native";

const SearchItemCard = () => {
  return (
    <View className="flex-1 flex-row mx-2 my-2 h-20">
      <View className="h-full mr-[14px] aspect-square bg-permuta-primary rounded-2xl"></View>
      <View
        style={{
          width: SCREEN_WIDTH - 32 - 80 - 14,
        }}
        className="flex-col justify-between pt-1"
      >
        <View>
          <Text numberOfLines={1} className="text-base text-ellipsis">
            Brand New Oraimo Earbuds
          </Text>
          <Text
            numberOfLines={1}
            className="text-xs text-ellipsis leading-4 text-slate-500"
          >
            @CozyBrian ⸱ Prestige
          </Text>
        </View>
        <View className=" flex-row items-end justify-between">
          <Text
            style={{ fontFamily: FONT.Nunito.Medium }}
            className="text-lg text-permuta-text"
          >
            GH₵60.99
          </Text>
          <Heart size={24} color="#7D7D7D" />
        </View>
      </View>
    </View>
  );
};

export default SearchItemCard;
