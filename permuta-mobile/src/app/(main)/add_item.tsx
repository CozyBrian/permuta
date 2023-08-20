import {
  View,
  Text,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Pressable,
  Alert,
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
import * as ImagePicker from "expo-image-picker";
import { useAppSelector } from "@/hooks";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

export default function AddItem() {
  const { items } = usePermuta();
  const { user } = useAppSelector((state) => state.auth);
  const [isAuction, setIsAuction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageData, setImageData] = useState<{
    uri: string;
    name: string | undefined;
    type: string;
  }>();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IItemCreate & IAuctionCreate>({
    defaultValues: {
      start_time: new Date(),
      end_time: new Date(),
    },
  });

  const queryClient = useQueryClient();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 1.2],
      quality: 1,
    });

    console.log(result);

    if (result.canceled) {
      return;
    }

    const image = result.assets[0];
    let localUri = image.uri;
    setImage(localUri);
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename!);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();

    const formImageData = { uri: localUri, name: filename, type };
    setImageData(formImageData);
    formData.append("image", formImageData as any);
    setImage(image.uri);
  };

  const onSubmit = async (data: IItemCreate & IAuctionCreate) => {
    setIsLoading(true);

    const formData = new FormData();

    try {
      if (isAuction) {
        await items.postItem({
          ...data,
          price: parseInt(data.starting_price as string),
          seller_id: user?.id!,
          auction: {
            ...data,
            seller_id: user?.id!,
            starting_price: parseInt(data.starting_price as string),
            start_time: new Date(data.start_time),
            end_time: new Date(data.end_time),
          },
        });
        queryClient.invalidateQueries(["items", "auctions"]);
      } else {
        const newItem = {
          ...data,
          price: parseInt(data.price as string),
          seller_id: user?.id!,
        } as const;

        for (const key in newItem) {
          if (newItem.hasOwnProperty(key)) {
            formData.append(key, (newItem as any)[key]);
          }
        }
        if (imageData) {
          formData.append("image", imageData as any);
        }

        await items.postItemForm(formData);
        queryClient.invalidateQueries(["items", "items"]);
      }
      queryClient.invalidateQueries(["items"]);
      Alert.alert("Success ✅", `${data.name} successfully added`, [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      const err = error as AxiosError;

      console.error(err.response?.data);
      Alert.alert(
        "Error ❌",
        `${err.response?.data}` ?? "Something went wrong"
      );
    } finally {
      setIsLoading(false);
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
        <Pressable
          onPress={pickImage}
          className="w-full h-[194px] bg-permuta-primary rounded-2xl"
        >
          {image && (
            <Image
              source={{ uri: image }}
              className="w-full h-full rounded-2xl"
            />
          )}
        </Pressable>
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
                <RNDateTimePicker
                  value={watch().start_time}
                  onChange={(event, date) => setValue("start_time", date!)}
                  mode="datetime"
                />
              </View>
              <View className="w-full flex-row items-center justify-between">
                <Text
                  style={{ fontFamily: FONT.Nunito.Medium }}
                  className="text-[#667085] text-base"
                >
                  Ending Time
                </Text>
                <RNDateTimePicker
                  value={watch().end_time}
                  onChange={(event, date) => setValue("end_time", date!)}
                  mode="datetime"
                />
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
              onChange={(event) => {
                setValue("category_id", event.value);
              }}
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
