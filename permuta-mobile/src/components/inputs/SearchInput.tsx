import classNames from "classnames";
import { Search } from "lucide-react-native";
import React, { useState } from "react";
import { TextInput, View } from "react-native";

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};
const SearchInput = ({ value, onChangeText }: SearchInputProps) => {
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
        value={value}
        onChangeText={onChangeText}
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
