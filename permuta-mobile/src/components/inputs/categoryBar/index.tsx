import React from "react";
import { FlatList, View } from "react-native";
import CategoryItem from "./categoryItem";
import { usePermuta } from "@/services/permuta";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/layout/loadingSpinner";

type CategoryBarProps = {
  selectedCategory: string | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
};
const CategoryBar = ({
  selectedCategory,
  setSelectedCategory,
}: CategoryBarProps) => {
  const { category } = usePermuta();

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: category.getAllCategories,
    refetchOnMount: false,
  });

  return (
    <View className="flex flex-row h-[42px] px-1.5 -mx-2">
      {isLoading && data !== undefined ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={data}
          horizontal
          renderItem={({ item }) => (
            <CategoryItem
              onPress={() => {
                if (item.id === selectedCategory) {
                  setSelectedCategory(undefined);
                } else {
                  setSelectedCategory(item.id);
                }
              }}
              title={item.name}
              isSelected={item.id === selectedCategory}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default CategoryBar;
