import { LucideIcon, LucideProps } from "lucide-react-native";
import React from "react";
import { Pressable } from "react-native";

type IconButtonProps = {
  Icon: LucideIcon;
  size: LucideProps["size"];
  color: LucideProps["color"];
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
      className="w-10 h-10 items-center justify-center bg-white border border-permuta-edge rounded-lg"
    >
      <Icon size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
