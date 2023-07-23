import { FONT } from "@/assets/font";
import React from "react";
import { Text, View } from "react-native";

const WelcomeBanner = () => {
  return (
    <View className="h-[130px] w-full items-center justify-center bg-permuta-primary rounded-2xl">
      <Text
        style={{ fontFamily: FONT.Nunito.Bold }}
        className="text-5xl text-white  pt-5"
      >
        Welcome
      </Text>
    </View>
  );
};

export default WelcomeBanner;
