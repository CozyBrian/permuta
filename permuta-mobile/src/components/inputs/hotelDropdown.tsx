import React, { ComponentProps, useState } from "react";
import Dropdown from "./Dropdown";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePermuta } from "@/services/permuta";
import { AxiosError } from "axios";
import { useDebounce } from "@/hooks/useDebouce";

type HotelDropdownProps = {
  onChange: ComponentProps<typeof Dropdown>["onChange"];
};

const HotelDropdown = ({ onChange }: HotelDropdownProps) => {
  const { hostels } = usePermuta();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
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
      onChange={onChange}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      setSearchText={setSearchText}
      searchText={searchText}
    />
  );
};

export default HotelDropdown;
