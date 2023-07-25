import classNames from "classnames";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HeaderWithBackProps = {
  title?: string;
  showBack?: boolean;
  centerTitle?: boolean;
};
const HeaderWithBack = ({
  title,
  showBack = true,
  centerTitle = false,
}: HeaderWithBackProps) => {
  const TitleRef = React.useRef<Text>(null);

  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: insets.top,
      }}
      className={classNames(
        "h-12 gap-x-3 flex-row items-center px-4",
        centerTitle && "justify-between"
      )}
    >
      <Pressable
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          }
        }}
        className="p-1"
      >
        <ChevronLeft size={32} color={showBack ? "#000000ff" : "#00000000"} />
      </Pressable>
      <Text
        ref={TitleRef}
        style={{
          fontFamily: "Nunito_500Medium",
        }}
        className={classNames("text-lg")}
      >
        {title}
      </Text>
      <Pressable onPress={() => {}} className="p-1">
        <ChevronLeft size={32} color="#00000000" />
      </Pressable>
    </View>
  );
};

export default HeaderWithBack;
