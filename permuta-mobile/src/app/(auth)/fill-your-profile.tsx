import { FillButton } from "@/components/buttons";
import { HeaderWithBack } from "@/components/layout/header";
import Dropdown from "@/components/inputs/Dropdown";
import { Edit2 } from "lucide-react-native";
import { TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { IRegisterPayload } from "@/types";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import classNames from "classnames";
import { userRegister } from "@/services/permuta";
import HotelDropdown from "@/components/inputs/hotelDropdown";

export default function FillYourProfile() {
  const { registerData } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterPayload>({
    defaultValues: registerData,
  });

  const onSubmit = async (data: IRegisterPayload) => {
    try {
      setIsLoading(true);
      const { data: res } = await userRegister(data);
      return dispatch(
        action.auth.setAuth({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          isAuthenticated: true,
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <HeaderWithBack title="Fill Your Profile" />
      <View className="flex-1 p-4">
        <View className="flex-1 flex-col items-center">
          <View className="mt-6 mb-8 w-32 h-32">
            <View className="w-full h-full rounded-full bg-[#A5C7E6]"></View>
            <View className="absolute bottom-0 right-0 w-8 h-8 items-center justify-center rounded-md bg-permuta-primaryDark">
              <Edit2 size={16} color="#fff" />
            </View>
          </View>
          <View className="w-full gap-y-3">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor={"#667085"}
                  autoCapitalize="none"
                  className={classNames(
                    "w-full h-11 border text-base leading-5 rounded-lg px-4 mt-[14px]",
                    errors.full_name ? "border-red-500" : "border-permuta-edge"
                  )}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="full_name"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Phone"
                  placeholderTextColor={"#667085"}
                  autoCapitalize="none"
                  className={classNames(
                    "w-full h-11 border text-base leading-5 rounded-lg px-4 mt-[14px]",
                    errors.phone_number
                      ? "border-red-500"
                      : "border-permuta-edge"
                  )}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="phone_number"
            />
            <View>
              <Dropdown
                placeholder="Male"
                items={[
                  {
                    label: "Male",
                    value: "MALE",
                  },
                  {
                    label: "Female",
                    value: "FEMALE",
                  },
                  {
                    label: "Other",
                    value: "OTHER",
                  },
                ]}
              />
            </View>
            <View>
              <HotelDropdown />
            </View>
          </View>
          <FillButton
            className="absolute bottom-10"
            onPress={handleSubmit(onSubmit)}
            label="Complete"
            isLoading={isLoading}
          />
        </View>
      </View>
    </View>
  );
}
