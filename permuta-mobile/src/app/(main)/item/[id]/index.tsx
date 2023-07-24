import { FONT } from "@/assets/font";
import { FillButton } from "@/components/buttons";
import IconButton from "@/components/buttons/IconButton";
import LoadingSpinner from "@/components/layout/loadingSpinner";
import { usePermuta } from "@/services/permuta";
import { useQuery } from "@tanstack/react-query";
import { router, useSearchParams } from "expo-router";
import { ChevronLeft, Minus, Plus } from "lucide-react-native";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ItemDetails() {
  const insets = useSafeAreaInsets();
  const { id } = useSearchParams();

  const { items } = usePermuta();

  const { data, isLoading } = useQuery({
    queryKey: ["items", id],
    queryFn: () => items.getItemDetails(id),
  });

  const item = data?.data;

  const isAuction = item?.auctions !== null;
  return (
    <View className="flex-1 bg-permuta-background">
      <View
        style={{
          marginTop: insets.top,
        }}
        className="h-72 bg-permuta-primary"
      >
        <IconButton
          onPress={() => router.back()}
          Icon={ChevronLeft}
          color="#000"
          size={28}
          className="rounded-full absolute top-4 left-4"
        />
      </View>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <LoadingSpinner />
        </View>
      ) : (
        <>
          <View className="flex-1 p-4 -my-2">
            <View className="my-2">
              <Text
                numberOfLines={1}
                className="text-ellipsis leading-4 text-slate-500"
              >
                @{item?.seller.username} ⸱ {item?.seller.hostel.name}
              </Text>
              <View className="flex-row justify-between">
                <Text
                  style={{ fontFamily: FONT.Nunito.Medium }}
                  numberOfLines={2}
                  className="w-3/5 text-2xl text-ellipsis leading-6 pt-2"
                >
                  {item?.name}
                </Text>
                <View className="items-end justify-between py-1">
                  <Text className="text-ellipsis leading-4 text-slate-500">
                    {isAuction ? "Current Bid" : "Price"}
                  </Text>
                  <Text className="text-2xl text-permuta-text">
                    ₵{item?.price.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            {isAuction && (
              <View className="flex-row justify-between">
                <View className="justify-between py-1">
                  <Text className="text-ellipsis leading-4 text-slate-500">
                    Time Remaining
                  </Text>
                  <Text className="text-2xl text-permuta-text">1d 12h 3m</Text>
                </View>
                <View className="items-end justify-between py-1">
                  <Text className="text-ellipsis leading-4 text-slate-500">
                    Your Bid
                  </Text>
                  <Text className="text-2xl text-permuta-text">--</Text>
                </View>
              </View>
            )}
            <View className="my-2">
              <Text style={{ fontFamily: FONT.Nunito.Medium }}>
                Description
              </Text>
              <Text
                style={{ fontFamily: FONT.Nunito.Medium }}
                className="text-slate-600"
              >
                {item?.description}
              </Text>
            </View>
            <View className="my-2 items-start">
              <View className=" border rounded-lg py-1 px-4">
                <Text className="text-xs">{item?.condition}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: insets.bottom }} className="p-4">
            {isAuction && (
              <View className="flex-row -mx-1 mb-2">
                <IconButton
                  className="flex-1 mx-1 bg-[#EEEEEE] border-[#EEEEEE]"
                  Icon={Minus}
                />
                <View className="h-10 flex-[2] items-center justify-center mx-1 border rounded-lg">
                  <Text className="text-xl text-permuta-text">₵638.99</Text>
                </View>
                <IconButton
                  className="flex-1 mx-1 bg-[#EEEEEE] border-[#EEEEEE]"
                  Icon={Plus}
                />
              </View>
            )}
            <FillButton
              onPress={() => {
                if (isAuction) {
                  return router.push(`/item/${id}/place-bid-modal`);
                } else {
                  return router.push(`/item/${id}/ask-to-buy`);
                }
              }}
              label={isAuction ? "Place Bid" : "Ask To Buy"}
            />
          </View>
        </>
      )}
    </View>
  );
}
