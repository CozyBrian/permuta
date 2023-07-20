import React from "react";
import { Pressable, Text } from "react-native";
import { twMerge } from "tailwind-merge";

type FillButtonProps = {
  label: string;
} & React.ComponentProps<typeof Pressable>;

const FillButton = ({ label, ...props }: FillButtonProps) => {
  return (
    <Pressable
      {...props}
      className={twMerge(
        "w-full h-11 bg-permuta-primary items-center justify-center rounded-lg",
        props.className
      )}
    >
      <Text
        style={{ fontFamily: "Nunito_600SemiBold" }}
        className="text-white text-base"
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default FillButton;
