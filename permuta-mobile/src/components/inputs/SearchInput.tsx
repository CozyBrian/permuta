import classNames from "classnames";
import { Search } from "lucide-react-native";
import React, { useState } from "react";
import { TextInput, View } from "react-native";

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      className={classNames(
        "w-full h-11 flex-row items-center px-[14px] mb-[14px] border bg-white rounded-2xl",
        isFocused ? "border-permuta-edge" : "border-white"
      )}
    >
      <Search color="#000" size={20} />
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
