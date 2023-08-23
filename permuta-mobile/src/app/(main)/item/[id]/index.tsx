import { FONT } from "@/assets/font";
import { FillButton } from "@/components/buttons";
import IconButton from "@/components/buttons/IconButton";
import NumberInput from "@/components/inputs/numberInput";
import LoadingSpinner from "@/components/layout/loadingSpinner";
import { useAppSelector } from "@/hooks";
import { usePermuta } from "@/services/permuta";
import socket from "@/services/socketIO";
import { IAuctionEvent, IBid, IBidCreate } from "@/types";
import { FormatcountDownDuration } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { router, useSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ItemDetails() {
  const { user } = useAppSelector((state) => state.auth);
  const insets = useSafeAreaInsets();
  const { id } = useSearchParams();
  const [currentUserBid, setCurrentUserBid] = useState(0);
  const [currentBid, setCurrentBid] = useState<IBid | null>(null);
  const [YourBid, setYourBid] = useState<null | IBid>(null);

  const { items, bids } = usePermuta();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["items", id],
    queryFn: () => items.getItemDetails(id),
  });

  const item = data?.data;

  const isAuction = item?.auctions !== null;
  const auction = item?.auctions === null ? undefined : item?.auctions;

  useQuery({
    queryKey: ["bids", auction?.id],
    enabled: isAuction && !!auction?.id,
    queryFn: () => bids.getLatestAuctionBid(auction?.id!),
    onSuccess(data) {
      if (data) {
        setCurrentBid(data);
        setCurrentUserBid(data.amount + 5);
      } else {
        setCurrentBid(null);
        setCurrentUserBid(auction?.starting_price!);
      }
    },
  });

  useQuery({
    queryKey: ["bids", auction?.id, user?.id],
    enabled: isAuction && !!auction?.id && !!user?.id,
    queryFn: () => bids.getUserLatestAuctionBid(auction?.id!),
    onSuccess(data) {
      if (data) {
        setYourBid(data);
      }
    },
  });

  useEffect(() => {
    socket.on("AuctionEvent", (data: IAuctionEvent) => {
      if (data.type === "error") {
        Alert.alert("Error", data.message);
      }
      if (data.type === "bid") {
        setCurrentBid(data.bid);
        if (data.bid.bidder_id === user?.id) {
          setYourBid(data.bid);
        }
        setCurrentUserBid(data.bid.amount + 5);
      }
    });

    return () => {
      socket.off("AuctionEvent");
    };
  }, [queryClient, user?.id]);

  useEffect(() => {
    isAuction && !!auction?.id && socket.emit("SubscribeAuction", auction?.id);

    return () => {
      isAuction &&
        !!auction?.id &&
        socket.emit("UnsubscribeAuction", auction?.id);
    };
  }, [isAuction, auction?.id]);

  const onSubmitBid = () => {
    const bidData: IBidCreate = {
      auction_id: auction?.id!,
      amount: currentUserBid,
      bidder_id: user?.id!,
    };

    if (currentUserBid < currentBid?.amount! + 5) {
      return Alert.alert(
        "Invalid Bid",
        `Bid must be at least ${currentBid?.amount! + 5}`
      );
    }

    return Alert.alert(
      "Confirm Bid?",
      `Place bid of ${bidData.amount} for ${item?.name}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => socket.emit("UserBid", bidData) },
      ]
    );
  };

  return (
    <View className="flex-1 bg-permuta-background">
      <View
        style={{
          marginTop: insets.top,
        }}
        className="h-72 bg-permuta-primary"
      >
        {item?.image_url && (
          <Image className="w-full h-full" source={{ uri: item?.image_url }} />
        )}
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
                    {isAuction ? currentBid?.amount ?? "--" : `₵${item.price}`}
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
                  <Text className="text-2xl text-permuta-text">
                    {FormatcountDownDuration(
                      new Date(),
                      new Date(auction?.end_time!)
                    )}
                  </Text>
                </View>
                <View className="items-end justify-between py-1">
                  <Text className="text-ellipsis leading-4 text-slate-500">
                    Your Bid
                  </Text>
                  <Text
                    className={classNames(
                      "text-2xl text-permuta-text",
                      YourBid &&
                        YourBid?.amount !== currentBid?.amount &&
                        "text-red-500",
                      YourBid &&
                        YourBid?.amount === currentBid?.amount &&
                        "text-green-500"
                    )}
                  >
                    {YourBid?.amount ?? "--"}
                  </Text>
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
              <NumberInput
                minValue={auction?.starting_price! + 5}
                value={currentUserBid}
                onChange={setCurrentUserBid}
              />
            )}
            <FillButton
              onPress={() => {
                if (isAuction) {
                  return onSubmitBid();
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
