import { AuthHeader } from "@/components/layout/header";
import { View } from "react-native";
import SearchInput from "@/components/inputs/SearchInput";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryBar from "@/components/inputs/categoryBar";
import SearchItemCard from "@/components/items/SearchItemCard";

export default function Search() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-permuta-background">
      <AuthHeader title="Search" />
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
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          renderItem={({ item }) => <SearchItemCard />}
          keyExtractor={(item, index) => `item-${item}`}
        />
      </View>
    </View>
  );
}
