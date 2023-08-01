import { FONT } from "@/assets/font";
import { usePermuta } from "@/services/permuta";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";

const ProfileSection = () => {
  const { auth } = usePermuta();
  const { data } = useQuery({
    queryKey: ["user-details"],
    queryFn: () => auth.getActiveUserDetails(),
  });
  return (
    <View className="px-[14px] py-1.5 flex-row items-center">
      <View className="w-[120px] h-[120px] rounded-full bg-[#A5C7E6]" />
      <View className="ml-[10px]">
        <View className="mb-[14px]">
          <Text
            style={{ fontFamily: FONT.Nunito.Medium }}
            className="text-xl leading-6"
          >
            {data?.full_name ?? "Nrian Bewton"}
          </Text>
          <Text
            style={{ fontFamily: FONT.Nunito.Medium }}
            className="text-base text-[#7D7D7D] leading-5"
          >
            @{data?.username ?? "nrianbewton"}
          </Text>
        </View>
        <Text style={{ fontFamily: FONT.Nunito.Medium }} className="text-sm">
          {data?.hostel.name ?? "loading"} ⸱{" "}
          <Text className="text-[#7D7D7D]">
            {data?.hostel.location ?? "loading"}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default ProfileSection;
