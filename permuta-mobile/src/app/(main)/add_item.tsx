import {
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { HeaderWithBack } from "@/components/layout/header";
import { FONT } from "@/assets/font";
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";
import ControlledInput from "@/components/inputs/controlledInput";
import Dropdown from "@/components/inputs/Dropdown";
import { Platform } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

type IItemCreate = {
  name: string;
  price: number;
  starting_price: number;
  description: string;
};

export default function AddItem() {
  const [isAuction, setIsAuction] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IItemCreate>();
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
            <Dropdown
              items={[
                { label: "Electronics", value: "2342-few34-3234r3-2r32" },
              ]}
              placeholder="Category"
            />
          </View>
          <View>
            <Dropdown
              items={[{ label: "New", value: "NEW" }]}
              placeholder="Condition"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
