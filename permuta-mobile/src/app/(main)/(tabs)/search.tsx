import { HeaderWithBack } from "@/components/layout/header";
import { RefreshControl, View } from "react-native";
import SearchInput from "@/components/inputs/SearchInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryBar from "@/components/inputs/categoryBar";
import SearchItemCard from "@/components/items/SearchItemCard";
import { usePermuta } from "@/services/permuta";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebouce";
import { FlashList } from "@shopify/flash-list";

export default function Search() {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<string>();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { items } = usePermuta();

  const { data, isLoading, refetch } = useQuery({
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
        <FlashList
          data={data?.data.items}
          contentContainerStyle={{ paddingBottom: insets.bottom + 74 }}
          renderItem={({ item }) => <SearchItemCard item={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={80}
          onEndReached={() => {
            console.log("end reached");
          }}
          refreshing={isLoading}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => refetch()}
            />
          }
        />
      </View>
    </View>
  );
}
