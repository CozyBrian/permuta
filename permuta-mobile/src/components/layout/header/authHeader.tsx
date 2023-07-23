import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AuthHeaderProps = {
  title?: string;
};
const AuthHeader = ({ title }: AuthHeaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: insets.top,
      }}
      className="h-12 gap-x-3 flex-row items-center px-4"
    >
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
      <Text style={{ fontFamily: "Nunito_500Medium" }} className="text-lg">
        {title}
      </Text>
    </View>
  );
};

export default AuthHeader;
