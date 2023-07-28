import { View } from "react-native";
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePermuta } from "@/services/permuta";
import { AxiosError } from "axios";
import { useDebounce } from "@/hooks/useDebouce";

const HotelDropdown = () => {
  const { hostels } = usePermuta();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey: ["items", debouncedSearchText],
    queryFn: ({ pageParam = 1 }) =>
      hostels.getAllHostels({ page: pageParam, search: debouncedSearchText }),
    retry(failureCount, error) {
      if ((error as AxiosError).status === 404) return false;
      else if (failureCount < 3) return true;
      else return false;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return false;
    },
    keepPreviousData: true,
  });

  return (
    <Dropdown
      placeholder="Hostel"
      isSearchable
      items={
        data?.pages
          .map((page) =>
            page.items.map((hotel) => ({
              label: hotel.name,
              value: hotel.id,
            }))
          )
          .flat() || []
      }
      onChange={(value) => console.log(value)}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      setSearchText={setSearchText}
      searchText={searchText}
    />
  );
};

export default HotelDropdown;
