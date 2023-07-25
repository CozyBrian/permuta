import { HeaderWithBack } from "@/components/layout/header";
import { RefreshControl, View } from "react-native";
import SearchInput from "@/components/inputs/SearchInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryBar from "@/components/inputs/categoryBar";
import SearchItemCard from "@/components/items/SearchItemCard";
import { usePermuta } from "@/services/permuta";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebouce";
import { FlashList } from "@shopify/flash-list";
import { AxiosError } from "axios";

export default function Search() {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<string>();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { items } = usePermuta();

  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey: ["items", category, debouncedSearchText],
    queryFn: ({ pageParam = 1 }) =>
      items.getAllItems({
        page: pageParam,
        category_id: category,
        search: debouncedSearchText,
      }),
    retry(failureCount, error) {
      if ((error as AxiosError).status === 404) return false;
      else if (failureCount < 3) return true;
      else return false;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page < lastPage.data.totalPages) {
        return lastPage.data.page + 1;
      }
      return false;
    },
    keepPreviousData: true,
  });

  return (
    <View className="flex-1 bg-permuta-background">
      <HeaderWithBack title="Search" centerTitle showBack={false} />
      <View className="px-4">
        <SearchInput value={searchText} onChangeText={setSearchText} />
        <CategoryBar
          selectedCategory={category}
          setSelectedCategory={setCategory}
        />
      </View>
      <View className="flex-1 w-full px-4">
        <FlashList
          data={data?.pages.map((page) => page.data.items).flat()}
          contentContainerStyle={{ paddingBottom: insets.bottom + 74 }}
          renderItem={({ item }) => <SearchItemCard item={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={80}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          refreshing={isLoading}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => console.log("refreshing")}
            />
          }
        />
      </View>
    </View>
  );
}
