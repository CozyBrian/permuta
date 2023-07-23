import { FONT } from "@/assets/font";
import WelcomeBanner from "@/components/home/banner";
import SearchInput from "@/components/inputs/SearchInput";
import { ItemCard } from "@/components/items";
import { Header } from "@/components/layout/header";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-permuta-background items-center">
      <Header />
      <View className="flex-1 w-full p-4 pb-0">
        <FlatList
          className="h-full -mx-2 -my-2"
          ListHeaderComponent={() => (
            <View className="px-2">
              <SearchInput />
              <WelcomeBanner />
              <Text
                style={{ fontFamily: FONT.NunitoSans.Bold }}
                className="text-2xl leading-7 mt-[32px] uppercase"
              >
                Around You
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: insets.bottom + 74 }}
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={({ item }) => <ItemCard />}
          numColumns={2}
          keyExtractor={(item, index) => `item-${item}`}
        />
      </View>
    </View>
  );
}
