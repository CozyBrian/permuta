import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";

const LoadingSpinner = ({ radius = 16 }) => {
  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      200
    );
    return () => cancelAnimation(rotation);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="w-16 h-16 rounded-full">
      <Animated.View
        style={[
          {
            borderColor: "#5C9AD4",
            borderBottomColor: "#B0D2F1",
          },
          animatedStyles,
        ]}
        className="w-14 h-14 rounded-full border-[6px]"
      ></Animated.View>
    </View>
  );
};

export default LoadingSpinner;
