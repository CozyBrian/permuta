import { HeaderWithBack } from "@/components/layout/header";
import { ScrollView, View } from "react-native";
import SearchInput from "@/components/inputs/SearchInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryBar from "@/components/inputs/categoryBar";
import SearchItemCard from "@/components/items/SearchItemCard";
import { usePermuta } from "@/services/permuta";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/layout/loadingSpinner";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebouce";

export default function Search() {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<string>();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { items } = usePermuta();

  const { data, isLoading } = useQuery({
    queryKey: ["items", category, debouncedSearchText],
    queryFn: () =>
      items.getAllItems({
        category_id: category,
        search: debouncedSearchText,
      }),
  });

  return (
    <View className="flex-1 bg-permuta-background">
      <HeaderWithBack title="Search" />
      <View className="px-4">
        <SearchInput value={searchText} onChangeText={setSearchText} />
        <CategoryBar
          selectedCategory={category}
          setSelectedCategory={setCategory}
        />
      </View>
      <View className="flex-1 w-full px-4">
        {isLoading && data !== undefined ? (
          <View className="flex-1 items-center justify-center">
            <LoadingSpinner />
          </View>
        ) : (
          <ScrollView
            style={{ paddingBottom: insets.bottom + 74 }}
            className="flex-1"
          >
            {data?.data.items.map((item) => (
              <SearchItemCard key={item.id} item={item} />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
