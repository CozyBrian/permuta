import classNames from "classnames";
import { LucideIcon, LucideProps } from "lucide-react-native";
import React from "react";
import { Pressable } from "react-native";
import { twMerge } from "tailwind-merge";

type IconButtonProps = {
  Icon: LucideIcon;
  size?: LucideProps["size"];
  color?: LucideProps["color"];
} & React.ComponentProps<typeof Pressable>;

const IconButton = ({
  Icon,
  size = 24,
  color = "#000",
  ...props
}: IconButtonProps) => {
  return (
    <Pressable
      {...props}
      className={twMerge(
        classNames(
          "w-10 h-10 items-center justify-center bg-white border border-permuta-edge rounded-lg"
        ),
        props.className
      )}
    >
      <Icon size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
