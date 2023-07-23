import { Search } from "lucide-react-native";
import React from "react";
import { TextInput, View } from "react-native";

const SearchInput = () => {
  return (
    <View className="w-full h-11 flex-row items-center px-[14px] mb-[18px] bg-white rounded-2xl">
      <Search color="#000" size={20} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#000"
        allowFontScaling
        keyboardType="web-search"
        className="w-full text-base leading-5 ml-[14px]"
      />
    </View>
  );
};

export default SearchInput;
