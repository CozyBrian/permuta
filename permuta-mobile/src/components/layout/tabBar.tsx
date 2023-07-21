import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";

const TabBar = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="absolute left-0 bottom-0 flex-row justify-center items-center w-full px-4"
    >
      <View className="h-16 w-full flex-row bg-white shadow-md rounded-2xl p-1">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const Label =
            options.title !== undefined ? options.title : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate(route.name, { merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              key={index}
              onPress={onPress}
              onLongPress={onLongPress}
              className="flex-1 justify-center items-center bg-orange-300 rounded-xl"
            >
              <Text
                className={`flex-row justify-center items-center ${
                  isFocused ? "text-slate-900" : "text-slate-600"
                }`}
              >
                {Label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
