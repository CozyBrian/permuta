import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";
import classNames from "classnames";

const TabBar = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  const leaveOut = ["item/[id]"];

  const routes = state.routes.filter((item) => !leaveOut.includes(item.name));
  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="absolute left-0 bottom-0 flex-row justify-center items-center w-full px-4"
    >
      <View className="h-16 w-full flex-row bg-white shadow-md shadow-[#e4f2ff92] rounded-2xl py-1 -mx-1">
        {routes.map((route, index) => {
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
              className={classNames(
                "flex-1 justify-center items-center mx-1 border rounded-xl",
                isFocused
                  ? "bg-[#edf6fe] border-[#b3dcff]"
                  : "bg-white border-white"
              )}
            >
              {options.tabBarIcon && (
                <View className="flex-row justify-center items-center">
                  {options.tabBarIcon({
                    focused: isFocused,
                    color: isFocused ? "#2B6FAF" : "#4A5567",
                    size: 24,
                  })}
                </View>
              )}
              <Text
                className={`flex-row justify-center items-center ${
                  isFocused ? "text-permuta-primaryDark" : "text-slate-600"
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
