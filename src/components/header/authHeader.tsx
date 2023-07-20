import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

const AuthHeader = () => {
  return (
    <View className="mt-16 h-12 flex-row items-center px-4">
      <Pressable
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          }
        }}
        className="p-1"
      >
        <ChevronLeft size={32} color="#000" />
      </Pressable>
    </View>
  );
};

export default AuthHeader;
