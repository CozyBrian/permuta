import {
  View,
  Text,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { HeaderWithBack } from "@/components/layout/header";
import { FONT } from "@/assets/font";
import { useForm } from "react-hook-form";
import ControlledInput from "@/components/inputs/controlledInput";
import Dropdown from "@/components/inputs/Dropdown";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { IAuctionCreate, IItemCreate } from "@/types";
import { FillButton } from "@/components/buttons";
import CategoryDropdown from "@/components/inputs/categoryDropdown";
import { usePermuta } from "@/services/permuta";
import { AxiosError } from "axios";

export default function AddItem() {
  const { items } = usePermuta();
  const [isAuction, setIsAuction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IItemCreate & IAuctionCreate>();

  const onSubmit = async (data: IItemCreate & IAuctionCreate) => {
    console.log(data);

    try {
      const res = await items.postItem({ ...data });
      console.log(res);
    } catch (error) {
      const err = error as AxiosError;

      console.error(err.response?.data);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      className="flex-1 bg-permuta-background"
    >
      <HeaderWithBack title="New Item" />
      <ScrollView className="pt-4 px-4 flex-1">
        <View className="w-full h-[194px] bg-permuta-primary rounded-2xl"></View>
        <View className="flex-1 flex flex-col pt-[10px] gap-y-2">
          <Text style={{ fontFamily: FONT.NunitoSans.Bold }}>Details</Text>
          <ControlledInput
            control={control}
            name="name"
            placeholder="Name"
            errors={errors}
          />
          <View className="h-11 w-full flex-row justify-between items-center">
            <Text className="text-[#667085] text-base">Is Auction?</Text>
            <Switch
              ios_backgroundColor="#F2F4F7"
              trackColor={{ false: "#F2F4F7", true: "#5C9AD4" }}
              onValueChange={(value) => setIsAuction(value)}
              value={isAuction}
            />
          </View>
          {isAuction && (
            <>
              <View className="w-full flex-row items-center justify-between">
                <Text
                  style={{ fontFamily: FONT.Nunito.Medium }}
                  className="text-[#667085] text-base"
                >
                  Starting Time
                </Text>
                <RNDateTimePicker value={new Date()} mode="datetime" />
              </View>
              <View className="w-full flex-row items-center justify-between">
                <Text
                  style={{ fontFamily: FONT.Nunito.Medium }}
                  className="text-[#667085] text-base"
                >
                  Ending Time
                </Text>
                <RNDateTimePicker value={new Date()} mode="datetime" />
              </View>
            </>
          )}
          <ControlledInput
            control={control}
            name={isAuction ? "starting_price" : "price"}
            placeholder={isAuction ? "Starting Price" : "Price"}
            keyboardType="numeric"
            errors={errors}
          />
          <ControlledInput
            control={control}
            name="description"
            placeholder="Description"
            errors={errors}
            className="h-[88px] p-4"
            multiline
          />
          <View>
            <CategoryDropdown
              onChange={(event) => setValue("category_id", event.value)}
            />
          </View>
          <View>
            <Dropdown
              items={[
                { label: "New", value: "NEW" },
                { label: "Slightly Used", value: "SLIGHTLY_USED" },
                { label: "Used", value: "USED" },
              ]}
              onChange={(event) =>
                setValue("condition", event.value as IItemCreate["condition"])
              }
              placeholder="Condition"
            />
          </View>
        </View>
      </ScrollView>
      <View className="absolute w-full bottom-10 px-4">
        <FillButton
          onPress={handleSubmit(onSubmit)}
          label="Complete"
          isLoading={isLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
