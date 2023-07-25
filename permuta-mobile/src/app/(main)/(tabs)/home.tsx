import { FONT } from "@/assets/font";
import WelcomeBanner from "@/components/home/banner";
import { ItemCard } from "@/components/items";
import { Header } from "@/components/layout/header";
import { usePermuta } from "@/services/permuta";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const insets = useSafeAreaInsets();
  const { items } = usePermuta();

  const { data, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: () => items.getAllItems({}),
  });

  return (
    <View className="flex-1 bg-permuta-background">
      <Header />
      <View className="px-4">
        <WelcomeBanner />
        <Text
          style={{ fontFamily: FONT.NunitoSans.Bold }}
          className="text-2xl leading-7 mt-[32px] uppercase"
        >
          Around You
        </Text>
      </View>
      <View className="flex-1 w-full px-4">
        <FlashList
          data={data?.data.items}
          contentContainerStyle={{ paddingBottom: insets.bottom + 74 }}
          renderItem={({ item }) => <ItemCard item={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={200}
          numColumns={2}
          onEndReached={() => {
            console.log("end reached");
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
      {/* {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <LoadingSpinner />
        </View>
      ) : (
        <View className="flex-1 w-full p-4 pb-0">
          <FlatList
            className="h-full -mx-2 -my-2"
            ListHeaderComponent={() => (
              <View className="px-2">
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
            data={data?.data.items}
            renderItem={({ item }) => <ItemCard item={item} />}
            numColumns={2}
            keyExtractor={(item, index) => item.id}
          />
        </View>
      )} */}
    </View>
  );
}
