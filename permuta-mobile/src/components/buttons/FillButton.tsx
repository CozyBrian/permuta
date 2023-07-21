import React, { forwardRef } from "react";
import { Pressable, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";
import LoadingSpinner from "../layout/loadingSpinner";

type FillButtonProps = {
  label: string;
  isLoading?: boolean;
} & React.ComponentProps<typeof Pressable>;

const FillButton = (
  { label, isLoading = false, ...props }: FillButtonProps,
  ref: any
) => {
  return (
    <Pressable
      {...props}
      ref={ref}
      className={twMerge(
        "w-full h-11 bg-permuta-primary items-center justify-center rounded-lg",
        props.className
      )}
    >
      {isLoading ? (
        <LoadingSpinner
          radius={12}
          stroke={3}
          primaryColor="#fff"
          secondaryColor="#ffffff88"
        />
      ) : (
        <Text
          style={{ fontFamily: "Nunito_600SemiBold" }}
          className="text-white text-base"
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

export default forwardRef<View, FillButtonProps>(FillButton);
