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

const LoadingSpinner = ({
  radius = 32,
  stroke = 4,
  primaryColor = "#5C9AD4",
  secondaryColor = "#B0D2F1",
}) => {
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
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
      className="rounded-full"
    >
      <Animated.View
        style={[
          {
            width: radius * 2,
            height: radius * 2,
            borderWidth: stroke,
            borderColor: primaryColor,
            borderBottomColor: secondaryColor,
          },
          animatedStyles,
        ]}
        className="rounded-full"
      ></Animated.View>
    </View>
  );
};

export default LoadingSpinner;
