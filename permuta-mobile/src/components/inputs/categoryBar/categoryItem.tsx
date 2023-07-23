import { Text, Pressable } from "react-native";
import { FONT } from "@/assets/font";
import classNames from "classnames";

type CategoryItemProps = {
  title: string;
  isSelected?: boolean;
} & React.ComponentProps<typeof Pressable>;

const CategoryItem = ({
  title,
  isSelected = false,
  ...props
}: CategoryItemProps) => {
  return (
    <Pressable
      {...props}
      className={classNames(
        "h-[30px] px-4 mx-2 items-center justify-center  rounded-full",
        isSelected ? "bg-[#5BA4E8]" : "bg-[#EFEFEF]"
      )}
    >
      <Text
        style={{
          fontFamily: FONT.Nunito.Regular,
          color: isSelected ? "#fff" : "#000",
        }}
        className="text-base"
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default CategoryItem;
