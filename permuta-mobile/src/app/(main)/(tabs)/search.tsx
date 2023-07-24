import { HeaderWithBack } from "@/components/layout/header";
import { View } from "react-native";
import SearchInput from "@/components/inputs/SearchInput";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryBar from "@/components/inputs/categoryBar";
import SearchItemCard from "@/components/items/SearchItemCard";
import { usePermuta } from "@/services/permuta";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/layout/loadingSpinner";

export default function Search() {
  const insets = useSafeAreaInsets();
  const { items } = usePermuta();

  const { data, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: () => items.getAllItems({}),
  });

  return (
    <View className="flex-1 bg-permuta-background">
      <HeaderWithBack title="Search" />
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <LoadingSpinner />
        </View>
      ) : (
        <View className="flex-1 w-full p-4 pb-0">
          <FlatList
            className="h-full -mx-2 -my-2"
            ListHeaderComponent={() => (
              <View className="px-2">
                <SearchInput />
                <CategoryBar />
              </View>
            )}
            contentContainerStyle={{ paddingBottom: insets.bottom + 74 }}
            data={data?.data.items}
            renderItem={({ item }) => <SearchItemCard item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
}
