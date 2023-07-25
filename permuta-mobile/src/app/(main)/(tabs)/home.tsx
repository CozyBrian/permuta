import { FONT } from "@/assets/font";
import WelcomeBanner from "@/components/home/banner";
import { ItemCard } from "@/components/items";
import { Header } from "@/components/layout/header";
import { usePermuta } from "@/services/permuta";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const insets = useSafeAreaInsets();
  const { items } = usePermuta();

  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: ({ pageParam = 1 }) => items.getAllItems({ page: pageParam }),
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
      <Header />
      <View className="flex-1 w-full px-4">
        <FlashList
          ListHeaderComponent={
            <View className="">
              <WelcomeBanner />
              <Text
                style={{ fontFamily: FONT.NunitoSans.Bold }}
                className="text-2xl leading-7 mt-[32px] uppercase"
              >
                Around You
              </Text>
            </View>
          }
          data={data?.pages.map((page) => page.data.items).flat()}
          contentContainerStyle={{ paddingBottom: insets.bottom + 74 }}
          renderItem={({ item }) => <ItemCard item={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={200}
          numColumns={2}
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
