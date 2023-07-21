import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";

const TabBar = ({ insets, state, navigation }: BottomTabBarProps) => {
  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="absolute left-0 bottom-0 flex-row justify-center items-center bg-slate-400 w-full px-4"
    >
      <View className="h-16 w-full flex-row bg-white rounded-2xl">
        {state.routes.map((route, index) => {
          const label = route.name;
          const isFocused = state.index === index;

          return (
            <View key={label} className="flex-1 justify-center items-center">
              <Text
                className={`flex-1 flex-row justify-center items-center ${
                  isFocused ? "text-slate-900" : "text-slate-600"
                }`}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
