import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
import React, { useState } from "react";
import { FONT } from "@/assets/font";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePermuta } from "@/services/permuta";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AxiosError } from "axios";
import { FlashList } from "@shopify/flash-list";
import SearchItemCard from "../items/SearchItemCard";

const ProfileTabs = [
  { id: "items", title: "Items" },
  { id: "auctions", title: "Auctions" },
];

const ProfileItems = () => {
  const [selectedTab, setSelectedTab] = useState(ProfileTabs[0].id);
  const insets = useSafeAreaInsets();
  const { items } = usePermuta();

  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey: ["items", selectedTab],
    queryFn: ({ pageParam = 1 }) =>
      items.getAllItems({
        page: pageParam === false ? undefined : pageParam,
        auctions: selectedTab === "auctions",
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
    <View className="mt-3 flex-1">
      <ProfileItemsTabs
        tabs={ProfileTabs}
        selectedTabId={selectedTab}
        setSelectedTabId={setSelectedTab}
      />
      <View className="flex-1">
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
};

type ProfileItemsTabsProps = {
  tabs: {
    id: string;
    title: string;
  }[];
  selectedTabId: string;
  setSelectedTabId: (id: string) => void;
};
const ProfileItemsTabs = ({
  tabs,
  selectedTabId,
  setSelectedTabId,
}: ProfileItemsTabsProps) => {
  return (
    <View className="flex-row h-11 bg-permuta-primary/10">
      {tabs.map((tab) => (
        <TouchableOpacity
          onPress={() => setSelectedTabId(tab.id)}
          key={tab.id}
          style={{
            borderBottomWidth: 2,
            borderBottomColor:
              selectedTabId === tab.id ? "#2372B9" : "transparent",
          }}
          className="flex-1 items-center justify-center"
        >
          <Text
            style={{ fontFamily: FONT.Nunito.Medium }}
            className="text-base leading-5"
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileItems;
