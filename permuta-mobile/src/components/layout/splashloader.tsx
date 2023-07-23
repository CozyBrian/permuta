import React from "react";
import { Text, View } from "react-native";
import LoadingSpinner from "./loadingSpinner";

const SplashLoader = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text
        style={{ fontFamily: "Nunito_600SemiBold" }}
        className="text-permuta-primary text-5xl pt-2"
      >
        Permuta
      </Text>
      <Text style={{ fontFamily: "Nunito_500Medium" }}>
        Your Gateway to Hostel Commerce
      </Text>
      <View className="absolute bottom-28">
        <LoadingSpinner radius={20} />
      </View>
    </View>
  );
};

export default SplashLoader;
