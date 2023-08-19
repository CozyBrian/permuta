import { View, Text } from "react-native";
import React from "react";
import IconButton from "../buttons/IconButton";
import { Minus, Plus } from "lucide-react-native";

const NumberInput = () => {
  return (
    <View className="flex-row -mx-1 mb-2">
      <IconButton
        className="flex-1 mx-1 bg-[#EEEEEE] border-[#EEEEEE]"
        Icon={Minus}
      />
      <View className="h-10 flex-[2] items-center justify-center mx-1 border rounded-lg">
        <Text className="text-xl text-permuta-text">₵638.99</Text>
      </View>
      <IconButton
        className="flex-1 mx-1 bg-[#EEEEEE] border-[#EEEEEE]"
        Icon={Plus}
      />
    </View>
  );
};

export default NumberInput;
