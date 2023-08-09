import React, { ComponentProps, useState } from "react";
import Dropdown from "./Dropdown";
import { useQuery } from "@tanstack/react-query";
import { usePermuta } from "@/services/permuta";
import { useDebounce } from "@/hooks/useDebouce";

type categoryDropdownProps = {
  onChange: ComponentProps<typeof Dropdown>["onChange"];
};

const CategoryDropdown = ({ onChange }: categoryDropdownProps) => {
  const { category } = usePermuta();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 100);

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: category.getAllCategories,
    refetchOnMount: false,
  });

  const categoryData = data || [];

  const filteredCategoryData = categoryData.filter((cat) =>
    cat.name.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  return (
    <Dropdown
      placeholder="Category"
      isSearchable
      items={
        filteredCategoryData?.map((cat) => ({
          label: cat.name,
          value: cat.id,
        })) || []
      }
      onChange={onChange}
      setSearchText={setSearchText}
      searchText={searchText}
    />
  );
};

export default CategoryDropdown;
