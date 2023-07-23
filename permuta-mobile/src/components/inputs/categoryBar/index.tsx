import React from "react";
import { ScrollView } from "react-native";
import CategoryItem from "./categoryItem";

const CategoryBar = () => {
  return (
    <ScrollView horizontal className="flex flex-row h-[42px] px-1.5 -mx-2">
      <CategoryItem title="All" isSelected />
      <CategoryItem title="Clothes" />
      <CategoryItem title="Miscellaneous" />
      <CategoryItem title="Electronics" />
      <CategoryItem title="Clothes" />
      <CategoryItem title="Clothes" />
    </ScrollView>
  );
};

export default CategoryBar;
